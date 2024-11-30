"use server";

import { commentRepository } from "@/server/repositiries/comments";
import { actionClient } from "@/shared/lib/safe-action,";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";


export const getComments = actionClient.schema(z.object({ id: z.string() })).action(async ({ parsedInput: { id } }) => {
  const client = await clerkClient();
  const comments = await commentRepository.findMany(id);
  const users = await client.users.getUserList();
  if (!comments || !users) return "Comments not found"

  return comments.map((comment) => {
    const user = users.data.find((user) => user.id === comment.userId)
    if (!user) return;
    return {
      ...comment,
      author: { username: user.username, avatar: user.imageUrl }
    }
  }).reverse()
})
