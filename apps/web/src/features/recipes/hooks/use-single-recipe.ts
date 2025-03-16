import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/shared/api/recipes/get-recipe.ts";
import { IRecipe } from "@/shared/types";
import { AxiosResponse } from "axios";

export const useSingleRecipe = (id: string) =>
  useQuery({
    queryKey: ["recipe"],
    queryFn: async (): Promise<AxiosResponse<IRecipe> | null> =>
      await getRecipe(id),
  });
