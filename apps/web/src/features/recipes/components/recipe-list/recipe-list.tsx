import { useRecipes } from "@/features/recipes/hooks/use-recipes.ts";
import { RecipeCard } from "@/features/recipes/components/recipe-card/recipe-card";

export const RecipeList = () => {
  const { data, isLoading } = useRecipes();

  if (isLoading) return <div>Loading...</div>;
  return (
    <ul className="grid grid-cols-4 gap-6 p-8">
      {data &&
        data.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </ul>
  );
};
