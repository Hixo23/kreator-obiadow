import { httpClient } from "@/shared/lib/httpClient";
import { isAxiosError } from "axios";

export const getUser = async () => {
  const response = await httpClient.get("/auth/me");

  return response?.data || null;
};
