import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/shadcn/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { commentSchema } from "../add-comment/add-comment"
import { Input } from "@/shared/components/ui/shadcn/input"
import { Button } from "@/shared/components/ui/shadcn/button"
import { StarRating } from "../star-rating/star-rating"
import { useEditComment } from "../../hooks/use-edit-comment"
import { z } from "zod"

export const EditComment = ({ content, rating, commentId, setIsEditing }: { content: string, rating: number, commentId: string, setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content,
      rating
    }
  })

  const { isPending, mutate, error, isError } = useEditComment()

  const handleEditComment = (values: z.infer<typeof commentSchema>) => {
    mutate({ ...values, commentId })

    setIsEditing(false);
  }
  return <Form {...form}>
    <form onSubmit={form.handleSubmit(handleEditComment)} className="w-full space-y-6">
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
              <Input placeholder="Ale super przepis" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isError ? <p>{error?.message}</p> : null}
      <Button disabled={isPending} type="submit">Edytuj komentarz</Button>
    </form>
  </Form>
}
