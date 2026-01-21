import axios, { type AxiosError, type AxiosResponse } from "axios";
import { REYA_API_BASE_URL } from "@/constants/api";
import type { ApiError } from "@/types/reya-api";

export const reyaApi = axios.create({
  baseURL: REYA_API_BASE_URL,
});

reyaApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ApiError>): Promise<never> => {
    const message = error.response?.data?.message ?? "Failed to fetch data. Please try again later.";
    return Promise.reject(new Error(message));
  },
);
