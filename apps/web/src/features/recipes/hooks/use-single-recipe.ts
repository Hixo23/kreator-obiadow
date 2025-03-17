import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "@/shared/api/recipes/get-recipe.ts";
import { IRecipe } from "@/shared/types";
import { AxiosResponse } from "axios";
import { editRecipe } from "@/shared/api/recipes/edit-recipe.ts";

export const useSingleRecipe = (id: string) => {
  const queryClient = useQueryClient();
  const singleRecipe = useQuery({
    queryKey: [`recipe-${id}`],
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
    }: IRecipe & { image?: File | null }): Promise<
      AxiosResponse<IRecipe> | undefined
    > =>
      await editRecipe({
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`recipe-${id}`],
      });
      queryClient.refetchQueries({
        queryKey: [`recipe-${id}`],
      });
    },
  });

  const remove = useMutation({
    mutationKey: ["deleteRecipe"],
  });

  return { singleRecipe, edit, remove };
};
