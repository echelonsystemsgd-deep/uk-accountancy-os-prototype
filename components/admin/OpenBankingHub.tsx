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
} from "lucide-react";

const INITIAL_TRANSACTIONS: BankTransaction[] = [
  {
    id: "tx-1",
    date: "2026-10-24",
    bankName: "NatWest Business",
    accountNumber: "•••• 4891",
    description: "SO - TENANT SMITH 14 HIGH ST",
    amount: 2000,
    type: "credit",
    category: "rental_income",
    propertyAddress: "14 High Street, Cheltenham",
    status: "matched",
    hmrcCategory: "Gross Rental Income (Box 20)",
  },
  {
    id: "tx-2",
    date: "2026-10-22",
    bankName: "NatWest Business",
    accountNumber: "•••• 4891",
    description: "NATWEST COMMERCIAL MORTGAGE NW9012",
    amount: 850,
    type: "debit",
    category: "mortgage_interest",
    propertyAddress: "14 High Street, Cheltenham",
    status: "matched",
    hmrcCategory: "Section 24 Residential Finance Cost (Box 44)",
  },
  {
    id: "tx-3",
    date: "2026-10-20",
    bankName: "Barclays SPV Ltd",
    accountNumber: "•••• 2018",
    description: "STANDING ORDER - 7-11 STATION PARADE",
    amount: 4333.33,
    type: "credit",
    category: "rental_income",
    propertyAddress: "7-11 Station Parade, Swindon",
    status: "matched",
    hmrcCategory: "Turnover / Commercial Rent",
  },
  {
    id: "tx-4",
    date: "2026-10-18",
    bankName: "Barclays SPV Ltd",
    accountNumber: "•••• 2018",
    description: "SHAWBROOK COMMERCIAL LOAN INT",
    amount: 1420,
    type: "debit",
    category: "mortgage_interest",
    propertyAddress: "7-11 Station Parade, Swindon",
    status: "matched",
    hmrcCategory: "Allowable Company Loan Interest (CT600)",
  },
  {
    id: "tx-5",
    date: "2026-10-15",
    bankName: "NatWest Business",
    accountNumber: "•••• 4891",
    description: "CHELTENHAM PLUMBING CP12 GAS CERT",
    amount: 140,
    type: "debit",
    category: "repairs",
    propertyAddress: "22 Park Road, Gloucester",
    status: "unreconciled",
    hmrcCategory: "Repairs & Maintenance (Box 25)",
  },
  {
    id: "tx-6",
    date: "2026-10-12",
    bankName: "HSBC Premier",
    accountNumber: "•••• 9931",
    description: "DIRECT LINE LANDLORD PORTFOLIO INS",
    amount: 320,
    type: "debit",
    category: "insurance",
    propertyAddress: "9 Albany Court, Bristol",
    status: "unreconciled",
    hmrcCategory: "Property Insurance (Box 26)",
  },
];

export default function OpenBankingHub() {
  const { triggerToast } = useDemoStore();

  const [transactions, setTransactions] = useState<BankTransaction[]>(INITIAL_TRANSACTIONS);
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isHmrFiling, setIsHmrcFiling] = useState<boolean>(false);
  const [hmrcReceipt, setHmrcReceipt] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((tx) =>
    selectedBank === "all" ? true : tx.bankName.toLowerCase().includes(selectedBank.toLowerCase())
  );

  const matchedCount = transactions.filter((t) => t.status === "matched").length;
  const totalRentalReceived = transactions
    .filter((t) => t.category === "rental_income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalFinanceDeducted = transactions
    .filter((t) => t.category === "mortgage_interest")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAutoReconcile = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => ({ ...t, status: "matched" }))
      );
      setIsSyncing(false);
      triggerToast(
        "Open Banking Reconciled",
        "All 6 bank transactions automatically matched to property ledgers.",
        "success"
      );
    }, 800);
  };

  const handleTransmitHmrc = () => {
    setIsHmrcFiling(true);
    setTimeout(() => {
      const receiptId = `HMRC-ITSA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setHmrcReceipt(receiptId);
      setIsHmrcFiling(false);
      triggerToast(
        "HMRC Gateway Response: Accepted",
        `Submission receipt generated: ${receiptId}`,
        "success"
      );
    }, 1200);
  };

  const sampleXmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<HMRCSubmission xmlns="http://www.govtalk.gov.uk/taxation/HMRC/ITSA/v2" SchemaVersion="2.0">
  <Header>
    <MessageDetails>
      <Class>HMRC-ITSA-PROPERTY</Class>
      <Qualifier>request</Qualifier>
      <Function>submit</Function>
      <CorrelationID>KP-202425-${Date.now()}</CorrelationID>
      <Transformation>XML</Transformation>
    </MessageDetails>
    <SenderDetails>
      <IDType>AgentRefNumber</IDType>
      <ID>AARN1902847</ID>
    </SenderDetails>
  </Header>
  <Body>
    <UKPropertySchedule TaxYear="2024/25">
      <LandlordUTR>7821940215</LandlordUTR>
      <AccountingPeriod StartDate="2024-04-06" EndDate="2025-04-05"/>
      <RentalIncome TotalGross="${totalRentalReceived.toFixed(2)}"/>
      <Expenses>
        <RepairsAndMaintenance>140.00</RepairsAndMaintenance>
        <Insurance>320.00</Insurance>
        <ProfessionalFees>850.00</ProfessionalFees>
      </Expenses>
      <Section24FinanceCosts>
        <ResidentialInterest>${totalFinanceDeducted.toFixed(2)}</ResidentialInterest>
        <BasicRateTaxReductionPercentage>20.0</BasicRateTaxReductionPercentage>
        <CalculatedTaxCredit>${(totalFinanceDeducted * 0.2).toFixed(2)}</CalculatedTaxCredit>
      </Section24FinanceCosts>
      <NetTaxableProfit>${(totalRentalReceived - 1310).toFixed(2)}</NetTaxableProfit>
    </UKPropertySchedule>
  </Body>
</HMRCSubmission>`;

  const handleDownloadXml = () => {
    const blob = new Blob([sampleXmlPayload], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `HMRC_MTD_ITSA_2024_25_${Date.now()}.xml`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("XML Downloaded", "HMRC MTD statutory submission file saved.", "info");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-neutral-900">
                  Open Banking Feeds & HMRC MTD Filing Gateway
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  LIVE RECONCILER
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Direct UK Open Banking transaction streaming, Section 24 matching, and official HMRC XML gateway generation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleAutoReconcile}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-sm transition flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>Auto-Match Bank Feed</span>
            </button>
          </div>
        </div>

        {/* Live Bank Feed Status Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
            <div>
              <span className="font-semibold text-neutral-900 block">NatWest Commercial</span>
              <span className="text-[11px] text-neutral-500 font-mono">Acc: •••• 4891</span>
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
            <div>
              <span className="font-semibold text-neutral-900 block">Barclays SPV Corporate</span>
              <span className="text-[11px] text-neutral-500 font-mono">Acc: •••• 2018</span>
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
            <div>
              <span className="font-semibold text-neutral-900 block">HSBC Premier Reserve</span>
              <span className="text-[11px] text-neutral-500 font-mono">Acc: •••• 9931</span>
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              Live Feed
            </span>
          </div>
        </div>
      </div>

      {/* Transaction Matching Feed */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-neutral-900">
              Real-Time Bank Stream & Property Ledger Mapping
            </h2>
            <p className="text-xs text-neutral-500">
              {matchedCount} of {transactions.length} transactions reconciled with UK property schedules
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-neutral-500">Filter Bank:</span>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="text-xs border border-neutral-200 rounded-md p-1.5 bg-white font-medium"
            >
              <option value="all">All Linked Accounts</option>
              <option value="NatWest">NatWest Business</option>
              <option value="Barclays">Barclays SPV</option>
              <option value="HSBC">HSBC Premier</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 text-[11px]">
                <th className="py-2.5 font-semibold">Date</th>
                <th className="py-2.5 font-semibold">Account & Reference</th>
                <th className="py-2.5 font-semibold">Mapped Property</th>
                <th className="py-2.5 font-semibold">HMRC Box</th>
                <th className="py-2.5 font-semibold text-right">Amount</th>
                <th className="py-2.5 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-50/70 transition">
                  <td className="py-3 font-mono text-neutral-500">{tx.date}</td>
                  <td className="py-3">
                    <div className="font-bold text-neutral-900">{tx.description}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{tx.bankName} ({tx.accountNumber})</div>
                  </td>
                  <td className="py-3 text-neutral-700">{tx.propertyAddress}</td>
                  <td className="py-3 text-neutral-600 text-[11px]">{tx.hmrcCategory}</td>
                  <td className={`py-3 text-right font-mono font-bold ${tx.type === "credit" ? "text-emerald-700" : "text-neutral-900"}`}>
                    {tx.type === "credit" ? "+" : "-"}£{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === "matched"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {tx.status === "matched" ? "Matched" : "Unmatched"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HMRC MTD XML Gateway Submission Section */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 text-white space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">
                Direct HMRC MTD Filing XML Gateway
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Official XML schema compliant with HMRC Making Tax Digital for Income Tax Self Assessment (ITSA)
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleDownloadXml}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center space-x-1.5 border border-white/20"
            >
              <Download className="w-3.5 h-3.5 text-neutral-300" />
              <span>Download Schema (.xml)</span>
            </button>

            <button
              type="button"
              onClick={handleTransmitHmrc}
              disabled={isHmrFiling}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5"
            >
              {isHmrFiling ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to HMRC Gateway</span>
                </>
              )}
            </button>
          </div>
        </div>

        {hmrcReceipt && (
          <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>HMRC Gateway Submission Receipt: <strong className="font-mono text-white">{hmrcReceipt}</strong></span>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30">
              STATUS: ACCEPTED
            </span>
          </div>
        )}

        {/* Syntax Highlighted XML Payload Viewer */}
        <div className="relative">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2">
            <span>Generated Payload (Ready for HMRC ASA API):</span>
            <span className="font-mono">Schema: v2.0 (Finance Act 2024/25)</span>
          </div>
          <pre className="p-4 rounded-lg bg-slate-950 border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-64 scrollbar-none leading-relaxed">
            {sampleXmlPayload}
          </pre>
        </div>
      </div>
    </div>
  );
}
