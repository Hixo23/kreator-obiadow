import { useParams } from "react-router";
import { SingleRecipe } from "../components/single-recipe/single-recipe";
import { CommentsSection } from "@/features/comments/components/comments-section/comments-section";
import { FavoriteButton } from "@/features/user-favorites/components/favorite-button/favorite-button";
import { useUser } from "@/shared/contexts/userContext";

export const SingleRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useUser();
  if (!id) return null;

  return (
    <>
      <SingleRecipe recipeId={id}>
        <FavoriteButton userId={user?.user?.id} recipeId={id} />
      </SingleRecipe>
      <CommentsSection recipeId={id} />
    </>
  );
};
