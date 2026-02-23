import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/LoginSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoaing: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined
                state.isLoaing = true
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoaing = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.error = action.payload
                state.isLoaing = false
            })
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
