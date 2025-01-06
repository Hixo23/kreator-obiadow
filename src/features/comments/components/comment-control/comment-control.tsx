"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/shadcn/dropdown-menu"
import { deleteComment } from "../../actions/delete-comment"
import { Dispatch, SetStateAction, useState } from "react";
import { MappedComment } from "../comments-list/comments-list";

export const CommentControls = ({ children, comment, setIsEditing }: { children: React.ReactNode, comment: MappedComment, setIsEditing: Dispatch<SetStateAction<boolean>> }) => {
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsEditing(true)}>Edytuj</DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await deleteComment({ id: comment.id })}>Usuń</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  </>
}
