
import { CommentsList, type MappedComment } from './comments-list/comments-list'
import { AddComment } from './add-comment/add-comment'
import { getComments } from '../actions/getComments'

type CommentsData = {
  data: MappedComment[]
}


export const CommentsSection = async ({ postId }: { postId: string }) => {
  const comments = await getComments({ id: postId }) as CommentsData
  return (
    <div className="w-full max-w-4xl mx-auto bg-background rounded-lg mt-24">
      <h2 className="text-2xl font-bold mb-4">Komentarze</h2>
      <AddComment postId={postId} />
      <CommentsList comments={comments.data} />
    </div>
  )
}

