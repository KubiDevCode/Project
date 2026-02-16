import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import s from './Sidebar.module.scss';
import { Button } from '../../../../shared/ui/Button/Button';
import { t } from 'i18next';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid='sidebar'
            className={classNames(s.Sidebar, { [s.collapsed]: collapsed }, [className])}
        >
            <Button data-testid='button' onClick={onToggle}>{t('toogle')}</Button>
            <div className={s.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={s.lang} />
            </div>
        </div>
    );
};
