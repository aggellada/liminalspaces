'use client'

import { useState } from "react";

const useData = () => {
  const [activeTab, setActiveTab] = useState("broadcasts");
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(null);

  // --- MOCK DATA: BROADCAST FEED ---
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "The air conditioning hum is the only music here.",
      time: "2m ago",
      dist: "NEARBYa",
      type: "strong",
    },
    { id: 2, text: "Has anyone seen a red scarf?", time: "15m ago", dist: "DECAYING", type: "weak" },
  ]);

  // --- MOCK DATA: ACTIVE UPLINKS (CHATS) ---
  const frequencies = [
    {
      id: 1,
      handle: "ANON-892",
      role: "TRAVELER",
      dist: "12m",
      lastMsg: "I see you reading that blue book.",
      status: "strong",
      expiresIn: "03:12:00",
    },
    {
      id: 2,
      handle: "ANON-X41",
      role: "OBSERVER",
      dist: "45m",
      lastMsg: "The flight to Tokyo is boarding.",
      status: "weak",
      expiresIn: "00:45:00",
    },
  ];

  return { activeTab, selectedFrequency, posts, frequencies, setPosts, setActiveTab, setSelectedFrequency };
};

export default useData;
