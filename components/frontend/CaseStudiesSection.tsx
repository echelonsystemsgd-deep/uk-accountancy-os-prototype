"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { TrendingUp, Quote, Building2, CheckCircle2 } from "lucide-react";

export default function CaseStudiesSection() {
  const { setIsIntakeOpen } = useDemoStore();

  const caseStudies = [
    {
      company: "Kensington BioTech Ltd",
      sector: "Pharmaceutical & Life Sciences",
      turnover: "£1.85M Annual Turnover",
      savings: "£44,600 Saved in Tax & R&D",
      quote:
        "Apex & Co overhauled our research claims and implemented Patent Box relief. Our previous high-street accountant had missed £28,000 in qualifying software development costs.",
      director: "Dr. Alistair Vance, Founder & CEO",
      metrics: [
        { label: "R&D Tax Repayment", value: "£38,400" },
        { label: "Close Speed", value: "3 Days" },
      ],
    },
    {
      company: "Mayfair Private Capital Ltd",
      sector: "Specialist Corporate Finance",
      turnover: "£3.40M Annual Turnover",
      savings: "£62,300 Dividend Tax Optimization",
      quote:
        "The Partner Command Hub and digital dropzone changed everything. Zero paperwork chasing before VAT quarters, and their quarterly director forecasting eliminated huge unexpected tax bills.",
      director: "Sebastian Croft, Managing Partner",
      metrics: [
        { label: "Effective Tax Cut", value: "5.8%" },
        { label: "Hours Saved / Mo", value: "18 Hrs" },
      ],
    },
    {
      company: "Vanguard Architecture Studio Ltd",
      sector: "High-End Prime Residential",
      turnover: "£920k Annual Turnover",
      savings: "£21,800 Capital Allowances",
      quote:
        "Moving from a traditional firm to Apex & Co was like stepping from 1995 into 2026. Instant WhatsApp updates, live retainer transparency, and flawless HMRC compliance.",
      director: "Elena Rostova, Design Director",
      metrics: [
        { label: "Capital Expensing", value: "100%" },
        { label: "Filing Accuracy", value: "100%" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0F17] border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
            Quantified Client Outcomes
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight mt-2">
            Proven Tax Architecture in Practice
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Real impact delivered to high-growth UK owner-managed businesses and corporate directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((c, i) => (
            <div
              key={i}
              className="bg-[#070A0F] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-subtle"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      {c.company}
                    </h3>
                    <span className="text-[11px] text-slate-400 block">{c.sector}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gold-300 bg-[#111827] px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    {c.turnover}
                  </span>
                </div>

                <div className="mb-4 p-3 rounded-xl bg-[#111827] border border-[#D4AF37]/25">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Quantified Result</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {c.savings}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                  "{c.quote}"
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/5 mb-4">
                  {c.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="text-[10px] text-slate-400 block">{m.label}</span>
                      <span className="font-mono text-xs font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] font-medium text-gold-400">
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
