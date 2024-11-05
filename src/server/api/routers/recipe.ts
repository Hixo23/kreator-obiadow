import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ name: z.string(), description: z.string(), ingredients: z.string(), preparatoryTime: z.number(), portions: z.number() })).mutation(async ({input, ctx}) => {
    await ctx.db.insert(recipes).values(input);

    return { success: true };
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(recipes);
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    return ctx.db.select().from(recipes).where(eq(recipes.id, input.id));
  })
})