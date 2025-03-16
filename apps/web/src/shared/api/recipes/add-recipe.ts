import { httpClient } from "@/shared/lib/httpClient";
import { z } from "zod";
import { addRecipeSchema } from "@/shared/lib/schemas.ts";
import axios from "axios";

export type AddRecipeError = {
  message: string;
  field?: string;
  details?: unknown;
};

export const addRecipe = async (values: z.infer<typeof addRecipeSchema>) => {
  try {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("ingredients", values.ingredients);
    formData.append("preparationProcess", values.preparationProcess);
    formData.append("preparationTime", values.preparationTime.toString());
    formData.append("difficulty", values.difficulty);
    formData.append("dietType", values.dietType);
    formData.append("servings", values.servings.toString());

    if (values.image instanceof File) {
      formData.append("file", values.image);
    }
    const response = await httpClient.post("/recipe", formData);
    return response?.data || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        const validationErrors: AddRecipeError = error.response.data;
        throw {
          message: "Nieprawidłowe dane przepisu",
          field: validationErrors?.field,
          details: validationErrors,
        };
      }

      if (error.response?.status === 401) {
        throw {
          message: "Musisz być zalogowany, aby dodać przepis",
        };
      }

      if (error.response?.status === 403) {
        throw {
          message: "Nie masz uprawnień do dodawania przepisów",
        };
      }

      if (error.response && error.response.status >= 500) {
        throw {
          message: "Wystąpił błąd serwera. Spróbuj ponownie później.",
        };
      }

      if (error.code === "ECONNABORTED" || !error.response) {
        throw {
          message:
            "Problem z połączeniem. Sprawdź swoje połączenie internetowe.",
        };
      }
    }

    throw {
      message: "Wystąpił nieoczekiwany błąd podczas dodawania przepisu",
    };
  }
};
