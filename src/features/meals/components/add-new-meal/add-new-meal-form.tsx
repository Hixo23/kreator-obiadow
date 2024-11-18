"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/shadcn/form";
import { Input } from "@/shared/components/ui/shadcn/input";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchema } from "@/shared/utils/schemas";
import { Delete, Trash } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { cn } from "@/shared/lib/utils";
import { addRecipe } from "../../actions/addRecipe";
import { Textarea } from "@/shared/components/ui/shadcn/textarea";
import Image from "next/image";

export const AddNewMealForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      recipe: {
        name: "",
        description: "",
        ingredients: [" "],
        preparationTime: 0,
        portions: 0,
        preparationProcess: "",
      },
      image: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipe.ingredients",
  });

  async function onSubmit(values: z.infer<typeof inputSchema>) {
    const typedImg = values.image as File;
    if (!typedImg) return;
    const formData = new FormData();
    formData.append("image", typedImg);
    formData.append("name", values.recipe.name);
    formData.append("description", values.recipe.description);
    formData.append("ingredients", values.recipe.ingredients.join(", "));
    formData.append("preparationTime", String(values.recipe.preparationTime));
    formData.append("portions", values.recipe.portions.toString());
    formData.append(
      "preparationProcess",
      String(values.recipe.preparationProcess),
    );
    await addRecipe(formData);
    setIsOpen(false);
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("image", acceptedFiles[0]);
    },
    [form],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipe.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa przepisu</FormLabel>
              <FormControl>
                <Input placeholder="Kotlet mielony" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipe.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis przepisu</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipe.preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czas przygotowania (w minutach)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipe.preparationProcess"
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
          name="recipe.portions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ilosc porcji</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`recipe.ingredients.${index}`}
                render={({ field }) => (
                  <FormItem className="relative flex flex-col justify-center">
                    <FormLabel>Skladnik {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <button
                      onClick={() => (index == 0 ? null : remove(index))}
                      className="absolute right-4 pt-3"
                    >
                      <Delete />
                    </button>
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="button" onClick={() => append(" ")}>
            Dodaj skladnik
          </Button>
        </div>
        {form.getValues("image") ? (
          <div className="relative flex h-52 w-96">
            <Button
              onClick={() => form.setValue("image", undefined)}
              className="absolute right-2 top-2"
            >
              <Trash />
            </Button>
            <Image
              src={URL.createObjectURL(form.getValues("image") as File)}
              alt="Zdjęcie przepisu"
              width={400}
              height={200}
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem
                {...getRootProps()}
                className={cn(
                  "group relative grid h-32 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <FormLabel>Zdjęcie</FormLabel>
                <FormControl>
                  <Input key={field.name} {...getInputProps()} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  );
};