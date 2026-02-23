import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSORAGE_KEY } from 'shared/const/localstorage'
import { User, UserSchema } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, actions: PayloadAction<User>) => {
            state.authData = actions.payload
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSORAGE_KEY)
            if (user) {
                state.authData = JSON.parse(user)
            }
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSORAGE_KEY)
        },
    },
})

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
