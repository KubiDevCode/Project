import s from './ThemeSwitcher.module.scss';
import Light from 'shared/assets/icons/theme-light.svg'
import Dark from 'shared/assets/icons/theme-dark.svg'
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ThemeButton.CLEAR}
      onClick={toggleTheme}
      className={classNames(s.ThemeSwitcher, {}, [className])}
    >
      {theme === Theme.DARK ? (<Dark />) : (<Light />)}
    </Button >
  );
};