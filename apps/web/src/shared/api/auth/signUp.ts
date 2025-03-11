import { httpClient } from "@/shared/lib/httpClient";

export const signUp = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await httpClient.post("/auth/register", {
    username,
    email,
    password,
  });
  if (response.status !== 201)
    throw new Error("Wystąpił błąd przy rejestracji");

  return response.data;
};
