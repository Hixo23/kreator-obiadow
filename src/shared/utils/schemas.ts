import { z } from "zod";
import { zfd } from "zod-form-data";

export const inputSchema = z.object({
  recipe: z.object({
    name: z
      .string()
      .min(4, { message: "Nazwa przepisu musi mieć co najmniej 4 znaki" }),
    description: z
      .string()
      .min(10, { message: "Opis przepisu musi mieć co najmniej 10 znaków" }),
    ingredients: z
      .array(z.string().min(5, { message: "Skladnik nie moze byc pusty!" }))
      .min(1, { message: "Przepis musi zawierać co najmniej jeden składnik" }),
    preparationTime: z.coerce
      .number()
      .min(1, { message: "Czas przygotowania musi być większy od 0" }),
    portions: z.coerce
      .number()
      .min(1, { message: "Porcje muszą być większe od 0" }),
    preparationProcess: z.string().min(10, {
      message: "Proces przygotowania musi miec co najmniej 10 znakow",
    }),
    category: z.string().min(1, { message: "Kategoria nie może być pusta" }),
    subcategory: z
      .string()
      .min(1, { message: "Podkategoria nie może być pusta" }),
    userId: z.string().optional(),
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

export const addCommentSchema = z.object({
  content: z.string(),
  postId: z.string()
})
