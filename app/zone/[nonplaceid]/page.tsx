import { getNonplaceBroadcasts } from "@/app/action/broadcast.action";
import { getAllUplinks, getOrCreateUplink } from "@/app/action/uplink.action";
import { getOrCreateUser } from "@/app/action/user.action";
import MalfunctionScreen from "@/app/components/UI/MalfunctionScreen";
import ZoneComponent from "@/app/components/ZoneComponent";

interface PageProps {
  params: Promise<{ nonplaceid: string }>;
}

async function page({ params }: PageProps) {
  const { nonplaceid } = await params;

  const [broadcasts, anonymous, uplinks] = await Promise.all([
    getNonplaceBroadcasts(nonplaceid),
    getOrCreateUser(),
    getAllUplinks(),
  ]);

  if (!anonymous) {
    return <MalfunctionScreen />;
  }

  return (
    <ZoneComponent
      broadcasts={broadcasts}
      anonymous={anonymous}
      initializeUplink={getOrCreateUplink}
      uplinks={uplinks}
    />
  );
}

export default page;
