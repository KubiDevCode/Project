import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import s from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation()

    const updatePage = () => [
        // eslint-disable-next-line no-restricted-globals
        location.reload(),
    ]
    return (
        <div className={classNames(s.PageError, {}, [className])}>
            <p>{t('PageError')}</p>
            <button type='submit' onClick={updatePage}>{t('ErrorPageUpdate')}</button>
        </div>
    );
};
