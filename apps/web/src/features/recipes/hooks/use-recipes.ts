import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/shared/api/recipes/get-recipes.ts";
import { IRecipe } from "@/shared/types";
import { getUserRecipes } from "@/shared/api/recipes/get-user-recipes";

export const useRecipes = (userId?: string) =>
  useQuery({
    queryFn: async (): Promise<IRecipe[]> => {
      if (userId) {
        return await getUserRecipes({ userId });
      }
      return await getRecipes();
    },
    queryKey: ["recipes", userId],
  });
