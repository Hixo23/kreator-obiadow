import { SingleMeal } from "../single-meal/single-meal";
import { type Meal } from "@/shared/types/types";

export const MealList = ({ meals }: { meals: Meal[] }) => {
  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-wrap items-start justify-center gap-4 md:justify-start">
        {meals.map((meal) => (
          <SingleMeal key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
};
