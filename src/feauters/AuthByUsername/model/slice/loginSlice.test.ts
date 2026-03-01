import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema'
import { LoginSchema } from '../types/LoginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice test', () => {
    test('', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '123',
        }
        expect(loginReducer(state as LoginSchema, loginActions.setUserName('1'))).toEqual({ username: '1' })
    })
    test('', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        }
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('1'))).toEqual({ password: '1' })
    })
})
