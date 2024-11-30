import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SingleComment } from "../single-comment/single-comment";

export type MappedComment = { content: string, author: { username: string, avatar: string } }

export const CommentsList = ({ comments }: { comments: MappedComment[] }) => {
  return <ScrollArea>
    {comments.length >= 1 ? comments.map((comment, i) => (
      <SingleComment key={i} comment={comment} />
    )) : null}
  </ScrollArea>
}
