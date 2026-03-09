import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDeatilsIsLoading = (state: StateSchema) => state.articleDetailsComments?.isLoading
export const getArticleDeatilsErrors = (state: StateSchema) => state.articleDetailsComments?.error
