import { RecipeList } from "@/features/recipes/components/recipe-list/recipe-list.tsx";
import { useRecipes } from "./features/recipes/hooks/use-recipes";

function App() {
  const { data: recipes, isLoading } = useRecipes()
  if (isLoading || !recipes) return <h1>Looading...</h1>
  return <RecipeList recipes={recipes} />;
}

export default App;
