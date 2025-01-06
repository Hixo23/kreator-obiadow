import { mealRepository } from "@/server/repositiries/meals";
import { actionClient } from "@/shared/lib/safe-action,";
import { z } from "zod";

export const getMeal = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const meal = await mealRepository.findOne(id);

    return meal;
  });
