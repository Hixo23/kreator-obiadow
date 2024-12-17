import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { type MappedComment } from "../comments-list/comments-list"
import { CommentControls } from "../comment-control/comment-control"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Ellipsis } from "lucide-react"
import {currentUser} from "@clerk/nextjs/server";

export const SingleComment = async ({ comment }: { comment: MappedComment }) => {
  const user = await currentUser()
  return <div className="flex relative items-start w-full space-x-4 mb-4">
    <Avatar>
      <AvatarImage width={64} className="rounded-full" src={comment.author.avatar} alt={comment.author.username} />
      <AvatarFallback>{comment.author.username}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{comment.author.username}</p>
      <p className="text-muted-foreground">{comment.content}</p>
    </div>
    {user?.username === comment.author.username ? <CommentControls commentId={comment.id}>
      <Button className="absolute right-5"><Ellipsis /></Button>
    </CommentControls> : null}
  </div>
}
