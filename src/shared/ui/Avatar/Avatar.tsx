import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import s from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src: string | undefined
    size: number
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt,
    } = props

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size])

    return (
        <img
            className={classNames(s.Avatar, {}, [className])}
            src={src}
            style={styles}
            alt={alt}
        />
    );
};
