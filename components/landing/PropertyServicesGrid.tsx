"use client";

import React from "react";
import {
  TrendingUp,
  Building2,
  FileCheck2,
  ShieldCheck,
  Coins,
  Scale,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function PropertyServicesGrid() {
  const services = [
    {
      title: "Section 24 SPV Mortgage Relief",
      icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
      tag: "Corporate Finance Shield",
      description:
        "Purchasing properties within an SPV Limited Company unlocks 100% mortgage interest deductibility at 19%–25% Corporation Tax, completely bypassing the individual Section 24 restriction.",
      outcome: "Full interest deduction against profits + access to specialist commercial buy-to-let mortgage terms.",
    },
    {
      title: "Director’s Loan Account (DLA) Architecture",
      icon: <Coins className="w-5 h-5 text-indigo-400" />,
      tag: "Tax-Free Capital Extraction",
      description:
        "Index your initial property deposits, SDLT, and conveyancing legal costs into a dedicated DLA ledger. Withdraw rental profits 100% tax-free as loan repayments before triggering dividend taxes.",
      outcome: "0% Income Tax and 0% National Insurance on capital extraction with strict Section 455 safeguards.",
    },
    {
      title: "1-Click CT600 & HMRC Year-End Tax Pack",
      icon: <FileCheck2 className="w-5 h-5 text-sky-400" />,
      tag: "Statutory Reporting",
      description:
        "Automated preparation of your Profit & Loss Statement, Balance Sheet, Section 24 Finance Cost Schedule, and Capital Asset basis, formatted for instant submission to your Chartered Accountant.",
      outcome: "Zero receipt chasing: verified PDF executive summaries and pre-categorized CSV schedules.",
    },
    {
      title: "Capital vs Revenue Expenditure Indexing",
      icon: <Scale className="w-5 h-5 text-emerald-400" />,
      tag: "Capital Gains Tax (CGT) Basis",
      description:
        "Segregate day-to-day allowable repairs (boiler fixes, gas safety checks) from capital additions (SDLT, legal fees, extensions) to index your base cost and minimize future Corporation Tax on chargeable gains.",
      outcome: "Accurate computation of base cost reducing tax liabilities upon eventual property disposal.",
    },
    {
      title: "Zero-Cost Autonomous Document OCR",
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
      tag: "Machine Extraction",
      description:
        "Drag-and-drop contractor invoices, utility bills, and mortgage schedules. Serverless heuristic OCR extracts vendor, date, 20% VAT, and automatically maps to HMRC CT600 expenditure accounts.",
      outcome: "Sub-second parsing eliminates manual bookkeeping overhead and missing expense receipts.",
    },
    {
      title: "Making Tax Digital (MTD ITSA) Readiness",
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      tag: "HMRC Compliance",
      description:
        "Architected specifically for HMRC's Making Tax Digital mandates. Segregates multiple SPV entities and personal landlord returns with continuous quarterly digital record-keeping.",
      outcome: "Full compliance with April 2026 MTD requirements with automated submission-ready ledgers.",
    },
  ];

  return (
    <section id="specialisms" className="py-14 sm:py-20 bg-[#0B0F19] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
            CORE INFRASTRUCTURE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized UK Property &amp; Wealth Accountancy Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every feature is purpose-built to maximize allowable statutory claims, protect director wealth, and eliminate compliance bottlenecks.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="accountant-card p-6 bg-[#162032] border border-[#1F293D] hover:border-slate-700 rounded-xl space-y-4 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-[#111827] border border-[#1F293D]">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 uppercase tracking-wider">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F293D] text-[11px] text-emerald-400 font-medium flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{service.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
