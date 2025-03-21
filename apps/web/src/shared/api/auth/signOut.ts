import { httpClient } from "@/shared/lib/httpClient";

export const signOut = async () => {
  const response = await httpClient.delete("/auth/logout");

  return response?.data || null;
};
