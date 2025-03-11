import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api/auth/signOut";

export const useSignout = () => {
  const queryClient = useQueryClient();

  const signout = useMutation({
    mutationFn: async () => signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
    },
  });
  return { signout };
};
