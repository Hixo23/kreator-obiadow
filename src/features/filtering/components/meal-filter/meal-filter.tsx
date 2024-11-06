"use client";

import { Input } from "@/components/ui/shadcn/input";
import { type Meal } from "@/types/types";
import Link from "next/link";
import { useState } from "react";

export const MealFilter = ({ meals }: { meals: Meal[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMeals = meals.filter((meal) =>
    meal?.name.toLowerCase().includes(searchTerm) || meal.description?.toLowerCase().includes(searchTerm)
  )
  return (
    <div className="w-full h-1/3 flex justify-center flex-col px-24 gap-4">
      <Input className="h-16" placeholder="Wyszukaj swoj ulubiony przepis..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {searchTerm != "" && filteredMeals.map((meal) => <Link key={meal.id} href={`/meal/${meal.id}`}>{meal.name}</Link>)}
    </div>
  )

}
