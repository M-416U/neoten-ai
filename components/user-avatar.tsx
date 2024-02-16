import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
