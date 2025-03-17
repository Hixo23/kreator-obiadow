import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/shared/api/recipes/get-recipe.ts";
import { IRecipe } from "@/shared/types";
import { AxiosResponse } from "axios";
import { editRecipe } from "@/shared/api/recipes/edit-recipe.ts";

export const useSingleRecipe = (id: string) => {
  const singleRecipe = () =>
    useQuery({
      queryKey: ["recipe"],
      queryFn: async (): Promise<AxiosResponse<IRecipe> | null> =>
        await getRecipe(id),
    });

  const edit = useMutation({
    mutationKey: ["editRecipe"],
    mutationFn: async ({
      id,
      name,
      description,
      preparationProcess,
      ingredients,
      dietType,
      difficulty,
      preparationTime,
      servings,
      image,
    }: IRecipe & { image?: File }): Promise<
      AxiosResponse<IRecipe> | undefined
    > =>
      editRecipe({
        id,
        name,
        description,
        preparationTime,
        preparationProcess,
        ingredients,
        dietType,
        difficulty,
        servings,
        image,
      }),
  });

  return { singleRecipe, edit };
};
