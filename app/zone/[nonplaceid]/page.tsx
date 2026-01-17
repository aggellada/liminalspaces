import { getNonplaceBroadcasts } from "@/app/action/broadcast.action";
import { getOrCreateUser } from "@/app/action/user.action";
import MalfunctionScreen from "@/app/components/MalfunctionScreen";
import ZoneComponent from "@/app/components/ZoneComponent";
import React from "react";

interface PageProps {
  params: Promise<{ nonplaceid: string }>;
}

async function page({ params }: PageProps) {
  const { nonplaceid } = await params;

  const [broadcasts, anonymous] = await Promise.all([getNonplaceBroadcasts(nonplaceid), getOrCreateUser()]);

  if (!anonymous) {
    return <MalfunctionScreen />;
  }

  return <ZoneComponent broadcasts={broadcasts} anonymous={anonymous} />;
}

export default page;
