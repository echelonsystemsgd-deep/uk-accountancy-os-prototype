"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { BillCategory, PropertyBillItem, NewBillInput } from "@/lib/types";
import UserNextStepBar from "@/components/shared/UserNextStepBar";
import {
  Receipt,
  Plus,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Building2,
  Calendar,
  PoundSterling,
  ShieldCheck,
  ArrowRight,
  Filter,
  ExternalLink,
  X,
  FileText,
} from "lucide-react";

export default function LandlordBillTrackerHub() {
  const { activeClient, addNewBill, deleteBill, triggerToast, setCurrentView } = useDemoStore();

  const [selectedFilter, setSelectedFilter] = useState<"all" | "allowable" | "section24" | "paid" | "due">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for new bill modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BillCategory>("maintenance_repairs");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "annual" | "one_off">("one_off");
  const [isSection24, setIsSection24] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState(
    activeClient.properties[0]?.address || "Residential Buy-to-Let Property, UK"
  );
  const [dueDate, setDueDate] = useState("2026-11-01");
  const [status, setStatus] = useState<"paid" | "due" | "scheduled">("paid");

  const bills = activeClient.bills || [];

  // Summary Calculations
  const grossRent = activeClient.totalRentalIncome;
  const allowableExpensesTotal = bills
    .filter((b) => b.isAllowableExpense)
    .reduce((acc, b) => acc + b.amount, 0);

  const section24FinanceCostsTotal = bills
    .filter((b) => b.isSection24Restricted)
    .reduce((acc, b) => acc + b.amount, 0);

  const netCashflow = grossRent - allowableExpensesTotal - section24FinanceCostsTotal;
  const section24TaxReducer = Math.round(section24FinanceCostsTotal * 0.20 * 100) / 100;

  // Filtered Bills
  const filteredBills = bills.filter((bill) => {
    if (selectedFilter === "allowable") return bill.isAllowableExpense;
    if (selectedFilter === "section24") return bill.isSection24Restricted;
    if (selectedFilter === "paid") return bill.status === "paid";
    if (selectedFilter === "due") return bill.status === "due";
    return true;
  });

  const handlePrintStatement = () => {
    triggerToast(
      "Preparing Month-End Statement",
      "Launching print-ready property cashflow schedule for landlord records.",
      "info"
    );
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || amount <= 0) {
      triggerToast("Invalid Input", "Please provide a valid bill title and amount.", "warning");
      return;
    }

    const input: NewBillInput = {
      title,
      category,
      vendorOrRecipient: vendor || "Service Contractor",
      amount: Number(amount),
      frequency,
      isSection24Restricted: isSection24,
      propertyAddress,
      dueDate,
      status,
    };

    addNewBill(activeClient.id, input);
    setIsAddModalOpen(false);
    // Reset Form
    setTitle("");
    setVendor("");
    setAmount("");
  };

  const handlePreviewReceipt = (bill: PropertyBillItem) => {
    triggerToast(
      "Secure Receipt Preview",
      `Opened encrypted statutory voucher for ${bill.title}.`,
      "info"
    );
    if (typeof window !== "undefined") {
      window.open(
        `/api/preview?title=${encodeURIComponent(bill.title)}&entity=${encodeURIComponent(activeClient.entityName)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header with Actions & Print Trigger */}
      <div className="accountant-card p-5 sm:p-6 space-y-4 print:border-none print:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200 uppercase tracking-wider font-mono">
                Tax Year {activeClient.taxYear}
              </span>
              <span className="text-neutral-400 text-xs">&bull;</span>
              <span className="text-xs text-neutral-600 font-medium">
                Portfolio: <strong className="text-neutral-900">{activeClient.entityName}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight flex items-center space-x-2">
              <Receipt className="w-6 h-6 text-emerald-700" />
              <span>Property Bill & Outgoings Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
              Track allowable maintenance, management fees, and Section 24 finance costs for statutory HMRC reconciliation. Print month-end cashflow records with 1 click.
            </p>
          </div>

          {/* Quick Header CTAs */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrintStatement}
              className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-semibold bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 transition inline-flex items-center space-x-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-600" />
              <span>Print Month-End Ledger</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-semibold bg-primary hover:bg-neutral-800 text-white transition inline-flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Log Bill / Expense</span>
            </button>
          </div>
        </div>

        {/* 2. Embedded Guided Next-Step Prompt */}
        <div className="print:hidden">
          <UserNextStepBar
            stepNumber={2}
            totalSteps={4}
            title="Reconcile Property Bills Against Bank Statements"
            description="All 6 allowable expenses and mortgage finance costs have been itemized. Print your monthly physical record or verify voucher attachments for your year-end computation."
            actionLabel="View Statutory Statements & P&L"
            targetView="statements"
            statusBadge="Reconciliation Ready"
            variant="emerald"
          />
        </div>
      </div>

      {/* 3. 4-Pillar Financial Summary Cards (8px grid spacing) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Rental Turnover */}
        <div className="accountant-card p-4 space-y-1 bg-white border border-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>Gross Rental Turnover</span>
            <Building2 className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 font-mono tracking-tight">
            £{grossRent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-neutral-500">
            £{(grossRent / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month
          </div>
        </div>

        {/* Allowable Property Expenses */}
        <div className="accountant-card p-4 space-y-1 bg-emerald-50/50 border border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-900 font-medium">
            <span>Allowable Expenses</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-800 font-mono tracking-tight">
            £{allowableExpensesTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-700">
            100% Tax Deductible (SA105 Boxes 24–29)
          </div>
        </div>

        {/* Section 24 Finance Costs */}
        <div className="accountant-card p-4 space-y-1 bg-amber-50/50 border border-amber-200">
          <div className="flex items-center justify-between text-xs text-amber-900 font-medium">
            <span>Section 24 Finance Costs</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-900 font-mono tracking-tight">
            £{section24FinanceCostsTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-800 font-medium">
            20% Tax Reducer: <strong className="text-amber-950 font-mono">£{section24TaxReducer.toFixed(2)}</strong>
          </div>
        </div>

        {/* Net Monthly Cashflow Profit */}
        <div className="accountant-card p-4 space-y-1 bg-slate-900 text-white border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>Net Landlord Cashflow</span>
            <PoundSterling className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono tracking-tight">
            £{netCashflow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400">
            Retained profit after all bills & mortgages
          </div>
        </div>
      </div>

      {/* 4. Filter Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 print:hidden">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              selectedFilter === "all"
                ? "bg-neutral-900 text-white shadow-2xs font-semibold"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            All Bills ({bills.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("allowable")}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              selectedFilter === "allowable"
                ? "bg-emerald-700 text-white shadow-2xs font-semibold"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            Allowable Expenses ({bills.filter((b) => b.isAllowableExpense).length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("section24")}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              selectedFilter === "section24"
                ? "bg-amber-700 text-white shadow-2xs font-semibold"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            Section 24 Mortgage ({bills.filter((b) => b.isSection24Restricted).length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("paid")}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              selectedFilter === "paid"
                ? "bg-neutral-800 text-white font-semibold"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            Reconciled & Paid
          </button>
        </div>

        <span className="text-[11px] text-neutral-500 font-medium font-mono">
          Showing {filteredBills.length} of {bills.length} bills
        </span>
      </div>

      {/* 5. Itemized Bill Table (Desktop) & Cards (Mobile) */}
      <div className="accountant-card overflow-hidden bg-white border border-neutral-200 shadow-xs">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-neutral-900 tracking-tight">
              Itemized Portfolio Outgoings & Statutory Tax Mapping
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-200 text-neutral-800">
              ICAEW Compliant
            </span>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Direct matching with HMRC SA105 / CT600
          </span>
        </div>

        {/* Responsive Table for Desktop (lg+) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100/70 text-neutral-600 font-semibold border-b border-neutral-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Bill / Expense Title</th>
                <th className="py-3 px-4">Vendor & Property</th>
                <th className="py-3 px-4">Tax Classification</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right print:hidden">Voucher / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-normal">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-neutral-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">
                    <div className="flex items-center space-x-2">
                      <span>{bill.title}</span>
                      {bill.isSection24Restricted && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Sec 24
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {bill.hmrcBoxNote}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    <span className="font-medium text-neutral-800 block">{bill.vendorOrRecipient}</span>
                    <span className="text-[10px] text-neutral-500 block truncate max-w-[200px]">
                      {bill.propertyAddress}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        bill.isSection24Restricted
                          ? "bg-amber-50 text-amber-900 border-amber-200"
                          : "bg-emerald-50 text-emerald-900 border-emerald-200"
                      }`}
                    >
                      {bill.isSection24Restricted ? "Finance Cost (Restricted)" : "Allowable Expense (100%)"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900 text-sm">
                    £{bill.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Paid</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 print:hidden">
                    <button
                      type="button"
                      onClick={() => handlePreviewReceipt(bill)}
                      className="px-2.5 py-1 rounded text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 transition inline-flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                      <span>Receipt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBill(activeClient.id, bill.id)}
                      className="p-1 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove from ledger"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Modal: Add New Property Bill / Expense */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="accountant-card max-w-lg w-full p-6 bg-white space-y-5 rounded-xl shadow-2xl relative border border-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  Log New Property Bill or Outgoing
                </h3>
                <p className="text-xs text-neutral-500">
                  Adds directly to {activeClient.entityName} statutory schedule
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBill} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Bill / Expense Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gas Safety Inspection (CP12) or Boiler Repair"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Expense Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const cat = e.target.value as BillCategory;
                      setCategory(cat);
                      if (cat === "mortgage_interest") {
                        setIsSection24(true);
                      } else {
                        setIsSection24(false);
                      }
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                  >
                    <option value="maintenance_repairs">Repairs & Maintenance</option>
                    <option value="letting_fees">Letting Agent Management Fee</option>
                    <option value="service_charge">Block Service Charge</option>
                    <option value="ground_rent">Freeholder Ground Rent</option>
                    <option value="mortgage_interest">Mortgage Finance Costs</option>
                    <option value="insurance">Landlord Insurance</option>
                    <option value="utilities_council_tax">Council Tax / Void Rates</option>
                    <option value="statutory_compliance">Gas Safety / EPC / EICR</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Total Amount (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Contractor / Vendor Name
                  </label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="e.g. Gas Safe Engineer Ltd"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Payment Date / Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary outline-none font-mono"
                  />
                </div>
              </div>

              {/* Section 24 Toggle */}
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-neutral-900 block">
                    Section 24 Restricted Finance Cost
                  </span>
                  <span className="text-[11px] text-neutral-500 block">
                    Check if this is residential mortgage interest restricted to 20% basic rate tax credit.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isSection24}
                  onChange={(e) => setIsSection24(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-neutral-800 text-white font-bold inline-flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Save to Landlord Ledger</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
