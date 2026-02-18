import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RouthPath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import { useTranslation } from 'react-i18next';
import s from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const { t: tCommon } = useTranslation('translation');
    const { t: tAbout } = useTranslation('about');

    return (
        <div
            data-testid='sidebar'
            className={classNames(s.Sidebar, { [s.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid='button'
                className={classNames(s.collapsedBtn)}
                onClick={onToggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={classNames(s.items)}>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={RouthPath.main}
                >
                    <MainIcon className={s.icon} />
                    <span className={s.link}>{tCommon('Main')}</span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RouthPath.about}
                >
                    <AboutIcon className={s.icon} />
                    <span className={s.link}>{tAbout('AboutPage')}</span>
                </AppLink>
            </div>

            <div className={s.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={s.lang} short={collapsed} />
            </div>
        </div>
    );
};
