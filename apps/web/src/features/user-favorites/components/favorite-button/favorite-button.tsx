import { Button } from "@/shared/components/ui/shadcn/button";
import { Heart } from "lucide-react";
import { useRecipeFavoriteStatus } from "../../hooks/use-get-favorite";
import { useToggleFavorite } from "../../hooks/use-toggle-favorite";

export const FavoriteButton = ({
  recipeId,
  userId,
}: {
  recipeId: string;
  userId?: string;
}) => {
  const { data: favoriteId } = useRecipeFavoriteStatus({
    recipeId: recipeId,
    userId,
  });

  const { mutate: toggleFavorite } = useToggleFavorite({
    isFavorite: !!favoriteId,
    userId,
    favoriteId,
    recipeId,
  });
  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  return (
    <Button onClick={handleToggleFavorite} className="px-8 py-2">
      <Heart
        className={`size-8 ${favoriteId ? "text-red-500 fill-red-500" : "text-black fill-black"}`}
      />
    </Button>
  );
};
