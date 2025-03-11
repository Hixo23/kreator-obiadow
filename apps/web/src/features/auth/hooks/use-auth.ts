import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../../shared/api/auth/signIn";
import { signUp } from "../../../shared/api/auth/signUp";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return signIn({ email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const register = useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      return await signUp({ username, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { login, register };
};
