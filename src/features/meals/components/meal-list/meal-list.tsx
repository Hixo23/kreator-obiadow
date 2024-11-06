import { api } from "@/trpc/server";
import { SingleMeal } from "../single-meal/single-meal";

export const MealList = async () => {
  const meals = await api.recipe.getAll();
  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4">
        {meals.map((meal) => <SingleMeal key={meal.id} meal={meal} />)}
      </div>

    </section>
  )
};

