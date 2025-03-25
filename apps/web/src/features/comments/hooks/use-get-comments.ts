import { getComments } from "@/shared/api/comments/get-comments";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = ({ recipeId }: { recipeId: string }) =>
  useQuery({
    queryKey: [`comments-${recipeId}`],
    queryFn: async () => await getComments({ recipeId }),
  });
