import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { inputSchema } from "@/utils/schemas";


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
