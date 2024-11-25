import { getMeal } from "@/features/dashboard/actions/getMeal";
import { Meal as MealComponent } from "@/features/meals/meal";
import { type MealProps } from "@/features/meals/meal";

const MealPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const result = await getMeal({ id: (await params).id });

  if (!result || result?.validationErrors) {
    return <div>Error loading meal</div>;
  }

  const meal = result.data!;

  const mealData: MealProps = {
    name: meal.name,
    description: meal.description,
    image: meal.image,
    preparationTime: meal.preparationTime,
    portions: meal.portions,
    ingredients: meal.ingredients.split(","),
    preparationProcess: meal.preparationProcess,
  };

  return <MealComponent {...mealData} />;
};

export default MealPage;
