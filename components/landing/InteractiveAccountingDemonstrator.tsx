"use client";

import React, { useState } from "react";
import {
  FileText,
  CreditCard,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Sparkles,
  Zap,
  ExternalLink,
} from "lucide-react";

export default function InteractiveAccountingDemonstrator() {
  const [channel, setChannel] = useState<"bank" | "receipt">("bank");
  const [reconciled, setReconciled] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Channel Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#14241d] p-2.5 rounded-xl border border-[#1e382b]">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a9d94] pl-2 hidden sm:inline">
            Input Ingest Mode:
          </span>
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => {
                setChannel("bank");
                setReconciled(false);
              }}
              className={`touch-target-44 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
                channel === "bank"
                  ? "bg-[#a4f4cf] text-[#0c1813] shadow-sm"
                  : "text-[#8a9d94] hover:text-white"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Paragon Bank Feed</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setChannel("receipt");
                setReconciled(false);
              }}
              className={`touch-target-44 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
                channel === "receipt"
                  ? "bg-[#a4f4cf] text-[#0c1813] shadow-sm"
                  : "text-[#8a9d94] hover:text-white"
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Contractor OCR Invoice</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-[#8a9d94] pr-2">
          <span className="w-2 h-2 rounded-full bg-[#a4f4cf] animate-pulse" />
          <span className="font-mono">Live HMRC MTD Parser</span>
        </div>
      </div>

      {/* Side-by-Side Operational Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side: Raw Client Input Card (Parchment Paper Styling) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#fbfbf8] text-[#111d1a] border border-[#e2e0d5] shadow-sm space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-[#e2e0d5] pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#e9ece2] flex items-center justify-center text-[#111d1a]">
                {channel === "bank" ? <CreditCard className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider font-mono text-[#526058]">
                  {channel === "bank" ? "01 / Live Bank Entry" : "01 / Mobile Invoice Scan"}
                </p>
                <p className="text-sm font-display font-bold text-[#111d1a]">
                  {channel === "bank" ? "Paragon Bank PLC" : "Gas Safe Boiler Services Ltd"}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#e9ece2] text-[#526058]">
              {channel === "bank" ? "TXN-884210" : "INV-4092"}
            </span>
          </div>

          {channel === "bank" ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#e2e0d5] space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Date: 14 Nov 2026, 09:12</span>
                  <span>Sort: 20-45-77</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#111d1a]">
                  <span>PARAGON MTG INT #14892011</span>
                  <span>-£1,420.00</span>
                </div>
                <p className="text-[11px] text-[#526058]">
                  Direct Debit &bull; 14 Belgrave Place SPV Facility
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#e9ece2] text-[11px] text-[#526058] space-y-1">
                <span className="font-bold text-[#111d1a] block">Raw Statement Line:</span>
                <p className="font-mono text-[10px]">PARAGON MORTGAGES D/D 14 BELGRAVE PL INTEREST-ONLY LOAN REF 99042</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#e2e0d5] space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Date: 12 Nov 2026</span>
                  <span>VAT Reg: 442 8901 12</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#111d1a]">
                  <span>Worcester Bosch Heat Exchanger</span>
                  <span>£480.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#526058]">
                  <span>Net: £400.00 &bull; 20% VAT: £80.00</span>
                  <span className="text-emerald-700 font-bold">Receipt Attached</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#e9ece2] text-[11px] text-[#526058] space-y-1">
                <span className="font-bold text-[#111d1a] block">Extracted Supplier:</span>
                <p>Gas Safe Boiler Services Ltd &bull; 88 Station Rd, Solihull &bull; Emergency Callout</p>
              </div>
            </div>
          )}

          <div className="pt-2 text-[11px] text-[#526058] flex items-center justify-between">
            <span>Client: SUKHPREET KAUR LEGACY WEALTH LTD</span>
            <span className="font-mono">Co. #14892011</span>
          </div>
        </div>

        {/* Right Side: Automated Engine Read (Dark Forest System Card) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#14241d] text-white border border-[#1e382b] shadow-sm space-y-4 text-left flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#1e382b] flex items-center justify-center text-[#a4f4cf]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider font-mono text-[#8a9d94]">
                    02 / Auto-Classification Engine
                  </p>
                  <p className="text-sm font-display font-bold text-white">
                    HMRC MTD &amp; Section 24 Mapping
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                reconciled 
                  ? "bg-[#a4f4cf] text-[#0c1813]"
                  : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
              }`}>
                {reconciled ? "✓ RECONCILED" : "ACTION REQUIRED"}
              </span>
            </div>

            {channel === "bank" ? (
              <div className="space-y-3 text-xs">
                {/* Categorization Box */}
                <div className="p-3 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">Nominal Ledger Account</span>
                    <span className="font-mono text-[#a4f4cf] font-bold">Code 7100 - Finance</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">Tax Treatment</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20">
                      Section 24 SPV (100% Corp Relief)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">Tax Savings vs Personal</span>
                    <span className="font-mono font-bold text-white">£284.00 saved this txn</span>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="p-3 rounded-xl bg-[#1e382b]/60 border border-[#1e382b] flex items-start space-x-2 text-[11px] text-[#8a9d94]">
                  <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                  <span>
                    Matched to SPV mortgage schedule. No paper receipt required for direct lender interest debits.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {/* Categorization Box */}
                <div className="p-3 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">HMRC Expense Account</span>
                    <span className="font-mono text-[#a4f4cf] font-bold">Code 7200 - Repairs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">VAT Return (Box 4)</span>
                    <span className="font-mono text-white">£80.00 Reclaimable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a9d94]">CT600 Allowable Deduction</span>
                    <span className="font-mono font-bold text-white">£400.00 Net</span>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2 text-[11px] text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    Matching bank debit (£480.00) detected on personal card. Credited to Director's Loan Account (DLA).
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA inside demonstrator */}
          <div className="pt-4 border-t border-[#1e382b] flex items-center justify-between">
            <span className="text-[11px] text-[#8a9d94] font-mono">
              Status: {reconciled ? "Locked to Q3 Ledger" : "Ready for Practice Sign-Off"}
            </span>
            <button
              type="button"
              onClick={() => setReconciled(!reconciled)}
              className="touch-target-44 px-4 py-2 rounded-lg font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] flex items-center space-x-1.5 transition active:scale-95 shadow-sm"
            >
              <span>{reconciled ? "Undo Reconcile" : "1-Click Reconcile"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
