import { httpClient } from "@/shared/lib/httpClient";
import { IComment } from "@/shared/types";

export const getComments = async ({
  recipeId,
}: {
  recipeId: string;
}): Promise<IComment[]> => {
  const response = await httpClient.get(`/comment/${recipeId}`);
  return response?.data ?? [];
};
