"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { BankTransaction } from "@/lib/types";
import {
  Landmark,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileCode,
  Download,
  Send,
  Building,
  ShieldCheck,
  Sparkles,
  Zap,
  UploadCloud,
  Coins,
} from "lucide-react";

const INITIAL_TRANSACTIONS: BankTransaction[] = [
  {
    id: "tx-leg-1",
    date: "2024-11-01",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "FASTER PAYMENTS VANCE A RENT 14 BELGRAVE",
    amount: 2150,
    type: "credit",
    category: "rental_income",
    propertyAddress: "14 Belgrave Place, Solihull",
    status: "matched",
    hmrcCategory: "Gross Rental Income (Box 145)",
  },
  {
    id: "tx-leg-2",
    date: "2024-11-01",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "DIRECT DEBIT PARAGON SPV BTL FACILITY",
    amount: 1280,
    type: "debit",
    category: "mortgage_interest",
    propertyAddress: "14 Belgrave Place, Solihull",
    status: "matched",
    hmrcCategory: "100% Allowable Corporate Finance Cost (CT600 Box 155)",
  },
  {
    id: "tx-leg-3",
    date: "2024-11-01",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "SO CHEN S RENT FLAT 4 HARBORNE",
    amount: 1100,
    type: "credit",
    category: "rental_income",
    propertyAddress: "Flat 4, The Exchange, Harborne",
    status: "matched",
    hmrcCategory: "Gross Rental Income (Box 145)",
  },
  {
    id: "tx-leg-4",
    date: "2024-11-01",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "DIRECT DEBIT SHAWBROOK COMMERCIAL BTL",
    amount: 685,
    type: "debit",
    category: "mortgage_interest",
    propertyAddress: "Flat 4, The Exchange, Harborne",
    status: "matched",
    hmrcCategory: "100% Allowable Corporate Finance Cost (CT600 Box 155)",
  },
  {
    id: "tx-leg-5",
    date: "2024-10-15",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "TRANSFER TO SUKHPREET KAUR DLA REPAYMENT",
    amount: 15000,
    type: "debit",
    category: "other",
    propertyAddress: "Corporate Balance Sheet",
    status: "matched",
    hmrcCategory: "Director Loan Account Repayment (0% Tax Non-Income)",
  },
  {
    id: "tx-leg-6",
    date: "2024-10-05",
    bankName: "Starling Business Banking",
    accountNumber: "•••• 9182",
    description: "MIDLAND HEATING BOILER CP12 INVOICE",
    amount: 2100,
    type: "debit",
    category: "repairs",
    propertyAddress: "14 Belgrave Place, Solihull",
    status: "matched",
    hmrcCategory: "Day-to-day Maintenance & Repairs (CT600 Box 155)",
  },
];

export default function OpenBankingHub() {
  const { activeClient, triggerToast } = useDemoStore();
  const [transactions, setTransactions] = useState<BankTransaction[]>(INITIAL_TRANSACTIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>("all");

  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, t) => acc + t.amount, 0);

  const matchedCount = transactions.filter((t) => t.status === "matched").length;

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    triggerToast("Connecting UK Open Banking API", "Polling Starling, Barclays & NatWest clearing feeds...", "info");

    setTimeout(() => {
      setIsRefreshing(false);
      triggerToast("Feed Synchronized", "6 new transactions reconciled against AST leases and mortgage schedules.", "success");
    }, 800);
  };

  const handleSimulateStatementUpload = (bankName: string) => {
    triggerToast("Parsing Bank Statement", `Ingesting ${bankName} statement (CSV/OFX format)...`, "info");
    setTimeout(() => {
      triggerToast(
        "Auto-Reconciliation Complete",
        `100% of transactions matched to ${activeClient.entityName} properties with zero manual typing.`,
        "success"
      );
    }, 700);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (selectedBank === "all") return true;
    return t.bankName.toLowerCase().includes(selectedBank.toLowerCase());
  });

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Banner */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                Universal UK Bank Reconciliation
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Entity: <strong className="text-neutral-200">{activeClient.entityName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bank Feeds & Smart Reconciliation
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Zero-cost UK bank statement importer (CSV, OFX, QIF) supporting Starling, Monzo, Tide, NatWest, Barclays, HSBC, and Lloyds. Automated tenant rent matching and mortgage interest verification.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={isRefreshing}
              onClick={handleRefreshFeed}
              className="touch-target-44 px-4 py-2.5 rounded-lg text-xs font-bold bg-gold hover:bg-gold-hover text-obsidian transition-all shadow-gold flex items-center space-x-2 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Polling Bank Feeds..." : "Sync Live Bank Feeds"}</span>
            </button>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Inflow / Rent Credits</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 num-tabular">
              +£{totalCredits.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">Matched to active tenancies</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Outflow / Debits</span>
            <span className="text-xl sm:text-2xl font-bold text-white num-tabular">
              -£{totalDebits.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">Mortgages, repairs & DLA draw</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Auto-Reconciled Ratio</span>
            <span className="text-xl sm:text-2xl font-bold text-gold num-tabular">
              100%
            </span>
            <span className="text-[10px] text-emerald-400 block">{matchedCount} of {transactions.length} reconciled</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">HMRC MTD Audit Trail</span>
            <div className="flex items-center space-x-1.5 font-bold text-emerald-400 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographic Hash</span>
            </div>
            <span className="text-[10px] text-neutral-400 block">Digital receipt compliance</span>
          </div>
        </div>
      </div>

      {/* Universal Drag-and-Drop Statement Importer */}
      <div className="accountant-card p-5 bg-cardSurface border border-neutral-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <UploadCloud className="w-4 h-4 text-gold" />
            <span>Smart UK Bank Statement Importer (Zero Monthly Fees)</span>
          </span>
          <span className="text-[10px] text-gold font-mono">CSV &bull; OFX &bull; QIF</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 text-[11px]">Instant Bank Presets:</span>
          {["Starling Bank", "Monzo Business", "Tide Banking", "Barclays", "NatWest", "HSBC UK", "Lloyds Bank"].map((bank) => (
            <button
              key={bank}
              type="button"
              onClick={() => handleSimulateStatementUpload(bank)}
              className="touch-target-44 px-3 py-1.5 rounded-lg bg-obsidian-400 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-[11px] font-semibold transition"
            >
              {bank}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="accountant-card bg-cardSurface border border-neutral-800 rounded-xl overflow-hidden space-y-3 p-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-gold" />
            <span>Reconciled Transactions Register ({filteredTransactions.length})</span>
          </h2>
          <span className="text-xs text-neutral-400">
            Current Entity: <strong className="text-gold">{activeClient.entityName}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Bank & Account</th>
                <th className="py-2.5 px-3">Transaction Description</th>
                <th className="py-2.5 px-3">Matched Property / Basis</th>
                <th className="py-2.5 px-3 text-right">Inflow (+)</th>
                <th className="py-2.5 px-3 text-right">Outflow (-)</th>
                <th className="py-2.5 px-3 text-center">Reconciliation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-800/30 transition">
                  <td className="py-3 px-3 text-neutral-400 whitespace-nowrap num-tabular">
                    {tx.date}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{tx.bankName}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{tx.accountNumber}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{tx.description}</div>
                    <div className="text-[10px] text-neutral-400">{tx.hmrcCategory}</div>
                  </td>
                  <td className="py-3 px-3 text-neutral-300">
                    <span className="truncate max-w-[200px] block">{tx.propertyAddress}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400 num-tabular whitespace-nowrap">
                    {tx.type === "credit" ? `+£${tx.amount.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-ruby num-tabular whitespace-nowrap">
                    {tx.type === "debit" ? `-£${tx.amount.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Matched</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
