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

  if (response.status !== 201) throw new Error("Wystąpił błąd przy logowaniu");

  return response.data;
};
