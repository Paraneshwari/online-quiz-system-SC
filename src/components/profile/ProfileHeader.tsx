
import { User } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback className="text-lg">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {user.role}
          </Badge>
          <span className="text-muted-foreground">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
