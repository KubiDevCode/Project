import { DeepPartial } from '@reduxjs/toolkit'
import { getCounter } from './getCounter'
import { StateSchema } from '../../../../../app/providers/StoreProvider'

describe('Button', () => {
    test('should return cointer value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        }
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 })
    })
})
