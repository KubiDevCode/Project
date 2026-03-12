import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';

interface LoginByUsernamrProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernamrProps,
    ThunkConfig<string>>(

        'login/loginByUsername',
        async (authDdata, { dispatch, extra, rejectWithValue }) => {
            try {
                const response = await extra.api.post<User>('/login', authDdata)
                if (!response.data) {
                    throw new Error()
                }
                // extra.navigate?.('/about')
                localStorage.setItem(USER_LOCALSORAGE_KEY, JSON.stringify(response.data))
                dispatch(userActions.setAuthData(response.data))

                return response.data
            } catch (e) {
                return rejectWithValue('Введен неправильный логин или пароль')
            }
        },
    )
