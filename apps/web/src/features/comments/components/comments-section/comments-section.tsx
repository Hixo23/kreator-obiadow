import { useGetComments } from "../../hooks/use-get-comments";

export const CommentsSection = ({ recipeId }: { recipeId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useGetComments({ recipeId });
  return <>{JSON.stringify(comments)}</>;
};
