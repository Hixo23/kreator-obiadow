import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/shadcn/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { SetStateAction } from "react"
import { useDeleteComment } from "../../hooks/use-delete-comment"

export const CommentActionMenu = ({ commentId, setIsEditing }: { commentId: string, setIsEditing: React.Dispatch<SetStateAction<boolean>> }) => {
  const { mutate } = useDeleteComment()
  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleDelete = () => {
    mutate({ commentId })
  }


  return <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer">
      <EllipsisVertical />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={handleEdit}>Edytuj komentarz</DropdownMenuItem>
      <DropdownMenuItem onClick={handleDelete}>Usuń komentarz</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
