import React from "react";

function RadarMap() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* 1. THE RADAR SCREEN */}
      <div className="relative w-full aspect-square max-h-100 mx-auto bg-zinc-900/50 rounded-full border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/50 group">
        {/* Grid Lines (The "Target") */}
        <div className="absolute inset-0 border border-zinc-800 rounded-full scale-[0.25]"></div>
        <div className="absolute inset-0 border border-zinc-800 rounded-full scale-[0.50]"></div>
        <div className="absolute inset-0 border border-zinc-800 rounded-full scale-[0.75]"></div>
        <div className="absolute inset-0 w-full h-px bg-zinc-800 top-1/2 -translate-y-1/2"></div>
        <div className="absolute inset-0 h-full w-px bg-zinc-800 left-1/2 -translate-x-1/2"></div>

        {/* The "Sweep" Animation (Rotating Gradient) */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(99,102,241,0.2)_360deg)] animate-spin duration-[4s] rounded-full"></div>

        {/* You (Center) */}
        <div className="absolute w-3 h-3 bg-indigo-500 rounded-full border-2 border-zinc-950 z-10 shadow-[0_0_20px_rgba(99,102,241,0.8)]"></div>

        {/* THE GHOSTS (Blips) */}
        {/* Ghost 1: Nearby */}
        <div className="absolute top-[40%] right-[40%] group-hover:scale-110 transition-transform cursor-pointer">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="absolute left-4 top-0 text-[9px] font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-zinc-950 px-1 border border-emerald-900/30">
            ANON-892 (12m)
          </span>
        </div>

        {/* Ghost 2: Far */}
        <div className="absolute bottom-[20%] left-[30%] group-hover:scale-110 transition-transform cursor-pointer">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-700"></div>
          <span className="absolute left-4 top-0 text-[9px] font-mono text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-zinc-950 px-1 border border-amber-900/30">
            ANON-X41 (45m)
          </span>
        </div>

        {/* Ghost 3: Very Far */}
        <div className="absolute top-[15%] left-[50%] group-hover:scale-110 transition-transform cursor-pointer">
          <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      {/* 2. SCAN CONTROLS */}
      <div className="flex justify-between items-center px-4">
        <div>
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Passive Scan</h3>
          <p className="text-[10px] text-zinc-600 font-mono mt-1">RANGE: 150 METERS</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-500">ONLINE</span>
        </div>
      </div>

      {/* 3. DETECTED SIGNALS LIST */}
      <div className="flex-1 overflow-y-auto border-t border-white/5 bg-zinc-900/20 p-4 rounded-lg">
        <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
          Detected Entities (3)
        </h4>

        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex items-center justify-between p-3 border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="font-mono text-sm text-zinc-300 group-hover:text-white">ANON-892</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              12m <span className="text-zinc-700 mx-1">|</span> -42dB
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-3 border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              <span className="font-mono text-sm text-zinc-300 group-hover:text-white">ANON-X41</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              45m <span className="text-zinc-700 mx-1">|</span> -68dB
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between p-3 border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
              <span className="font-mono text-sm text-zinc-500 group-hover:text-white">UNKNOWN</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-600">
              110m <span className="text-zinc-700 mx-1">|</span> -89dB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadarMap;
