import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Page } from '../../../shared/ui/Page/Page';

const MainPage = () => {
    const { t } = useTranslation()
    return (
        <Page>
            <BugButton />
            {t('MainPage')}
        </Page>
    );
};

export default MainPage;
