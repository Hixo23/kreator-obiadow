import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeSchema } from "@/shared/lib/schemas.ts";
import { addRecipe, AddRecipeError } from "@/shared/api/recipes/add-recipe.ts";
import { useState } from "react";
import { useNavigate } from "react-router";
import { editRecipe } from "@/shared/api/recipes/edit-recipe.ts";
import { IRecipe } from "@/shared/types";

type Difficulty = "easy" | "medium" | "hard";
type DietType = "vegan" | "vegetarian" | "meat";

export const useRecipeForm = ({
  recipe,
  action,
}: {
  recipe?: IRecipe & { image?: File };
  action: "create" | "edit";
}) => {
  const [error, setError] = useState("");
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
        console.log("Edit values ", values);
        await editRecipe({ id: recipe?.id ?? "", ...values });
      } else if (action === "create") {
        if (values.image === null) {
          setError("Image is required");
          return;
        }
        await addRecipe(values);
      }
      navigate("/");
    } catch (error) {
      const err = error as AddRecipeError;
      setError(err.message);
    }
  };
  return { form, onSubmit, error };
};
