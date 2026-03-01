import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RouthPath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import { useTranslation } from 'react-i18next';
import s from './Sidebar.module.scss';
import { SidebarItemList } from '../../model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

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
                {SidebarItemList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </div>

            <div className={s.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={s.lang} short={collapsed} />
            </div>
        </div>
    );
})
