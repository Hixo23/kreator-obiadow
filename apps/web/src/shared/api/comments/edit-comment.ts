import { httpClient } from "@/shared/lib/httpClient";

export const editComment = async ({
  rating,
  content,
  commentId,
}: {
  rating: number;
  content: string;
  commentId: string;
}) => {
  const response = await httpClient.patch(`/comment/${commentId}`, {
    rating,
    content,
    commentId,
  });

  return response?.data ?? {};
};
