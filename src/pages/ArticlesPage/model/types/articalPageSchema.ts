import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string

    page: number
    limit: number
    hasMore: boolean

    view?: ArticleView
    order: SortOrder
    sort: ArticleSortField
    search: string
    _inited: boolean
    type: ArticleType
}
