"use client";

import { useGeofence } from "@/lib/hooks/useGeofence";
import React from "react";
import { getOrCreateUser } from "../action/user.action";

type AnonymousType = NonNullable<Awaited<ReturnType<typeof getOrCreateUser>>>;

interface TopBarProps {
  anonymous: AnonymousType;
}

function TopBar({ anonymous }: TopBarProps) {
  const { nonPlace } = useGeofence();

  return (
    <header className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-40 h-14 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono tracking-widest text-zinc-400">ZONE: {nonPlace}</span>
      </div>
      <div className="text-[10px] font-mono text-zinc-600 uppercase">
        SESSION: <span className="text-indigo-400 font-bold">{anonymous.handle}</span>
      </div>
    </header>
  );
}

export default TopBar;
