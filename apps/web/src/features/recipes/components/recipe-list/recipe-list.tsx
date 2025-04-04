import { RecipeCard } from "@/features/recipes/components/recipe-card/recipe-card";
import { IRecipe } from "@/shared/types";

export const RecipeList = ({ recipes }: { recipes: IRecipe[] }) => {

  return (
    <ul className="grid md:grid-cols-4 gap-6 py-8">
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </ul>
  );
};
