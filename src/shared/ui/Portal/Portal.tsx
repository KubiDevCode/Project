import { classNames } from 'shared/lib/classNames/classNames';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import s from './Portal.module.scss';

interface PortalProps {
    children: ReactNode
    element?: HTMLElement
}

export const Portal = ({ children, element = document.body }: PortalProps) => (
    createPortal(children, element)
);
