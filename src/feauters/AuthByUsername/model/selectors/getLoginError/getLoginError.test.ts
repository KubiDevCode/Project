import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '../../../../../app/providers/StoreProvider'
import { getLoginError } from './getLoginError'

describe('test error selector', () => {
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'true',
                username: '',
                password: '',
                isLoading: false,
            },
        }
        expect(getLoginError(state as StateSchema)).toEqual('true')
    })
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})
