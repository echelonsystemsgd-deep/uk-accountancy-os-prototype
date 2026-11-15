"use client";

import React from "react";
import { TrendingDown, Clock, AlertTriangle, EyeOff, ArrowRight } from "lucide-react";

export default function LossesSection() {
  const losses = [
    {
      num: "0 1",
      icon: <TrendingDown className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Lost Section 24 Relief",
      description:
        "Holding buy-to-let properties in personal names disallows 100% of mortgage interest against higher-rate income tax. Landlords pay punitive tax on gross rental turnover rather than real net profit.",
      impact: "Avg £4,800+ annual tax drag per mortgaged property",
      stat: "40%–45%",
      statLabel: "Personal Tax Trap",
    },
    {
      num: "0 2",
      icon: <Clock className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Lost Hours to Document Chasing",
      description:
        "Scattered WhatsApp photos, lost merchant receipts, and missing contractor invoices. Practices and landlords waste dozens of hours at year-end reconstructing bank paper trails.",
      impact: "14+ hours wasted per year-end on manual reconciliation",
      stat: "14 hrs",
      statLabel: "Wasted Per Return",
    },
    {
      num: "0 3",
      icon: <AlertTriangle className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Extra Rework Fees & Penalties",
      description:
        "Unreconciled Director's Loan Accounts (DLA) trigger severe 33.75% Section 455 tax penalties. Late statutory filings and hourly accountant remediation fees erode investment yield.",
      impact: "33.75% Section 455 tax penalty on unindexed DLA balances",
      stat: "33.75%",
      statLabel: "S455 Penalty Risk",
    },
    {
      num: "0 4",
      icon: <EyeOff className="w-5 h-5 text-[#a4f4cf]" />,
      title: "Blind Portfolio Oversight",
      description:
        "Zero real-time visibility into net portfolio yields, allowable capital vs revenue expenditure, or readiness for HMRC's Making Tax Digital (MTD ITSA) quarterly digital filing deadlines.",
      impact: "100% compliance vulnerability to April 2026 MTD mandates",
      stat: "April 2026",
      statLabel: "MTD Mandate Deadline",
    },
  ];

  return (
    <section id="losses" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header matching XLANE losses header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Where Wealth Leaks Before Year-End</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            Filing property accounts manually costs more than time.
          </h2>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
            Without automated SPV segregation and digital ledger mapping, portfolio landlords leak tens of thousands in unabsorbed mortgage interest, Section 455 surcharges, and reactive accountancy fees.
          </p>
        </div>

        {/* 4 Cards Grid with Monospace 0 1, 0 2, 0 3, 0 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {losses.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#14241d] border border-[#1e382b] hover:border-[#a4f4cf]/40 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Monospace Step Indicator & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#a4f4cf]">
                    {item.num}
                  </span>
                  <div className="p-2 rounded-lg bg-[#0c1813] border border-[#1e382b] group-hover:border-[#a4f4cf]/30 transition-colors">
                    {item.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-[#a4f4cf] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8a9d94] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Stat Chip */}
              <div className="pt-4 border-t border-[#1e382b]/80 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8a9d94]">
                    {item.statLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-400">
                    {item.stat}
                  </span>
                </div>
                <p className="text-[11px] text-[#a4f4cf] font-mono leading-tight">
                  {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
