"use client";

import { MappedComment } from "../comments-list/comments-list"
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from "react"
import { Textarea } from "@/shared/components/ui/shadcn/textarea"
import { Button } from "@/shared/components/ui/shadcn/button";
import { editComment } from "../../actions/editComment";

export const EditComment = ({ comment, setIsOpen }: { comment: MappedComment, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [commentContent, setCommentContent] = useState(comment.content)
  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    await editComment({ id: comment.id, updatedComment: commentContent })
    return setIsOpen(false)
  }
  return <form className="flex items-center gap-4 w-full" onSubmit={onSubmit}>
    <Textarea cols={100} onChange={(ev) => setCommentContent(ev.target.value)} value={commentContent}></Textarea>
    <Button>Zapisz komentarz</Button>
  </form>

}
