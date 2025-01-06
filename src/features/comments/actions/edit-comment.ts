"use server";

import { commentRepository } from "@/server/repositiries/comments";
import { actionClient } from "@/shared/lib/safe-action,";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const editComment = actionClient.schema(z.object({ id: z.string(), updatedComment: z.string().min(1) })).action(async ({ parsedInput: { id, updatedComment } }) => {
  await commentRepository.update(id, updatedComment)
  return revalidatePath('/meal/')
})
