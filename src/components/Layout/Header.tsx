import { Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
   const location = useLocation();

   const navItems = [
      {title: 'Home', path: '/home'},
      {title: 'About', path: '/about'},
   ]

   return (
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                     <h1 className="text-xl font-bold text-gray-900 dark:text-white"><Compass/></h1>
                  </div>
                  <nav className="ml-6 flex space-x-8">
                     {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                           <Link
                              key={index}
                              to={item.path}
                              className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-900 dark:text-white focus:outline-none
                                 ${isActive
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'
                                 }`}
                           >
                              {item.title}
                           </Link>
                        )
                     })}
                  </nav>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header;