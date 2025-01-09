"use server";
import { commentRepository } from "@/server/repositiries/comments";
import { actionClient } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteComment = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await commentRepository.remove(id);
    revalidatePath("/meals/");
    return { success: true };
  });
