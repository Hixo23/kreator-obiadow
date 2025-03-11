import { httpClient } from "@/shared/lib/httpClient";

export const getUser = async () => {
  const response = await httpClient.get("/auth/me");

  if (response.status !== 200)
    throw new Error("Wystąpił błąd przy pobieraniu użytkownika");

  return response.data;
};
