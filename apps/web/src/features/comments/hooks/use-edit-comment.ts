import { editComment } from "@/shared/api/comments/edit-comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async ({ rating, content, commentId }: { rating: number, content: string, commentId: string }) => editComment({ commentId, content, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      })
      queryClient.refetchQueries({
        queryKey: ["comments"],
      })
    }


  })

  return { mutate, isPending, isError, error, isSuccess }
}
