import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/shared/api/recipes/get-recipes.ts";
import { IRecipe } from "@/shared/types";

export const useRecipes = () =>
  useQuery({
    queryFn: async (): Promise<IRecipe[]> => await getRecipes(),
    queryKey: ["recipes"],
  });
