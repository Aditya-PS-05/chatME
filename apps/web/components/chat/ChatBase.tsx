"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import { GroupChatType, GroupChatUserType, MessageType } from "~/types";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

export default function ChatBase({group, users, oldMessages}: {group: GroupChatType, users: Array<GroupChatUserType> | [], oldMessages: Array<MessageType> | []}) {

  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if(data) {
      const pdata = JSON.parse(data);
      setChatUser(pdata);
    }
  }, [group.id])

  return (
    <div className="flex">
      <ChatSidebar users={users}/>
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
      {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group} /> : 
        <ChatNav chatGroup={group} users={users}/>
      }
      <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
      </div>
    </div>
  );
}
