"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const { setIsIntakeOpen } = useDemoStore();

  const scrollToCalculator = () => {
    const el = document.getElementById("tax-calculator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Understated Trust Mark */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E111A] border border-white/[0.1] text-xs text-[#94A3B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>ICAEW &amp; ACCA Accredited Practice</span>
          </div>
        </div>

        {/* Hero Headline & Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED] leading-[1.15]">
            Modern Tax Architecture &amp; Accounting for UK Limited Companies
          </h1>

          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate year-end tax surprises, maximize statutory allowances, and access proactive corporate advisory for UK companies generating £150k to £5M+.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-sm py-3 px-6 rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <span>Book Strategic Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] hover:border-white/20 text-[#EDEDED] font-medium text-sm py-3 px-6 rounded-lg transition-colors active:scale-95"
            >
              Estimate Tax &amp; Retainer
            </button>
          </div>
        </div>

        {/* Institutional Metrics Grid (Mercury / Linear Card Style) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { metric: "£18.4M+", label: "Client Tax Optimized", detail: "Statutory allowances & R&D" },
            { metric: "100%", label: "On-Time HMRC Filing", detail: "Zero late filing penalties" },
            { metric: "48 Hrs", label: "Month-End Close", detail: "Automated ingestion pipeline" },
            { metric: "£1,450/mo", label: "Average Value Added", detail: "Identified in initial review" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-4 sm:p-5 text-center"
            >
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#EDEDED] tracking-tight">
                {stat.metric}
              </div>
              <div className="text-xs font-semibold text-[#EDEDED] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
