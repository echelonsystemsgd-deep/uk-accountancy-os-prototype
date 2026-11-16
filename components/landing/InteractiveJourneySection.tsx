"use client";

import React, { useState, useEffect } from "react";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
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
  ArrowLeft,
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

  useScrollLock(isTaxPackOpen);

  useEffect(() => {
    if (!isTaxPackOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTaxPackOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTaxPackOpen]);

  const steps = [
    {
      id: "ingest",
      num: "01",
      navLabel: "01 Ingest",
      badge: "01 / AUTOMATED INGESTION",
      title: "Give every bank entry and expense receipt a place to start.",
      subtitle:
        "Direct Open Banking integration with UK specialist buy-to-let lenders (Paragon, Aldermore, Shawbrook, Barclays) combined with serverless OCR for contractor receipts.",
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
      navLabel: "02 Nominal Match",
      badge: "02 / NOMINAL MATCHING",
      title: "The right nominal code, tax treatment, and asset basis.",
      subtitle:
        "Transactions automatically map into the UK Property Chart of Accounts with 99.4% precision. Capital improvements are partitioned from day-to-day revenue repairs.",
      points: [
        "Differentiates Code 7100 (Mortgage Interest) from Code 7200 (Allowable Repairs).",
        "Indexes SDLT, architect fees, and extensions as capital additions for CGT.",
        "Zero misallocation risk during HMRC compliance spot-checks.",
      ],
      statute: "Mapped to HMRC Property Income Manual (PIM2000)",
    },
    {
      id: "s24",
      num: "03",
      navLabel: "03 Section 24",
      badge: "03 / STATUTORY RELIEF",
      title: "100% mortgage interest deductibility vs personal tax traps.",
      subtitle:
        "Section 24 restricts individual landlords to a 20% basic rate tax credit, creating phantom profits. An SPV Limited Company deducts 100% of finance costs as allowable business expenses.",
      points: [
        "Full mortgage interest offset at 19%–25% Corporation Tax.",
        "Bypasses individual 40%–45% higher-rate Section 24 disallowance.",
        "Saves £4,800+ annually on a typical £250,000 buy-to-let mortgage.",
      ],
      statute: "Finance Act 2015 s.24 & CTA 2009 Part 5",
    },
    {
      id: "dla",
      num: "04",
      navLabel: "04 DLA Extraction",
      badge: "04 / CAPITAL EXTRACTION",
      title: "Withdraw rental profits 100% tax-free through DLA indexing.",
      subtitle:
        "Initial deposits, stamp duty (SDLT), and legal conveyancing are recorded as loans to your company. Extract rental profits 100% tax-free as loan repayments before dividend tax.",
      points: [
        "0% Income Tax and 0% National Insurance on equity repayments.",
        "Real-time Section 455 safeguard prevents overdrawn loan penalties (33.75%).",
        "Indexes conveyancing, SDLT, and mortgage broker fees automatically.",
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
        "Generate clean, publication-ready micro-entity accounts (FRS 105) and HMRC CT600 computation tax packs ready for instant sign-off by your Chartered Accountant.",
      points: [
        "Micro-entity statutory balance sheet and profit & loss accounts.",
        "Comprehensive Section 24 finance cost schedule and capital asset basis.",
        "Exportable high-density vector A4 PDF tax pack with audit hashing.",
      ],
      statute: "Companies House FRS 105 & HMRC CT600 Ready",
    },
    {
      id: "filed",
      num: "06",
      navLabel: "06 MTD Reconciled",
      badge: "06 / DIGITAL SUBMISSION",
      title: "Continuous Making Tax Digital (MTD ITSA) filing readiness.",
      subtitle:
        "Direct statutory gateway filing readiness with immutable digital audit trails. Every claimed expense is permanently cross-referenced to verified Open Banking transactions.",
      points: [
        "100% digital audit defense against HMRC inquiry notices.",
        "Instant digital filing certificates with statutory submission timestamps.",
        "Segregated multi-SPV and personal landlord digital record-keeping.",
      ],
      statute: "Full April 2026 MTD ITSA Statutory Compliance",
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#080B11] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162032] border border-[#1F293D] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Automated Accounting Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            How it works.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            From live mortgage interest debit to verified HMRC CT600 year-end filing. A closed-loop operating system engineered for UK property investors and chartered practices.
          </p>
        </div>

        {/* Tabbed Selector Console */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 shrink-0 border ${
                activeStep === idx
                  ? "bg-[#a4f4cf] text-[#080B11] border-[#a4f4cf] shadow-md font-bold scale-[1.02]"
                  : "bg-[#111726] text-slate-400 hover:text-white border-[#1F293D] hover:bg-[#162032]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeStep === idx ? "bg-[#080B11]" : "bg-emerald-500/60"}`}></span>
              <span>{step.navLabel}</span>
            </button>
          ))}
        </div>

        {/* Single Interactive Step Container */}
        <div className="bg-[#111726] border border-[#1F293D] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Stage Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162032] border border-[#1F293D] text-[10px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
                <span>{currentStep.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                {currentStep.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed">
                {currentStep.subtitle}
              </p>

              <ul className="space-y-3 pt-1">
                {currentStep.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-[#1F293D]">
                Statute: <span className="text-slate-300 font-semibold">{currentStep.statute}</span>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-mono text-slate-400">
                  Stage <strong className="text-white">{activeStep + 1}</strong> of 6
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="px-3 py-1.5 rounded-lg border border-[#1F293D] text-xs font-mono font-semibold text-slate-300 hover:text-white hover:bg-[#162032] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-3.5 py-1.5 rounded-lg bg-[#a4f4cf] text-[#080B11] font-bold text-xs font-mono hover:bg-[#8ae8bd] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Demonstration */}
            <div className="lg:col-span-7">
              {/* STEP 1 DEMO */}
              {activeStep === 0 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-5 shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIngestChannel("bank")}
                        className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                          ingestChannel === "bank"
                            ? "bg-[#a4f4cf] text-[#080B11] font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Paragon Bank Feed
                      </button>
                      <button
                        onClick={() => setIngestChannel("invoice")}
                        className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                          ingestChannel === "invoice"
                            ? "bg-[#a4f4cf] text-[#080B11] font-bold"
                            : "text-slate-400 hover:text-white"
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
                        <span className="font-bold text-stone-900 uppercase">APEX PLUMBING &amp; HEATING LTD</span>
                        <span className="text-stone-500">INV-2026-881</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <div>
                          <div className="text-[10px] uppercase text-stone-500">Bill Description</div>
                          <div className="text-sm font-bold text-stone-900">Boiler Replacement &amp; Gas Cert</div>
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

                  <div className="p-4 rounded-lg bg-[#162032] border border-[#1F293D] space-y-3">
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
                        <span className="text-[10px] text-slate-400 block">HMRC Account</span>
                        <span className="text-white font-bold">
                          {ingestChannel === "bank" ? "Code 7100 (Finance)" : "Code 7200 (Repairs)"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Tax Treatment</span>
                        <span className="text-[#a4f4cf] font-bold">
                          {ingestChannel === "bank" ? "Section 24 (100% Corp Relief)" : "100% Revenue Allowable"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Tax Saving</span>
                        <span className="text-white font-bold">
                          {ingestChannel === "bank" ? "£284.00 on this txn" : "£250.00 Corp Tax relief"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 DEMO */}
              {activeStep === 1 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-4 shadow-xl animate-in fade-in duration-200 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <span className="font-bold text-white uppercase tracking-wider">
                      SPV Nominal Ledger Matching
                    </span>
                    <span className="text-[10px] text-[#a4f4cf]">Batch #2026-Q1 · 4 Transactions</span>
                  </div>

                  <div className="space-y-2.5">
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
                        className="p-3 rounded-lg bg-[#162032] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#a4f4cf]/40 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="text-slate-100 font-semibold">{row.desc}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
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
              )}

              {/* STEP 3 DEMO */}
              {activeStep === 2 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-5 shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Section 24 Comparison Calculator
                    </span>
                    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#162032] border border-[#1F293D]">
                      <button
                        onClick={() => setS24Mode("spv")}
                        className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                          s24Mode === "spv"
                            ? "bg-[#a4f4cf] text-[#080B11] font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        SPV Ltd (Protected)
                      </button>
                      <button
                        onClick={() => setS24Mode("personal")}
                        className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                          s24Mode === "personal"
                            ? "bg-red-500/20 text-red-300 font-bold border border-red-500/30"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Personal Name (Trap)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-lg bg-[#162032] border border-[#1F293D] space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Annual Rent</span>
                      <span className="text-base font-bold text-white">£24,000</span>
                    </div>
                    <div className="p-4 rounded-lg bg-[#162032] border border-[#1F293D] space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Mortgage Interest</span>
                      <span className="text-base font-bold text-white">£12,000</span>
                    </div>
                  </div>

                  {s24Mode === "spv" ? (
                    <div className="p-5 rounded-lg bg-[#162032] border border-[#a4f4cf]/40 space-y-3 font-mono">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#a4f4cf] font-bold">SPV Limited Company Structure</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          100% Tax Deductible
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1F293D] pt-2">
                        <div className="flex justify-between">
                          <span>Net Taxable Profit (£24k - £12k interest):</span>
                          <span className="font-bold text-white">£12,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Corporation Tax (19% rate):</span>
                          <span className="font-bold text-emerald-400">£2,280</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#1F293D] text-sm">
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
              )}

              {/* STEP 4 DEMO */}
              {activeStep === 3 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-4 shadow-xl font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <span className="font-bold text-white uppercase tracking-wider">
                      Director’s Loan Account (DLA) Ledger
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Credit Balance · Tax-Free
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#162032] border border-[#1F293D] space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-slate-400 uppercase">Available Tax-Free Extraction Pool:</span>
                      <span className="text-xl font-bold text-[#a4f4cf]">£72,450.00</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#080B11] rounded-full overflow-hidden">
                      <div className="h-full bg-[#a4f4cf] w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Original Equity Introduced: £85,000</span>
                      <span>Repaid to Date: £12,550</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded bg-[#162032] border border-[#1F293D] flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-white font-semibold">Initial Property Deposit (Paragon 75% LTV)</span>
                        <span className="text-[10px] text-slate-400 block">12 Jan 2026 · Capital Introduced</span>
                      </div>
                      <span className="text-[#a4f4cf] font-bold">+£65,000.00</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#162032] border border-[#1F293D] flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-white font-semibold">HMRC SDLT Stamp Duty (3% Surcharge)</span>
                        <span className="text-[10px] text-slate-400 block">15 Jan 2026 · Capital Conveyancing</span>
                      </div>
                      <span className="text-[#a4f4cf] font-bold">+£14,500.00</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#162032] border border-[#1F293D] flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-white font-semibold">Monthly Rental Repayment to Director</span>
                        <span className="text-[10px] text-emerald-400 block">01 Nov 2026 · 0% Income Tax Repayment</span>
                      </div>
                      <span className="text-slate-300 font-bold">-£1,850.00</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 DEMO */}
              {activeStep === 4 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-4 shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Statutory CT600 Tax Pack Preview
                    </span>
                    <button
                      onClick={() => setIsTaxPackOpen(true)}
                      className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#a4f4cf] text-[#080B11] hover:bg-[#8ae8bd] transition-all flex items-center gap-1.5"
                    >
                      <span>Preview Full Pack</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5 rounded-lg bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 font-mono shadow-sm text-xs">
                    <div className="flex justify-between items-start border-b border-stone-200 pb-2">
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

                    <div className="space-y-1.5">
                      <div className="flex justify-between py-0.5 border-b border-stone-200">
                        <span className="text-stone-700">Gross Rental Turnover (Box CP1)</span>
                        <span className="font-bold text-stone-900">£48,200.00</span>
                      </div>
                      <div className="flex justify-between py-0.5 border-b border-stone-200">
                        <span className="text-stone-700">Allowable Revenue Repairs (Box CP2)</span>
                        <span className="font-bold text-stone-900">-£3,410.00</span>
                      </div>
                      <div className="flex justify-between py-0.5 border-b border-stone-200">
                        <span className="text-stone-700 font-semibold text-emerald-800">
                          Section 24 Allowable Loan Interest (Box CP5)
                        </span>
                        <span className="font-bold text-emerald-800">-£18,240.00</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-stone-400 font-bold text-stone-900">
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
              )}

              {/* STEP 6 DEMO */}
              {activeStep === 5 && (
                <div className="rounded-xl border border-[#1F293D] bg-[#0B0F19] p-5 sm:p-6 space-y-4 shadow-xl font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <span className="font-bold text-white uppercase tracking-wider">
                      HMRC Gateway Submission Receipt
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      HMRC Accepted
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#162032] border border-[#1F293D] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Submission ID:</span>
                      <span className="text-[#a4f4cf] font-bold">SUB-HMRC-2026-99214</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">HMRC Correlation ID:</span>
                      <span className="text-white">a7e94-c0812-d9f21-77b80</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Statutory Gateway:</span>
                      <span className="text-white">HMRC Government Gateway API v2</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Filing Status:</span>
                      <span className="text-emerald-400 font-bold">CT600 &amp; MTD Quarterly Reconciled</span>
                    </div>
                    <div className="pt-2.5 border-t border-[#1F293D] flex items-center justify-between text-[11px] text-slate-400">
                      <span>Chartered Accountant Sign-Off:</span>
                      <span className="text-white font-semibold">KP Tax Consultants FCA</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[11px] text-[#a4f4cf] font-sans flex items-center justify-between">
                    <span>✓ 100% Audit-Proof: All bank statements &amp; receipts backed up digitally.</span>
                    <span className="font-mono text-[10px]">VERIFIED</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tax Pack Lightbox Modal */}
      {isTaxPackOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTaxPackOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overscroll-contain"
        >
          <div className="bg-[#111726] border border-[#1F293D] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl modal-scrollable max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3 sticky top-0 bg-[#111726] z-10">
              <h4 className="text-base font-display font-bold text-white">
                Statutory CT600 &amp; Year-End Landlord Tax Pack
              </h4>
              <button
                onClick={() => setIsTaxPackOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded bg-[#080B11] border border-[#1F293D]"
              >
                Close (ESC)
              </button>
            </div>
            <div className="p-5 rounded-lg bg-[#fbfbf8] text-[#171c19] space-y-3 font-mono text-xs max-h-96 overflow-y-auto modal-scrollable">
              <div className="border-b border-stone-300 pb-2 flex justify-between font-bold">
                <span>BELGRAVE LEGACY WEALTH SPV LTD</span>
                <span>COMPANY NO. 14892011</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Full micro-entity accounts under FRS 105, Section 24 Finance Cost Schedule, and Capital Gains Base Cost Schedule prepared for HM Revenue &amp; Customs.
              </p>
              <div className="space-y-1 pt-2">
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Gross Rental Income (Box CP1):</span>
                  <span className="font-bold">£48,200.00</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Section 24 Finance Costs (Box CP5):</span>
                  <span className="font-bold text-emerald-800">-£18,240.00</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Allowable Management &amp; Repairs:</span>
                  <span className="font-bold">-£3,410.00</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-stone-900 border-t border-stone-300">
                  <span>Corporation Tax Due at 19%:</span>
                  <span className="text-emerald-800">£5,044.50</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsTaxPackOpen(false)}
                className="px-5 py-2 rounded-lg bg-[#a4f4cf] text-[#080B11] font-bold font-mono text-xs hover:bg-[#8ae8bd] transition"
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
