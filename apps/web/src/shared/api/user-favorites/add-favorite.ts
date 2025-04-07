import { httpClient } from "@/shared/lib/httpClient";

export const addFavorite = async ({ recipeId }: { recipeId?: string }) => {
  const response = await httpClient.post("/favorites/", {
    recipeId,
  });
  return response?.data || {};
};
