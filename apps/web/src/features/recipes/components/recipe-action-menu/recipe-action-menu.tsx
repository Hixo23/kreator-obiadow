import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/shadcn/dropdown-menu.tsx";
import { Button } from "@/shared/components/ui/shadcn/button.tsx";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/shadcn/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/shadcn/form.tsx";
import { Input } from "@/shared/components/ui/shadcn/input.tsx";
import { Textarea } from "@/shared/components/ui/shadcn/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/shadcn/select.tsx";
import Dropzone from "shadcn-dropzone";
import { useRecipeForm } from "@/features/recipes/hooks/use-recipe-form.ts";
import { IRecipe } from "@/shared/types";

import { useSingleRecipe } from "@/features/recipes/hooks/use-single-recipe.ts";
import { useState } from "react";

export const RecipeActionMenu = ({ recipe }: { recipe: IRecipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { form, onSubmit, error } = useRecipeForm({
    action: "edit",
    recipe,
    setIsOpen,
  });
  const { remove } = useSingleRecipe(recipe.id);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal />
            <span className="sr-only">Otworz menu akcji dla przepisu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem>Edytuj przepis</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => remove.mutate(recipe.id)}>
            Usun przepis
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj przepis</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col p-4 gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 grid-rows-4 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa przepisu</FormLabel>
                    <FormControl>
                      <Input placeholder="frytki" {...field} />
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preparationProcess"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proces przygotowania</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preparationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Czas przygotowania</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ilość porcji</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Składniki</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Składniki (oddziel przecinkiem)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poziom trudności</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz poziom trudności" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        className="w-[var(--radix-select-trigger-width)]"
                      >
                        <SelectItem value="easy">Łatwy</SelectItem>
                        <SelectItem value="medium">Średni</SelectItem>
                        <SelectItem value="hard">Trudny</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ diety</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ diety" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        className="w-[var(--radix-select-trigger-width)]"
                      >
                        <SelectItem value="vegan">Wegańska</SelectItem>
                        <SelectItem value="vegetarian">
                          Wegetariańska
                        </SelectItem>
                        <SelectItem value="meat">Mięsna</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Zdjęcie</FormLabel>
                    <FormControl>
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          const file = acceptedFiles[0];
                          form.setValue("image", file);
                        }}
                        accept={{
                          "image/*": [".png", ".jpeg", ".jpg"],
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className="border-2 border-dashed border-gray-300 size-full p-6 flex items-center justify-center rounded-md cursor-pointer hover:border-blue-400 transition-colors"
                          >
                            <input {...getInputProps()} />
                            {recipe.imageUrl || form.getValues("image") ? (
                              <div className="text-center">
                                <img
                                  src={
                                    recipe.imageUrl && !form.getValues("image")
                                      ? recipe.imageUrl
                                      : URL.createObjectURL(
                                          form.getValues("image")!,
                                        )
                                  }
                                  alt=""
                                />
                              </div>
                            ) : (
                              <p className="text-center">
                                Przeciągnij zdjęcie tutaj lub kliknij, aby
                                wybrać
                              </p>
                            )}
                          </div>
                        )}
                      </Dropzone>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button className="z-20 cursor-pointer" type="submit">
              Edytuj przepis
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
