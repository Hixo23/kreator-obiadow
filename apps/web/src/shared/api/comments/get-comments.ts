import { httpClient } from "@/shared/lib/httpClient";

export const getComments = async ({ recipeId }: { recipeId: string }) => {
  const response = await httpClient.get(`/comment/${recipeId}`);
  return response?.data ?? [];
};
