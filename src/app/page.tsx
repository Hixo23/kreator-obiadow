import { MealSidebar } from "@/components/ui/sidebar/sidebar";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return <HydrateClient>
    <div className="w-screen h-screen font-poppins">
      <main className="dark:bg-sidebar dark:text-white">
        <MealSidebar />
      </main>
    </div>
  </HydrateClient>
}
