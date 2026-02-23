import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
import s from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        theme,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [s.square]: square,
        [s.disabled]: disabled,
    }

    return (
        <button
            type='button'
            className={classNames(s.Button, mods, [className, s[theme], s[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
