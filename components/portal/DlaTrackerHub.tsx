"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Coins,
  ShieldCheck,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  HelpCircle,
  FileCheck2,
  Calendar,
  PoundSterling,
  CheckCircle2,
  X,
  Lock,
} from "lucide-react";
import { DlaEntry } from "@/lib/types";

export default function DlaTrackerHub() {
  const { activeClient, addDlaEntry, triggerToast } = useDemoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [type, setType] = useState<"credit" | "debit">("credit");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<DlaEntry["category"]>("deposit_equity");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const dlaEntries = activeClient.dlaEntries || [];
  const currentBalance = activeClient.dlaBalance || 134625;
  const isOverdrawn = currentBalance < 0;

  const totalCredits = dlaEntries.reduce((acc, e) => acc + e.credit, 0);
  const totalDebits = dlaEntries.reduce((acc, e) => acc + e.debit, 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) {
      triggerToast("Invalid Input", "Please provide a valid description and amount.", "warning");
      return;
    }

    const numAmount = Number(amount);
    const credit = type === "credit" ? numAmount : 0;
    const debit = type === "debit" ? numAmount : 0;

    // Guard against overdrawing DLA
    if (type === "debit" && numAmount > currentBalance) {
      triggerToast(
        "Section 455 Warning",
        "Withdrawal exceeds available DLA credit! This would create an overdrawn director loan subject to 33.75% tax.",
        "warning"
      );
    }

    addDlaEntry(activeClient.id, {
      date,
      description,
      credit,
      debit,
      category,
    });

    setIsAddModalOpen(false);
    setDescription("");
    setAmount("");
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Banner & DLA Meter */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                HMRC Section 455 Safe Guard
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Director: <strong className="text-neutral-200">{activeClient.primaryContact}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Director’s Loan Account (DLA)
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Track capital injected for property deposits, conveyancing, and personal spend. Extract rental profits 100% tax-free as loan repayments before dividend tax.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="touch-target-44 px-4 py-2.5 rounded-lg text-xs font-bold bg-gold hover:bg-gold-hover text-obsidian transition-all shadow-gold flex items-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Record DLA Movement</span>
          </button>
        </div>

        {/* 4 DLA Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          {/* Main Balance */}
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-gold/30 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Current DLA Balance</span>
            <span className={`text-xl sm:text-2xl font-extrabold num-tabular ${isOverdrawn ? "text-ruby" : "text-emerald-400"}`}>
              £{currentBalance.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              {isOverdrawn ? "⚠ Overdrawn (Section 455 Risk)" : "✓ Company Owes Director (Tax-Free Buffer)"}
            </span>
          </div>

          {/* Total Injected */}
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Capital Injected</span>
            <span className="text-lg sm:text-xl font-bold text-white num-tabular">
              £{totalCredits.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>Deposits, SDLT & Personal Card</span>
            </span>
          </div>

          {/* Repaid / Drawn */}
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Tax-Free Capital Extracted</span>
            <span className="text-lg sm:text-xl font-bold text-gold num-tabular">
              £{totalDebits.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              0% Income Tax / 0% Dividend Tax
            </span>
          </div>

          {/* Section 455 Protection */}
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Section 455 Penalty Status</span>
            <div className="flex items-center space-x-1.5 font-bold text-emerald-400 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Protected</span>
            </div>
            <span className="text-[10px] text-neutral-400 block">
              Zero 33.75% tax penalty risk
            </span>
          </div>
        </div>
      </div>

      {/* Tax Strategy Explanation Box */}
      <div className="accountant-card p-4 bg-obsidian-400/90 border border-neutral-800 rounded-xl space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-gold font-bold">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span>How the Director’s Loan Account Saves You Thousands in Tax:</span>
        </div>
        <p className="text-neutral-300 leading-relaxed">
          Because you injected your personal savings to pay the deposit and SDLT on your company properties,
          <strong className="text-white"> {activeClient.entityName}</strong> legally owes you £{currentBalance.toLocaleString()}.
          As rental income flows in, the company can transfer profits directly to your personal bank account as 
          <strong className="text-emerald-400"> loan repayments</strong>. Unlike dividends (which carry up to 33.75% tax),
          DLA repayments attract <strong className="text-emerald-400">0% Income Tax and 0% National Insurance</strong>.
        </p>
      </div>

      {/* DLA Entries Table */}
      <div className="accountant-card bg-cardSurface border border-neutral-800 rounded-xl overflow-hidden space-y-3 p-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Coins className="w-4 h-4 text-gold" />
            <span>Director’s Loan Ledger Entries ({dlaEntries.length})</span>
          </h2>
          <span className="text-xs text-neutral-400">
            Closing Balance: <strong className="text-emerald-400">£{currentBalance.toLocaleString()}</strong>
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Injected (Credit)</th>
                <th className="py-2.5 px-3 text-right">Drawn (Debit)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {dlaEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-neutral-800/30 transition">
                  <td className="py-3 px-3 text-neutral-400 whitespace-nowrap num-tabular">
                    {entry.date}
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {entry.description}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {entry.category.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400 num-tabular whitespace-nowrap">
                    {entry.credit > 0 ? `+£${entry.credit.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-ruby num-tabular whitespace-nowrap">
                    {entry.debit > 0 ? `-£${entry.debit.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Reconciled</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record DLA Movement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="accountant-card max-w-md w-full p-6 bg-cardSurface border border-gold/30 rounded-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                  Director’s Loan Account
                </span>
                <h3 className="text-lg font-bold text-white">Record Capital Movement</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="touch-target-44 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4 text-xs">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-obsidian-400 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setType("credit")}
                  className={`py-2 rounded-md font-bold text-xs transition ${
                    type === "credit" ? "bg-emerald-600 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  + Money Injected (Credit)
                </button>
                <button
                  type="button"
                  onClick={() => setType("debit")}
                  className={`py-2 rounded-md font-bold text-xs transition ${
                    type === "debit" ? "bg-gold text-obsidian shadow-sm" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  - Repayment Drawn (Debit)
                </button>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    type === "credit"
                      ? "e.g. Deposit for Solihull Purchase / Personal Card for Repairs"
                      : "e.g. Tax-free DLA repayment to personal account"
                  }
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Amount (£) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold text-base font-bold num-tabular"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Classification</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
                >
                  <option value="deposit_equity">Property Acquisition Deposit</option>
                  <option value="sdlt_legal">SDLT & Conveyancing Legal Costs</option>
                  <option value="personal_card_expense">Personal Card Paid Company Repair</option>
                  <option value="mileage_reimbursement">HMRC Approved Mileage Allowance</option>
                  <option value="cash_withdrawal">Loan Repayment to Director</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="touch-target-44 px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="touch-target-44 px-5 py-2.5 rounded-lg font-bold bg-gold hover:bg-gold-hover text-obsidian transition shadow-gold"
                >
                  Post to DLA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
