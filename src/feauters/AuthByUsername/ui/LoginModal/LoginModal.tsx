import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loading } from 'shared/ui/Loading';
import s from './LoginModal.module.scss';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal
            className={classNames(s.LoginModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loading />}>
                <LoginFormAsync onSucsess={onClose} />
            </Suspense>
        </Modal>
    );
};
