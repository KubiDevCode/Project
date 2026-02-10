import { classNames } from 'shared/lib/classNames/classNames'
import s from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { ThemeSwitcher } from '../../ThemeSwitcher'

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
    console.log(s);
    return (
        <div className={classNames(s.Navbar, {}, [className])}>
            <ThemeSwitcher />
            <div className={s.links}>
                <AppLink theme={AppLinkTheme.PRIMARY} to={'/'} className={s.mainLink}>Главная</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>О сайте</AppLink>
            </div>
        </div>
    )
}