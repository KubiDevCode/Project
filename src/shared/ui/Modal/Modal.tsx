/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    memo,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal';
import s from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300;

export const Modal = memo(
    (props: ModalProps) => {
        const {
            className,
            children,
            onClose,
            isOpen,
            lazy,
        } = props

        const [closing, isClosing] = useState(false)
        const [isMounted, setIsMounted] = useState(false)
        const timerRef = useRef<ReturnType<typeof setTimeout>>()

        useEffect(() => {
            if (isOpen) {
                setIsMounted(true)
            }
        }, [isOpen])

        const closeHandler = useCallback(() => {
            if (onClose) {
                isClosing(true)
                timerRef.current = setTimeout(() => {
                    onClose()
                    isClosing(false)
                }, ANIMATION_DELAY)
            }
        }, [onClose])

        const onKeyDown = useCallback((e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        }, [closeHandler]);

        useEffect(() => {
            if (isOpen) {
                window.addEventListener('keydown', onKeyDown);
            }

            return () => {
                clearInterval(timerRef.current)
                window.removeEventListener('keydown', onKeyDown)
            }
        }, [isOpen, onKeyDown])

        const onContentClick = (e: React.MouseEvent) => {
            e.stopPropagation();
        };

        const mods: Mods = {
            [s.opened]: isOpen,
            [s.isClosing]: closing,
        }

        if (lazy && !isMounted) {
            return null
        }

        return (
            <Portal>
                <div className={classNames(s.Modal, mods, [className])}>
                    <div
                        className={s.overlay}
                        onClick={closeHandler}
                    >
                        <div className={s.content} onClick={onContentClick}>
                            {children}
                        </div>
                    </div>
                </div>
            </Portal>
        );
    },
)
