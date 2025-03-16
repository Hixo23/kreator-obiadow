import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeSchema } from "@/shared/lib/schemas.ts";
import { addRecipe, AddRecipeError } from "@/shared/api/recipes/add-recipe.ts";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useRecipeForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addRecipeSchema>>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: "",
      preparationProcess: "",
      preparationTime: 0,
      servings: 0,
      difficulty: "easy",
      dietType: "meat",
      image: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof addRecipeSchema>) => {
    try {
      await addRecipe(values);
      navigate("/");
    } catch (error) {
      const err = error as AddRecipeError;
      setError(err.message);
    }
  };

  return { form, onSubmit, error };
};
