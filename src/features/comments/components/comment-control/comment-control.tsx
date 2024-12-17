"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/shadcn/dropdown-menu"
import { deleteComment } from "../../actions/deleteComment"

export const CommentControls = ({ children, commentId }: { children: React.ReactNode, commentId: string }) => {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={async () => await deleteComment({ id: commentId })}>Usuń</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
