import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { type MappedComment } from "../comments-list/comments-list"

export const SingleComment = ({ comment }: { comment: MappedComment }) => {
  return <div className="flex items-start space-x-4 mb-4">
    <Avatar>
      <AvatarImage width={64} className="rounded-full" src={comment.author.avatar} alt={comment.author.username} />
      <AvatarFallback>{comment.author.username}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{comment.author.username}</p>
      <p className="text-muted-foreground">{comment.content}</p>
    </div>
  </div>
}
