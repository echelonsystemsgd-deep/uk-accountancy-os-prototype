"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ArrowRight, ShieldCheck, Database, FileCheck2, Clock } from "lucide-react";

export default function TransferTimelineSection() {
  const { setIsCalendarOpen } = useDemoStore();

  const steps = [
    {
      step: "01",
      title: "60-Second Handover",
      tagline: "Zero Awkward Calls or Friction",
      description:
        "You never have to speak with your old accountant. Under ICAEW & ACCA professional conduct guidelines, we issue professional clearance notices and request prior-year working papers directly.",
      icon: Clock,
      detail: "1 email authorization required",
    },
    {
      step: "02",
      title: "Zero-Downtime Ingestion",
      tagline: "Complete Historical Data Migration",
      description:
        "We transfer your live Xero, QuickBooks, FreeAgent, and HMRC electronic gateways. Prior-year accounts, payroll schedules, and VAT history imported with zero manual re-entry.",
      icon: Database,
      detail: "Completed within 48 hours",
    },
    {
      step: "03",
      title: "Continuous Compliance",
      tagline: "Zero Penalty Guarantee",
      description:
        "Full tax coverage is established immediately. We align upcoming VAT quarters and statutory CT600 deadlines so you never experience late filing penalties during or after the transition.",
      icon: FileCheck2,
      detail: "100% on-time record maintained",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E111A] border border-white/[0.1] text-xs text-[#94A3B8] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ICAEW &amp; ACCA Clearance Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            3-Step Hassle-Free Transfer
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            Business owners stay with underperforming accountants because they fear transition chaos. Here is how we guarantee a clean, zero-downtime transfer.
          </p>
        </div>

        {/* 3-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 flex flex-col justify-between hover:border-white/[0.16] transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                      Step {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#0E111A] border border-white/[0.08] flex items-center justify-center text-[#94A3B8]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#EDEDED]">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5 mb-2">
                    {s.tagline}
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                  <span>Status:</span>
                  <span className="text-[#EDEDED]">{s.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-3 px-6 rounded-lg transition-colors shadow-sm active:scale-95"
          >
            <span>Initiate 60-Second Handover Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
