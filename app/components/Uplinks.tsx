"use client";

import useData from "@/lib/hooks/useData";
import { Clock, Hash, MessageSquareDashed, Send, X } from "lucide-react";
import { useEffect } from "react";
import { io } from "socket.io-client";

function Uplinks() {
  const { frequencies, selectedFrequency, setSelectedFrequency } = useData();

  const currentFrequencyData = frequencies.find((f) => f.id === selectedFrequency);

  useEffect(() => {
    // Empty string means "Connect to the same server that served this page"
    const socket = io();

    socket.emit("join_uplink", currentFrequencyData); //uplinkid
    // ... rest of logic
  }, []);

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
      {frequencies.map((freq) => (
        <div
          key={freq.id}
          onClick={() => setSelectedFrequency(freq.id)}
          className="group relative p-5 border border-white/5 bg-zinc-900/40 hover:bg-zinc-900 cursor-pointer transition-all rounded-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center font-mono text-[10px] text-zinc-400 border border-white/5">
                {freq.handle.split("-")[1]}
              </div>
              <div>
                <span className="font-mono text-sm font-bold text-zinc-200 tracking-wider block">
                  {freq.handle}
                </span>
                <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                  {freq.role}
                </span>
              </div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm truncate pl-11 group-hover:text-zinc-200 transition-colors">
            {freq.lastMsg}
          </p>

          {/* Hover Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <MessageSquareDashed className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      ))}
      {selectedFrequency && currentFrequencyData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 shadow-2xl shadow-indigo-900/20 rounded-xl overflow-hidden flex flex-col h-150 animate-in zoom-in-95 duration-200 relative">
            {/* Chat Header */}
            <div className="bg-zinc-900/90 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded flex items-center justify-center text-indigo-400 font-mono text-xs">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-white flex items-center gap-2 font-bold tracking-wider">
                    {currentFrequencyData.handle}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {currentFrequencyData.expiresIn}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFrequency(null)}
                className="text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-linear-to-b from-zinc-950 to-zinc-900">
              {/* Message from Other */}
              <div className="flex flex-col items-start gap-1 max-w-[85%]">
                <span className="text-[9px] font-mono text-zinc-500 ml-1 mb-1">
                  {currentFrequencyData.handle}
                </span>
                <div className="bg-zinc-800/50 border border-white/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-zinc-300 leading-relaxed">
                  I see you reading that blue book. Is it the new Murakami?
                </div>
              </div>
              {/* Message from You */}
              <div className="flex flex-col items-end gap-1 max-w-[85%] ml-auto">
                <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-indigo-100 leading-relaxed">
                  Yeah. Just bought it at the terminal shop. Trying to kill 2 hours.
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-zinc-900 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Reply to ${currentFrequencyData.handle}...`}
                  className="w-full bg-black border border-zinc-800 text-white rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors font-light"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-indigo-400">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Uplinks;
