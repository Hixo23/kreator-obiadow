import { SideBar } from "@/components/ui/sidebar/sidebar";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return <HydrateClient>
    <div className="w-screen h-screen font-poppins">
      <main className="">
        <SideBar />
      </main>
    </div>
  </HydrateClient>
}
