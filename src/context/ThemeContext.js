import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const root = document.querySelector("#root");
    const [theme, setTheme] = useState("dark");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const changeTheme = () => {
        setIsDarkMode(!isDarkMode);

        if (theme === "light") {
            root.style.backgroundColor = "#161B40";
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
            root.style.backgroundColor = "white";
        }
    };

    return (
        <ThemeContext.Provider value={[theme, isDarkMode, changeTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
