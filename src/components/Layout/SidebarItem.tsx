import { Link, useLocation } from "react-router-dom";
import type { SidebarItemProps } from "../../types";

const SidebarItem: React.FC<SidebarItemProps> = ({
   icon: Icon,
   title,
   path,
   extraPaths = [],
   alert = false,
   isCollapsed = false,
}) => {
   const location = useLocation();
   const allPaths = [path, ...extraPaths];
   const isActive = allPaths.some(p => p === location.pathname);

   return (
      <div className="mb-2">
         <Link
            to={path}
            className={`flex items-center py-2 px-3 rounded-md transition-colors 
               ${isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
               } ${isCollapsed ? 'justify-center' : ''}`}
         >
            <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            
            {!isCollapsed && (
               <span className="ml-3 text-sm font-medium">{title}</span>
            )}

            {alert && !isCollapsed && (
               <span className="ml-auto h-2 w-2 rounded-full bg-red-500"/>
            )}
         </Link>
      </div>
   )
}

export default SidebarItem;