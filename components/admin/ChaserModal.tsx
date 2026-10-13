"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { MissingDocRadarItem } from "@/lib/types";
import {
  X,
  Send,
  MessageSquare,
  Mail,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Copy,
} from "lucide-react";

interface ChaserModalProps {
  item: MissingDocRadarItem;
  onClose: () => void;
}

export default function ChaserModal({ item, onClose }: ChaserModalProps) {
  const { chaseDocument } = useDemoStore();
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  // Customized polite HMRC deadline chaser with auto-magic upload link
  const magicLink = `https://portal.apexandco.co.uk/dropzone?auth=${item.clientId}&ref=vat-q3`;

  const whatsappMessage = `Hi ${item.directorName},\n\nHope you're having a productive week. This is Apex & Co. Chartered Accountants.\n\nQuick note regarding ${item.companyName}'s ${item.taxPeriod}: we're finalizing your return and are missing your ${item.documentType}.\n\nTo ensure we beat HMRC's statutory deadline without penalties, could you snap or upload it using your practice link below? It takes 10 seconds:\n${magicLink}\n\nMany thanks,\nSenior Partner Office • Apex & Co.`;

  const emailSubject = `Urgent Document Request: ${item.companyName} (${item.taxPeriod})`;
  const emailBody = `Dear ${item.directorName},\n\nWe are currently completing your quarterly accounts reconciliation for ${item.companyName}.\n\nWe require the following outstanding item to finalize your submission:\n• ${item.documentType}\n\nYou can securely drop this directly into your dedicated client portal here:\n${magicLink}\n\nKind regards,\nApex & Co. Practice Advisory Team`;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      chaseDocument(item.id, channel);
      setIsSending(false);
      onClose();
    }, 700);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(magicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-[#0B0F17] border-t sm:border border-[#D4AF37]/40 sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070A0F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base sm:text-lg font-semibold text-white">
                1-Click Automated Chaser Dispatch
              </h3>
              <p className="text-[11px] text-gold-400">
                {item.companyName} • {item.taxPeriod}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close chaser modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Channel selector */}
          <div>
            <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
              Dispatch Channel
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  channel === "whatsapp"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm"
                    : "bg-[#070A0F] border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Business API</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  channel === "email"
                    ? "bg-[#D4AF37]/20 border-[#D4AF37] text-gold-300 shadow-sm"
                    : "bg-[#070A0F] border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <Mail className="w-4 h-4 text-gold-400" />
                <span>Executive Email Notice</span>
              </button>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="p-3.5 rounded-xl bg-[#070A0F] border border-white/10 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Recipient Director:</span>
              <span className="font-semibold text-white">{item.directorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Contact Route:</span>
              <span className="font-mono text-gold-300">
                {channel === "whatsapp" ? item.phone : item.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Outstanding Item:</span>
              <span className="text-rose-400 font-medium">{item.documentType}</span>
            </div>
          </div>

          {/* Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Ready-to-Send Template
              </label>
              <button
                onClick={handleCopyLink}
                className="text-[11px] text-gold-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied Link!" : "Copy Portal Link"}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070A0F] border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto">
              {channel === "whatsapp" ? whatsappMessage : `${emailSubject}\n\n${emailBody}`}
            </div>
          </div>

          {/* Compliance note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes personalized magic auth token. Client requires zero passwords to drop receipts.</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-white/10 bg-[#070A0F] flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-slate-300 text-xs touch-target-48 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-black" />
            <span>{isSending ? "Dispatching via API..." : `Send 1-Click Reminder (${channel.toUpperCase()})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
