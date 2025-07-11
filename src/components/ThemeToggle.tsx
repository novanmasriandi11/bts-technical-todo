import { Moon, Sun } from "lucide-react";
import Tooltip from "./Tooltip";
import { useTheme } from "../hooks/useTheme";


interface ThemeToggleProps{
   isCollapsed?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isCollapsed = false }) => {
   const { theme, toggleTheme } = useTheme();
   return (
      <Tooltip content={theme === 'light' ? 'Dark Mode' : 'Light Mode'} position="rigth" disabled={!isCollapsed}>
         <button
            className={`flex items-center p-2 rounded-md transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
               ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}
            aria-label="Toggle Theme"
            onClick={toggleTheme}
         >
            {theme === 'light' ? (
               <>
                  <Moon className="h-5 w-5" />
                  { !isCollapsed && <span>Dark Mode</span>}
               </>
            ) : (
               <>
                  <Sun className="w-5 h-5" />
                  { !isCollapsed && <span>Light Mode</span>}
               </>
            )}
         </button>
      </Tooltip>
   )
}

export default ThemeToggle;