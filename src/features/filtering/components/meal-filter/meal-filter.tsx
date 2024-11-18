"use client";

import { Input } from "@/shared/components/ui/shadcn/input";
import { type Meal } from "@/shared/types/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const MealFilter = ({ meals }: { meals: Meal[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMeals = meals.filter(
    (meal) =>
      meal?.name.toLowerCase().includes(searchTerm) ||
      meal.description?.toLowerCase().includes(searchTerm),
  );
  return (
    <div className="flex w-full flex-col justify-center gap-4 px-4 py-24 md:h-1/3 md:px-24 md:py-0">
      <div className="relative flex h-12 w-full items-center justify-center">
        <Search className="absolute right-6 hidden md:block" />
        <Input
          className="h-16"
          placeholder="Wyszukaj swoj ulubiony przepis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm != "" &&
        filteredMeals.map((meal) => (
          <Link
            className="rounded-lg border-2 border-border p-4"
            key={meal.id}
            href={`/meal/${meal.id}`}
          >
            {meal.name}
          </Link>
        ))}
    </div>
  );
};
