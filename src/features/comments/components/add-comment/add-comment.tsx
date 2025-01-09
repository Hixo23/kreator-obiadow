"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import { Input } from "@/shared/components/ui/shadcn/input";
import { useState } from "react";
import { addComment } from "../../actions/add-comment";

export const AddComment = ({ postId }: { postId: string }) => {
  const [newComment, setNewComment] = useState("");
  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await addComment({ content: newComment, postId: postId });
    setNewComment("");
  };
  return (
    <form onSubmit={onSubmit} className="mb-6 flex w-full space-x-2">
      <Input
        type="text"
        placeholder="Dodaj komentarz"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Dodaj</Button>
    </form>
  );
};
