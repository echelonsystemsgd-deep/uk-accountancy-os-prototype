"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { MessageSquare, Send, Paperclip, ShieldCheck, User } from "lucide-react";

export default function AdminMessagesInboxPage() {
  const { clients, triggerToast } = useDemo();
  const [selectedClient, setSelectedClient] = useState(clients[0]?.entityName || "Belgrave Legacy Wealth Ltd");
  const [replyText, setReplyText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);

  const [thread, setThread] = useState([
    {
      sender: "Gurtej Singh (Client)",
      time: "Yesterday at 14:10",
      text: "Hi Pritpal, just transferred the £28,000 for Mum's property purchase into the company account. How should we allocate this in the DLA?",
      isInternal: false,
    },
    {
      sender: "Pritpal Chaggar CTA (You)",
      time: "Yesterday at 14:45",
      text: "Thanks Gurtej, received. I will allocate this as a Director's Loan Account credit under Mum's name so rental profits can be extracted 100% tax-free before dividend tax.",
      isInternal: false,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setThread((prev) => [
      ...prev,
      {
        sender: isInternalNote ? "Internal Note (Staff Only)" : "Pritpal Chaggar CTA (You)",
        time: "Just now",
        text: replyText,
        isInternal: isInternalNote,
      },
    ]);
    triggerToast(
      isInternalNote ? "Internal Note Saved" : "Reply Dispatched",
      isInternalNote ? "Note visible to staff only." : `Email notification sent to client.`,
      "success"
    );
    setReplyText("");
  };

  return (
    <AdminConsoleLayout
      pageTitle="Client Messages &amp; Internal Thread Workspace"
      pageSubtitle="Communicate directly with clients or record staff-only internal notes protected by Row-Level Security"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Client Roster List */}
        <div className="lg:col-span-4 rounded-xl bg-[#14241d] border border-[#1e382b] p-4 space-y-3">
          <span className="text-[10px] uppercase text-[#8a9d94] font-bold block">
            Client Message Threads
          </span>
          <div className="space-y-2">
            {clients.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClient(c.entityName)}
                className={`w-full p-3 rounded-lg text-left transition flex items-center justify-between ${
                  selectedClient === c.entityName
                    ? "bg-[#0c1813] border border-[#a4f4cf] text-white"
                    : "bg-[#0c1813]/40 border border-[#1e382b] text-[#8a9d94] hover:text-white"
                }`}
              >
                <div>
                  <span className="font-bold block text-white">{c.entityName}</span>
                  <span className="text-[10px] text-[#8a9d94]">{c.primaryContact}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#a4f4cf]"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Chat Conversation Area */}
        <div className="lg:col-span-8 rounded-xl bg-[#14241d] border border-[#1e382b] flex flex-col justify-between h-[550px] overflow-hidden">
          {/* Thread Header */}
          <div className="p-4 bg-[#0c1813] border-b border-[#1e382b] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block text-sm font-sans">{selectedClient}</span>
              <span className="text-[10px] text-[#8a9d94]">Lead Accountant: Pritpal Chaggar CTA</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Encrypted Thread
            </span>
          </div>

          {/* Messages Stream */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {thread.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl space-y-1.5 max-w-xl ${
                  msg.isInternal
                    ? "bg-amber-950/30 border border-amber-500/40 text-amber-200 ml-auto"
                    : msg.sender.includes("You")
                    ? "bg-[#0c1813] border border-[#1e382b] ml-auto text-white"
                    : "bg-[#1e382b]/50 border border-[#1e382b] text-slate-100"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#8a9d94]">
                  <span className="font-bold text-white">{msg.sender}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-4 bg-[#0c1813] border-t border-[#1e382b] space-y-3">
            <div className="flex items-center gap-4 text-xs font-sans">
              <label className="flex items-center gap-2 cursor-pointer text-[#8a9d94] hover:text-white">
                <input
                  type="checkbox"
                  checked={isInternalNote}
                  onChange={(e) => setIsInternalNote(e.target.checked)}
                  className="rounded border-[#1e382b] bg-[#14241d] text-[#a4f4cf]"
                />
                <span className={isInternalNote ? "text-amber-400 font-bold" : ""}>
                  Internal Note (Hidden from client)
                </span>
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={isInternalNote ? "Write an internal partner note..." : "Reply to client (dispatches email notification)..."}
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#14241d] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold text-xs flex items-center gap-1.5 hover:bg-[#8ae8bd] transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminConsoleLayout>
  );
}
