import { type User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export const Profile = ({ user }: { user: User }) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={user.image!} alt={user.name!} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
    </div>
  )
}; 
