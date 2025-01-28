import axios from "axios";
import { axiosConfig } from "./config";
import { ROUTES } from "@/commons/constants/routes";
import { ENDPOINT } from "@/commons/constants/endpoint";
import { AccessTokenCookies, RefreshTokenCookies } from "../cookies";

export const api = axios.create(axiosConfig);

type FailedQueueItem = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (token) {
            promise.resolve(token);
        } else {
            promise.reject(error);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error', error)
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await api.post(ENDPOINT.AUTH.REFRESH, {
                    refresh_token: RefreshTokenCookies.get(),
                });

                const newAccessToken = data.data.access_token;
                const newRefreshToken = data.data.refresh_token;

                AccessTokenCookies.set(newAccessToken);
                RefreshTokenCookies.set(newRefreshToken);

                api.defaults.headers.common["Authorization"] =
                    `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                AccessTokenCookies.remove();
                RefreshTokenCookies.remove();
                window.location.href = ROUTES.AUTH.LOGIN.URL;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);
