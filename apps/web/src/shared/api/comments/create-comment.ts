import { httpClient } from "@/shared/lib/httpClient";

export const createComment = async ({
  rating,
  content,
  recipeId,
}: {
  rating: number;
  content: string;
  recipeId: string;
}) => {
  const response = await httpClient.post("/comment", {
    rating,
    content,
    recipeId,
  });

  return response?.data ?? {};
};
