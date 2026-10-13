"use client";

import React from "react";
import { Check, X, ShieldCheck, Sparkles } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function ComparisonSection() {
  const { setIsIntakeOpen } = useDemoStore();

  const comparisons = [
    {
      feature: "Proactive Tax Planning",
      traditional: "Reactive: looks backward 9 months after your financial year end",
      apex: "Live quarterly forecasting & strategic director dividend optimization",
    },
    {
      feature: "Receipt & Document Ingestion",
      traditional: "Shoebox of paper or stressful email chasing days before deadlines",
      apex: "Instant mobile snap dropzone with automated AI OCR categorization",
    },
    {
      feature: "HMRC Filing & MTD Compliance",
      traditional: "Rushed submissions prone to HMRC enquiries and late fees",
      apex: "100% on-time record with electronic gateway & full audit defense",
    },
    {
      feature: "Specialist Relief Claims (R&D / Full Expensing)",
      traditional: "Often ignored due to lack of specialist technical capability",
      apex: "In-house R&D specialists claiming full statutory reliefs legitimately",
    },
    {
      feature: "Partner Availability & Communication",
      traditional: "Days to return a phone call; unfamiliar junior staff handle your file",
      apex: "Dedicated senior chartered partner with direct WhatsApp/Slack line",
    },
    {
      feature: "Fee Structure",
      traditional: "Unpredictable hourly billing and surprise annual audit invoices",
      apex: "Transparent monthly fixed retainer with all statutory compliance included",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#070A0F] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
            The Modern Standard
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight mt-2">
            Traditional Practice vs. Apex &amp; Co. Strategic OS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Why high-growth UK directors and founders switch to our unified advisory model.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[680px] bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#111827] border-b border-white/10 p-4 text-xs font-semibold uppercase tracking-wider">
              <div className="col-span-4 text-slate-400">Core Capability</div>
              <div className="col-span-4 text-rose-300/80 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-400" />
                <span>Traditional High-Street Firm</span>
              </div>
              <div className="col-span-4 text-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Apex &amp; Co. Architecture</span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 text-xs sm:text-sm items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-4 font-medium text-white pr-4">
                    {row.feature}
                  </div>
                  <div className="col-span-4 text-slate-400 pr-4 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span className="text-xs text-slate-400">{row.traditional}</span>
                  </div>
                  <div className="col-span-4 text-slate-200 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-gold-100 font-medium">{row.apex}</span>
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
