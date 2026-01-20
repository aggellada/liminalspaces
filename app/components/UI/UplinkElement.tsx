"use client";

import { getSpecificUplink, sendMessage } from "@/app/action/uplink.action";
import { Hash, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getOrCreateUser } from "@/app/action/user.action";
import SkeletonChat from "./SkeletonChat";
import toast from "react-hot-toast";

type SpecificUplinkData = Awaited<ReturnType<typeof getSpecificUplink>>;
type AnonymousData = NonNullable<Awaited<ReturnType<typeof getOrCreateUser>>>;

interface UplinkElementProps {
  specificUplink: SpecificUplinkData;
  selectedUplinkId: string;
  anonymous: AnonymousData;
  setShowUplink: (value: boolean) => void;
  setSelectedUplinkId: (value: string | null) => void;
}

function UplinkElement({
  specificUplink,
  selectedUplinkId,
  anonymous,
  setShowUplink,
  setSelectedUplinkId,
}: UplinkElementProps) {
  const [inputText, setInputText] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 1. Initialize Connection
    socketRef.current = io();

    // 2. Join the specific room
    if (selectedUplinkId) {
      socketRef.current.emit("join_uplink", selectedUplinkId);
    }

    // 3. Listen for INCOMING messages (Fixed Name)
    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 4. Cleanup: Disconnect to prevent duplicates
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [selectedUplinkId]);

  useEffect(() => {
    setIsLoadingHistory(true);
    if (specificUplink?.messages) {
      setMessages(specificUplink.messages);
    }
    setIsLoadingHistory(false);
  }, [specificUplink]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasText = inputText.trim().length > 0;

  const clientAction = async (formData: FormData) => {
    try {
      const content = formData.get("content") as string;
      if (!content.trim()) return;

      // 1. Create the Payload object
      // We need to construct the message object manually here to send it via socket
      const messagePayload = {
        id: crypto.randomUUID(), // Temporary ID for the UI
        content: content,
        senderId: anonymous.id,
        uplinkId: selectedUplinkId,
        createdAt: new Date().toISOString(), // Important for consistency
      };

      setMessages((prev) => [...prev, messagePayload]);
      setInputText(""); // Clear input immediately

      // 3. Socket Emit (Send it to THE OTHER PERSON)
      // This triggers the 'relay' we set up in server.ts
      if (socketRef.current && selectedUplinkId) {
        socketRef.current.emit("send_message", messagePayload);
      }

      const result = await sendMessage(formData, selectedUplinkId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      formRef.current?.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send transmission");
    }
  };

  const closeButton = () => {
    setSelectedUplinkId(null);
    setShowUplink(false);
  };

  return (
    <>
      {specificUplink && !isLoadingHistory ? (
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
                    {specificUplink.receiver.handle}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono mt-0.5">
                    <span className="flex items-center gap-1"></span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeButton}
                className="text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-linear-to-b from-zinc-950 to-zinc-900">
              {/* Messages */}
              {messages.map((message: any) => (
                <div key={message.id}>
                  {message.senderId !== anonymous.id ? (
                    <div key={message.id} className="flex flex-col items-start gap-1 max-w-[85%]">
                      <span className="text-[9px] font-mono text-zinc-500 ml-1 mb-1">
                        {specificUplink.receiver.handle}
                      </span>

                      <div className="bg-zinc-800/50 border border-white/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-zinc-300 leading-relaxed">
                        <h1>{message.content}</h1>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex flex-col items-end gap-1 max-w-[85%] ml-auto">
                      <span className="text-[9px] font-mono text-zinc-500 ml-1 mb-1">
                        {specificUplink.initiator.handle}
                      </span>
                      <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-indigo-100 leading-relaxed">
                        <h1>{message.content}</h1>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-zinc-900 border-t border-white/5">
              <form ref={formRef} className="relative" action={clientAction}>
                <input
                  type="text"
                  name="content"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${specificUplink.receiver.handle}...`}
                  className="w-full bg-black border border-zinc-800 text-white rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors font-light"
                />
                <button
                  disabled={!hasText}
                  type="submit"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 ${
                    hasText ? "text-indigo-400 hover:bg-indigo-500/10" : "text-zinc-700"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonChat />
      )}
    </>
  );
}

export default UplinkElement;
