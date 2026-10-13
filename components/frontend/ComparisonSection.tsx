"use client";

import React from "react";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "Proactive Tax Planning",
      traditional: "Reactive: looks backward 9 months after your financial year end",
      apex: "Quarterly forecasting & continuous director dividend optimization",
    },
    {
      feature: "Document Ingestion",
      traditional: "Paper shoebox or manual email chasing right at deadline",
      apex: "Direct mobile snap dropzone with automated OCR data capture",
    },
    {
      feature: "HMRC Filing & MTD",
      traditional: "Rushed submissions prone to late filing queries",
      apex: "Electronic gateway with 100% on-time record and full audit trail",
    },
    {
      feature: "Specialist Relief Claims",
      traditional: "Often bypassed due to lack of technical specialist capability",
      apex: "Full expensing, Patent Box, and R&D relief evaluated in-house",
    },
    {
      feature: "Partner Access",
      traditional: "Junior staff handling files with slow turnaround",
      apex: "Direct chartered partner access with transparent SLA",
    },
    {
      feature: "Fee Transparency",
      traditional: "Unpredictable hourly billing and surprise year-end invoices",
      apex: "Fixed monthly retainer covering statutory compliance & advice",
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
            How traditional high-street accounting differs from our structured practice model.
          </p>
        </div>

        {/* Institutional Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#0A0C13] border-b border-white/[0.08] p-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              <div className="col-span-4">Capability</div>
              <div className="col-span-4 text-[#64748B]">Traditional Practice</div>
              <div className="col-span-4 text-[#EDEDED]">Apex &amp; Co. Model</div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 text-xs items-center hover:bg-white/[0.01] transition-colors"
                >
                  <div className="col-span-4 font-medium text-[#EDEDED] pr-4">
                    {row.feature}
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
