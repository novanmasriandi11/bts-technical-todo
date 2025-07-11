import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
   const { isAuthenticated, logout } = useAuth();
   return (
      <header className="w-full bg-white shadow p-4 flex items-center justify-between">
         <div className="text-xl font-bold">Notes</div>
         {isAuthenticated ? (
            <button
               onClick={logout}
               className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
               Logout
            </button>
         ) : (
            <Link
               to="/login"
               className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
               Login
            </Link>
         )}
      </header>
   )
}