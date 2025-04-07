import { httpClient } from "@/shared/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useRecipeFavoriteStatus = ({
  recipeId,
  userId,
}: {
  recipeId: string;
  userId?: string;
}) => {
  return useQuery({
    queryKey: ["recipeFavoriteStatus", recipeId, userId],
    queryFn: async () => {
      if (!userId) {
        return false;
      }
      const response = await httpClient.get(`favorites/${recipeId}`);

      return response?.data ? response.data.id : false;
    },
    enabled: !!userId && !!recipeId,
  });
};
