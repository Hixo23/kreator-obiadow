"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import { Input } from "@/shared/components/ui/shadcn/input";
import { addComment } from "../../actions/add-comment";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentFormSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "Komentarz powinien być dłuższy niz 1 znak" }),
});

export const AddComment = ({ postId }: { postId: string }) => {
  const user = useUser();
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = handleSubmit(async (data: { comment: string }) => {
    await addComment({ content: data.comment, postId: postId });
    return setValue("comment", "");
  });
  return (
    <form onSubmit={onSubmit} className="mb-6 flex w-full space-x-2">
      <Input
        type="text"
        placeholder="Dodaj komentarz"
        disabled={!user.isSignedIn}
        {...register("comment")}
        className="flex-grow"
      />
      <Button disabled={!user.isSignedIn} type="submit">
        Dodaj
      </Button>
    </form>
  );
};
