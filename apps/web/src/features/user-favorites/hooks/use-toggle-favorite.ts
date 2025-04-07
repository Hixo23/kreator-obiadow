import { addFavorite } from "@/shared/api/user-favorites/add-favorite";
import { deleteFavorite } from "@/shared/api/user-favorites/delete-favorite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleFavorite = ({
  isFavorite,
  userId,
  favoriteId,
  recipeId,
}: {
  isFavorite: boolean;
  userId?: string;
  favoriteId: string;
  recipeId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      isFavorite
        ? await deleteFavorite({ favoriteId })
        : await addFavorite({ recipeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipeFavoriteStatus", recipeId, userId as string],
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
