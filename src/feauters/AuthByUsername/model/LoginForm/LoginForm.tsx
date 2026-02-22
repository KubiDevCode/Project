import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import s from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';
import { useRef } from 'react';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(s.LoginForm, {}, [className])}>
            <Input className={s.input} type="text" autofocus placeholder='Введите username' />
            <Input className={s.input} type="text" placeholder='Введите username' />
            <Button
                className={s.loginBtn}
            >
                {t('login')}
            </Button>
        </div>
    );
};
