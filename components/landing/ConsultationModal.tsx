"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { X, ArrowRight, ShieldCheck } from "lucide-react";

export default function ConsultationModal() {
  const { isIntakeModalOpen, closeIntakeModal, triggerToast } = useDemoStore();

  const [fullName, setFullName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [entityType, setEntityType] = useState<"individual" | "joint" | "spv_ltd">("spv_ltd");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isIntakeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      closeIntakeModal();
      triggerToast(
        "Consultation Request Received",
        `Thank you ${fullName}. Kalpesh Patel FCA and Pritpal Chaggar CTA will review your ${entityName || "property"} details.`,
        "success"
      );
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="max-w-lg w-full p-6 bg-[#14241d] border border-[#1e382b] rounded-2xl space-y-5 shadow-2xl relative text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold text-xs shrink-0">
              KP
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-white leading-tight">
                Book Initial Property Tax Consultation
              </h2>
              <p className="text-xs text-[#8a9d94] font-mono">
                KP Tax Consultants &bull; Chartered Tax Advisers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIntakeModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 block">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sukhpreet Kaur"
                className="w-full px-3 py-2 text-xs border border-[#1e382b] rounded-lg bg-[#0c1813] text-white focus:outline-none focus:border-[#a4f4cf]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300 block">Property / Entity Name *</label>
              <input
                type="text"
                required
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="e.g. SUKHPREET KAUR LEGACY WEALTH LTD"
                className="w-full px-3 py-2 text-xs border border-[#1e382b] rounded-lg bg-[#0c1813] text-white focus:outline-none focus:border-[#a4f4cf]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 block">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7851 055929"
                className="w-full px-3 py-2 text-xs border border-[#1e382b] rounded-lg bg-[#0c1813] text-white focus:outline-none focus:border-[#a4f4cf] font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300 block">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sukhpreet@legacywealth.co.uk"
                className="w-full px-3 py-2 text-xs border border-[#1e382b] rounded-lg bg-[#0c1813] text-white focus:outline-none focus:border-[#a4f4cf] font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300 block">Holding Structure</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "spv_ltd", label: "SPV Ltd Co" },
                { id: "personal", label: "Personal Name" },
                { id: "joint", label: "Joint / Spouses" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEntityType(opt.id as "individual" | "joint" | "spv_ltd")}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition text-[11px] font-mono ${
                    entityType === opt.id
                      ? "border-[#a4f4cf] bg-[#a4f4cf]/10 text-white font-bold"
                      : "border-[#1e382b] hover:border-[#8a9d94] text-[#8a9d94] bg-[#0c1813]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300 block">Specific Tax Goals or Questions</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Concerned about Section 24 higher-rate tax, looking to incorporate 4 buy-to-lets into an SPV company..."
              className="w-full p-2.5 text-xs border border-[#1e382b] rounded-lg focus:outline-none focus:border-[#a4f4cf] text-white bg-[#0c1813]"
            />
          </div>

          <div className="pt-2 border-t border-[#1e382b] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[11px] text-[#8a9d94]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>Direct Partner Consultation</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="touch-target-44 px-5 py-2.5 rounded-lg text-xs font-semibold text-[#0c1813] bg-[#a4f4cf] hover:bg-[#8ae8bd] transition inline-flex items-center space-x-1.5 shadow-sm font-bold active:scale-95"
            >
              <span>{isSubmitting ? "Dispatching..." : "Submit Confidential Intake"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0c1813]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
