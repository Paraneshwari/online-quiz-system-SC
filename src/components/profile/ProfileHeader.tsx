
import { User } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // In a real app, this would open a modal or switch to edit mode
    // For now, we'll just toggle the state
    setTimeout(() => {
      setIsEditing(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="space-y-2 flex-1">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {user.role}
          </Badge>
          <span className="text-muted-foreground">{user.email}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={handleEditClick}
        disabled={isEditing}
      >
        <Edit2 className="h-4 w-4" />
        {isEditing ? "Saving..." : "Edit Profile"}
      </Button>
    </div>
  );
}
