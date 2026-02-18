import { classNames } from 'shared/lib/classNames/classNames'
import s from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(s.Navbar, {}, [className])}>
        <div className={s.links} />
    </div>
)
