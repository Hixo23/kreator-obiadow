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
import { Delete, Trash } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Textarea } from "@/shared/components/ui/shadcn/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/shadcn/select";
import { mealTypes } from "@/shared/consts/mealTypes";
import { useRecipeForm } from "@/shared/hooks/use-recipe-form";

export const AddNewMealForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    form,
    append,
    fields,
    getInputProps,
    getRootProps,
    onSubmit,
    remove,
  } = useRecipeForm({ action: "create", setIsOpen });

  useEffect(() => {
    return form.setValue("recipe.subcategory", "");
  }, [form.watch("recipe.category")]);
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
        <FormField
          control={form.control}
          name="recipe.category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kategorie posiłku" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mealTypes.map((mealType) => {
                    return (
                      <SelectItem key={mealType.name} value={mealType.name}>
                        {mealType.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("recipe.category") !== "" && (
          <FormField
            control={form.control}
            name="recipe.subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Podkategoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kategorie posiłku" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealTypes
                      .find(
                        (mealType) =>
                          mealType.name === form.getValues("recipe.category"),
                      )
                      ?.subcategories.map((subcategory) => {
                        return (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
