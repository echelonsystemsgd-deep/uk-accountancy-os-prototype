"use client";

import React from "react";
import { ArrowUpRight, ShieldCheck, Zap, Smartphone, CheckCircle2 } from "lucide-react";

export default function OutcomesRoiSection() {
  const outcomes = [
    {
      num: "0 1",
      title: "Handle 20+ SPVs with zero extra admin",
      desc: "Automate Open Banking reconciliation, invoice OCR, and tenant rental receipts so scaling your portfolio requires zero bookkeeping staff.",
      stat: "90%",
      statLabel: "Admin Time Eliminated",
      metric: "Tracked across active multi-property SPVs",
    },
    {
      num: "0 2",
      title: "Unlock 100% Section 24 mortgage relief",
      desc: "Retain allowable finance cost deductions at 19%–25% Corporation Tax rather than paying 40%–45% personal income tax on gross rental turnover.",
      stat: "£4,850",
      statLabel: "Avg Annual Tax Saved",
      metric: "Per mortgaged buy-to-let residential property",
    },
    {
      num: "0 3",
      title: "Eliminate late filing & Section 455 penalties",
      desc: "Continuous DLA indexing monitors director equity withdrawals, shielding your company from punitive 33.75% Section 455 HMRC tax charges.",
      stat: "33.75%",
      statLabel: "S455 Surcharge Shield",
      metric: "Full digital audit defense guarantee",
    },
    {
      num: "0 4",
      title: "Resolve queries wherever you are",
      desc: "Review your portfolio cashflow, DLA credit balances, and upcoming MTD ITSA quarterly filing deadlines on desktop or mobile in seconds.",
      stat: "Real-Time",
      statLabel: "Mobile Ledger Access",
      metric: "Verified by ICAEW & CIOT partners",
    },
  ];

  return (
    <section id="outcomes" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Measurable Client Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            Move accounts faster. Give your portfolio room to grow.
          </h2>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
            Tangible financial protection and operational freedom for UK portfolio landlords, property developers, and chartered accountancy practices.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-[#14241d] border border-[#1e382b] hover:border-[#a4f4cf]/40 transition-all space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#a4f4cf]">{item.num}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8a9d94] group-hover:text-[#a4f4cf] transition-colors" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-[#a4f4cf] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8a9d94] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e382b] space-y-1 font-mono">
                <div className="text-2xl font-bold text-white tracking-tight">
                  {item.stat}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#a4f4cf]">
                  {item.statLabel}
                </div>
                <div className="text-[11px] text-[#8a9d94] font-sans pt-1">
                  {item.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
