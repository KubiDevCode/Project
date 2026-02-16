import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { t } from 'i18next'
import s from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(s.Navbar, {}, [className])}>
        <div className={s.links}>
            <AppLink theme={AppLinkTheme.PRIMARY} to="/" className={s.mainLink}>
                {t('Main')}
            </AppLink>
            <AppLink theme={AppLinkTheme.SECONDARY} to="/about">{t('AboutPage')}</AppLink>
        </div>
    </div>
)
