import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '../../../../../app/providers/StoreProvider'
import { getLoginPassword } from './getLoginPassword'

describe('test login selector', () => {
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'pen',
                username: '',
                isLoading: false,
            },
        }
        expect(getLoginPassword(state as StateSchema)).toEqual('pen')
    })
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginPassword(state as StateSchema)).toEqual('')
    })
})
