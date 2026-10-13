"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Clock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function WhatsAppQuickChat() {
  const { isWhatsAppOpen, setIsWhatsAppOpen, setIsCalendarOpen } = useDemoStore();
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [partnerResponse, setPartnerResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    {
      q: "Can I expense equipment before year-end?",
      a: "Yes. Under UK 100% full expensing rules, qualifying IT hardware, vans, and commercial plant can be deducted directly against this year's Corporation Tax bill before your reference date closes.",
    },
    {
      q: "How fast can we switch accountants?",
      a: "The entire transfer takes less than 5 minutes on your side. We handle professional clearance directly with your existing firm under ICAEW/ACCA standards and transfer software feeds with zero downtime.",
    },
    {
      q: "What is the 2026 Corporation Tax marginal relief limit?",
      a: "Profits up to £50,000 are taxed at the 19% small profits rate. Between £50,000 and £250,000, marginal relief tapers smoothly up to the 25% main rate. We can calculate your exact effective rate.",
    },
  ];

  const handleSelectPrompt = (prompt: { q: string; a: string }) => {
    setActiveQuestion(prompt.q);
    setIsTyping(true);
    setPartnerResponse(null);

    setTimeout(() => {
      setIsTyping(false);
      setPartnerResponse(prompt.a);
    }, 450);
  };

  const directWhatsAppUrl =
    "https://wa.me/442079460192?text=Hello%20Apex%20%26%20Co%2C%20I%20have%20an%20urgent%20tax%20question%20regarding%20my%20UK%20limited%20company";

  return (
    <>
      {/* Floating Badge (Bottom-Left) */}
      <div className="fixed bottom-20 sm:bottom-5 left-4 z-40 select-none">
        {!isWhatsAppOpen ? (
          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="bg-[#0B0D13] hover:bg-[#121622] border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.6)] px-3 py-2 rounded-xl text-xs text-[#EDEDED] flex items-center gap-2.5 transition-all active:scale-95 group"
            aria-label="Open WhatsApp live inquiry"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-3 h-3" />
            </div>
            <div className="text-left hidden xs:block">
              <div className="text-xs font-medium text-[#EDEDED] flex items-center gap-1.5">
                <span>Ask a Tax Director on WhatsApp</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[10px] text-[#64748B] font-mono">
                Average reply: &lt;5 mins
              </div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Interactive WhatsApp Quick-Chat Window */}
      {isWhatsAppOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 sm:bottom-5 left-4 z-50 w-[92vw] sm:w-96 bg-[#0D0F17] border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden text-[#EDEDED] flex flex-col animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#0A0C13]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0A0C13]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#EDEDED] tracking-tight">
                  Senior Tax Director • Online
                </h4>
                <p className="text-[10px] text-[#64748B] font-mono">
                  Average reply time: under 5 minutes
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWhatsAppOpen(false)}
              className="p-1 text-[#64748B] hover:text-[#EDEDED] rounded transition-colors"
              aria-label="Close chat window"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto text-xs">
            {/* Introductory bubble */}
            <div className="bg-[#131622] border border-white/[0.06] rounded-lg p-3 text-xs text-[#94A3B8] leading-relaxed">
              <p className="text-[#EDEDED] font-medium mb-1">
                Direct Tax Advisory Line
              </p>
              Have an urgent Corporation Tax, VAT, or switching query? Tap a question below or message our partner line directly.
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-[#64748B] block">
                Quick Director Inquiries:
              </span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPrompt(p)}
                  className={`w-full text-left p-2 rounded-lg border text-[11px] transition-colors leading-snug ${
                    activeQuestion === p.q
                      ? "bg-[#1A1F2D] border-white/20 text-[#EDEDED]"
                      : "bg-[#08090E] border-white/[0.06] text-[#94A3B8] hover:border-white/15 hover:text-[#EDEDED]"
                  }`}
                >
                  {p.q}
                </button>
              ))}
            </div>

            {/* Simulated Live Response */}
            {isTyping && (
              <div className="bg-[#101420] border border-white/[0.06] rounded-lg p-2.5 text-[11px] text-[#64748B] font-mono flex items-center gap-1.5 animate-pulse">
                <span>Tax Partner typing</span>
                <span className="inline-block w-1 h-1 bg-[#64748B] rounded-full animate-bounce" />
              </div>
            )}

            {partnerResponse && (
              <div className="bg-[#121622] border border-white/[0.1] rounded-lg p-3 text-xs text-[#EDEDED] leading-relaxed space-y-2 animate-in fade-in">
                <div className="text-[10px] text-[#D4AF37] font-mono uppercase">
                  Partner Guidance:
                </div>
                <p>{partnerResponse}</p>
                <button
                  onClick={() => {
                    setIsWhatsAppOpen(false);
                    setIsCalendarOpen(true);
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-1 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-[11px] py-1.5 px-3 rounded-md transition-colors"
                >
                  <span>Lock in 15-Min Video Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t border-white/[0.08] bg-[#0A0C13] flex gap-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Launch WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
