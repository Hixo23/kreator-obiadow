import { useNavigate } from "react-router";
import { useSingleRecipe } from "../../hooks/use-single-recipe";
import { RecipeActionMenu } from "../recipe-action-menu/recipe-action-menu";
import { IRecipe, IUser } from "@/shared/types";

export const SingleRecipe = ({
  recipeId,
  children,
  user,
}: {
  recipeId: string;
  children: React.ReactNode;
  user?: IUser | undefined;
}) => {
  const navigate = useNavigate();
  const {
    singleRecipe: { data: recipe, isLoading },
  } = useSingleRecipe(recipeId ?? "");

  if (!recipe || !recipe) navigate("/");

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="container mx-auto  py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">{recipe?.data.name}</h1>
        <div className="flex items-center space-x-2">
          {children}
          {user?.profile.id === recipe?.data.authorId ? (
            <RecipeActionMenu recipe={recipe?.data as unknown as IRecipe} />
          ) : null}
        </div>
      </div>

      <div className="mb-8">
        <img
          src={recipe?.data.imageUrl}
          alt={recipe?.data.name}
          className="lg:w-full lg:h-[400px] h-52 object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Przepisy</h2>

          <ul className="list-disc list-inside space-y-2">
            {recipe?.data.ingredients
              .split(",")
              .map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Proces przygotowania</h2>
          <p className="text-gray-400 leading-relaxed">
            {recipe?.data.preparationProcess}
          </p>
        </div>
      </div>
    </div>
  );
};
