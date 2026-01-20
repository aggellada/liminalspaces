import React from "react";

export default function EnteringZone() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black text-white font-mono overflow-hidden">
      {/* --- UPDATED GRID PATTERN START --- */}
      <div
        // CHANGE 1: Increased opacity from [0.15] to [0.3]
        className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-screen"
        style={{
          // CHANGE 2: Changed color from dark gray (#333) to Emerald Green (rgb(16, 185, 129))
          backgroundImage: `
            linear-gradient(to right, rgb(16, 185, 129) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(16, 185, 129) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>
      {/* CHANGE 3: Softened the vignette so corners aren't totally black */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/90 pointer-events-none"></div>
      {/* --- GRID PATTERN END --- */}

      {/* 1. The Pulse Animation */}
      <div className="relative flex items-center justify-center z-10">
        <div className="absolute h-32 w-32 animate-ping rounded-full bg-emerald-500/10 opacity-75"></div>
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-emerald-500/20"></div>

        {/* 2. The Icon (Radar / Signal) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="relative h-12 w-12 text-emerald-500 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12z"
          />
        </svg>
      </div>

      {/* 3. The Text */}
      <div className="mt-8 space-y-2 text-center z-10">
        <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white">Entering the Zone</h1>
        <p className="text-xs text-emerald-500/70 animate-pulse">Triangulating signal...</p>
      </div>
    </div>
  );
}
