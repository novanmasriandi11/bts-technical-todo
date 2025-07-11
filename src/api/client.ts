import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken, logout } from "./auth";

export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   timeout: 15_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   const token = getAccessToken();
   if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

api.interceptors.response.use(
   response => response,
   (error: AxiosError) => {
      if (error.response?.status === 401) {
         logout();
         window.location.replace("/login");
      }
      return Promise.reject(error);
   }
)