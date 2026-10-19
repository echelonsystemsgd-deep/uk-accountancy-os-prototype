"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Paperclip,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "client" | "accountant";
  senderName: string;
  text: string;
  timestamp: string;
  attachment?: string;
}

export default function ClientMessages() {
  const { activeClient, setCurrentView, triggerToast } = useDemoStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "accountant",
      senderName: activeClient.assignedAccountant,
      text: `Hi ${activeClient.primaryContact.split(" ")[0]}, welcome to your Kai Accountants client portal! We are currently assembling your ${activeClient.taxYear} tax file. To ensure we claim the maximum allowable finance costs under Section 24 rules, please upload the year-end mortgage interest certificates for your properties.`,
      timestamp: "Yesterday, 14:20",
    },
    {
      id: "msg-2",
      sender: "client",
      senderName: activeClient.primaryContact,
      text: "Thanks Kalpesh. I have the NatWest certificate on my desk right now. Will upload a photo from my phone shortly.",
      timestamp: "Yesterday, 16:05",
    },
    {
      id: "msg-3",
      sender: "accountant",
      senderName: activeClient.assignedAccountant,
      text: "Perfect. As soon as that comes in, Pritpal and I will run the comparison against an SPV limited company transfer so you can see your 5-year trajectory.",
      timestamp: "Today, 09:15",
    },
  ]);

  const [replyText, setReplyText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "client",
      senderName: activeClient.primaryContact,
      text: replyText.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
    triggerToast("Message Sent", "Your message was transmitted to Kalpesh Patel FCA.", "success");

    // Simulated quick accountant acknowledgement
    setTimeout(() => {
      const autoAck: ChatMessage = {
        id: `msg-ack-${Date.now()}`,
        sender: "accountant",
        senderName: activeClient.assignedAccountant,
        text: "Thank you for the update. Received and added to your file review queue.",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, autoAck]);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-left">
      {/* Top Header Card */}
      <div className="accountant-card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <img
            src="/team/kalpesh-patel.png"
            alt="Kalpesh Patel FCA"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm shrink-0"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-neutral-900 leading-tight">
                Direct Practice Advisory Thread
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                ICAEW Confidential
              </span>
            </div>
            <p className="text-xs text-neutral-600">
              Assigned Partner: <strong>{activeClient.assignedAccountant}</strong> &bull; Kai Accountants / KP Tax
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView("client_overview")}
          className="text-xs text-neutral-600 hover:text-neutral-900 inline-flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Messages Thread Container */}
      <div className="accountant-card p-5 space-y-4 min-h-[420px] flex flex-col justify-between bg-neutral-50/40">
        <div className="space-y-4 overflow-y-auto max-h-[450px] pr-1">
          {messages.map((m) => {
            const isClient = m.sender === "client";

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isClient ? "items-end" : "items-start"} space-y-1`}
              >
                <div className="flex items-center space-x-1.5 text-[11px] text-neutral-500">
                  <span className="font-semibold text-neutral-800">{m.senderName}</span>
                  <span>&bull;</span>
                  <span>{m.timestamp}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed shadow-xs ${
                    isClient
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white text-neutral-800 border border-neutral-200 rounded-tl-none"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-neutral-200 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="advisor-chat-input"
              aria-label={`Type a message to ${activeClient.assignedAccountant}`}
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Type a message to ${activeClient.assignedAccountant}...`}
              className="flex-1 px-4 py-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
            />
            <button
              type="submit"
              className="touch-target-44 btn-tactile px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-[10px] text-neutral-400">
            Encrypted end-to-end. Official communications are recorded in your statutory practice file.
          </p>
        </form>
      </div>
    </div>
  );
}
