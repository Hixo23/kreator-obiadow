"use server"

import { commentRepository } from "@/server/repositiries/comments";
import { actionClient } from "@/shared/lib/safe-action,";
import { addCommentSchema } from "@/shared/utils/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const addComment = actionClient.schema(addCommentSchema).action(async ({ parsedInput: { content, postId } }) => {
  const { userId } = await auth()
  if (!userId) return { success: false }
  await commentRepository.insert({ content, userId, postId });
  revalidatePath('/meal')
  return { success: true }
})
