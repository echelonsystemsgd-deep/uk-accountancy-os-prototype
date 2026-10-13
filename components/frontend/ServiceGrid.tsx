"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileText,
  TrendingUp,
  Receipt,
  Lightbulb,
  Briefcase,
  Check,
  ArrowRight,
} from "lucide-react";

export default function ServiceGrid() {
  const { setIsIntakeOpen } = useDemoStore();

  const services = [
    {
      icon: FileText,
      title: "Year-End Compliance & CT600",
      description:
        "Statutory accounts preparation, Corporation Tax filing, and Companies House electronic submission with full compliance assurance.",
      features: [
        "Filing within 4 weeks of year-end",
        "Direct Companies House electronic gateway",
        "Director loan account reconciliation",
        "HMRC enquiry defense included",
      ],
    },
    {
      icon: TrendingUp,
      title: "Corporation Tax Planning",
      description:
        "Proactive tax optimization structured before accounting reference dates. Dividend timing, salary bands, and family investment structures.",
      features: [
        "Quarterly CT liability forecasting",
        "Director pension & SSAS structuring",
        "Associated company rule assessment",
        "Capital gains & Business Asset Relief",
      ],
    },
    {
      icon: Receipt,
      title: "Quarterly VAT & MTD Submissions",
      description:
        "Making Tax Digital compliance across standard rate, flat rate, and partial exemption schemes with automated invoice reconciliation.",
      features: [
        "Direct MTD API linking with HMRC",
        "Quarterly reconciliation in 48 hours",
        "Import/export VAT & reverse charge",
        "Automated document collection",
      ],
    },
    {
      icon: Lightbulb,
      title: "R&D Tax Relief & Capital Allowances",
      description:
        "Maximizing legitimate government incentive claims under the merged scheme and full expensing capital asset write-offs.",
      features: [
        "Technical narrative drafting by specialists",
        "100% full expensing asset write-offs",
        "Advance notification compliance",
        "Substantiated claim records",
      ],
    },
    {
      icon: Briefcase,
      title: "Fractional CFO & Board Advisory",
      description:
        "Executive financial steering for growing companies. Monthly board packs, rolling 13-week cash flow models, and commercial oversight.",
      features: [
        "Monthly board presentation pack",
        "Rolling 13-week cash flow modelling",
        "M&A & due diligence preparation",
        "Direct partner advisory line",
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Corporate Accounting &amp; Advisory Services
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            From statutory year-end compliance to executive tax planning, our model replaces slow, generic accounting with structured corporate execution.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 flex flex-col justify-between hover:border-white/[0.16] transition-colors"
              >
                <div>
                  {/* Clean 40x40 icon container with 1px border */}
                  <div className="w-10 h-10 rounded-lg bg-[#0E111A] border border-white/10 flex items-center justify-center text-[#EDEDED] mb-4">
                    <Icon className="w-5 h-5 text-[#94A3B8]" />
                  </div>

                  <h3 className="text-base font-semibold text-[#EDEDED]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mt-2 mb-6">
                    {s.description}
                  </p>

                  <div className="space-y-2 border-t border-white/[0.06] pt-4 mb-6">
                    {s.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0E111A] hover:bg-[#131622] border border-white/[0.08] hover:border-white/20 text-[#EDEDED] text-xs font-medium transition-colors"
                >
                  <span>Inquire</span>
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
