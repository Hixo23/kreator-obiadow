import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";


const recipeDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.string(),
  preparatoryTime: z.number(),
  portions: z.number(),
});

// Define the schema for the image
const imageSchema = z.object({
  file: z.instanceof(File),
});

// Combine the two into one object
const inputSchema = z.object({
  recipe: recipeDetailsSchema,
  image: imageSchema,
});

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure.input(inputSchema).mutation(async ({ input, ctx }) => {
    const { recipe, image } = input;

    const imageData = await ctx.utapi.uploadFiles(image.file);

    await ctx.db.insert(recipes).values({
      ...recipe,
      image: imageData.data?.url,
    });

    return { success: true };
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(recipes);
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    return ctx.db.select().from(recipes).where(eq(recipes.id, input.id));
  })
})
