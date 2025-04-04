import { Avatar, AvatarFallback } from "@/shared/components/ui/shadcn/avatar"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { IUser } from "@/shared/types"
import { Edit } from "lucide-react"
import { ProfileEdit } from "../profile-edit/profile-edit"
import { useState } from "react"

export const ProfileHeader = ({ user }: { user?: IUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!user) return null

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4">
        <div className="space-y-1">
          <CardTitle className="text-lg sm:text-xl">Informacje o użytkowniku</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Podejrzyj i edytuj informacje o tobie
          </CardDescription>
        </div>
        <ProfileEdit profile={user.profile} isOpen={isOpen} setIsOpen={setIsOpen}>
          <Button size="sm" variant="outline" className="h-8 text-xs sm:text-sm">
            <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Edytuj
          </Button></ProfileEdit>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarFallback className="text-xl sm:text-2xl">
              {user.profile.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold sm:text-2xl">{user.profile.username}</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">{user.profile.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
