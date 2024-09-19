import ChatBase from "~/components/chat/ChatBase";
import React from "react";
import { notFound } from "next/navigation";
import { GroupChatType, GroupChatUserType, MessageType } from "~/types";
import { fetchChatGroup, fetchChatGroupUsers } from "~/fetch/groupFetch";
import { fetchChats } from "~/fetch/chatsFetch";

export default async function chat({ params }: { params: { id: string } }) {
  console.log("The group id is ", params.id);
  if(params.id.length !== 36) {
    return notFound();
  }

  const group: GroupChatType | null = await fetchChatGroup(params.id);

  if(group == null) {
    return notFound();
  }

  const users : Array<GroupChatUserType> | [] = await fetchChatGroupUsers(params.id);
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  return (
    <div>
      <ChatBase group={group} users={users} oldMessages={chats}/>
    </div>
  );
}
 