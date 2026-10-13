"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { MissingDocRadarItem } from "@/lib/types";
import { X, Send, Copy, MessageSquare, Mail } from "lucide-react";

interface ChaserModalProps {
  item: MissingDocRadarItem;
  onClose: () => void;
}

export default function ChaserModal({ item, onClose }: ChaserModalProps) {
  const { chaseDocument } = useDemoStore();
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const magicLink = `https://portal.apexandco.co.uk/dropzone?auth=${item.clientId}&ref=vat-q3`;

  const whatsappMessage = `Hi ${item.directorName},\n\nThis is Apex & Co. Chartered Accountants regarding ${item.companyName}'s ${item.taxPeriod}.\n\nTo finalize your submission ahead of the HMRC statutory deadline, please upload the following outstanding item via your portal link:\n• ${item.documentType}\n\nSecure upload link:\n${magicLink}\n\nKind regards,\nPartner Office • Apex & Co.`;

  const emailSubject = `Document Request: ${item.companyName} (${item.taxPeriod})`;
  const emailBody = `Dear ${item.directorName},\n\nWe are currently finalizing your quarterly accounts for ${item.companyName}.\n\nWe require the following outstanding item:\n• ${item.documentType}\n\nPlease drop this directly into your secure portal:\n${magicLink}\n\nKind regards,\nApex & Co. Practice Advisory`;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      chaseDocument(item.id, channel);
      setIsSending(false);
      onClose();
    }, 400);
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#0D0F17] border-t sm:border border-white/[0.1] sm:rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden text-[#EDEDED] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0A0C13]">
          <div>
            <h3 className="text-sm font-semibold text-[#EDEDED] tracking-tight">
              Automated Document Chaser
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {item.companyName} • {item.taxPeriod}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Channel selector */}
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Dispatch Channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  channel === "whatsapp"
                    ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                    : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp API</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  channel === "email"
                    ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                    : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Notice</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-3 rounded-lg bg-[#08090E] border border-white/[0.06] text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Director:</span>
              <span className="text-[#EDEDED] font-medium">{item.directorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Destination:</span>
              <span className="font-mono text-[#94A3B8]">
                {channel === "whatsapp" ? item.phone : item.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Document:</span>
              <span className="text-rose-400 font-medium">{item.documentType}</span>
            </div>
          </div>

          {/* Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#94A3B8]">
                Template Preview
              </label>
              <button
                onClick={handleCopyLink}
                className="text-[11px] text-[#64748B] hover:text-[#EDEDED] flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied Link" : "Copy Magic Link"}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-[#08090E] border border-white/[0.06] font-mono text-xs text-[#94A3B8] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {channel === "whatsapp" ? whatsappMessage : `${emailSubject}\n\n${emailBody}`}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0A0C13] flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-[#131622] border border-white/[0.08] text-[#94A3B8] text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? "Dispatching..." : `Send Chaser (${channel.toUpperCase()})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
