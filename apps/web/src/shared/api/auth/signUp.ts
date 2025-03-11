import { httpClient } from "@/shared/lib/httpClient";
import axios from "axios";

export type SignUpError = {
  message: string;
  field?: string;
};

export const signUp = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await httpClient.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response?.status === 400) {
        const validationErrors = axiosError.response.data;
        throw {
          message: "Dane rejestracji są niepoprawne",
          field: validationErrors?.field,
          details: validationErrors,
        };
      }

      if (axiosError.response?.status === 409) {
        throw {
          message: "Użytkownik o podanym adresie email lub nazwie już istnieje",
          field: axiosError.response.data?.field,
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
      message: "Wystąpił nieoczekiwany błąd przy rejestracji",
    };
  }
};
