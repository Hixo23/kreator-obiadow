import { editProfile } from "@/shared/api/profile/edit-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, description }: { username?: string, description?: string }) => await editProfile({ username, description }),
    mutationKey: ["edit-profile"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"] });
      return true;
    }
  })
}
