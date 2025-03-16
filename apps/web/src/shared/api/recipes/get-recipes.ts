import { httpClient } from "@/shared/lib/httpClient.ts";

export const getRecipes = async () => {
  const response = await httpClient.get("/recipe/");
  return response?.data || [];
};
