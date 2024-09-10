"use client";
import React, { useEffect, useMemo } from "react";
import { getSocket } from "~/lib/socket.config";
import { v4 as uuidV4 } from "uuid";
import { Button } from "@repo/ui/components/ui/button";

export default function ChatBase() {
  let socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("The socket message is", data);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleClick = () => {
    console.log("Hey I am clicking. " + uuidV4());
    socket.emit("message", { name: "Aditya", id: uuidV4() });
  };
  return (
    <div>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
}
