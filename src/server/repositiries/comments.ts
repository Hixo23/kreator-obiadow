import { eq } from "drizzle-orm"
import { db } from "../db"
import { comments } from "../db/schema"
import { addCommentSchema } from "@/shared/utils/schemas"

export interface Comment {
  content: string,
  postId: string,
  userId: string
}

const insert = async (comment: Comment): Promise<void> => {
  try {
    const results = addCommentSchema.safeParse(comment);
    if (!results.success) return console.error(results.error.errors)
    await db.insert(comments).values(comment)
  }
  catch (err) {
    console.error(err)
  }
}

const findOne = async (id: string) => {
  try {
    const comment = await db.query.comments.findFirst({ where: eq(comments.id, id) })
    return comment
  }
  catch (err) {
    console.error(err)
  }
}

const findMany = async (postId: string) => {
  try {
    const postComments = await db.query.comments.findMany({ where: eq(comments.postId, postId) })
    return postComments
  }
  catch (err) {
    console.error(err)
  }
}

const remove = async (id: string) => {
  try {
    await db.delete(comments).where(eq(comments.id, id))
  }
  catch (err) {
    console.error(err)
  }
}

const update = async (id: string, updatedContent: string) => {
  try {
    await db.update(comments).set({ content: updatedContent }).where(eq(comments.id, id))
  } catch (err) {
    console.error(err)
  }
}

export const commentRepository = {
  insert,
  findOne,
  findMany,
  remove,
  update
}
