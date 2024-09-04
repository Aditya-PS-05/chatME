import React from "react";
import DashNav from "~/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  console.log("The session is ", session);
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
    </div>
  );
}
