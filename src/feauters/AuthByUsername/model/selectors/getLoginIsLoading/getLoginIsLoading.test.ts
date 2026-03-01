import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '../../../../../app/providers/StoreProvider'
import { getLoginIsLoading } from './getLoginIsLoading'

describe('test isLoading selector', () => {
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
                username: '',
                password: '',
            },
        }
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
    })
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
    })
})
