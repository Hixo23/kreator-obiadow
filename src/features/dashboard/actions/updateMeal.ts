"use server";

import { mealRepository } from "@/server/repositiries/meals";
import { actionClient } from "@/shared/lib/safe-action,";
import { inputFormDataSchema } from "@/shared/utils/schemas";
import { revalidatePath } from "next/cache";

export const updateMeal = actionClient
  .schema(inputFormDataSchema)
  .action(async ({ parsedInput }) => {
    const formData = new FormData();
    Object.entries(parsedInput).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await mealRepository.update(formData);
    revalidatePath("/");
  });
