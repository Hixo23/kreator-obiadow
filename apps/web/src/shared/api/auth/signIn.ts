import { httpClient } from "@/shared/lib/httpClient";
import axios from "axios";

export type SignInError = {
  message: string;
  field?: string;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response?.status === 401) {
        throw {
          message: "Niepoprawny email lub hasło",
          field: "password",
        };
      }

      if (axiosError.response?.status === 404) {
        throw {
          message: "Nie znaleziono użytkownika z podanym adresem email",
          field: "email",
        };
      }

      if (axiosError.response?.status === 400) {
        const validationErrors = axiosError.response.data;
        throw {
          message: "Dane logowania są niepoprawne",
          field: validationErrors?.field,
          details: validationErrors,
        };
      }

      if (axiosError.response && axiosError.response.status >= 500) {
        throw {
          message: "Wystąpił błąd serwera. Spróbuj ponownie później.",
        };
      }

      if (axiosError.code === "ECONNABORTED" || !axiosError.response) {
        throw {
          message:
            "Problem z połączeniem. Sprawdź swoje połączenie internetowe.",
        };
      }
    }

    throw {
      message: "Wystąpił nieoczekiwany błąd przy logowaniu",
    };
  }
};
