import { classNames } from 'shared/lib/classNames/classNames';
import s from './PageLoader.module.scss';
import { Loading } from '../../../shared/ui/Loading';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(s.PageLoader, {}, [className])}>
        <Loading />
    </div>
);
