import { httpClient } from "@/shared/lib/httpClient";

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const response = await httpClient.delete(`/comment/${commentId}`);
  return response?.data ?? ""
};
