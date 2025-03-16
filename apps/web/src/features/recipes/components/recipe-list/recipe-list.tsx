import { useRecipes } from "@/features/recipes/hooks/use-recipes.ts";
import { SingleRecipe } from "@/features/recipes/components/single-recipe/single-recipe.tsx";

export const RecipeList = () => {
  const { data, isLoading } = useRecipes();

  if (isLoading) return <div>Loading...</div>;
  return (
    <ul className="grid grid-cols-4 gap-6 p-8">
      {data &&
        data.map((recipe) => <SingleRecipe key={recipe.id} recipe={recipe} />)}
    </ul>
  );
};
