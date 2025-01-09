"use server";

import { mealRepository } from "@/server/repositiries/meals";
import { actionClient } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteMeal = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await mealRepository.remove(id);
    revalidatePath("/");
  });
