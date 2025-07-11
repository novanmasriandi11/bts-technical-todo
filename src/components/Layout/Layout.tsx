import { useEffect, useState } from "react";
import type { LayoutProps } from "../../types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Sidebar from "./Sidebar";

const Layout: React.FC<LayoutProps> = ({ children }) => {
   const isMobile = useMediaQuery('(max-width: 768px)');
   const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

   useEffect(() => {
      setSidebarOpen(!isMobile);
   }, [isMobile]);

   const handleSidebarToggle = (isOpen: boolean) => {
      setSidebarOpen(isOpen);
   };

   return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
         <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
         
         {isMobile && sidebarOpen && (
            <div
               className="fixed bg-black bg-opacity-50"
               onClick={()=> setSidebarOpen(false)}
            />
         )}

         <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isMobile && sidebarOpen ? 'opacity-30 pointer-events-none' :''
         } ${isMobile ? 'pl-16' :''}`}>{ children }</main>
      </div>
   )
}

export default Layout;