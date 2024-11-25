import { MealFilter } from "@/features/filtering/components/meal-filter/meal-filter";
import { MealList } from "@/features/meals/components/meal-list/meal-list";
import { mealRepository } from "@/server/repositiries/meals";

export default async function Home() {
  const meals = await mealRepository.findMany();
  return (
    <div className="h-screen w-screen font-poppins">
      <main className="flex h-full w-full dark:text-white">
        <div className="flex w-full flex-col items-center">
          <MealFilter meals={meals} />
          <MealList meals={meals} />
        </div>
      </main>
    </div>
  );
}
