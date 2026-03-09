import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import CopyIcon from 'shared/assets/icons/copy.svg';
import s from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(s.Code, {}, [className])}>
            <Button onClick={onCopy} className={s.copyBtn} theme={ButtonTheme.CLEAR}>
                <CopyIcon className={s.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
