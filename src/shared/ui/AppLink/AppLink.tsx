import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import s from './AppLink.module.scss';
import { FC } from 'react';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme
}

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const { className, children, theme = AppLinkTheme.PRIMARY, to, ...otherProps } = props

    return (
        <Link
            to={to}
            className={classNames(s.AppLink, {}, [className, s[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};