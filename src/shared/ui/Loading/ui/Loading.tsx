import { classNames } from 'shared/lib/classNames/classNames';
import './Loading.scss';
import { memo } from 'react';

interface LoadingProps {
    className?: string;
}

export const Loading = memo(
    ({ className }: LoadingProps) => (
        <div className={classNames('loader-spinner', {}, [className])} />
    ),
)
