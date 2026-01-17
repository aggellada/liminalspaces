"use client";

import { CornerDownLeft, MapPin, MessageSquareDashed, RefreshCcw, Signal } from "lucide-react";
import React, { useRef, useState } from "react";
import { getNonplaceBroadcasts, postBroadcast } from "../action/broadcast.action";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";

type BroadcastList = NonNullable<Awaited<ReturnType<typeof getNonplaceBroadcasts>>>;
interface BroadcastsPropsType {
  broadcasts: BroadcastList | null;
}

function Broadcasts({ broadcasts }: BroadcastsPropsType) {
  const [inputText, setInputText] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    const result = await postBroadcast(formData);

    if (result?.error) {
      toast.error(result.error);
      setInputText("");
      return;
    }

    formRef.current?.reset();
    toast.success("Signal transmitted.");
  }

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Feed Items */}
        {broadcasts && broadcasts.length > 0 ? (
          broadcasts.map((post) => {
            const hoursLeft = (new Date(post.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60);
            return (
              <div
                key={post.id}
                className={`p-5 border border-white/5 bg-zinc-900/30 rounded-lg transition-all ${
                  hoursLeft < 2 ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase tracking-wider">
                    <p className="text-[15px]">{post.anonymous?.handle}</p>
                    <Signal className={`w-3 h-3 ${hoursLeft ? "text-emerald-500" : "text-amber-500"}`} />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true })}</span>
                  </p>
                  <span className="text-xs text-red-400">{hoursLeft < 2 && "EXPIRING"}</span>
                </div>
                <p className="text-lg font-light text-zinc-200 leading-relaxed font-serif">{post.content}</p>

                {/* Action Bar */}
                <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3">
                  <button className="text-[10px] text-zinc-500 hover:text-indigo-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-mono">
                    <MessageSquareDashed className="w-3 h-3" /> Request Uplink
                  </button>
                  <button className="text-[10px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-mono">
                    <MapPin className="w-3 h-3" /> Triangulate
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>None</div>
        )}

        <div className="text-center py-10 opacity-30">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em]">End of Local Signal</p>
        </div>
      </div>

      {/* --- FIXED BOTTOM INPUT --- */}
      <div className="fixed bottom-0 left-0 w-full z-30 bg-zinc-950 border-t border-white/10 pb-24 pt-4 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        {/* RESTORED: 'max-w-2xl mx-auto' ensures the input box is centered and has a fixed max width */}
        <div className="max-w-2xl mx-auto relative">
          {/* Status Indicator */}
          <div className="absolute -top-7 left-0 flex items-center gap-2 text-[9px] font-mono text-emerald-500 bg-zinc-900/80 px-2 py-1 rounded-t border-t border-x border-white/5">
            <Signal className="w-3 h-3" />
            TRANSMISSION LINK: STABLE
          </div>

          {/* Input Field */}
          <div className="relative group">
            <form ref={formRef} action={clientAction}>
              <input
                name="text"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Broadcast to the void..."
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 p-4 pr-14 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-light placeholder:text-zinc-600 font-serif italic"
              />
              <button
                // onClick={handleBroadcast}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
                  inputText.trim() ? "text-indigo-400 hover:bg-indigo-500/10" : "text-zinc-700"
                }`}
                type="submit"
              >
                <CornerDownLeft className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Broadcasts;

const BroadCastClient = () => {};
