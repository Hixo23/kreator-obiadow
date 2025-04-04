import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/shadcn/form";
import { editProfileSchema } from "./profile-edit";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/shared/components/ui/shadcn/input";
import { Textarea } from "@/shared/components/ui/shadcn/textarea";
import { Button } from "@/shared/components/ui/shadcn/button";

export const ProfileEditForm = ({
  form,
  isPending,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof editProfileSchema>>>;
  isPending: boolean;
  onSubmit: SubmitHandler<z.infer<typeof editProfileSchema>>;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input placeholder="elorzelo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea placeholder="Zaawansowany kucharz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Zapisz
        </Button>
      </form>
    </Form>
  );
};
