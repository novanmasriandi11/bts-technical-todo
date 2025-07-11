import { createContext } from "react";

export interface AuthContextProps { 
   isAuthenticated: boolean;
   login: (payload: { username: string; password: string }) => Promise<void>;
   logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);