"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Calculator,
  Building2,
  CheckCircle,
  FileText,
  Lock,
} from "lucide-react";

export default function HeroSection() {
  const { setIsIntakeOpen } = useDemoStore();

  const scrollToCalculator = () => {
    const el = document.getElementById("tax-calculator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-[#070A0F] border-b border-[#D4AF37]/15">
      {/* Background radial gold aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#182234]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditation Pill Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 animate-in fade-in slide-in-from-top-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-[#D4AF37]/30 text-xs text-gold-300 shadow-gold-subtle">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span className="font-medium">ICAEW & ACCA Chartered Practice</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-white/10 text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Making Tax Digital (MTD) Ready</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-white/10 text-xs text-slate-400">
            <span>Mayfair • City of London</span>
          </div>
        </div>

        {/* Central Headline & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Modern Tax Architecture &amp; Strategic Accounting for{" "}
            <span className="gold-text-gradient">UK Limited Companies</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate year-end tax surprises, claim every statutory allowance, and experience proactive private-client advisory engineered specifically for UK companies generating £150k to £5M+.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#BA9528] text-black font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-gold-glow hover:brightness-110 active:scale-95 transition-all touch-target-48"
            >
              <span>Book Strategic Consultation</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B0F17] hover:bg-[#111827] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 text-gold-300 font-medium text-sm py-4 px-7 rounded-full active:scale-95 transition-all touch-target-48"
            >
              <Calculator className="w-4 h-4 text-gold-400" />
              <span>Corporation Tax &amp; Fee Estimator</span>
            </button>
          </div>
        </div>

        {/* Floating Trust Metrics Showcase */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { metric: "£18.4M+", label: "Client Corporation Tax Optimized", detail: "Statutory allowances & R&D" },
            { metric: "100%", label: "HMRC On-Time Filing Record", detail: "Zero late filing penalties" },
            { metric: "48 Hrs", label: "Average Month-End Close", detail: "Live digital dropzone pipeline" },
            { metric: "£1,450/mo", label: "Average Value Added", detail: "Identified in initial review" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0B0F17]/90 border border-[#D4AF37]/20 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm"
            >
              <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-gold-300">
                {stat.metric}
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
