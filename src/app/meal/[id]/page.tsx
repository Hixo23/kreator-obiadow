import { Meal as MealComponent } from "@/features/meals/meal";
import { api } from "@/trpc/server";
import { type MealProps } from "@/features/meals/meal";

const MealPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const meal = await api.recipe.getById({ id: (await params).id });

  if (!meal[0]) return;

  const mealData: MealProps = {
    name: meal[0].name,
    description: meal[0].description,
    image: meal[0].image,
    preparationTime: meal[0].preparationTime,
    portions: meal[0].portions,
    ingredients: meal[0].ingredients.split(","),
    preparationProcess: meal[0].preparationProcess,
  };

  return <MealComponent {...mealData} />;
};

export default MealPage;
