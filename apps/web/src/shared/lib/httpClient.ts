import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const baseClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    switch (axiosError.response?.status) {
      case 401: {
        throw new Error("Nie autoryzowany");
      }
      case 403: {
        throw new Error("Brak dostępu");
      }
      case 404: {
        throw new Error("Zasób nie znaleziony");
      }
      case 500:
      case 502:
      case 503: {
        throw new Error("Błąd serwera");
      }
    }

    if (axiosError.code === "ECONNABORTED" || !axiosError.response) {
      throw new Error("Problem z połączeniem");
    }
  }

  throw new Error("Nieoczekiwany błąd");
};

export const httpClient = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      return await baseClient.get(url, config);
    } catch (error) {
      handleError(error);
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
