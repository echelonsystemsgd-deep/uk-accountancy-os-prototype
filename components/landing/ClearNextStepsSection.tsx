"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  PhoneCall,
  Clock,
  Coins,
  FileCheck2,
} from "lucide-react";

export default function ClearNextStepsSection() {
  const { openIntakeModal } = useDemoStore();

  const steps = [
    {
      num: "01",
      badge: "60 SECONDS · FREE",
      title: "Scope Your SPV Tax Relief",
      subtitle:
        "Input your rental turnover and mortgage interest into our diagnostic to calculate your exact Section 24 savings and tax-free DLA extraction pool.",
      highlight: "Saves £4,800+ annually on typical buy-to-let debt.",
      actionLabel: "Run Free Calculator",
      actionType: "scroll_calculator",
      timing: "Takes 60 seconds",
    },
    {
      num: "02",
      badge: "INSTANT API · ZERO CSVs",
      title: "Connect Bank Feeds & Leases",
      subtitle:
        "Link specialist buy-to-let bank accounts (Paragon, Shawbrook, Barclays) with Open Banking. Contractor invoices and tenancy ASTs parse automatically.",
      highlight: "Automatic nominal code matching with 99.4% precision.",
      actionLabel: "See How Ingestion Works",
      actionType: "scroll_how_it_works",
      timing: "Instant sub-second sync",
    },
    {
      num: "03",
      badge: "30-MIN STRATEGY CALL",
      title: "Meet Your Senior Partner",
      subtitle:
        "Schedule a 1-on-1 consultation with Kalpesh Patel FCA or Pritpal Chaggar CTA to finalize your corporate structure and unlock tax-free director drawings.",
      highlight: "ICAEW & CIOT accredited statutory sign-off.",
      actionLabel: "Book Partner Consultation",
      actionType: "open_intake",
      timing: "Same-week availability",
    },
  ];

  const handleAction = (type: string) => {
    if (type === "scroll_calculator") {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (type === "scroll_how_it_works") {
      const el = document.getElementById("how-it-works");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      openIntakeModal();
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#080B11] border-b border-[#1F293D] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162032] border border-[#1F293D] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#a4f4cf]" />
            <span>Clear Next Steps · Confusion-Free Onboarding</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            How to get started. <br className="hidden sm:inline" />
            <span className="text-[#a4f4cf]">Three steps. Zero ambiguity.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Whether you are forming your first SPV limited company or transitioning an established 20-property portfolio out of personal names, here is your exact pathway to full Section 24 relief.
          </p>
        </div>

        {/* 3 Step Cards in Warm Tactile Cream Parchment & British Forest Green */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="space-y-4">
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <span className="font-mono text-2xl font-black text-[#0c1813] tracking-tight">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0c1813] text-[#a4f4cf]">
                    {step.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-stone-900 group-hover:text-[#0c1813] transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {step.subtitle}
                  </p>
                </div>

                {/* Highlight Callout */}
                <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-[11px] font-mono text-[#0c1813] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-medium">{step.highlight}</span>
                </div>
              </div>

              {/* Action Button & Timing */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => handleAction(step.actionType)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0c1813] hover:bg-[#162a20] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm active:scale-[0.98]"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#a4f4cf]" />
                </button>
                <div className="text-center">
                  <span className="text-[10px] font-mono text-stone-600 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-stone-600" />
                    <span>{step.timing}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Reassurance Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111726] border border-[#1F293D] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#a4f4cf]" />
            <span className="font-semibold text-white">Chartered Practice Standard:</span>
            <span className="text-slate-400">ICAEW Supervised &bull; CIOT Accredited &bull; Zero Upfront Fee for Initial Diagnostic</span>
          </div>
          <button
            onClick={() => openIntakeModal()}
            className="text-xs font-bold text-[#a4f4cf] hover:underline flex items-center gap-1"
          >
            <span>Speak with Kalpesh Patel FCA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
