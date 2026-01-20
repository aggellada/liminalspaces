"use client";

import { Clock, Hash, MessageSquareDashed, Send, X } from "lucide-react";
import { getAllUplinks, getSpecificUplink } from "../action/uplink.action";
import { useEffect, useState } from "react";
import UplinkElement from "./UI/UplinkElement";
import { getOrCreateUser } from "../action/user.action";

type UplinkData = Awaited<ReturnType<typeof getAllUplinks>>;
type AnonymousData = NonNullable<Awaited<ReturnType<typeof getOrCreateUser>>>;

interface UplinksProps {
  uplinks: UplinkData;
  anonymous: AnonymousData;
}

function Uplinks({ uplinks, anonymous }: UplinksProps) {
  const [selectedUplinkId, setSelectedUplinkId] = useState<any>(null);
  const [specificUplink, setSpecificUplink] = useState<any>(null);
  const [showUplink, setShowUplink] = useState(false);

  useEffect(() => {
    const getUplink = async () => {
      if (selectedUplinkId) {
        const uplink = await getSpecificUplink(selectedUplinkId);
        setSpecificUplink(uplink);
      }
    };
    if (selectedUplinkId) getUplink();
  }, [selectedUplinkId]);

  const clickUplink = (id: string) => {
    setSelectedUplinkId(id);
    setShowUplink(true);
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
      {uplinks?.map((freq) => (
        <div
          key={freq.id}
          onClick={() => clickUplink(freq.id)}
          className="group relative p-5 border border-white/5 bg-zinc-900/40 hover:bg-zinc-900 cursor-pointer transition-all rounded-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center font-mono text-[10px] text-zinc-400 border border-white/5"></div>
              <div>
                <span className="font-mono text-sm font-bold text-zinc-200 tracking-wider block">
                  {freq.receiver.handle}
                </span>
                {/* <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                  {freq.}
                </span> */}
              </div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm truncate pl-11 group-hover:text-zinc-200 transition-colors">
            {freq.messages[freq.messages.length - 1]?.content}
          </p>

          {/* Hover Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <MessageSquareDashed className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      ))}
      {showUplink && (
        <UplinkElement
          specificUplink={specificUplink}
          selectedUplinkId={selectedUplinkId}
          anonymous={anonymous}
          setShowUplink={setShowUplink}
          setSelectedUplinkId={setSelectedUplinkId}
        />
      )}
    </div>
  );
}

export default Uplinks;
