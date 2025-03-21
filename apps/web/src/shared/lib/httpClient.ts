import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ApiError } from "./api-error";

export const baseClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.code === "ECONNABORTED" || !axiosError.response) {
      throw new Error("Problem z połączeniem");
    }

    throw new ApiError({
      statusCode: axiosError.status ?? 500,
      message: axiosError.response.data.message
    })
  }
};

export const httpClient = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.get(url, config);
    } catch (error) {
      handleError(error);
      return null
    }
  },

  post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.post(url, data, config);
    } catch (error) {
      handleError(error);
    }
  },

  put: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.put(url, data, config);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.delete(url, config);
    } catch (error) {
      handleError(error);
    }
  },

  patch: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.patch(url, data, config);
    } catch (error) {
      handleError(error);
    }
  },
};
