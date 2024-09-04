import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

export default function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
