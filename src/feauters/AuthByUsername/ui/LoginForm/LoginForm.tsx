import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { Text, TextTheme } from 'shared/ui/Text/ui/Text';
import { DynamicModalLoader, ReducersList }
    from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import s from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';

export interface LoginFormProps {
    className?: string;
    onSucsess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

export default memo(({ className, onSucsess }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginIsLoading)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ password, username }))
        if (result.meta.requestStatus === 'fulfilled') {
            onSucsess()
        }
    }, [dispatch, onSucsess, password, username])

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModalLoader removeAfterUnmount reducers={initialReducers}>
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
                    disabled={isLoading}
                >
                    {t('login')}
                </Button>
            </div>
        </DynamicModalLoader>
    );
});
