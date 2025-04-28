import { z } from 'zod';

export const CreateRecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  preparationProcess: z.string(),
  ingredients: z.string(),
  dietType: z.string(),
  difficulty: z.string(),
  authorId: z.string(),
  preparationTime: z.number(),
  servings: z.number(),
});

export type CreateRecipeDto = z.infer<typeof CreateRecipeSchema>;
