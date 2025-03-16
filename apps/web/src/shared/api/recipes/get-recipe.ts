import { httpClient } from "@/shared/lib/httpClient.ts";

export const getRecipe = async (id: string) => {
  return (await httpClient.get(`/recipe/${id}`)) || null;
};
