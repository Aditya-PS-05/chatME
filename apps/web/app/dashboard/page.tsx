import React from "react";
import DashNav from "~/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "~/components/groupChat/CreateChat";
import { fetchChatGroups } from "~/fetch/groupFetch";
import { GroupChatType } from "~/types";
import GroupChatCard from "~/components/groupChat/GroupChatCard";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  console.log("The session is ", session);

  const groups: Array<GroupChatType> | [] = await fetchChatGroups(
    session?.user?.token!,
  );

  console.log(groups);
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session?.user!} />
        </div>
        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
    </div>
  );
}
