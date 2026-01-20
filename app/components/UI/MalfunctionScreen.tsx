import Link from "next/link";
import React from "react";

const MalfunctionScreen = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-zinc-950 overflow-hidden font-mono selection:bg-rose-500/30 selection:text-rose-200">
      {/* 1. BACKGROUND EFFECTS */}
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 max-w-md px-6 flex flex-col items-center text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-rose-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          <div className="w-16 h-16 border border-zinc-800 bg-zinc-900/50 flex items-center justify-center rounded-sm relative overflow-hidden">
            {/* Moving scanline inside icon */}
            <div className="absolute top-0 w-full h-0.5 bg-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-scan"></div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-zinc-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-zinc-100 text-lg uppercase tracking-[0.2em] font-light">Signal Lost</h1>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-[30ch] mx-auto">
            Terminal connection failed. <br />
            Subject is located outside of designated non-place parameters.
          </p>
        </div>

        <Link
          href="/"
          className="group relative px-6 py-3 bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300 uppercase text-[10px] tracking-[0.2em] overflow-hidden"
        >
          {/* Hover Glitch Effect Background */}
          <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

          <span className="relative flex items-center gap-3">
            {/* Animated Arrow */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-2 group-hover:ml-0 text-rose-500">
              &lt;
            </span>
            RETURN_TO_ORIGIN
            {/* Blinking Cursor */}
            <span className="animate-pulse text-rose-500">_</span>
          </span>
        </Link>

        {/* Pseudo-Technical Details */}
        <div className="border-t border-zinc-900 pt-6 w-full flex justify-between text-[10px] text-zinc-700 uppercase tracking-widest">
          <span>ERR_GEO_INVALID</span>
          <span className="animate-pulse">RETRY_ABORTED</span>
        </div>
      </div>

      {/* 3. CRT OVERLAY EFFECTS (Optional but cool) */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default MalfunctionScreen;
