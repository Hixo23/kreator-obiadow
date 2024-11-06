"use client";

import { Input } from "@/components/ui/shadcn/input";
import { type Meal } from "@/types/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const MealFilter = ({ meals }: { meals: Meal[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMeals = meals.filter((meal) =>
    meal?.name.toLowerCase().includes(searchTerm) || meal.description?.toLowerCase().includes(searchTerm)
  )
  return (
    <div className="w-full md:h-1/3 flex justify-center flex-col md:px-24 px-4 gap-4 py-24 md:py-0">
      <div className="relative flex justify-center items-center w-full h-12">
        <Search className="absolute right-6 hidden md:block" />
        <Input className="h-16" placeholder="Wyszukaj swoj ulubiony przepis..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {searchTerm != "" && filteredMeals.map((meal) => <Link className="border-2 p-4 rounded-lg border-border" key={meal.id} href={`/meal/${meal.id}`}>{meal.name}</Link>)}
    </div>
  )

}
