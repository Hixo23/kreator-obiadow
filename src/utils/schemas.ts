import { z } from "zod";

export const inputSchema = z.object({
  recipe: z.object({
    name: z.string(),

    description: z.string(),

    ingredients: z.array(z.string()),

    preparatoryTime: z.number(),

    portions: z.number(),
  }),

  image: z.any().optional(),
});
