"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { BillCategory, PropertyBillItem, NewBillInput } from "@/lib/types";
import { generateLandlordMonthlyStatementPdf } from "@/lib/pdfGenerator";
import {
  Receipt,
  Plus,
  Printer,
  CheckCircle2,
  Trash2,
  Building2,
  Calendar,
  PoundSterling,
  ShieldCheck,
  Coins,
  Sparkles,
  UploadCloud,
  X,
  FileText,
  Filter,
  ArrowRight,
  Download,
} from "lucide-react";

export default function LandlordBillTrackerHub() {
  const { activeClient, addNewBill, deleteBill, addDlaEntry, triggerToast } = useDemoStore();

  const [selectedFilter, setSelectedFilter] = useState<"all" | "mortgage" | "repairs" | "paid" | "due">("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrDetected, setOcrDetected] = useState<{ vendor: string; amount: number; vat: number; date: string; category: BillCategory } | null>(null);

  // Form states for new bill modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BillCategory>("maintenance_repairs");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "annual" | "one_off">("one_off");
  const [propertyAddress, setPropertyAddress] = useState(
    activeClient.properties[0]?.address || "14 Belgrave Place, Solihull"
  );
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<"paid" | "due" | "scheduled">("paid");
  const [creditToDla, setCreditToDla] = useState(false);

  const bills = activeClient.bills || [];

  // Summary Calculations
  const allowableExpensesTotal = bills
    .filter((b) => b.isAllowableExpense && b.category !== "mortgage_interest")
    .reduce((acc, b) => acc + b.amount, 0);

  const spvMortgageInterestTotal = bills
    .filter((b) => b.category === "mortgage_interest")
    .reduce((acc, b) => acc + b.amount, 0);

  const totalSpend = allowableExpensesTotal + spvMortgageInterestTotal;
  const netRentalIncome = (activeClient.totalRentalIncome || 39000) - totalSpend;

  // Filtered Bills by category and month
  const filteredBills = bills.filter((bill) => {
    if (selectedFilter === "mortgage" && bill.category !== "mortgage_interest") return false;
    if (selectedFilter === "repairs" && bill.category !== "maintenance_repairs") return false;
    if (selectedFilter === "paid" && bill.status !== "paid") return false;
    if (selectedFilter === "due" && bill.status !== "due") return false;

    if (selectedMonth !== "all") {
      const billMonth = bill.dueDate.substring(0, 7); // e.g. "2024-10"
      if (billMonth !== selectedMonth) return false;
    }

    return true;
  });

  // Extract unique months from bills for monthly print filter
  const availableMonths = Array.from(new Set(bills.map((b) => b.dueDate.substring(0, 7)))).sort().reverse();

  // Simulated Heuristic OCR File Drop
  const handleSimulateOcrDrop = (fileName: string, detectedVendor: string, detectedAmount: number, detectedCat: BillCategory) => {
    setIsOcrProcessing(true);
    triggerToast("OCR Scanning Document", `Extracting text from ${fileName}...`, "info");

    setTimeout(() => {
      const vat = Math.round(detectedAmount * 0.20 * 100) / 100;
      const detected = {
        vendor: detectedVendor,
        amount: detectedAmount,
        vat,
        date: new Date().toISOString().split("T")[0],
        category: detectedCat,
      };

      setOcrDetected(detected);
      setTitle(`${detectedVendor} Invoice`);
      setVendor(detectedVendor);
      setAmount(detectedAmount);
      setCategory(detectedCat);
      setIsOcrProcessing(false);
      setIsAddModalOpen(true);

      triggerToast(
        "OCR Extraction Complete",
        `Identified ${detectedVendor} (£${detectedAmount.toFixed(2)}). Category: ${detectedCat.replace(/_/g, " ")}.`,
        "success"
      );
    }, 600);
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || Number(amount) <= 0) {
      triggerToast("Invalid Input", "Please provide a valid bill title and amount.", "warning");
      return;
    }

    const numAmount = Number(amount);
    const input: NewBillInput = {
      title,
      category,
      vendorOrRecipient: vendor || "Service Contractor",
      amount: numAmount,
      frequency,
      isSection24Restricted: category === "mortgage_interest",
      propertyAddress,
      dueDate,
      status,
    };

    addNewBill(activeClient.id, input);

    if (creditToDla) {
      addDlaEntry(activeClient.id, {
        date: dueDate,
        description: `Personal Card Paid Company Bill: ${title} (${vendor || "Contractor"})`,
        credit: numAmount,
        debit: 0,
        category: "personal_card_expense",
      });
      triggerToast("DLA Credited", `£${numAmount.toFixed(2)} added to your Director’s Loan buffer.`, "success");
    }

    setIsAddModalOpen(false);
    setTitle("");
    setVendor("");
    setAmount("");
    setCreditToDla(false);
    setOcrDetected(null);
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* 1. Header (No Useless Orange Eyebrow Text) */}
      <div className="accountant-card p-5 sm:p-6 bg-[#162032] border border-[#1F293D] rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              SPV Property Bills, Expenses &amp; OCR Ingest
            </h1>
            <p className="text-xs text-slate-400">
              Operating Entity: <strong className="text-slate-200">{activeClient.entityName}</strong> &bull; Section 24 Mortgage Relief &amp; Allowable Revenue Classification
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                generateLandlordMonthlyStatementPdf(activeClient, filteredBills, selectedMonth);
                triggerToast("PDF Generated", "Downloaded official A4 monthly statement for your records.", "success");
              }}
              className="touch-target-44 px-3.5 py-2 rounded-lg font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-2 transition shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download PDF Statement</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="touch-target-44 px-3.5 py-2 rounded-lg font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-2 transition shadow-sm active:scale-95"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Statement View</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="touch-target-44 px-3.5 py-2 rounded-lg font-semibold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-2 shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Log Bill / Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Rexora-Style Metric Cards (with icons in top right pills, bold figures, inner shadows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: SPV Mortgage Interest */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Mortgage Finance Costs</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums font-mono block">
              £{spvMortgageInterestTotal.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 font-bold">
                100% CT600 Deductible
              </span>
              <span className="text-slate-400">Section 24 SPV</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Operating Expenses */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Allowable Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono block">
              £{allowableExpensesTotal.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-slate-300 bg-slate-800 font-medium">
                Repairs, Insurance &amp; Letting
              </span>
              <span className="text-slate-400">{bills.length} Invoices</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Total Outgoings */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Property Outgoings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <PoundSterling className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] tabular-nums font-mono block">
              £{totalSpend.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-slate-300 bg-slate-800 font-medium">
                Annual Spending
              </span>
              <span className="text-emerald-400 font-bold">100% Tax Indexed</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Net Retained Rental Cashflow */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Net Retained Cashflow</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono block">
              £{netRentalIncome.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 font-bold">
                Tax-Free DLA Extractable
              </span>
              <span className="text-slate-400">Post-Finance</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Smart Receipt & Invoice Dropzone (Zero-Cost OCR) */}
      <div className="accountant-card p-6 bg-[#162032] border-2 border-dashed border-[#1F293D] hover:border-sky-500/50 rounded-xl transition-all text-center space-y-3">
        <div className="w-11 h-11 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/20">
          <UploadCloud className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">
            Smart Receipt &amp; Invoice Ingestion (OCR Extractor)
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Drop PDF, PNG, or JPG invoices. Text heuristics automatically parse Supplier, Gross, 20% VAT, and map to HMRC CT600 expense accounts.
          </p>
        </div>

        {/* Quick OCR Samples Drop Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-[11px] text-slate-500">Test Sample OCR Scans:</span>
          <button
            type="button"
            onClick={() =>
              handleSimulateOcrDrop(
                "british_gas_boiler_service.pdf",
                "British Gas Commercial",
                320.00,
                "maintenance_repairs"
              )
            }
            className="touch-target-44 px-3 py-1.5 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>British Gas (£320)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleSimulateOcrDrop(
                "screwfix_plumbing_supplies.pdf",
                "Screwfix Spares Ltd",
                145.80,
                "maintenance_repairs"
              )
            }
            className="touch-target-44 px-3 py-1.5 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Screwfix Parts (£145.80)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleSimulateOcrDrop(
                "directline_insurance_renewal.pdf",
                "Direct Line Landlord Insurance",
                710.00,
                "insurance"
              )
            }
            className="touch-target-44 px-3 py-1.5 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Landlord Insurance (£710)</span>
          </button>
        </div>
      </div>

      {/* 4. Filter & Month Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 bg-[#111827] p-1 rounded-lg border border-[#1F293D] text-xs">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedFilter === "all" ? "bg-[#0077C8] text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              All Outgoings ({bills.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("mortgage")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedFilter === "mortgage" ? "bg-[#0077C8] text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Mortgage Interest
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("repairs")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedFilter === "repairs" ? "bg-[#0077C8] text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Repairs &amp; Maintenance
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("paid")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedFilter === "paid" ? "bg-[#0077C8] text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Reconciled
            </button>
          </div>

          {/* Month Selector Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1F293D] text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Months</option>
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {new Date(`${m}-01`).toLocaleString("default", { month: "long", year: "numeric" })}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setIsPrintModalOpen(true)}
          className="touch-target-44 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5 text-sky-400" />
          <span>Print Monthly Record</span>
        </button>
      </div>

      {/* 5. Bills Ledger Table */}
      <div className="accountant-card bg-[#162032] border border-[#1F293D] rounded-xl overflow-hidden space-y-3 p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description &amp; Vendor</th>
                <th className="py-2.5 px-3">Property Asset</th>
                <th className="py-2.5 px-3">HMRC Classification</th>
                <th className="py-2.5 px-3 text-right">Amount (£)</th>
                <th className="py-2.5 px-3 text-center">Receipt</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D]/60">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-[#1A263C] transition">
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap font-mono tabular-nums">
                    {bill.dueDate}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{bill.title}</div>
                    <div className="text-[11px] text-slate-400">{bill.vendorOrRecipient}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    <span className="truncate max-w-[180px] block">{bill.propertyAddress}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        bill.category === "mortgage_interest"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {bill.category === "mortgage_interest" ? "Section 24 SPV (100% Allowable)" : bill.category.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-white font-mono tabular-nums whitespace-nowrap">
                    £{bill.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => deleteBill(activeClient.id, bill.id)}
                      className="touch-target-44 p-1.5 rounded text-slate-400 hover:text-red-400 transition"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Printable Monthly Statement Modal (Full End-of-Month Record Printable Format) */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="accountant-card max-w-3xl w-full p-6 sm:p-8 bg-[#111827] border border-[#2D3B55] rounded-2xl shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            {/* Modal Controls Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 no-print">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  End-of-Month Record Keeping
                </span>
                <h2 className="text-lg font-bold text-white">Monthly Spending Statement &amp; PDF Export</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    generateLandlordMonthlyStatementPdf(activeClient, filteredBills, selectedMonth);
                    triggerToast("PDF Generated", "Downloaded official A4 monthly statement for your records.", "success");
                  }}
                  className="touch-target-44 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-1.5 shadow-sm transition active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Statement</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="touch-target-44 px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1.5 transition active:scale-95 border border-slate-700"
                >
                  <Printer className="w-4 h-4 text-slate-400" />
                  <span>Print View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="touch-target-44 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Statement Sheet (A4 Structured Format) */}
            <div className="p-6 rounded-xl bg-white text-slate-900 space-y-6 shadow-sm border border-slate-200">
              {/* Document Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-950 uppercase font-mono">
                    {activeClient.entityName}
                  </h1>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Co. Reg: 14892011 &bull; Registered in England &amp; Wales &bull; Section 24 SPV
                  </p>
                  <p className="text-xs text-slate-600">
                    Director: {activeClient.primaryContact} &bull; Tax Year: {activeClient.taxYear}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Monthly Expense Ledger
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedMonth === "all" ? "Full Financial Year 2024/25" : new Date(`${selectedMonth}-01`).toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Generated: {new Date().toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              {/* Summary Cards in Print */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded border border-slate-300 bg-slate-50">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Mortgage Interest</span>
                  <span className="text-lg font-bold font-mono text-slate-900">
                    £{spvMortgageInterestTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-700 block">100% Corporate Relief</span>
                </div>
                <div className="p-3 rounded border border-slate-300 bg-slate-50">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Allowable Expenses</span>
                  <span className="text-lg font-bold font-mono text-slate-900">
                    £{allowableExpensesTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-600 block">Repairs, Lettings, Admin</span>
                </div>
                <div className="p-3 rounded border border-slate-300 bg-slate-50">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Total Outgoings</span>
                  <span className="text-lg font-bold font-mono text-slate-950">
                    £{totalSpend.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-600 block">HMRC Indexed</span>
                </div>
              </div>

              {/* Items Breakdown Table */}
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-400 text-slate-700 font-bold uppercase text-[10px]">
                    <th className="py-2">Date</th>
                    <th className="py-2">Vendor / Payee</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">HMRC Category</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredBills.map((b) => (
                    <tr key={b.id}>
                      <td className="py-2 font-mono text-slate-600">{b.dueDate}</td>
                      <td className="py-2 font-bold text-slate-900">{b.vendorOrRecipient}</td>
                      <td className="py-2 text-slate-700">{b.title}</td>
                      <td className="py-2 text-[10px] text-slate-600">{b.category.replace(/_/g, " ")}</td>
                      <td className="py-2 text-right font-mono font-bold text-slate-900">£{b.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Sign-off box for monthly book binder */}
              <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-600">
                <div>
                  <p>Certified complete for HMRC CT600 &amp; Section 24 compliance.</p>
                  <p className="mt-4">Director Signature: ___________________________</p>
                </div>
                <div className="text-right">
                  <p>Supervising Practice: Mercian Wealth Tax &amp; Ledger</p>
                  <p className="mt-4">Date Signed: _____ / _____ / 202___</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Manual & OCR Log Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="accountant-card max-w-md w-full p-6 bg-[#162032] border border-[#2D3B55] rounded-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                  Expense &amp; Invoice Ingestion
                </span>
                <h3 className="text-lg font-bold text-white">Record Property Outgoing</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setOcrDetected(null);
                }}
                className="touch-target-44 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {ocrDetected && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>OCR Heuristic Auto-Fill Applied</span>
                </span>
                <p>Extracted Supplier: {ocrDetected.vendor} &bull; Net: £{(ocrDetected.amount - ocrDetected.vat).toFixed(2)} &bull; 20% VAT: £{ocrDetected.vat.toFixed(2)}</p>
              </div>
            )}

            <form onSubmit={handleCreateBill} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bill / Expense Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Worcester Boiler Replacement / CP12 Gas Certificate"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">HMRC Expense Account *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BillCategory)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="maintenance_repairs">Repairs &amp; Maintenance (Allowable)</option>
                    <option value="mortgage_interest">Paragon Mortgage Interest (Section 24)</option>
                    <option value="insurance">Landlord Property Insurance</option>
                    <option value="legal_professional">Accountancy &amp; Conveyancing</option>
                    <option value="lettings_management">Agent Management Fee</option>
                    <option value="ground_rent_service">Ground Rent &amp; Service Charge</option>
                    <option value="utilities">Council Tax &amp; Water Rates</option>
                    <option value="capital_improvement">Capital Enhancement (CGT Base Cost)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gross Amount (£) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 320.00"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vendor / Payee</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="e.g. British Gas / Screwfix"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Allocation</label>
                <select
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white focus:outline-none focus:border-sky-500"
                >
                  {activeClient.properties.map((p) => (
                    <option key={p.id} value={p.address}>
                      {p.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* DLA Credit Checkbox (Crucial for Directors paying out of personal pocket) */}
              <div className="p-3 rounded-lg bg-[#111827] border border-[#1F293D] flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="creditToDla"
                  checked={creditToDla}
                  onChange={(e) => setCreditToDla(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#0077C8] focus:ring-sky-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="creditToDla" className="text-slate-300 cursor-pointer text-xs">
                  <strong className="text-white block">Paid from Personal Director Card?</strong>
                  Credit this expense amount to Director’s Loan Account (DLA) so it can be extracted tax-free later.
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1F293D]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="touch-target-44 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="touch-target-44 px-4 py-2 rounded-lg font-bold bg-[#0077C8] hover:bg-[#0284C7] text-white shadow-sm transition active:scale-95"
                >
                  Confirm &amp; Record Outgoing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
