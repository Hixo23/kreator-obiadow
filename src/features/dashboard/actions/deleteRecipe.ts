"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export const deleteRecipe = async ({ id }: { id: string }) => {
  await api.recipe.deleteRecipe({ id });
  revalidatePath("/dashboard");
};
