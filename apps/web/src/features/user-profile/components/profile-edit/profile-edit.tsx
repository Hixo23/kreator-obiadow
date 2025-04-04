import { Button } from "@/shared/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/shadcn/form";
import { Input } from "@/shared/components/ui/shadcn/input";
import { Textarea } from "@/shared/components/ui/shadcn/textarea";
import { IProfile } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditProfile } from "../../hooks/use-edit-profile";
import { ProfileEditForm } from "./profile-edit-form";

export const editProfileSchema = z.object({
  username: z.string().min(4, {
    message: "Twoja nazwa użytkownika nie moze być krótsza niz 4 znaki ",
  }),
  description: z
    .string()
    .min(5, { message: "Twój opis nie może być krótszy niz 5 znaków" })
    .optional(),
});

export const ProfileEdit = ({
  children,
  profile,
  setIsOpen,
  isOpen,
}: {
  children: React.ReactNode;
  profile: IProfile;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      description: profile.description,
      username: profile.username,
    },
  });

  const { mutate, isError, isPending } = useEditProfile();

  const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
    mutate(values);
    if (!isError) setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj profil</DialogTitle>
        </DialogHeader>
        <ProfileEditForm
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
