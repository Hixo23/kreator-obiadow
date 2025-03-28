import { createComment } from "@/shared/api/comments/create-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addComment,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: async ({
      rating,
      content,
      recipeId,
    }: {
      rating: number;
      content: string;
      recipeId: string;
    }) => await createComment({ rating, content, recipeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.refetchQueries({ queryKey: ["comments"] });
    },
  });

  return { addComment, isError, isPending, error };
};
