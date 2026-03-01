import axios from 'axios'
import { userActions } from '../../../../../entities/User'
import { loginByUsername } from './loginByUsername'
import { TestAsyncThunc } from '../../../../../shared/lib/tests/TestAsyncThunc/TestAsyncThunc'

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

describe('test isLoading selector', () => {
    // let dispatch: Dispatch
    // let getState: () => StateSchema

    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })

    const userValue = { username: '123', id: '123' }

    // test('should return cointer value', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))
    //     const action = loginByUsername({ password: '123', username: '1' })
    //     const result = await action(dispatch, getState, undefined)
    //     console.log(result)

    //     expect(dispatch).toHaveBeenNthCalledWith(2, userActions.setAuthData(userValue))
    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    // })
    // test('should return cointer value', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
    //     const action = loginByUsername({ password: '123', username: '1' })
    //     const result = await action(dispatch, getState, undefined)
    //     console.log(result)

    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(result.meta.requestStatus).toBe('rejected')
    // })

    test('should return cointer value', async () => {
        const thunk = new TestAsyncThunc(loginByUsername)
        const result = await thunk.callThunk({ username: '123', password: '123' })
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))

        expect(mockedAxios.post).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
    })

    test('should return cointer value', async () => {
        const thunk = new TestAsyncThunc(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
        const result = await thunk.callThunk({ username: '123', password: '123' })

        expect(thunk.dispatch).toHaveBeenNthCalledWith(2, userActions.setAuthData(userValue))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
    })
})
