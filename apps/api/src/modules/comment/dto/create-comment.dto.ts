import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string(),
  rating: z.number().min(1).max(5),
  authorId: z.string(),
  recipeId: z.string(),
});

export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
