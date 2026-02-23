import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernamrProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernamrProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authDdata, thunkApi) => {
        try {
            const respons = await axios.post('http://localhost:8000/login', authDdata)

            if (!respons.data) {
                throw new Error()
            }

            localStorage.setItem(USER_LOCALSORAGE_KEY, JSON.stringify(respons.data))
            thunkApi.dispatch(userActions.setAuthData(respons.data))

            return respons.data
        } catch (e) {
            return thunkApi.rejectWithValue('Введен неправильный логин или пароль')
        }
    },
)
