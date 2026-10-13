"use client";

import React from "react";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "Inbound Lead Intake",
      traditional: "8-field static form with 2-day email delay (leads bounce)",
      apex: "60-second live calendar booking + instant WhatsApp channel",
      highlight: true,
    },
    {
      feature: "Client Document Drop",
      traditional: "Shoebox receipts & manual chasing before VAT deadline",
      apex: "1-tap mobile document snap with auto-OCR reconciliation",
      highlight: true,
    },
    {
      feature: "Website Reliability & Architecture",
      traditional: "Cluttered 25-item menus & unmaintained template artifacts",
      apex: "Clean 3-tier curated client packaging with zero clutter",
      highlight: true,
    },
    {
      feature: "Proactive Tax Planning",
      traditional: "Reactive: looks backward 9 months after your financial year end",
      apex: "Quarterly forecasting & continuous director dividend optimization",
    },
    {
      feature: "Specialist Relief Claims (R&D / Full Expensing)",
      traditional: "Often bypassed due to lack of technical specialist capability",
      apex: "Full expensing, Patent Box, and R&D relief evaluated in-house",
    },
    {
      feature: "Partner Availability & SLA",
      traditional: "Junior staff handling files with unpredictable return calls",
      apex: "Direct chartered partner access with transparent SLA",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Comparison Framework
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            Direct contrast between traditional high-street practice bottlenecks and our modern operating model.
          </p>
        </div>

        {/* Institutional Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[680px] bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#0A0C13] border-b border-white/[0.08] p-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              <div className="col-span-4">Operational Capability</div>
              <div className="col-span-4 text-[#64748B]">Traditional Practice (What They Do Now)</div>
              <div className="col-span-4 text-[#EDEDED]">Apex &amp; Co. Model (Our Prototype)</div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 p-4 text-xs items-center transition-colors ${
                    row.highlight
                      ? "bg-white/[0.015] hover:bg-white/[0.03]"
                      : "hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="col-span-4 font-medium text-[#EDEDED] pr-4 flex items-center gap-1.5">
                    <span>{row.feature}</span>
                    {row.highlight && (
                      <span className="text-[9px] font-mono uppercase bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.2 rounded border border-[#D4AF37]/20">
                        Audit Focus
                      </span>
                    )}
                  </div>
                  <div className="col-span-4 text-[#64748B] pr-4 flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                  <div className="col-span-4 text-[#94A3B8] flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-[#EDEDED] font-medium">{row.apex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
