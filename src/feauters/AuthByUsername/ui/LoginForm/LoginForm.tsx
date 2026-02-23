import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/ui/Text';
import s from './LoginForm.module.scss';
import { loginActions } from '../../model/slice/LoginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {
        username, password, isLoaing, error,
    } = useSelector(getLoginState)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ password, username }))
    }, [dispatch, password, username])

    return (
        <div className={classNames(s.LoginForm, {}, [className])}>
            <Text title={t('AuthForm')} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                className={s.input}
                type="text"
                autofocus
                placeholder={t('LoginForm')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                className={s.input}
                type="text"
                placeholder={t('PassForm')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={s.loginBtn}
                onClick={onLoginClick}
                disabled={isLoaing}
            >
                {t('login')}
            </Button>
        </div>
    );
});
