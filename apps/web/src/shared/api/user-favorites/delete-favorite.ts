import { httpClient } from "@/shared/lib/httpClient";

export const deleteFavorite = async ({
  favoriteId,
}: {
  favoriteId: string;
}) => {
  const response = await httpClient.delete(`/favorites/${favoriteId}`);
  return response?.data || {};
};
