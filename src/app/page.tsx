import { MealFilter } from "@/features/filtering/components/meal-filter/meal-filter";
import { MealList } from "@/features/meals/components/meal-list/meal-list";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const meals = await api.recipe.getAll()
  return <HydrateClient>
    <div className="w-screen h-screen font-poppins">
      <main className="dark:text-white">
        <div className="flex flex-col w-full items-center">
          <MealFilter meals={meals} />
          <MealList meals={meals} />
        </div>
      </main>
    </div>
  </HydrateClient>
}
