"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/shared/components/ui/shadcn/input";
import { type Meal } from "@/shared/types/types";
import { Search, X } from "lucide-react";
import Link from "next/link";

export const MealFilter = ({ meals }: { meals: Meal[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredMeals = meals.filter(
    (meal) =>
      meal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full flex-col justify-center gap-4 px-4 py-8 md:px-24">
      <div className="relative flex h-12 w-full items-center justify-center">
        <Search className="absolute left-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          className="h-16 pl-12 pr-12 text-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Wyszukaj swój ulubiony przepis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {isFocused && searchTerm !== "" && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-border bg-background shadow-lg">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <Link
                key={meal.id}
                href={`/meal/${meal.id}`}
                className="block px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="font-medium">{meal.name}</div>
                {meal.description && (
                  <div className="text-sm text-muted-foreground">
                    {meal.description.substring(0, 50)}...
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground">
              Nie znaleziono wyników
            </div>
          )}
        </div>
      )}
    </div>
  );
};
