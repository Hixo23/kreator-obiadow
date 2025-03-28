import { useParams } from "react-router";
import { SingleRecipe } from "../components/single-recipe/single-recipe";
import { CommentsSection } from "@/features/comments/components/comments-section/comments-section";

export const SingleRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  return (
    <>
      <SingleRecipe recipeId={id} />
      <CommentsSection recipeId={id} />
    </>
  );
};
