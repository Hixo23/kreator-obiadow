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

const commentSchema = z.object({
  content: z.string(),
  rating: z.number(),
});

export const AddComment = () => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  });

  const handleAddComment = form.handleSubmit(
    (values: z.infer<typeof commentSchema>) => {
      console.log(values);
    },
  );

  const handleChangeRating = (value: number) => {
    form.setValue("rating", value)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleAddComment} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Treść komentarza</FormLabel>
              <FormControl>
                <Input placeholder="Ale super przepis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
