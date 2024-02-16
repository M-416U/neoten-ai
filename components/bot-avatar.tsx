import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src={"/logo.png"} />
      <AvatarFallback>N</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
