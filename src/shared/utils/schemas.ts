import { z } from "zod";
import { zfd } from "zod-form-data";

export const inputSchema = z.object({
  recipe: z.object({
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    preparationTime: z.coerce.number(),
    portions: z.coerce.number(),
    preparationProcess: z.string(),
    category: z.string(),
    subcategory: z.string(),
    userId: z.string(),
  }),
  image: z.any().optional(),
});
export const inputFormDataSchema = zfd.formData({
  id: zfd.text().optional(),
  name: zfd.text(),
  description: zfd.text(),
  ingredients: zfd.text(),
  preparationTime: zfd.text(),
  portions: zfd.text(),
  image: zfd.file().or(zfd.text()),
  preparationProcess: zfd.text(),
  category: zfd.text(),
  subcategory: zfd.text(),
  userId: zfd.text(),
});

export const inputEditRecipeFormData = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  description: zfd.text(),
  ingredients: zfd.text(),
  preparationTime: zfd.text(),
  portions: zfd.text(),
  image: zfd.file().or(zfd.text()),
  preparationProcess: zfd.text(),
  category: zfd.text(),
  subcategory: zfd.text(),
});
