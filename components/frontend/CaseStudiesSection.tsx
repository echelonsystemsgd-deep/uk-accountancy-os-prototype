"use client";

import React from "react";

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      company: "Kensington BioTech Ltd",
      sector: "Life Sciences & R&D",
      turnover: "£1.85M Turnover",
      savings: "£44,600 Tax Saved",
      quote:
        "Apex & Co overhauled our research claims and implemented Patent Box relief. Our previous high-street accountant had missed £28,000 in qualifying development costs.",
      director: "Dr. Alistair Vance, Founder & CEO",
      metrics: [
        { label: "R&D Repayment", value: "£38,400" },
        { label: "Month-End Close", value: "3 Days" },
      ],
    },
    {
      company: "Mayfair Private Capital Ltd",
      sector: "Corporate Advisory",
      turnover: "£3.40M Turnover",
      savings: "£62,300 Dividend Tax Optimization",
      quote:
        "The automated document ingestion and quarterly forecasting eliminated huge unexpected tax bills at year end. Everything is structured months ahead.",
      director: "Sebastian Croft, Managing Partner",
      metrics: [
        { label: "Effective Tax Cut", value: "5.8%" },
        { label: "Hours Saved / Mo", value: "18 Hrs" },
      ],
    },
    {
      company: "Vanguard Architecture Studio Ltd",
      sector: "Prime Architecture",
      turnover: "£920k Turnover",
      savings: "£21,800 Capital Allowances",
      quote:
        "Moving from a traditional firm to Apex & Co was immediate clarity. Zero document chasing before VAT quarters, and clean monthly reporting.",
      director: "Elena Rostova, Design Director",
      metrics: [
        { label: "Asset Expensing", value: "100%" },
        { label: "Filing Accuracy", value: "100%" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Client Case Studies
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            Quantifiable outcomes delivered across owner-managed limited companies and corporate directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((c, i) => (
            <div
              key={i}
              className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#EDEDED]">
                      {c.company}
                    </h3>
                    <span className="text-[11px] text-[#64748B] block">{c.sector}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] bg-[#0B0D13] px-2 py-0.5 rounded border border-white/[0.06]">
                    {c.turnover}
                  </span>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-[#0B0D13] border border-white/[0.06]">
                  <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-mono">
                    Quantified Outcome
                  </span>
                  <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                    {c.savings}
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed italic mb-6">
                  "{c.quote}"
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/[0.06] mb-3">
                  {c.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="text-[10px] text-[#64748B] block">{m.label}</span>
                      <span className="font-mono text-xs font-semibold text-[#EDEDED]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-[#64748B]">
                  {c.director}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
