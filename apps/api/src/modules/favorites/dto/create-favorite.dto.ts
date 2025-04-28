import { z } from 'zod';

export const CreateFavoriteSchema = z.object({
  userId: z.string(),
  recipeId: z.string(),
});

export type CreateFavoriteDto = z.infer<typeof CreateFavoriteSchema>;
