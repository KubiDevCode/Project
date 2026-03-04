import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import s from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/items';
import { AppLink, AppLinkTheme } from '../../../../shared/ui/AppLink/AppLink';
import { getUserAuthData } from '../../../../entities/User/model/selectors/getUserAuthData/getUserAuthData';

interface SidebarItemProps {
    item: SidebarItemType,
    collapsed?: boolean,
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

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
