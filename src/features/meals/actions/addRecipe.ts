'use server';

import { api } from '@/trpc/server'

export const addRecipe = async (formData: FormData): Promise<void> => {
  await api.recipe.create(formData)
}
