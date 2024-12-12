import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { type MappedComment } from "../comments-list/comments-list"
import { CommentControls } from "../comment-control/comment-control"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Ellipsis } from "lucide-react"

export const SingleComment = ({ comment }: { comment: MappedComment }) => {
  return <div className="flex relative items-start w-full space-x-4 mb-4">
    <Avatar>
      <AvatarImage width={64} className="rounded-full" src={comment.author.avatar} alt={comment.author.username} />
      <AvatarFallback>{comment.author.username}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{comment.author.username}</p>
      <p className="text-muted-foreground">{comment.content}</p>
    </div>
    <CommentControls commentId={comment.id}>
      <Button className="absolute right-5"><Ellipsis /></Button>
    </CommentControls>
  </div>
}
