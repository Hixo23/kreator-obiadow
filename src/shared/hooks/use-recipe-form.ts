"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { Meal } from "../types/types";
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { inputSchema } from "../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { addRecipe } from "@/features/meals/actions/addRecipe";
import { useDropzone } from "@uploadthing/react";
import { updateRecipe } from "@/features/dashboard/actions/updateRecipe";

export const useRecipeForm = ({
  action,
  meal,
  setIsOpen,
}: {
  action: "create" | "update";
  meal?: Meal;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data } = useSession();
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
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
      },
      image: meal?.image ?? undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipe.ingredients",
  });

  async function onSubmit(values: z.infer<typeof inputSchema>) {
    const typedImg = values.image as File;
    console.log("fajnie");
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
    formData.append("userId", data?.user.id ?? "");
    if (action === "update") formData.append("id", meal?.id ?? "");
    if (action === "create") {
      await addRecipe(formData);
    } else {
      await updateRecipe(formData);
    }
    setIsOpen(false);
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("image", acceptedFiles[0]);
    },
    [form],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
