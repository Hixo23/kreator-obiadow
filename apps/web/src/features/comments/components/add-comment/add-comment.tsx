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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StarRating } from "../star-rating/star-rating";
import { useAddComment } from "../../hooks/use-add-comment";

export const commentSchema = z.object({
  content: z.string(),
  rating: z.number(),
});

export const AddComment = ({ recipeId }: { recipeId: string }) => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  });

  const { addComment, isPending, isError, error } = useAddComment()

  const handleAddComment = form.handleSubmit(
    async (values: z.infer<typeof commentSchema>) => {
      addComment({ ...values, recipeId })
      form.setValue("content", "");
      form.setValue("rating", 1);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleAddComment} className="md:w-full space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocena przepisu</FormLabel>
              <FormControl>
                <StarRating
                  selectedRating={field.value}
                  onRatingChange={(rating) => field.onChange(rating)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Treść komentarza</FormLabel>
              <FormControl>
                <Input className="md:w-full w-2/3" placeholder="Ale super przepis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError ? <p>{error?.message}</p> : null}
        <Button disabled={isPending} type="submit">Dodaj komentarz</Button>
      </form>
    </Form>
  );
};
