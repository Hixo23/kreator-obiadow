"use client";

import { MealList } from "../meallist/meal-list";
import { Profile } from "../profile/profile";
import { signIn, useSession } from 'next-auth/react'

export const SideBar = () => {
  const { data: session } = useSession()
  return (
    <div className="w-64 h-screen border-r-4 border-r-gray-100 flex flex-col items-center py-8 gap-8">
      <h1 className="text-2xl font-poppins font-semibold text-text">Kreator Obiadow</h1>
      {session?.user ? <Profile user={session.user} /> : <button onClick={() => signIn("discord")} className="bg-primary text-sm py-2 px-4 text-white rounded-lg font-semibold hover:drop-shadow-[0_16px_16px_rgba(47,39,206,0.25)] duration-150 ease-in-out">Zaloguj sie</button>}
      <MealList />
    </div>
  )
};
