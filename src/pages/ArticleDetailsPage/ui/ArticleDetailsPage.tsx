import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticleDetails } from 'entities/Article/ui/ArticleDetails/ArticleDetails';
import { Text } from 'shared/ui/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getArticleDeatilsErrors, getArticleDeatilsIsLoading } from '../model/selectors/comments';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import s from './ArticleDetailsPage.module.scss';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';
import { AddCommentForm } from '../../../feauters/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentByArticle';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { Page } from '../../../widgets/Page/Page';

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
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <Page className={classNames(s.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        )
    }

    return (
        <DynamicModalLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(s.ArticleDetailsPage, {}, [className])}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id} />
                <AddCommentForm onSendComment={onSendComment} />
                <Text title={t('Комментарий')} className={s.commentTitle} />
                <CommentList comments={comments} isLoading={commentsIsLoading} />
            </Page>
        </DynamicModalLoader>
    );
};

export default ArticleDetailsPage
