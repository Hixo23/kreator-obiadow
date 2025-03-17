import { z } from "zod";

export const addRecipeSchema = z.object({
  name: z.string().min(3, { message: "Nazwa musi mieć minimum 3 znaki" }),
  description: z
    .string()
    .min(10, { message: "Opis musi mieć minimum 10 znaków" }),
  ingredients: z
    .string()
    .min(1, { message: "Musisz dodać przynajmniej jeden składnik" }),
  preparationProcess: z
    .string()
    .min(10, { message: "Proces przygotowania musi mieć minimum 10 znaków" }),
  preparationTime: z.coerce
    .number()
    .min(1, { message: "Czas przygotowania musi być większy niż 0" }),
  difficulty: z.enum(["easy", "medium", "hard"]),
  dietType: z.enum(["vegan", "vegetarian", "meat"]),
  servings: z.coerce
    .number()
    .min(1, { message: "Porcje muszą być większe niż 0" }),
  image: z.instanceof(File).nullish(),
});
