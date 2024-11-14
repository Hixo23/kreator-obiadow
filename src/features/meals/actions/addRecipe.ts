"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export const addRecipe = async (formData: FormData): Promise<void> => {
  await api.recipe.create(formData);
  revalidatePath("/");
};
