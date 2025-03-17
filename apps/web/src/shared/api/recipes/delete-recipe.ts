import { httpClient } from "@/shared/lib/httpClient.ts";

export const deleteRecipe = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/recipe/${id}`);
};
