import { httpClient } from "@/shared/lib/httpClient";
import { isAxiosError } from "axios";

export const getUser = async () => {
  try {
    const response = await httpClient.get("/auth/me");

    return response?.data || null;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.status) {
        case 401: {
          return;
        }
      }
    }
  }
};
