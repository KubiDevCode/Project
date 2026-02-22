import { counterActions, counterReducer } from './counterSlice'
import { CounterSchema } from '../types/counterSchema'

describe('Button', () => {
    test('should return cointer value', () => {
        const state: CounterSchema = { value: 10 }
        expect(counterReducer(state, counterActions.decrement)).toEqual({ value: 9 })
    })

    test('should return cointer value', () => {
        const state: CounterSchema = { value: 10 }
        expect(counterReducer(state, counterActions.increment)).toEqual({ value: 11 })
    })

    test('should return cointer value', () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({ value: 1 })
    })
})
