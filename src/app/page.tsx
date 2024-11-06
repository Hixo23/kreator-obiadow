import { MealSidebar } from "@/components/ui/sidebar/sidebar";
import { MealList } from "@/features/meals/components/meal-list/meal-list";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return <HydrateClient>
    <div className="w-screen h-screen font-poppins">
      <main className="dark:text-white">
        <MealSidebar>
          <MealList />
        </MealSidebar>
      </main>
    </div>
  </HydrateClient>
}
