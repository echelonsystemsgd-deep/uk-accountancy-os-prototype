"use client";

import React from "react";
import { Calendar, ShieldAlert, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export default function RepeatComplianceSection() {
  const pillars = [
    {
      num: "01",
      icon: <Calendar className="w-5 h-5 text-[#a4f4cf]" />,
      title: "The quarterly return. A timely reminder.",
      desc: "Fourteen days prior to each HMRC Making Tax Digital (MTD ITSA) deadline, your accounts are pre-reconciled from live feeds and queued for chartered review.",
      detail: "Automated landlord approval notifications via WhatsApp or Email.",
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Fresh HMRC rule checks, every time.",
      desc: "Our engine dynamically applies current Finance Act statutory thresholds, Section 24 interest allowances, and Corporation Tax marginal relief calculations.",
      detail: "Zero manual tax law research or statutory compliance oversights.",
    },
    {
      num: "03",
      icon: <ShieldAlert className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Ready for Companies House & HMRC filing day.",
      desc: "Because transactions are indexed continuously, your year-end statutory accounts and CT600 pack are finalized days after the accounting period closes.",
      detail: "No 11th-hour document scrambles or late filing penalty risks.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Recurring Compliance Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            Automate recurring compliance. Eliminate HMRC deadlines.
          </h2>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
            Never miss an MTD ITSA quarterly filing or statutory year-end deadline. Continuous digital bookkeeping ensures every claim is HMRC-ready year-round.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((col, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-[#14241d] border border-[#1e382b] hover:border-[#a4f4cf]/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#a4f4cf]">{col.num}</span>
                  <div className="p-2 rounded-lg bg-[#0c1813] border border-[#1e382b]">
                    {col.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#8a9d94] leading-relaxed">
                    {col.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e382b] text-[11px] text-[#a4f4cf] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{col.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
