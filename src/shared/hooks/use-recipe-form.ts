"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { Meal } from "../types/types";
import { useFieldArray, useForm } from "react-hook-form";
import { addMealSchema } from "../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { addRecipe } from "@/features/meals/actions/add-recipe";
import { useDropzone } from "@uploadthing/react";
import { updateMeal } from "@/features/meal-manager/actions/update-meal";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useRecipeForm = ({
  action,
  meal,
  setIsOpen,
}: {
  action: "create" | "update";
  meal?: Meal;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const router = useRouter()
  const form = useForm<z.infer<typeof addMealSchema>>({
    resolver: zodResolver(addMealSchema),
    defaultValues: {
      recipe: {
        name: meal?.name ?? " ",
        description: meal?.description ?? " ",
        ingredients: meal?.ingredients?.split(", ") ?? [" "],
        preparationTime: meal?.preparationTime ?? 0,
        portions: meal?.preparationTime ?? 0,
        preparationProcess: meal?.preparationProcess ?? "",
        category: meal?.category ?? " ",
        subcategory: meal?.subcategory ?? "",
        userId: meal?.userId,
        difficulty: meal?.difficulty ?? " ",
        dietType: meal?.dietType ?? "",
      },
      image: meal?.image ?? undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipe.ingredients",
  });

  async function onSubmit(values: z.infer<typeof addMealSchema>) {
    const typedImg = values.image as File;
    if (!typedImg) return;
    const formData = new FormData();
    formData.append("image", typedImg);
    formData.append("name", values.recipe.name);
    formData.append("description", values.recipe.description);
    formData.append("ingredients", values.recipe.ingredients.join(", "));
    formData.append("preparationTime", String(values.recipe.preparationTime));
    formData.append("portions", values.recipe.portions.toString());
    formData.append(
      "preparationProcess",
      String(values.recipe.preparationProcess),
    );
    formData.append("category", values.recipe.category);
    formData.append("subcategory", values.recipe.subcategory);
    formData.append("userId", user?.id ?? "");
    formData.append("difficulty", values.recipe.difficulty);
    formData.append("dietType", values.recipe.dietType);
    if (action === "update") formData.append("id", meal?.id ?? "");
    if (action === "create") {
      await addRecipe(formData);
      router.push("/")
    } else {
      await updateMeal(formData);
      setIsOpen?.(false);
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("image", acceptedFiles[0]);
    },
    [form],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": ["jpg", "jpeg", "png"] },
  });

  return {
    form,
    fields,
    getRootProps,
    getInputProps,
    onSubmit,
    append,
    remove,
  };
};
