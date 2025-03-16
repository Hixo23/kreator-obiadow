import { httpClient } from "@/shared/lib/httpClient";

export const signOut = async () => {
  const response = await httpClient.delete("/auth/logout");

  if (response?.status !== 200)
    throw new Error("Wystąpił błąd przy wylogowywaniu");
  return response?.data || null;
};
