import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef,
} from 'react';
import s from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface inputProps extends HTMLInputProps {
    className?: string;
    value?: string
    onChange?: (value: string) => void
    autofocus?: boolean
}

export const Input = memo((props: inputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props

    const ref = useRef<HTMLInputElement>()

    useEffect(() => {
        if (autofocus) {
            ref.current.focus()
        }
    }, [autofocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(s.Input, {}, [className])}>
            {placeholder && (
                <div className={s.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <input
                className={s.input}
                type={type}
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
});
