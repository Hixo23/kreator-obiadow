import { addMealFormData } from "@/shared/utils/schemas";
import { db } from "../db";
import { recipes } from "../db/schema";
import { ZodError } from "zod";
import { utapi } from "../uploadthing/uploadthing";
import { eq } from "drizzle-orm";

const insert = async (formData: FormData): Promise<void> => {
  try {
    const parsed = addMealFormData.safeParse(formData);
    if (parsed.success) {
      const imageData = await utapi.uploadFiles(parsed.data.image as File);
      const meal = {
        name: parsed.data.name,
        description: parsed.data.description,
        image: imageData.data?.url ?? "",
        preparationTime: Number(parsed.data.preparationTime),
        portions: Number(parsed.data.portions),
        ingredients: parsed.data.ingredients,
        preparationProcess: parsed.data.preparationProcess,
        category: parsed.data.category,
        subcategory: parsed.data.subcategory.toLowerCase().split(" ").join("-"),
        userId: parsed.data.userId,
      };
      await db.insert(recipes).values(meal);
    } else {
      throw new ZodError(parsed.error.errors);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(err.message);
    }
  }
};

const update = async (formData: FormData): Promise<void> => {
  try {
    const parsed = addMealFormData.safeParse(formData);
    if (parsed.success) {
      const imageData =
        typeof parsed.data.image === "string"
          ? { data: { url: parsed.data.image } }
          : await utapi.uploadFiles(parsed.data.image);
      const meal = {
        name: parsed.data.name,
        description: parsed.data.description,
        image: imageData.data?.url,
        preparationTime: Number(parsed.data.preparationTime),
        portions: Number(parsed.data.portions),
        ingredients: parsed.data.ingredients,
        preparationProcess: parsed.data.preparationProcess,
        category: parsed.data.category,
        subcategory: parsed.data.subcategory.toLowerCase().split(" ").join("-"),
        userId: parsed.data.userId,
        id: parsed.data.id,
      };
      await db.update(recipes).set(meal).where(eq(recipes.id, meal.id!));
    } else {
      throw new ZodError(parsed.error.errors);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(err.message);
    }
  }
};

const findOne = async (id: string) => {
  return await db.query.recipes.findFirst({ where: eq(recipes.id, id) });
};

const findMany = async () => {
  return await db.query.recipes.findMany();
};

const findByUser = async (userId: string) => {
  const userRecipes = await db
    .select()
    .from(recipes)
    .where(eq(recipes.userId, userId));
  return userRecipes;
};

const findByCategory = async (category: string) => {
  return await db.query.recipes.findMany({
    where: eq(recipes.subcategory, category),
  });
};

const remove = async (id: string) => {
  await db.delete(recipes).where(eq(recipes.id, id));
};

export const mealRepository = {
  insert,
  update,
  findOne,
  findMany,
  findByCategory,
  remove,
  findByUser,
};
