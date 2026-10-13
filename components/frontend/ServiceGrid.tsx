"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileText,
  TrendingUp,
  Receipt,
  Lightbulb,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ServiceGrid() {
  const { setIsIntakeOpen } = useDemoStore();

  const services = [
    {
      icon: FileText,
      title: "Year-End Compliance & CT600",
      tagline: "Impeccable Companies House & HMRC Submissions",
      description:
        "Full preparation and submission of UK statutory accounts, Corporation Tax returns (CT600), director confirmation statements, and board minutes.",
      features: [
        "Filing within 4 weeks of year-end",
        "Direct Companies House electronic gateway",
        "Director loan account reconciliation",
        "HMRC enquiry defense included",
      ],
      tag: "Core Statutory",
    },
    {
      icon: TrendingUp,
      title: "Corporation Tax Planning & Structuring",
      tagline: "Proactive Wealth & Dividend Architecture",
      description:
        "Strategic tax optimization designed before your financial year ends. We structure dividend extracts, salary bands, and family investment companies.",
      features: [
        "Quarterly CT liability forecasting",
        "Director pension & SSAS structuring",
        "Associated company rule assessment",
        "Capital gains & Business Asset Relief",
      ],
      tag: "High-Ticket Advisory",
    },
    {
      icon: Receipt,
      title: "Quarterly VAT & Making Tax Digital",
      tagline: "Frictionless Submissions & Reconciliations",
      description:
        "Seamless VAT compliance across standard rate, flat rate, and partial exemption schemes with zero last-minute document stress.",
      features: [
        "Direct MTD API linking with HMRC",
        "Quarterly reconciliation in 48 hours",
        "Import/export VAT & reverse charge",
        "Automatic digital receipt chasing",
      ],
      tag: "MTD Compliant",
    },
    {
      icon: Lightbulb,
      title: "R&D Tax Relief & Capital Allowances",
      tagline: "Full Expensing & HMRC Incentive Claims",
      description:
        "Maximize non-dilutive capital through legitimate UK government tax incentives under the SME merged scheme and Patent Box regimes.",
      features: [
        "Technical narrative drafting by specialists",
        "100% full expensing asset write-offs",
        "Advance notification compliance",
        "100% success rate on vetted claims",
      ],
      tag: "Non-Dilutive Relief",
    },
    {
      icon: Briefcase,
      title: "Fractional CFO & Board Advisory",
      tagline: "Executive Guidance for Ambitious Founders",
      description:
        "A senior partner on your advisory board. Monthly financial packs, 13-week rolling cash flow forecasts, unit economics, and fundraising readiness.",
      features: [
        "Monthly board presentation pack",
        "Rolling 13-week cash flow modelling",
        "M&A & due diligence preparation",
        "Private Slack & WhatsApp partner access",
      ],
      tag: "Fractional Executive",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#070A0F] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
            Comprehensive Corporate Practice
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight mt-2">
            Five Strategic Pillars for UK Limited Companies
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            From seamless statutory compliance to executive tax architecture, our integrated advisory model replaces slow, generic accounting with elite private-client execution.
          </p>
        </div>

        {/* Services Grid: 3 + 2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B0F17] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-subtle group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111827] border border-[#D4AF37]/30 flex items-center justify-center text-gold-400 group-hover:border-[#D4AF37] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#111827] border border-white/10 text-gold-300">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gold-400/90 font-medium mt-1 mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {s.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-[#D4AF37] text-slate-200 text-xs font-semibold transition-all touch-target-48 active:scale-95"
                >
                  <span>Inquire for Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Second Row: 2 Col wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.slice(3, 5).map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B0F17] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-subtle group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111827] border border-[#D4AF37]/30 flex items-center justify-center text-gold-400 group-hover:border-[#D4AF37] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#111827] border border-white/10 text-gold-300">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gold-400/90 font-medium mt-1 mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 border-t border-white/5 pt-4">
                    {s.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-[#D4AF37] text-slate-200 text-xs font-semibold transition-all touch-target-48 active:scale-95"
                >
                  <span>Inquire for Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
