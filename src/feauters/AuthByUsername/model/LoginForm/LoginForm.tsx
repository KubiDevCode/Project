import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';
import { useRef } from 'react';
import s from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(s.LoginForm, {}, [className])}>
            <Input className={s.input} type="text" autofocus placeholder={t('LoginForm')} />
            <Input className={s.input} type="text" placeholder={t('PassForm')} />
            <Button
                className={s.loginBtn}
            >
                {t('login')}
            </Button>
        </div>
    );
};
