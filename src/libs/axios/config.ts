import { AxiosRequestConfig } from "axios";
import { AccessTokenCookies } from "../cookies";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AccessTokenCookies.get()}`,
  },
};
