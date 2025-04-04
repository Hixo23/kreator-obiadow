import { Avatar, AvatarFallback } from "@/shared/components/ui/shadcn/avatar";
import { StarRating } from "../star-rating/star-rating";
import { IComment } from "@/shared/types";
import { CommentActionMenu } from "../comment-action-menu/comment-action-menu";
import { useState } from "react";
import { EditComment } from "../edit-comment/edit-comment";
import { useUser } from "@/shared/contexts/userContext";

export const SingleComment = ({ comment }: { comment: IComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser()

  return (
    <div
      key={comment.id}
      className=" flex items-center justify-between  mb-4 border-b-2 p-4"
    >
      <div className="flex items-start space-x-4 ">
        <Avatar>
          <AvatarFallback>{comment.author.username as string}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <p className="font-semibold mr-2">{comment.author.username}</p>
            <StarRating
              selectedRating={comment.rating}
              interactive={false}
              size={16}
            />
          </div>
          {isEditing ? <EditComment rating={comment.rating} content={comment.content} commentId={comment.id} setIsEditing={setIsEditing} /> : <p className="text-muted-foreground">{comment.content}</p>}
        </div>
      </div>
      {user?.user?.profile.id === comment.author.id && <CommentActionMenu commentId={comment.id} setIsEditing={setIsEditing} />}
    </div>
  );
};
