import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import s from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/items';
import { AppLink, AppLinkTheme } from '../../../../shared/ui/AppLink/AppLink';

interface SidebarItemProps {
    item: SidebarItemType,
    collapsed?: boolean,
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()
    return (
        <div className={classNames(s.SidebarItem, { [s.collapsed]: collapsed }, [])}>
            <AppLink
                theme={AppLinkTheme.SECONDARY}
                to={item.path}
            >
                <item.icon className={s.icon} />
                <span className={s.link}>{t(item.text)}</span>
            </AppLink>
        </div>
    );
})
