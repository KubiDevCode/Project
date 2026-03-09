import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticleDetails } from 'entities/Article/ui/ArticleDetails/ArticleDetails';
import { Text } from 'shared/ui/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticleDeatilsErrors, getArticleDeatilsIsLoading } from '../model/selectors/comments';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import s from './ArticleDetailsPage.module.scss';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleDeatilsIsLoading)
    const commentsErrors = useSelector(getArticleDeatilsErrors)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <div className={classNames(s.ArticleDetailsPage, {}, [className])}>
                Статья не найдена
            </div>
        )
    }

    return (
        <DynamicModalLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(s.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text title='Комментарий' className={s.commentTitle} />
                <CommentList comments={comments} isLoading={commentsIsLoading} />
            </div>
        </DynamicModalLoader>
    );
};

export default ArticleDetailsPage
