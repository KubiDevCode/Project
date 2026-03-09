import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema'
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'
import { Article } from '../types/article'

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    data: undefined,
    error: undefined,
}

export const articleDeatailsSlice = createSlice({
    name: 'articleDeatails',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.error = undefined
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

// Action creators are generated for each case reducer function
export const { actions: articleDeatailsActions } = articleDeatailsSlice
export const { reducer: articleDeatailsReducer } = articleDeatailsSlice
