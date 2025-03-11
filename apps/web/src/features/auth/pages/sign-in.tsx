import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/shadcn/form";
import { Input } from "@/shared/components/ui/shadcn/input";
import { Button } from "@/shared/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/shadcn/card";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/use-auth";

const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Twoj email musi zawierac minimum 3 znaki" })
    .email({ message: "Błędy email" }),
  password: z.string(),
  // .regex(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")),
});

export const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    return await login.mutateAsync({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Witaj</CardTitle>
          <CardDescription>
            Musisz być zalogowany, aby móc skorzystać z kreatora obiadów!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 justify-between"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="obiad@kreator.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>
                Nie posiadasz jeszcze konta?{" "}
                <NavLink className="text-indigo-400" to={"/sign-up"}>
                  Zarejestruj się
                </NavLink>
              </p>
              <Button type="submit">Zaloguj</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
