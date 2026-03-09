import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EyeIcon from 'shared/assets/icons/eye.svg'
import DateIcon from 'shared/assets/icons/date.svg'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { getArticleData, getArticleError, getArticleIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDeatailsReducer } from '../../model/slice/articleDetailsSlice';
import s from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDeatailsReducer,
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoading)
    const article = useSelector(getArticleData)
    const error = useSelector(getArticleError)
    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent block={block} />
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent block={block} />
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent block={block} />
        default: return null
        }
    }, [])

    let content

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id])

    if (isLoading) {
        content = (
            <>
                <Skeleton className={s.avatar} width={200} height={200} border="50%" />
                <Skeleton className={s.title} width={300} height={32} />
                <Skeleton className={s.skeleton} width={600} height={24} />
                <Skeleton className={s.skeleton} width="100%" height={200} />
                <Skeleton className={s.skeleton} width="100%" height={200} />
            </>
        );
    } else {
        content = (
            <>
                <div className={s.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={s.avatar} />
                </div>
                <Text title={article?.title} text={article?.subtitle} size={TextSize.L} />
                <div className={s.articleInfo}>
                    <Icon Svg={EyeIcon} className={s.icon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={s.articleInfo}>
                    <Icon Svg={DateIcon} className={s.icon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        )
    }

    return (
        <DynamicModalLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(s.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModalLoader>
    );
});
