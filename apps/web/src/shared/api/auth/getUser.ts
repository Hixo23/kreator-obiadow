import { httpClient } from "@/shared/lib/httpClient";

export const getUser = async () => {
  const response = await httpClient.get("/auth/me");

  return response?.data || null;
};
