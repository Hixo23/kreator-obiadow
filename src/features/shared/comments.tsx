import {
  CommentsList,
  type MappedComment,
} from "@/features/comments/components/comments-list/comments-list";
import { AddComment } from "@/features/comments/components/add-comment/add-comment";
import { getComments } from "@/features/comments/actions/get-comments";
type CommentsData = {
  data: MappedComment[];
};

export const CommentsSection = async ({ postId }: { postId: string }) => {
  const comments = (await getComments({ id: postId })) as CommentsData;
  return (
    <div className="mx-auto mt-24 w-full max-w-4xl rounded-lg bg-background">
      <h2 className="mb-4 text-2xl font-bold">Komentarze</h2>
      <AddComment postId={postId} />
      <CommentsList comments={comments.data} />
    </div>
  );
};
