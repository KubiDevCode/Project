import { Theme } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";
import { FC, useMemo, useState } from "react";

const defaultTheme = localStorage.getItem('theme') as Theme || Theme.LIGHT

export const ThemeProvider: FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}