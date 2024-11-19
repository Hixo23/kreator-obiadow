"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export const updateRecipe = async (formData: FormData) => {
  await api.recipe.updateRecipe(formData);
  revalidatePath("/");
};
