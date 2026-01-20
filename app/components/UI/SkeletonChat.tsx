import React from "react";

function SkeletonChat() {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 shadow-2xl rounded-xl overflow-hidden flex flex-col h-150 relative">
        {/* Skeleton Header */}
        <div className="bg-zinc-900/90 p-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-800 rounded animate-pulse" /> {/* Icon Placeholder */}
            <div className="space-y-1">
              <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" /> {/* Name Placeholder */}
              <div className="h-2 w-16 bg-zinc-900 rounded animate-pulse" /> {/* Subtext Placeholder */}
            </div>
          </div>
          <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse" /> {/* Close Button Placeholder */}
        </div>

        {/* Skeleton Messages Area */}
        <div className="flex-1 p-6 space-y-6 bg-linear-to-b from-zinc-950 to-zinc-900 overflow-hidden">
          {/* Fake "Received" Message (Left) */}
          <div className="flex flex-col items-start gap-2 max-w-[85%] animate-pulse">
            <div className="h-2 w-12 bg-zinc-900 rounded ml-1" />
            <div className="h-12 w-48 bg-zinc-900/50 border border-zinc-800 rounded-tr-xl rounded-br-xl rounded-bl-xl" />
          </div>

          {/* Fake "Sent" Message (Right) */}
          <div className="flex flex-col items-end gap-2 max-w-[85%] ml-auto animate-pulse">
            <div className="h-10 w-32 bg-indigo-900/10 border border-indigo-500/10 rounded-tl-xl rounded-bl-xl rounded-br-xl" />
          </div>

          {/* Fake "Received" Long Message (Left) */}
          <div className="flex flex-col items-start gap-2 max-w-[85%] animate-pulse">
            <div className="h-2 w-12 bg-zinc-900 rounded ml-1" />
            <div className="h-20 w-64 bg-zinc-900/50 border border-zinc-800 rounded-tr-xl rounded-br-xl rounded-bl-xl" />
          </div>
        </div>

        {/* Skeleton Input Area */}
        <div className="p-4 bg-zinc-900 border-t border-white/5">
          <div className="w-full h-11 bg-black border border-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonChat;
