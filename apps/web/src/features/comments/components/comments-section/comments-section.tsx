import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useGetComments } from "../../hooks/use-get-comments";
import { AddComment } from "../add-comment/add-comment";
import { SingleComment } from "../single-comment/single-comment";

export const CommentsSection = ({ recipeId }: { recipeId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useGetComments({ recipeId });

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>{error.message}</h1>
  return (
    <div className="container w-screen flex flex-col mx-auto  gap-8">
      <AddComment recipeId={recipeId} />
      <ScrollArea>
        {comments?.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </ScrollArea>
    </div>
  );
};
