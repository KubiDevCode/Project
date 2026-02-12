import { classNames } from 'shared/lib/classNames/classNames';
import './Loading.scss';

interface LoadingProps {
    className?: string;
}

export const Loading = ({ className }: LoadingProps) => (
    <div className={classNames('loader-spinner', {}, [className])} />
)
