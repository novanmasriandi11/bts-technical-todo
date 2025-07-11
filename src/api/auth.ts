import { api } from "./client";

export interface AuthCredentials {
   username: string;
   password: string;
}

export type LoginPayload    = AuthCredentials;
export type RegisterPayload = AuthCredentials & { email: string };
export interface AuthReponse<T> {
   statusCode: number;
   message: string;
   errorMessage: string | null;
   data: T;
}

export type LoginResponse    = AuthReponse<{ token: string }>;
export type RegisterResponse = AuthReponse<null>;

const ACCESS_KEY = "access_token";

export async function login(payload: LoginPayload): Promise<void> { 
   const response = await api.post<LoginResponse>("/login", payload, {
      validateStatus: () => true,
   });

   if (response.status === 200 || response.status === 201) {
      if (response.data.errorMessage) {
         throw new Error(response.data.errorMessage);
      }
      const token = response.data.data.token;
      if(!token) {
         throw new Error(response.data.errorMessage ?? "Login failed: No token received");
      }
      localStorage.setItem("access_token", token);
      return
   }

   switch (response.status) { 
      case 401:
         throw new Error("Invalid username or password");
      case 403:
         throw new Error("Access denied");
      case 404:
         throw new Error("User not found");
      default:
         throw new Error(response.data.errorMessage ?? "Login failed: Unknown error");
   }
}

export async function register(payload: RegisterPayload): Promise<void> { 
   const response = await api.post<RegisterResponse>("/register", payload, {
      validateStatus: () => true,
   });

   if(response.status === 200 || response.status === 201) {
      if (response.data.errorMessage) {
         throw new Error(response.data.errorMessage);
      }
      return;
   }
}

export function getAccessToken(): string | null {
   return localStorage.getItem(ACCESS_KEY);
}

export function logout(): void {
   localStorage.removeItem(ACCESS_KEY);
}