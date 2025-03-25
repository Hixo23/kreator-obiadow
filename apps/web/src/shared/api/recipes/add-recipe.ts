import { httpClient } from "@/shared/lib/httpClient";
import { z } from "zod";
import { addRecipeSchema } from "@/shared/lib/schemas.ts";

export const addRecipe = async (values: z.infer<typeof addRecipeSchema>) => {
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
};
