import { type User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/avatar";

export const Profile = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.imageUrl} alt={user.username!} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <p>{user.username}</p>
    </div>
  );
};
