import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '../../../../../app/providers/StoreProvider'
import { getLoginUsername } from './getLoginUsername'

describe('test isLoading selector', () => {
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'hi',
                password: '',
                isLoading: false,
            },
        }
        expect(getLoginUsername(state as StateSchema)).toEqual('hi')
    })
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state as StateSchema)).toEqual('')
    })
})
