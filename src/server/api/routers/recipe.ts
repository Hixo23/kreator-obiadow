import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import {
  inputEditRecipeFormData,
  inputFormDataSchema,
} from "@/shared/utils/schemas";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(inputFormDataSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.image) return;
      console.log(input.image);
      const imageData = await ctx.utapi.uploadFiles(input.image as File);

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
        category: input.category,
        subcategory: input.subcategory.toLowerCase().replace(" ", "-"),
        userId: input.userId,
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

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db
        .select()
        .from(recipes)
        .where(eq(recipes.subcategory, input.category));
    }),
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(recipes)
      .where(eq(recipes.userId, ctx.session.user.id));
  }),

  deleteRecipe: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const recipe = await ctx.db
        .select()
        .from(recipes)
        .where(eq(recipes.id, input.id));
      if (recipe[0]?.userId !== ctx.session.user.id)
        return {
          error: recipe[0]?.userId == ctx.session.user.id,
        };
      await ctx.db.delete(recipes).where(eq(recipes.id, input.id));
      return { success: true };
    }),
  updateRecipe: protectedProcedure
    .input(inputEditRecipeFormData)
    .mutation(async ({ input, ctx }) => {
      console.log("elorzelo skibidi sigma");
      console.log(input);
      if (!input.id) return;
      let imageData;
      if (typeof input.image === "string") {
        imageData = { data: { url: input.image } };
      } else {
        imageData = await ctx.utapi.uploadFiles(input.image);
      }

      const recipeData = {
        name: input.name,
        description: input.description,
        ingredients: input.ingredients,
        preparationTime: Number(input.preparationTime),
        portions: Number(input.portions),
        preparationProcess: input.preparationProcess,
        image: imageData.data?.url,
        category: input.category,
        subcategory: input.subcategory.toLowerCase().replace(" ", "-"),
      };

      console.log("fajnie");
      await ctx.db
        .update(recipes)
        .set(recipeData)
        .where(eq(recipes.id, input.id));
      console.log("udalo sie");

      return { success: true };
    }),
});
