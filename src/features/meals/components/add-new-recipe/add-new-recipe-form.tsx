"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchema } from "@/utils/schemas";
import { Delete } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export const AddNewRecipeForm = () => {
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      recipe: {
        name: "",
        description: "",
        ingredients: [" "],
        preparatoryTime: 0,
        portions: 0,
      },
      image: undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipe.ingredients",
  });

  function onSubmit(values: z.infer<typeof inputSchema>) {
    console.log(values);
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
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
          name="recipe.preparatoryTime"
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
          <Button onClick={() => append("")}>Dodaj skladnik</Button>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem
              {...getRootProps()}
              className={cn(
                "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
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
        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  );
};
