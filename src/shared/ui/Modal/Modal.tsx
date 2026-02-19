/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from 'shared/ui/Portal';
import s from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
    } = props

    const { theme } = useTheme()
    const [closing, isClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

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

    const mods: Record<string, boolean> = {
        [s.opened]: isOpen,
        [s.isClosing]: closing,
    }

    return (
        <Portal>
            <div className={classNames(s.Modal, mods, [className, theme])}>
                <div
                    className={s.overlay}
                    onClick={closeHandler}
                >
                    <div className={s.content} onClick={onContentClick}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, perferendis! Facilis magnam assumenda, earum in fugiat pariatur velit doloremque sequi accusamus fugit illum laborum error nesciunt soluta dicta vel autem a fuga natus dolores recusandae. Recusandae aliquid iusto, natus mollitia voluptates,
                        adipisci rem unde eaque labore dicta aut! Quasi voluptatem iure obcaecati animi alias molestiae, quia excepturi repudiandae vitae qui iusto. Possimus culpa fuga at veritatis, obcaecati quia iusto error sint quidem assumenda a sed? Illum debitis numquam quas, animi sed provident nostrum? Architecto quibusdam debitis, veritatis corrupti a laudantium voluptate laborum ducimus deserunt obcaecati qui asperiores dolor quasi fugit.
                    </div>
                </div>
            </div>
        </Portal>
    );
};
