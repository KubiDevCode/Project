import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text'
import s from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(s.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={s.title} />
            )}
            {block.paragraphs.map((paragraph) => (
                <Text key={paragraph} text={paragraph} className={s.paragraph} />
            ))}
        </div>
    );
});
