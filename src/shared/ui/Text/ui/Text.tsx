import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import s from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

interface TextProps {
    className?: string;
    text?: string
    title?: string
    theme?: TextTheme
    align?: TextAlign
}

export const Text = memo(
    (props: TextProps) => {
        const {
            className,
            text,
            title,
            theme = TextTheme.PRIMARY,
            align = TextAlign.LEFT,
        } = props

        return (
            <div className={classNames(s.Text, {}, [className, s[theme], s[align]])}>
                {title && <p className={s.title}>{title}</p>}
                {text && <p className={s.text}>{text}</p>}
            </div>
        );
    },
)
