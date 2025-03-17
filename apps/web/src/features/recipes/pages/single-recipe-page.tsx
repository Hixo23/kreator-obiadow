import { useNavigate, useParams } from "react-router";
import { useSingleRecipe } from "@/features/recipes/hooks/use-single-recipe.ts";
import { RecipeActionMenu } from "@/features/recipes/components/recipe-action-menu/recipe-action-menu.tsx";
import { IRecipe } from "@/shared/types";
import { useUser } from "@/shared/contexts/userContext.tsx";

export const SingleRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useUser();
  const {
    singleRecipe: { data: recipe, isLoading },
  } = useSingleRecipe(id ?? "");

  if (!id || !recipe) navigate("/");

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">{recipe?.data.name}</h1>
        {user?.user?.id === recipe?.data.authorId ? (
          <div className="flex items-center space-x-2">
            <RecipeActionMenu recipe={recipe?.data as unknown as IRecipe} />
          </div>
        ) : null}
      </div>

      <div className="mb-8">
        <img
          src={recipe?.data.imageUrl}
          alt={recipe?.data.name}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe?.data.ingredients
              .split(",")
              .map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Preparatory Process</h2>
          <p className="text-gray-400 leading-relaxed">
            {recipe?.data.preparationProcess}
          </p>
        </div>
      </div>
    </div>
  );
};
