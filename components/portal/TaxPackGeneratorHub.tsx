"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileCheck2,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  FileSpreadsheet,
  Coins,
  PoundSterling,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function TaxPackGeneratorHub() {
  const { activeClient, generateTaxPackage, downloadAccountantCsvPack, triggerToast } = useDemoStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const taxPackages = activeClient.taxPackages || [];
  const activePackage = taxPackages[0] || {
    taxYear: "2024/25",
    periodStart: "2024-04-06",
    periodEnd: "2025-04-05",
    totalRentalTurnover: activeClient.totalRentalIncome || 39000,
    totalAllowableExpenses: 6420,
    totalMortgageInterest: 20280,
    operatingProfit: 12300,
    estimatedCorporationTax: 2337,
    netRetainedProfit: 9963,
    dlaClosingBalance: activeClient.dlaBalance || 134625,
    status: "ready_for_accountant",
    createdAt: "2026-11-12",
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    triggerToast("Compiling Financial Ledger", "Aggregating bills, mortgage statements, and DLA balance...", "info");

    setTimeout(() => {
      generateTaxPackage(activeClient.id, "2024/25");
      setIsGenerating(false);
      triggerToast(
        "HMRC & Accountant Pack Generated",
        `Year-End Financial Pack for ${activeClient.entityName} is ready for submission.`,
        "success"
      );
    }, 800);
  };

  const handlePrintPdf = () => {
    triggerToast("Preparing Print-Ready Executive Summary", "Opening document print preview...", "info");
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.print();
      }, 400);
    }
  };

  const handleDownloadCsvSchedules = () => {
    downloadAccountantCsvPack(activeClient.id);
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Banner & Generation CTA */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/40 rounded-2xl relative overflow-hidden shadow-gold">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                Automated Statutory Year-End Pack
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Company: <strong className="text-neutral-200">{activeClient.entityName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              HMRC & Accountant Tax Pack
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Compile your complete P&L, Balance Sheet, Section 24 Mortgage Deduction Schedule, Capital Asset Register, and DLA Reconciliation into a certified accountant pack.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="touch-target-44 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian hover:shadow-gold-glow transition-all active:scale-95 flex items-center space-x-2 shadow-gold"
            >
              <Sparkles className="w-4 h-4 text-obsidian fill-obsidian animate-pulse" />
              <span>{isGenerating ? "Compiling Ledger..." : "✦ Generate Year-End Tax Pack"}</span>
            </button>
          </div>
        </div>

        {/* 4 Status Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Statutory Period</span>
            <span className="text-lg sm:text-xl font-bold text-white num-tabular">
              {activePackage.taxYear}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              {activePackage.periodStart} → {activePackage.periodEnd}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Corporation Tax Estimate</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 num-tabular">
              £{activePackage.estimatedCorporationTax.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block">
              19% Small Profits Rate
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Director DLA Balance</span>
            <span className="text-lg sm:text-xl font-bold text-gold num-tabular">
              £{activePackage.dlaClosingBalance.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              Tax-Free Repayment Buffer
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Filing Readiness</span>
            <div className="flex items-center space-x-1.5 font-bold text-emerald-400 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ready for Accountant</span>
            </div>
            <span className="text-[10px] text-neutral-400 block">
              Zero missing receipts
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar for Downloads */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-cardSurface border border-neutral-800 rounded-xl">
        <div className="flex items-center space-x-2 text-xs text-neutral-300">
          <FileCheck2 className="w-4 h-4 text-gold" />
          <span>Prepared for Appointed Accountant: <strong className="text-white">{activeClient.assignedAccountant}</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleDownloadCsvSchedules}
            className="touch-target-44 px-3.5 py-2 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition flex items-center space-x-1.5 border border-neutral-700"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Download CSV Schedules</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            className="touch-target-44 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gold hover:bg-gold-hover text-obsidian transition flex items-center space-x-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Executive Statement Container */}
      <div className="accountant-card p-6 sm:p-8 bg-cardSurface border border-neutral-800 rounded-2xl space-y-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-neutral-800 pb-6 print:border-neutral-300">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider block print:text-neutral-700">
              Official Statutory Year-End Summary
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white print:text-black">
              {activeClient.entityName}
            </h2>
            <p className="text-xs text-neutral-400 print:text-neutral-600">
              Company No: {activeClient.companyNumber || "15984210"} &bull; Director: {activeClient.primaryContact}
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-neutral-400 print:text-neutral-600 space-y-0.5">
            <p>Accounting Period: <strong className="text-neutral-200 print:text-black">{activePackage.periodStart} to {activePackage.periodEnd}</strong></p>
            <p>HMRC Tax Year: <strong className="text-neutral-200 print:text-black">{activePackage.taxYear}</strong></p>
            <p>Prepared On: <strong className="text-neutral-200 print:text-black">{activePackage.createdAt}</strong></p>
          </div>
        </div>

        {/* Section 1: Profit & Loss Statement */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center space-x-2 border-b border-neutral-800 pb-2 print:border-neutral-300 print:text-black">
            <span>1. Profit & Loss Statement (Turnover & Expenditure)</span>
          </h3>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 print:border-neutral-200">
              <span className="text-neutral-300 print:text-neutral-700 font-semibold">Residential Property Rental Turnover (Box 145):</span>
              <span className="font-bold text-white print:text-black num-tabular">£{activePackage.totalRentalTurnover.toLocaleString()}.00</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 print:border-neutral-200">
              <span className="text-neutral-400 print:text-neutral-600">Allowable Operating Costs (Repairs, Insurance, Letting Fees):</span>
              <span className="font-semibold text-neutral-300 print:text-black num-tabular">-£{activePackage.totalAllowableExpenses.toLocaleString()}.00</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 print:border-neutral-200 bg-emerald-500/5 print:bg-neutral-100 px-2 rounded">
              <span className="text-emerald-300 print:text-neutral-800 font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 print:hidden" />
                <span>SPV Mortgage Finance Costs (Section 24 100% Allowable Box 155):</span>
              </span>
              <span className="font-bold text-emerald-400 print:text-black num-tabular">-£{activePackage.totalMortgageInterest.toLocaleString()}.00</span>
            </div>

            <div className="flex justify-between py-2 border-b border-neutral-700 print:border-neutral-400 font-bold text-sm">
              <span className="text-white print:text-black">Net Taxable Corporate Profit:</span>
              <span className="text-white print:text-black num-tabular">£{activePackage.operatingProfit.toLocaleString()}.00</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 print:border-neutral-200 text-emerald-400 print:text-neutral-800 font-semibold">
              <span>Estimated Corporation Tax Liability (19% Small Profits Rate):</span>
              <span className="num-tabular">£{activePackage.estimatedCorporationTax.toLocaleString()}.00</span>
            </div>

            <div className="flex justify-between py-2 font-extrabold text-sm text-gold print:text-black">
              <span>Net Retained Profit After Tax:</span>
              <span className="num-tabular">£{activePackage.netRetainedProfit.toLocaleString()}.00</span>
            </div>
          </div>
        </div>

        {/* Section 2: Balance Sheet Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center space-x-2 border-b border-neutral-800 pb-2 print:border-neutral-300 print:text-black">
            <span>2. Balance Sheet Summary & Capital Asset Register</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-obsidian-400/90 border border-neutral-800 space-y-2 print:border-neutral-300 print:bg-white">
              <span className="text-[11px] font-bold text-white print:text-black block">Fixed Assets (Property Portfolio)</span>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Total Properties:</span>
                <span className="font-bold text-white print:text-black">{activeClient.properties.length} Enrolled</span>
              </div>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Gross Acquisition Cost Basis:</span>
                <span className="font-bold text-white print:text-black num-tabular">£611,400.00</span>
              </div>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Capitalized SDLT & Legal Fees:</span>
                <span className="font-bold text-emerald-400 print:text-black num-tabular">£31,400.00</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-obsidian-400/90 border border-neutral-800 space-y-2 print:border-neutral-300 print:bg-white">
              <span className="text-[11px] font-bold text-white print:text-black block">Creditors: Director’s Loan Account</span>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Director Creditor:</span>
                <span className="font-bold text-white print:text-black">{activeClient.primaryContact}</span>
              </div>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Closing DLA Credit Balance:</span>
                <span className="font-bold text-gold print:text-black num-tabular">£{activePackage.dlaClosingBalance.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-neutral-400 print:text-neutral-600">
                <span>Section 455 Tax Exposure:</span>
                <span className="font-bold text-emerald-400 print:text-black">£0.00 (Protected)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Sign-Off Box for Appointed Accountant */}
        <div className="p-4 rounded-xl bg-obsidian-500/90 border border-neutral-800 space-y-3 text-xs print:border-neutral-400 print:bg-white">
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-200 print:text-black">Practitioner Sign-Off & Verification</span>
            <span className="text-[10px] text-neutral-400 print:text-neutral-600">Form CT600 Schedule Ready</span>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-800 print:border-neutral-300">
            <div>
              <p className="text-[11px] text-neutral-400 print:text-neutral-600">Signed on behalf of Client:</p>
              <div className="h-10 border-b border-neutral-700 print:border-neutral-400 flex items-end pb-1 font-crest text-sm text-gold print:text-black">
                Sukhpreet Kaur
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Managing Director & 100% Shareholder</p>
            </div>

            <div>
              <p className="text-[11px] text-neutral-400 print:text-neutral-600">Appointed Chartered Accountant:</p>
              <div className="h-10 border-b border-neutral-700 print:border-neutral-400 flex items-end pb-1 text-sm font-semibold text-neutral-300 print:text-black">
                {activeClient.assignedAccountant}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">ICAEW / CIOT Certified Reviewer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
