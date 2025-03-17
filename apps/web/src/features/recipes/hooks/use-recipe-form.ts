import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeSchema } from "@/shared/lib/schemas.ts";
import { addRecipe, AddRecipeError } from "@/shared/api/recipes/add-recipe.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";
import { IRecipe } from "@/shared/types";
import { useSingleRecipe } from "@/features/recipes/hooks/use-single-recipe.ts";

type Difficulty = "easy" | "medium" | "hard";
type DietType = "vegan" | "vegetarian" | "meat";

export const useRecipeForm = ({
  recipe,
  action,
  setIsOpen,
}: {
  recipe?: IRecipe & { image?: File | null };
  action: "create" | "edit";
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState("");
  const { edit } = useSingleRecipe(recipe?.id ?? "");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addRecipeSchema>>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      name: recipe?.name ?? "",
      description: recipe?.description ?? "",
      ingredients: recipe?.ingredients ?? "",
      preparationProcess: recipe?.preparationProcess ?? "",
      preparationTime: recipe?.preparationTime ?? 0,
      servings: recipe?.servings ?? 0,
      difficulty: (recipe?.difficulty as Difficulty) || "easy",
      dietType: (recipe?.dietType as DietType) || "meat",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof addRecipeSchema>) => {
    try {
      if (action === "edit" && recipe!.id) {
        edit.mutate({ id: recipe?.id ?? "", ...values });
        setIsOpen && setIsOpen(false);
      } else if (action === "create") {
        if (values.image === null) {
          setError("Image is required");
          return;
        }
        await addRecipe(values);
        navigate("/");
      }
    } catch (error) {
      const err = error as AddRecipeError;
      setError(err.message);
    }
  };
  return { form, onSubmit, error };
};
