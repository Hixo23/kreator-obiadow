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
  }),
  image: z.any().optional(),
});
export const inputFormDataSchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  ingredients: zfd.text(),
  preparationTime: zfd.text(),
  portions: zfd.text(),
  image: zfd.file(),
  preparationProcess: zfd.text(),
});
