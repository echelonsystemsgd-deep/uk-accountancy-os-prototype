"use client";

import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Coins,
  Scale,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function InteractiveJourneySection() {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1 interactive state
  const [ingestChannel, setIngestChannel] = useState<"bank" | "invoice">("bank");
  // Step 3 interactive state
  const [s24Mode, setS24Mode] = useState<"spv" | "personal">("spv");
  // Step 5 modal state
  const [isTaxPackOpen, setIsTaxPackOpen] = useState(false);

  const steps = [
    {
      id: "ingest",
      num: "01",
      navLabel: "01 Ingest",
      badge: "01 / AUTOMATED INGESTION",
      title: "Give every bank entry and expense receipt a place to start.",
      subtitle:
        "Direct Open Banking integration with UK specialist buy-to-let lenders (Paragon, Aldermore, Shawbrook, Barclays) combined with serverless OCR for trade receipts.",
      points: [
        "Sub-second sync with dedicated SPV business accounts.",
        "Serverless OCR extracts merchant, invoice date, and 20% VAT split.",
        "Zero manual CSV formatting or shoe-box receipt scanning.",
      ],
      statute: "Compliant with HMRC Digital Record-Keeping Regulations",
    },
    {
      id: "matched",
      num: "02",
      navLabel: "02 OCR Match",
      badge: "02 / NOMINAL MATCHING",
      title: "The right nominal code, tax treatment, and asset basis.",
      subtitle:
        "Heuristic matching algorithm maps transactions directly into the UK Property Chart of Accounts with 99.4% precision.",
      points: [
        "Differentiates between Code 7100 (Finance Costs) and Code 7200 (Allowable Repairs).",
        "Flags capital improvements for Capital Gains Tax (CGT) base-cost indexing.",
        "Eliminates misclassification audits before accountant review.",
      ],
      statute: "Mapped to HMRC Property Income Manual (PIM2000)",
    },
    {
      id: "s24",
      num: "03",
      navLabel: "03 S24 & VAT",
      badge: "03 / STATUTORY RELIEF",
      title: "100% mortgage interest deductibility vs personal tax traps.",
      subtitle:
        "Automated Section 24 corporate tax engine shields your rental turnover from punitive 40%–45% personal income tax brackets.",
      points: [
        "Locks in full interest deductions at 19%–25% Corporation Tax rates.",
        "Models Section 24 impact across sole-trader vs SPV corporate structures.",
        "Calculates exact annual tax savings on high-leverage portfolios.",
      ],
      statute: "Finance Act 2015 s.24 & CTA 2009 Part 5 Loan Relationships",
    },
    {
      id: "dla",
      num: "04",
      navLabel: "04 DLA Ledger",
      badge: "04 / CAPITAL EXTRACTION",
      title: "Withdraw rental profits 100% tax-free through DLA indexing.",
      subtitle:
        "Index your initial cash equity, SDLT stamp duty, and legal conveyancing fees into a real-time Director's Loan Account ledger.",
      points: [
        "Withdraw rental proceeds tax-free as loan repayments before dividends.",
        "Built-in Section 455 safeguard flags overdrawn loan risks (33.75% tax penalty).",
        "Tracks multi-director ownership splits and inter-company loans.",
      ],
      statute: "CTA 2010 Section 455 Safeguard Architecture",
    },
    {
      id: "taxpack",
      num: "05",
      navLabel: "05 CT600 Pack",
      badge: "05 / STATUTORY REPORTING",
      title: "1-Click CT600 tax return and executive landlord tax pack.",
      subtitle:
        "Generate publication-ready statutory accounts, rental profit & loss statements, balance sheets, and capital cost schedules.",
      points: [
        "Formatted for immediate submission by ICAEW/CIOT Chartered Accountants.",
        "Includes full Section 24 finance cost schedule and capital asset basis.",
        "High-density vector A4 PDF export with verifiable audit hashes.",
      ],
      statute: "Companies House Micro-Entity (FRS 105) & HMRC CT600 Ready",
    },
    {
      id: "filed",
      num: "06",
      navLabel: "06 HMRC Filed",
      badge: "06 / DIGITAL SUBMISSION",
      title: "Continuous Making Tax Digital (MTD ITSA) filing readiness.",
      subtitle:
        "Direct API readiness for HMRC's Making Tax Digital mandates with complete immutable audit trails for every transaction.",
      points: [
        "Zero receipt chasing: every claim backed by verified bank feeds.",
        "Instant digital filing certificates with statutory submission timestamps.",
        "Audit-defense shield protects property directors in compliance reviews.",
      ],
      statute: "Full April 2026 MTD ITSA Statutory Compliance",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading matching XLANE */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Automated Accounting Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            How it works.
          </h2>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
            From live mortgage interest debit to verified HMRC CT600 year-end filing. A closed-loop operating system engineered for UK property investors and chartered practices.
          </p>
        </div>

        {/* Sticky Pinned Navigation matching XLANE steps nav */}
        <div className="sticky top-16 z-30 py-3 bg-[#0c1813]/95 backdrop-blur border-y border-[#1e382b] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  const el = document.getElementById(`step-${step.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeStep === idx
                    ? "bg-[#a4f4cf] text-[#0c1813] shadow-sm font-bold"
                    : "bg-[#14241d] text-[#8a9d94] hover:text-white border border-[#1e382b]"
                }`}
              >
                <span>{step.navLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The 6 Steps Flow */}
        <div className="space-y-24 pt-8">
          {/* STEP 1: INGEST */}
          <div
            id="step-ingest"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60 first:border-t-0"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>01 / AUTOMATED INGESTION</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                Give every transaction and invoice a place to start.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                Connect live Open Banking feeds from specialist lenders or drag-and-drop contractor PDF invoices. Raw data is parsed, normalized, and timestamped instantly.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Direct Open Banking sync with Paragon, Aldermore, and Shawbrook.",
                  "Serverless OCR extracts vendor, invoice date, and 20% VAT split.",
                  "Zero manual CSV formatting or shoe-box receipt scanning.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">Compliant with HMRC Digital Record-Keeping Regulations</span>
              </div>
            </div>

            {/* Interactive Component 1 */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIngestChannel("bank")}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                        ingestChannel === "bank"
                          ? "bg-[#a4f4cf] text-[#0c1813] font-bold"
                          : "text-[#8a9d94] hover:text-white"
                      }`}
                    >
                      Paragon Bank Feed
                    </button>
                    <button
                      onClick={() => setIngestChannel("invoice")}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                        ingestChannel === "invoice"
                          ? "bg-[#a4f4cf] text-[#0c1813] font-bold"
                          : "text-[#8a9d94] hover:text-white"
                      }`}
                    >
                      Contractor OCR Invoice
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-[#a4f4cf] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a4f4cf] animate-pulse"></span>
                    Live Feed Active
                  </span>
                </div>

                {/* Tactile Parchment Card on Top/Left */}
                {ingestChannel === "bank" ? (
                  <div className="p-5 rounded-lg bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 font-mono shadow-sm">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 text-xs">
                      <span className="font-bold text-stone-900 uppercase">PARAGON BANK PLC · OPEN BANKING</span>
                      <span className="text-stone-500">TXN-904210</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <div>
                        <div className="text-[10px] uppercase text-stone-500">Statement Description</div>
                        <div className="text-sm font-bold text-stone-900">PARAGON MTG INT #14892011</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase text-stone-500">Amount</div>
                        <div className="text-base font-bold text-red-700">-£1,420.00</div>
                      </div>
                    </div>
                    <div className="pt-2 text-[10px] text-stone-600 border-t border-stone-200 flex justify-between">
                      <span>Facility: 14 Belgrave Place SPV Ltd</span>
                      <span>Sort: 20-45-77 · Acc: ••••4018</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-lg bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 font-mono shadow-sm">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 text-xs">
                      <span className="font-bold text-stone-900 uppercase">APEX PLUMBING & HEATING LTD</span>
                      <span className="text-stone-500">INV-2026-881</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <div>
                        <div className="text-[10px] uppercase text-stone-500">Bill Description</div>
                        <div className="text-sm font-bold text-stone-900">Boiler Replacement & Gas Cert</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase text-stone-500">Gross Total</div>
                        <div className="text-base font-bold text-stone-900">£1,200.00</div>
                      </div>
                    </div>
                    <div className="pt-2 text-[10px] text-stone-600 border-t border-stone-200 flex justify-between">
                      <span>Net: £1,000.00 · VAT (20%): £200.00</span>
                      <span>Category: Revenue Repair</span>
                    </div>
                  </div>
                )}

                {/* Auto-classification Engine Response */}
                <div className="p-4 rounded-lg bg-[#0c1813] border border-[#1e382b] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#a4f4cf] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#a4f4cf]" />
                      Auto-Classification Engine
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      99.8% Match Confidence
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#8a9d94] block">HMRC Account</span>
                      <span className="text-white font-bold">
                        {ingestChannel === "bank" ? "Code 7100 (Finance)" : "Code 7200 (Repairs)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8a9d94] block">Tax Treatment</span>
                      <span className="text-[#a4f4cf] font-bold">
                        {ingestChannel === "bank" ? "Section 24 (100% Corp Relief)" : "100% Revenue Allowable"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8a9d94] block">Tax Saving</span>
                      <span className="text-white font-bold">
                        {ingestChannel === "bank" ? "£284.00 on this txn" : "£250.00 Corp Tax relief"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: NOMINAL MATCHING */}
          <div
            id="step-matched"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>02 / NOMINAL MATCHING</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                The right nominal code, tax treatment, and asset basis.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                Transactions automatically map into the UK Property Chart of Accounts. Capital improvements are partitioned from day-to-day revenue repairs to safeguard your Capital Gains Tax (CGT) base cost.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Differentiates Code 7100 (Mortgage Interest) from Code 7200 (Allowable Repairs).",
                  "Indexes SDLT, architect drawings, and extensions as capital additions.",
                  "Zero misallocation risk during HMRC compliance spot-checks.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">Mapped to HMRC Property Income Manual (PIM2000)</span>
              </div>
            </div>

            {/* Showcase Card 2: Interactive Table */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    SPV Nominal Ledger Matching
                  </span>
                  <span className="text-[10px] font-mono text-[#a4f4cf]">Batch #2026-Q1 · 4 Transactions</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    {
                      desc: "Paragon Mortgages D/D Ref 99042",
                      code: "Code 7100",
                      cat: "Finance Cost",
                      amount: "-£1,420.00",
                      treatment: "Section 24 SPV",
                    },
                    {
                      desc: "Apex Gas Cert & Boiler Service",
                      code: "Code 7200",
                      cat: "Revenue Repair",
                      amount: "-£280.00",
                      treatment: "100% Allowable",
                    },
                    {
                      desc: "Belgrave Loft Conversion Architectural",
                      code: "Code 1500",
                      cat: "Capital Addition",
                      amount: "-£4,500.00",
                      treatment: "CGT Base Cost Index",
                    },
                    {
                      desc: "OpenRent Direct Tenant Rent (Apt 3)",
                      code: "Code 4000",
                      cat: "Rental Income",
                      amount: "+£2,100.00",
                      treatment: "SPV Turnover",
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0c1813] border border-[#1e382b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#a4f4cf]/40 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="text-slate-100 font-semibold">{row.desc}</div>
                        <div className="text-[10px] text-[#8a9d94] flex items-center gap-2">
                          <span className="text-[#a4f4cf]">{row.code}</span>
                          <span>•</span>
                          <span>{row.cat}</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center justify-between sm:block gap-4">
                        <div
                          className={`font-bold ${
                            row.amount.startsWith("+") ? "text-[#a4f4cf]" : "text-slate-200"
                          }`}
                        >
                          {row.amount}
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          {row.treatment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: SECTION 24 RELIEF */}
          <div
            id="step-s24"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>03 / STATUTORY RELIEF</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                100% mortgage interest deductibility vs personal tax traps.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                Section 24 restricts personal landlords to a mere 20% basic rate tax credit, forcing higher-rate taxpayers to pay tax on phantom profits. An SPV Limited Company deducts 100% of finance costs as allowable business expenses.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Full mortgage interest offset at 19%–25% Corporation Tax.",
                  "Bypasses individual 40%–45% higher-rate Section 24 disallowance.",
                  "Saves £4,800+ annually on a typical £250,000 buy-to-let mortgage.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">Finance Act 2015 s.24 &amp; CTA 2009 Part 5</span>
              </div>
            </div>

            {/* Showcase Card 3: Interactive S24 Comparison */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Section 24 Comparison Calculator
                  </span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0c1813] border border-[#1e382b]">
                    <button
                      onClick={() => setS24Mode("spv")}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                        s24Mode === "spv"
                          ? "bg-[#a4f4cf] text-[#0c1813] font-bold"
                          : "text-[#8a9d94] hover:text-white"
                      }`}
                    >
                      SPV Ltd (Protected)
                    </button>
                    <button
                      onClick={() => setS24Mode("personal")}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                        s24Mode === "personal"
                          ? "bg-red-500/20 text-red-300 font-bold border border-red-500/30"
                          : "text-[#8a9d94] hover:text-white"
                      }`}
                    >
                      Personal Name (Trap)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-lg bg-[#0c1813] border border-[#1e382b] space-y-1">
                    <span className="text-[10px] text-[#8a9d94] block uppercase">Annual Rent</span>
                    <span className="text-base font-bold text-white">£24,000</span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0c1813] border border-[#1e382b] space-y-1">
                    <span className="text-[10px] text-[#8a9d94] block uppercase">Mortgage Interest</span>
                    <span className="text-base font-bold text-white">£12,000</span>
                  </div>
                </div>

                {s24Mode === "spv" ? (
                  <div className="p-5 rounded-lg bg-[#0c1813] border border-[#a4f4cf]/40 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#a4f4cf] font-bold">SPV Limited Company Structure</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        100% Tax Deductible
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1e382b] pt-2">
                      <div className="flex justify-between">
                        <span>Net Taxable Profit (£24k - £12k interest):</span>
                        <span className="font-bold text-white">£12,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corporation Tax (19% rate):</span>
                        <span className="font-bold text-emerald-400">£2,280</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#1e382b] text-sm">
                        <span className="font-bold text-white">Net Annual Tax:</span>
                        <span className="font-bold text-[#a4f4cf]">£2,280</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#a4f4cf] bg-[#a4f4cf]/10 p-2.5 rounded border border-[#a4f4cf]/20 font-sans">
                      ✓ Saves £4,920 every year compared to holding in a personal name at 40% income tax.
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-lg bg-red-950/20 border border-red-500/40 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-300 font-bold">Individual Personal Ownership (Section 24)</span>
                      <span className="text-[10px] text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                        Disallowed Deduction
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-red-900/40 pt-2">
                      <div className="flex justify-between">
                        <span>Taxable Income (Turnover taxed without interest deduction):</span>
                        <span className="font-bold text-red-200">£24,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Tax at 40% Higher Rate:</span>
                        <span className="font-bold text-red-400">£9,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minus 20% Basic Rate Tax Credit (£12k × 20%):</span>
                        <span className="font-bold text-emerald-400">-£2,400</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-red-900/40 text-sm">
                        <span className="font-bold text-white">Net Annual Tax:</span>
                        <span className="font-bold text-red-400">£7,200</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-red-300 bg-red-950/40 p-2.5 rounded border border-red-800 font-sans">
                      ⚠ Effective tax rate is 60% of real net cash profit due to Section 24 disallowance.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STEP 4: DLA RECONCILIATION */}
          <div
            id="step-dla"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>04 / CAPITAL EXTRACTION</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                Withdraw rental profits 100% tax-free through DLA indexing.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                When you fund an SPV property purchase, your deposit, stamp duty (SDLT), and legal conveyancing are recorded as loans to your company. You can extract rental profits 100% tax-free as loan repayments before paying dividend tax.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "0% Income Tax and 0% National Insurance on equity repayments.",
                  "Real-time Section 455 safeguard prevents overdrawn director loan penalties (33.75%).",
                  "Indexes conveyancing, SDLT, and mortgage broker fees automatically.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">CTA 2010 Section 455 Safeguard Architecture</span>
              </div>
            </div>

            {/* Showcase Card 4: DLA Ledger */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-4 shadow-xl font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Director’s Loan Account (DLA) Ledger
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Credit Balance · Tax-Free
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#0c1813] border border-[#1e382b] space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-[#8a9d94] uppercase">Available Tax-Free Extraction Pool:</span>
                    <span className="text-xl font-bold text-[#a4f4cf]">£72,450.00</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e382b] rounded-full overflow-hidden">
                    <div className="h-full bg-[#a4f4cf] w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8a9d94]">
                    <span>Original Equity Introduced: £85,000</span>
                    <span>Repaid to Date: £12,550</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-[#0c1813] border border-[#1e382b] flex justify-between items-center text-[11px]">
                    <div>
                      <span className="text-white font-semibold">Initial Property Deposit (Paragon 75% LTV)</span>
                      <span className="text-[10px] text-[#8a9d94] block">12 Jan 2026 · Capital Introduced</span>
                    </div>
                    <span className="text-[#a4f4cf] font-bold">+£65,000.00</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0c1813] border border-[#1e382b] flex justify-between items-center text-[11px]">
                    <div>
                      <span className="text-white font-semibold">HMRC SDLT Stamp Duty (3% Surcharge)</span>
                      <span className="text-[10px] text-[#8a9d94] block">15 Jan 2026 · Capital Conveyancing</span>
                    </div>
                    <span className="text-[#a4f4cf] font-bold">+£14,500.00</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0c1813] border border-[#1e382b] flex justify-between items-center text-[11px]">
                    <div>
                      <span className="text-white font-semibold">Monthly Rental Repayment to Director</span>
                      <span className="text-[10px] text-emerald-400 block">01 Nov 2026 · 0% Income Tax Repayment</span>
                    </div>
                    <span className="text-slate-300 font-bold">-£1,850.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5: YEAR-END TAX PACK */}
          <div
            id="step-taxpack"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>05 / STATUTORY REPORTING</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                1-Click CT600 tax return and executive landlord tax pack.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                Generate clean, publication-ready micro-entity accounts (FRS 105) and HMRC CT600 computation tax packs ready for instant sign-off by your Chartered Accountant.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Micro-entity statutory balance sheet and profit & loss accounts.",
                  "Comprehensive Section 24 finance cost schedule and capital asset basis.",
                  "Exportable high-density vector A4 PDF tax pack with audit hashing.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">Companies House FRS 105 &amp; HMRC CT600 Ready</span>
              </div>
            </div>

            {/* Showcase Card 5: Tactile Parchment Tax Pack */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Statutory CT600 Tax Pack Preview
                  </span>
                  <button
                    onClick={() => setIsTaxPackOpen(true)}
                    className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#a4f4cf] text-[#0c1813] hover:bg-[#8ae8bd] transition-all flex items-center gap-1.5"
                  >
                    <span>Preview Full Pack</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tactile Paper Sheet */}
                <div className="p-6 rounded-lg bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-4 font-mono shadow-sm">
                  <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-900">
                        BELGRAVE LEGACY WEALTH SPV LTD
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Company No. 14892011 · Registered in England &amp; Wales
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Period Ended</div>
                      <div className="text-xs font-bold text-stone-900">31 MARCH 2026</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-700">Gross Rental Turnover (Box CP1)</span>
                      <span className="font-bold text-stone-900">£48,200.00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-700">Allowable Revenue Repairs (Box CP2)</span>
                      <span className="font-bold text-stone-900">-£3,410.00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-700 font-semibold text-emerald-800">
                        Section 24 Allowable Loan Interest (Box CP5)
                      </span>
                      <span className="font-bold text-emerald-800">-£18,240.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-t border-stone-400 font-bold text-stone-900">
                      <span>Chargeable Taxable Profit (Box CP10)</span>
                      <span>£26,550.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-emerald-800 font-bold bg-stone-100 p-2 rounded">
                      <span>Corporation Tax Due at 19% (Box CP15)</span>
                      <span>£5,044.50</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-500">
                    <span>ICAEW Practice Verified</span>
                    <span>MD5: a89f21b7ce401</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 6: HMRC FILED */}
          <div
            id="step-filed"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#1e382b]/60"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>06 / DIGITAL SUBMISSION</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                Continuous Making Tax Digital (MTD ITSA) filing readiness.
              </h3>
              <p className="text-sm text-[#8a9d94] leading-relaxed">
                Direct statutory gateway filing readiness with immutable digital audit trails. Every claimed expense is permanently cross-referenced to verified Open Banking transactions.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "100% digital audit defense against HMRC inquiry notices.",
                  "Instant digital filing certificates with statutory submission timestamps.",
                  "Segregated multi-SPV and personal landlord digital record-keeping.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-[#8a9d94]">
                Statute: <span className="text-slate-300">Full April 2026 MTD ITSA Statutory Compliance</span>
              </div>
            </div>

            {/* Showcase Card 6: HMRC Submission Receipt */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#1e382b] bg-[#14241d] p-5 sm:p-6 space-y-4 shadow-xl font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <span className="font-bold text-white uppercase tracking-wider">
                    HMRC Gateway Submission Receipt
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    HMRC Accepted
                  </span>
                </div>

                <div className="p-5 rounded-lg bg-[#0c1813] border border-[#1e382b] space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8a9d94]">Submission ID:</span>
                    <span className="text-[#a4f4cf] font-bold">SUB-HMRC-2026-99214</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8a9d94]">HMRC Correlation ID:</span>
                    <span className="text-white">a7e94-c0812-d9f21-77b80</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8a9d94]">Statutory Gateway:</span>
                    <span className="text-white">HMRC Government Gateway API v2</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8a9d94]">Filing Status:</span>
                    <span className="text-emerald-400 font-bold">CT600 &amp; MTD Quarterly Reconciled</span>
                  </div>
                  <div className="pt-3 border-t border-[#1e382b] flex items-center justify-between text-[11px] text-[#8a9d94]">
                    <span>Chartered Accountant Sign-Off:</span>
                    <span className="text-white font-semibold">KP Tax Consultants FCA</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[11px] text-[#a4f4cf] font-sans flex items-center justify-between">
                  <span>✓ 100% Audit-Proof: All bank statements &amp; receipts backed up digitally.</span>
                  <span className="font-mono text-[10px]">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Pack Lightbox Modal */}
      {isTaxPackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14241d] border border-[#1e382b] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
              <h4 className="text-base font-display font-bold text-white">
                Statutory CT600 &amp; Year-End Landlord Tax Pack
              </h4>
              <button
                onClick={() => setIsTaxPackOpen(false)}
                className="text-[#8a9d94] hover:text-white font-mono text-xs px-2 py-1 rounded bg-[#0c1813] border border-[#1e382b]"
              >
                Close (ESC)
              </button>
            </div>
            <div className="p-5 rounded-lg bg-[#fbfbf8] text-[#171c19] space-y-3 font-mono text-xs max-h-96 overflow-y-auto">
              <div className="border-b border-stone-300 pb-2 flex justify-between font-bold">
                <span>BELGRAVE LEGACY WEALTH SPV LTD</span>
                <span>COMPANY NO. 14892011</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Full micro-entity accounts under FRS 105, Section 24 Finance Cost Schedule, and Capital Gains Base Cost Schedule prepared for HM Revenue &amp; Customs.
              </p>
              <div className="space-y-1 pt-2">
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Gross Rental Income:</span>
                  <span className="font-bold">£48,200.00</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Allowable Mortgage Interest:</span>
                  <span className="font-bold text-emerald-800">£18,240.00 (100% Relieved)</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Allowable Repairs &amp; Maintenance:</span>
                  <span className="font-bold">£3,410.00</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Management &amp; Insurance:</span>
                  <span className="font-bold">£2,400.00</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-stone-900 border-t border-stone-400">
                  <span>Taxable Corporation Tax Basis:</span>
                  <span>£24,150.00</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-emerald-800">
                  <span>Corporation Tax Payable (19%):</span>
                  <span>£4,588.50</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsTaxPackOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold font-mono text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
