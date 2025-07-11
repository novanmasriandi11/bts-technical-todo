import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import useMediaQuery from "../../hooks/useMediaQuery";
import ThemeToggle from "../ThemeToggle";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
   isOpen: boolean;
   onToggle: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
   const isMobile = useMediaQuery('(max-width: 768px)');

   const toggleSidebar = () => {
      onToggle(!isOpen);
   }

   return (
      <div className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 
         ${isOpen ? 'w-64' : 'w-16'} ${isMobile ? 'fixed z-20' : ''}`}
      >
         <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
            {isOpen && (
               <h1 className="text-xl font-bold tracking-wide text-gray-800 dark:text-white">Notes</h1>
            )}

            <button
               className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
               aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
               onClick={toggleSidebar}
               title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
               {isOpen ? (
                  <ChevronRight className="h-5 w-5" />
               ) : (
                  <ChevronLeft className="h-5 w-5" />
               )}
            </button>
         </div>

         <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
               <SidebarItem
                  icon={ClipboardCheck}
                  title="Notes"
                  path="/notes"
                  isCollapsed={!isOpen}
               />
            </nav>
         </div>

         <div className="mt-auto p-4">
            <ThemeToggle isCollapsed={!isOpen} />
         </div>
      </div>
   )
}

export default Sidebar;