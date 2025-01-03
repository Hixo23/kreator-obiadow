"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import { Input } from "@/shared/components/ui/shadcn/input";
import { useState } from "react";
import { addComment } from "../../actions/addComment";


export const AddComment = ({ postId }: { postId: string }) => {
  const [newComment, setNewComment] = useState('');
  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await addComment({ content: newComment, postId: postId });
    setNewComment('');
  }
  return <form onSubmit={onSubmit} className="w-full flex space-x-2 mb-6">
    <Input
      type="text"
      placeholder="Dodaj komentarz"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      className="flex-grow"
    />
    <Button type="button">Dodaj</Button>
  </form>
}


