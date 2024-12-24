"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { type MappedComment } from "../comments-list/comments-list"
import { CommentControls } from "../comment-control/comment-control"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Ellipsis } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { EditComment } from "../edit-comment/edit-comment"

export const SingleComment = ({ comment }: { comment: MappedComment }) => {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false);
  return <div className="flex relative items-start w-full space-x-4 mb-4">
    <Avatar>
      <AvatarImage width={64} className="rounded-full" src={comment.author.avatar} alt={comment.author.username} />
      <AvatarFallback>{comment.author.username}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{comment.author.username}</p>
      {isEditing ? <EditComment comment={comment} setIsOpen={setIsEditing} /> : <p className="text-muted-foreground">{comment.content}</p>}
    </div>
    {user?.username === comment.author.username && !isEditing ? <CommentControls setIsEditing={setIsEditing} comment={comment}>
      <Button className="absolute right-5"><Ellipsis /></Button>
    </CommentControls> : null}
  </div>
}
