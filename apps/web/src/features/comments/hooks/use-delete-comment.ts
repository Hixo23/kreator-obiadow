import { deleteComment } from "@/shared/api/comments/delete-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => await deleteComment({ commentId }), onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      })
      queryClient.refetchQueries({
        queryKey: ["comments"],
      })
    }
  })
} 
