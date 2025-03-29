import { httpClient } from "@/shared/lib/httpClient"

export const getUserRecipes = async ({ userId }: { userId: string }) => {
  const response = await httpClient.get(`/recipe/user/${userId}`)

  return response?.data ?? [];
}
