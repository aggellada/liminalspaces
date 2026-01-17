"use client";

import { useGeofence } from "@/lib/hooks/useGeofence";
import { Radio, MoveRight, MapPin, Clock, ShieldAlert, Globe, Send, MessageSquareDashed } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const { location } = useGeofence();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* --- NAVBAR --- */}

      <nav className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white animate-pulse rounded-full"></div>
            <span className="font-mono text-sm tracking-widest uppercase">Liminal Spaces</span>
          </div>
          <div className="flex gap-6 text-sm font-mono text-zinc-500">
            <span className="hidden md:block">LAT: {location?.lat}° N</span>
            <span className="hidden md:block">LON: {location?.lng}° E</span>
            <span className="text-emerald-500">SYSTEM: ONLINE</span>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Typography */}
          <div>
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-mono mb-6 text-zinc-400">
              ANTHROPOLOGICAL MAPPING TOOL v1.0
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              CONNECTIONS
              <br />
              WITHOUT
              <br />
              <span className="text-zinc-600">HISTORY.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
              A location-based network that only exists in non-places. Airports. Highways. Terminals. Transit
              hubs. etc.
            </p>

            <p className="text-lg text-zinc-400 max-w-md leading-relaxed mt-4">
              Connect with the transient. Enter the non-place.
              <span className="text-white block mt-2 font-medium">
                Data decays in 4 hours. No profiles. No memory.
              </span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/zone">
                <button className="bg-white text-black px-8 py-4 font-bold tracking-tight hover:bg-zinc-200 transition-colors flex items-center gap-2 group">
                  ENTER COORDINATES
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-8 py-4 border border-white/20 hover:bg-white/5 transition-colors font-mono text-sm">
                READ MANIFESTO
              </button>
            </div>
          </div>

          {/* Right: The Terminal Visualization (Replaced) */}
          <div className="relative w-full h-125 bg-zinc-950 border border-white/10 rounded-xl overflow-hidden flex flex-col font-sans shadow-2xl shadow-zinc-900/50">
            {/* Terminal Header */}
            <div className="px-6 py-4 bg-zinc-900/80 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* Pulsing Amber Icon */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-2 h-2 bg-amber-600 rounded-full animate-ping opacity-75"></div>
                  <Radio className="w-4 h-4 text-amber-500 relative z-10" />
                </div>
                <div className="text-[10px] md:text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  Current Non-Place: <span className="text-amber-500 font-bold">TRANSIT_HUB_77</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 hidden sm:block">14 GHOSTS PRESENT</div>
            </div>

            {/* Terminal Message Feed */}
            <div className="flex-1 p-8 overflow-hidden relative bg-zinc-950/50">
              {/* The vertical timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800"></div>

              <div className="space-y-10 relative z-10">
                {/* Message 1 (Full Opacity) */}
                <div className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-zinc-950 border-2 border-zinc-700 rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      ANONYMOUS001
                    </span>
                  </div>
                  <p className="text-base text-zinc-100 font-light leading-relaxed">
                    Flight delayed again. The coffee shop is closing.
                  </p>
                </div>

                {/* Message 2 (Medium Opacity) */}
                <div className="relative pl-8 opacity-60">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-zinc-950 border-2 border-zinc-700 rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      ANONYMOUS037
                    </span>
                  </div>
                  <p className="text-base text-zinc-100 font-light leading-relaxed">
                    Watching the cars pass...
                  </p>
                </div>

                {/* Message 3 (Low Opacity) */}
                <div className="relative pl-8 opacity-30">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-zinc-950 border-2 border-zinc-700 rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      ANONYMOUS055
                    </span>
                  </div>
                  <p className="text-base text-zinc-100 font-light leading-relaxed">
                    Does anyone else feel like they don't exist right now?
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal Footer Input (Visual only) */}
            <div className="p-6 bg-zinc-900/80 border-t border-white/5 backdrop-blur-md">
              <div className="relative opacity-70 pointer-events-none">
                <input
                  type="text"
                  placeholder="Broadcast to the void..."
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-300 text-sm p-4 pl-6 rounded-lg font-light placeholder:text-zinc-600"
                />
                <Send className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              </div>
              <div className="mt-3 text-[9px] font-mono text-amber-500/40 uppercase tracking-widest text-center">
                Data Persistence: 4 Hours. Identity: NULL.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MANIFESTO / THEORY SECTION --- */}
      <section className="py-24 bg-zinc-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: The Quote (Marc Augé) */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-zinc-300 mb-8">
              "If a place can be defined as relational, historical and concerned with identity, then a space
              which cannot be defined as such will be a{" "}
              <span className="text-white not-italic font-bold bg-zinc-800 px-2">non-place.</span>"
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-zinc-600"></div>
              <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">
                Marc Augé, 1992
              </span>
            </div>
          </div>

          {/* Right: The Definition & App Context */}
          <div className="lg:col-span-5 space-y-8 lg:pl-12 lg:border-l border-white/10">
            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
                Definition
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                <strong className="text-white">Non-places</strong> are spaces of transience where human beings
                remain anonymous and solitary. Airports, terminals, railway stations, hotel chains, and
                motorways. In these spaces, individuals are connected only by their shared isolation and the
                terms of their transit.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
                The Objective
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-white">Liminal Spaces</span> is a digital layer for these physical
                voids. It rejects the permanence of traditional social media (profiles, history, likes) to
                embrace the fleeting nature of the non-place. We map the invisible community of the "now."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID (BENTO BOX) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">System Parameters</h2>
        </div>

        {/* Changed to 2 columns for a balanced 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Geofencing */}
          <div className="p-8 border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group">
            <Globe className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-emerald-400 transition-colors" />
            <h3 className="text-xl font-bold mb-2 text-white">Geofenced Reality</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Access is strictly tied to physical coordinates. You cannot login from home. You must be present
              in the non-place to speak.
            </p>
          </div>

          {/* Card 2: Ephemeral */}
          <div className="p-8 border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group">
            <Clock className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-amber-400 transition-colors" />
            <h3 className="text-xl font-bold mb-2 text-white">Temporal Decay</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Every thought broadcasted has a half-life. Messages fade visually over time until they are
              purged from the database completely.
            </p>
          </div>

          {/* Card 3: Anonymity */}
          <div className="p-8 border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group">
            <ShieldAlert className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-rose-400 transition-colors" />
            <h3 className="text-xl font-bold mb-2 text-white">Radical Anonymity</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              No profiles. No avatars. No history. You are stripped of social identity, left only with your
              immediate thoughts and location.
            </p>
          </div>

          {/* Card 4: Transient Uplink (NEW) */}
          <div className="p-8 border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group">
            <MessageSquareDashed className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-indigo-400 transition-colors" />
            <h3 className="text-xl font-bold mb-2 text-white">Transient Uplink</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Open a direct, encrypted channel with a broadcaster through proximity-based socialization. The
              link is fragile: it severs instantly if either user leaves the geofence or stops typing for 5
              minutes.
            </p>
          </div>
        </div>
      </section>

      {/* --- LIVE STATS FOOTER --- */}
      <section className="border-t border-white/10 bg-zinc-900/30 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-mono font-bold text-white">24</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Active Zones</div>
          </div>
          <div>
            <div className="text-4xl font-mono font-bold text-white">102</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Ghosts Online</div>
          </div>
          <div>
            <div className="text-4xl font-mono font-bold text-white">12m</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Avg. Session</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="text-xs text-emerald-500 uppercase tracking-widest">Server Healthy</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
