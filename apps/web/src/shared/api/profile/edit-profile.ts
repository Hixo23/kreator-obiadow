import { httpClient } from "@/shared/lib/httpClient"

export const editProfile = async ({ username, description }: { username: string | undefined, description: string | undefined }) => {
  const response = await httpClient.patch("/profile/", { description, username })

  return response?.data ?? {}
}
