import ChatBase from "~/components/chat/ChatBase";
import React from "react";

export default async function chat({ params }: { params: { id: string } }) {
  console.log("The group id is ", params.id);
  return (
    <div>
      <h1>Hello I am chat</h1>
      <ChatBase />
    </div>
  );
}
