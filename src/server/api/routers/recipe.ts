import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { inputFormDataSchema } from "@/utils/schemas";


export const recipeRouter = createTRPCRouter({
  create: protectedProcedure.input(inputFormDataSchema).mutation(async ({ input, ctx }) => {
    if (!input.image) return;
    console.log(input.image)
    const imageData = await ctx.utapi.uploadFiles(input.image);

    if (!imageData?.data?.url) {
      return;
    }

    await ctx.db.insert(recipes).values({
      name: input.name,
      description: input.description,
      ingredients: input.ingredients,
      preparationTime: input.preparationTime,
      portions: input.portions,
      image: imageData.data.url,
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
