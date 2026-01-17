import { Clock, MapPin, UserX } from "lucide-react";
import React from "react";

function Session() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. IDENTITY CARD */}
      <div className="p-6 border border-white/10 bg-zinc-900/50 rounded-lg text-center relative overflow-hidden group">
        {/* Background abstract decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

        <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto flex items-center justify-center border border-white/5 mb-4 shadow-lg shadow-black/50">
          <span className="font-mono text-2xl text-zinc-200 tracking-tighter">001</span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight">ANON-001</h2>
        <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mt-2">
          Connected • Verified Traveler
        </p>
      </div>

      {/* 2. THE DECAY TIMER (The Core Feature) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 border border-white/5 bg-zinc-900/30 rounded-lg">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Time Remaining</span>
          </div>
          <div className="text-3xl font-mono text-zinc-200 font-light">03:59:12</div>
          <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-indigo-500 w-[90%] h-full"></div>
          </div>
        </div>

        <div className="p-5 border border-white/5 bg-zinc-900/30 rounded-lg">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Zone Radius</span>
          </div>
          <div className="text-3xl font-mono text-zinc-200 font-light">
            120<span className="text-sm text-zinc-600 ml-1">m</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-3 leading-tight">
            Leaving this radius will sever all active Uplinks instantly.
          </p>
        </div>
      </div>

      {/* 3. SESSION STATS */}
      <div className="p-5 border border-white/5 bg-zinc-900/30 rounded-lg">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Current Manifest</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-sm text-zinc-400">Broadcasts Sent</span>
            <span className="font-mono text-white">4</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-sm text-zinc-400">Echoes Received</span>
            <span className="font-mono text-white">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Data Accumulated</span>
            <span className="font-mono text-white">1.2 KB</span>
          </div>
        </div>
      </div>

      {/* 4. THE KILL SWITCH (Terminate) */}
      <button className="w-full py-4 border border-rose-500/30 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all rounded-lg text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 group">
        <UserX className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Terminate Session
      </button>

      <p className="text-[10px] text-center text-zinc-600 px-8 leading-relaxed">
        Terminating will wipe all your broadcasts and disconnect active chats immediately. This action cannot
        be undone.
      </p>
    </div>
  );
}

export default Session;
