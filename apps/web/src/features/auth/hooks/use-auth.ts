import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../../shared/api/auth/signIn";
import { signUp } from "../../../shared/api/auth/signUp";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      return navigate("/");
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
      return navigate("/auth/sign-in");
    },
  });

  return { login, register };
};
