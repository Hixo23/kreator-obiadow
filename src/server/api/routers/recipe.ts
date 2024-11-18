import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { inputFormDataSchema } from "@/shared/utils/schemas";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(inputFormDataSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.image) return;
      console.log(input.image);
      const imageData = await ctx.utapi.uploadFiles(input.image);

      if (!imageData?.data?.url) {
        return;
      }
      const recipeData = {
        name: input.name,
        description: input.description,
        ingredients: input.ingredients,
        preparationTime: Number(input.preparationTime),
        portions: Number(input.portions),
        preparationProcess: input.preparationProcess,
        image: imageData.data.url,
      };

      await ctx.db.insert(recipes).values(recipeData);

      return { success: true };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(recipes);
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.select().from(recipes).where(eq(recipes.id, input.id));
    }),
});
