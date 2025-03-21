import { httpClient } from "@/shared/lib/httpClient";


export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await httpClient.post("/auth/login", {
    email,
    password,
  });

  return response?.data || null;

};
