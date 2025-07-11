import { useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, getAccessToken } from "../api/auth";
import { AuthContext, type AuthContextProps } from "./AuthContext";

interface AuthProivderProps {
   children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProivderProps) {
   const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());

   useEffect(() => {
      const onStorage = () => setIsAuthenticated(!!getAccessToken());
      window.addEventListener("storage", onStorage);
      return () => void window.removeEventListener("storage", onStorage);
   }, []);

   const login = async (payload: { username: string; password: string }) => { 
      await apiLogin(payload);
      setIsAuthenticated(true);
   }

   const logout = () => {
      apiLogout();
      setIsAuthenticated(false);
   };

   const value: AuthContextProps = { isAuthenticated, login, logout };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}