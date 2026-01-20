"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import Broadcasts from "./Broadcasts";
import Uplinks from "./Uplinks";
import RadarMap from "./Radar";
import Session from "@/app/components/Session";
import NavButton from "./UI/NavButton";
import { MessageSquareDashed, Radar, Radio, UserX } from "lucide-react";
import { getNonplaceBroadcasts } from "../action/broadcast.action";
import { getOrCreateUser } from "../action/user.action";
import { getAllUplinks, getOrCreateUplink } from "../action/uplink.action";

type BroadcastList = NonNullable<Awaited<ReturnType<typeof getNonplaceBroadcasts>>>;
type AnonymousUser = NonNullable<Awaited<ReturnType<typeof getOrCreateUser>>>;
type UplinkData = Awaited<ReturnType<typeof getAllUplinks>>;

interface ZoneComponentProps {
  broadcasts: BroadcastList | null;
  anonymous: AnonymousUser;
  initializeUplink: (receiverId: string) => Promise<any>;
  uplinks: UplinkData;
}

function ZoneComponent({ broadcasts, anonymous, initializeUplink, uplinks }: ZoneComponentProps) {
  const [activeTab, setActiveTab] = useState<string>("broadcasts");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden flex flex-col relative">
      <TopBar anonymous={anonymous} />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 pt-20 pb-48 px-4 md:px-0 max-w-2xl mx-auto w-full overflow-y-auto no-scrollbar">
        {activeTab === "broadcasts" && (
          <Broadcasts initializeUplink={initializeUplink} broadcasts={broadcasts} />
        )}
        {activeTab === "frequencies" && <Uplinks uplinks={uplinks} anonymous={anonymous} />}
        {activeTab === "session" && <Session anonymous={anonymous} />}
        {activeTab === "radar" && <RadarMap />}
      </main>

      {/* --- NAVIGATION (Floating Deck) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300">
        <nav className="flex items-center gap-1 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl shadow-black ring-1 ring-white/5">
          <NavButton
            active={activeTab === "broadcasts"}
            onClick={() => setActiveTab("broadcasts")}
            icon={<Radio className="w-5 h-5" />}
            label="Broadband"
          />
          <NavButton
            active={activeTab === "frequencies"}
            onClick={() => setActiveTab("frequencies")}
            icon={<MessageSquareDashed className="w-5 h-5" />}
            label="Uplinks"
            badge={2}
          />
          <NavButton
            active={activeTab === "radar"}
            onClick={() => setActiveTab("radar")}
            icon={<Radar className="w-5 h-5" />}
            label="Radar"
          />
          <div className="w-px h-6 bg-zinc-800 mx-1"></div>
          <NavButton
            active={activeTab === "session"}
            onClick={() => setActiveTab("session")}
            icon={<UserX className="w-5 h-5" />}
            label="Session"
          />
        </nav>
      </div>
    </div>
  );
}

export default ZoneComponent;
