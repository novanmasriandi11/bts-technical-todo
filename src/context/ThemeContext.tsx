import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeContextType, ThemeType } from "../types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps{
   children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType>(() => {
      const savedTheme = localStorage.getItem('theme');

      if (!savedTheme) {
         return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
      }
      return (savedTheme as ThemeType) || 'light';
   });

   const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   }

   useEffect(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
   }, [theme])

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}

export { ThemeContext };