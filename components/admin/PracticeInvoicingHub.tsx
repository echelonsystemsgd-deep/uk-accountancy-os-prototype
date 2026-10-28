"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  PoundSterling,
  Plus,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Building2,
  FileText,
  CreditCard,
  Printer,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function PracticeInvoicingHub() {
  const { invoices, settleInvoice, openCreateInvoiceModal, triggerToast } = useDemoStore();
  const [filter, setFilter] = useState<"all" | "awaiting_payment" | "paid">("all");

  const filteredInvoices = invoices.filter((inv) => filter === "all" || inv.status === filter);

  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalAwaiting = invoices
    .filter((inv) => inv.status === "awaiting_payment")
    .reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalCollected = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const handlePrintInvoice = (invNum: string, client: string) => {
    triggerToast("Generating UK Tax Invoice", `Preparing formal VAT invoice ${invNum} for ${client}...`, "info");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Practice Invoicing & WIP Settlement Ledger
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
              UK VAT Reg No: 382 9182 10
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Issue statutory VAT fee notes, convert unbilled WIP to collected cash flow, and manage client settlements.
          </p>
        </div>

        <button
          onClick={openCreateInvoiceModal}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-primary text-white hover:bg-neutral-800 transition shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Issue New Fee Note</span>
        </button>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="accountant-card p-4 sm:p-5">
          <span className="text-xs font-medium text-neutral-500 block">Total Practice Fees Invoiced</span>
          <div className="mt-2 text-2xl font-bold text-neutral-900 num-tabular">
            £{totalInvoiced.toLocaleString()}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">Tax Year 2024/25 Total Billings</span>
        </div>

        <div className="accountant-card p-4 sm:p-5">
          <span className="text-xs font-medium text-amber-700 block">Awaiting Client Settlement</span>
          <div className="mt-2 text-2xl font-bold text-amber-700 num-tabular">
            £{totalAwaiting.toLocaleString()}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">BACS & Stripe payments pending</span>
        </div>

        <div className="accountant-card p-4 sm:p-5">
          <span className="text-xs font-medium text-emerald-700 block">Practice Collected Cash</span>
          <div className="mt-2 text-2xl font-bold text-emerald-700 num-tabular">
            £{totalCollected.toLocaleString()}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">Reconciled to practice bank account</span>
        </div>
      </div>

      {/* Filter Tabs & Invoicing Table */}
      <div className="accountant-card p-6 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-3 gap-2">
          <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:space-x-2 text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${
                filter === "all" ? "bg-neutral-900 text-white font-bold" : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              All Invoices ({invoices.length})
            </button>
            <button
              onClick={() => setFilter("awaiting_payment")}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${
                filter === "awaiting_payment"
                  ? "bg-amber-100 text-amber-900 font-bold border border-amber-300"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Awaiting Payment ({invoices.filter((i) => i.status === "awaiting_payment").length})
            </button>
            <button
              onClick={() => setFilter("paid")}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${
                filter === "paid"
                  ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Paid / Reconciled ({invoices.filter((i) => i.status === "paid").length})
            </button>
          </div>

          <span className="text-xs text-neutral-500">
            Standard UK Payment Terms: 14 Days Net
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-neutral-800">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 uppercase text-[10px] tracking-wider text-left bg-neutral-50/50">
                <th className="py-2.5 px-3">Invoice #</th>
                <th className="py-2.5 px-3">Client Entity</th>
                <th className="py-2.5 px-3">Service Description</th>
                <th className="py-2.5 px-3 text-right">Net (£)</th>
                <th className="py-2.5 px-3 text-right">VAT 20% (£)</th>
                <th className="py-2.5 px-3 text-right">Total (£)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-50/50 transition">
                  <td className="py-3 px-3 font-bold text-neutral-900">{inv.invoiceNumber}</td>
                  <td className="py-3 px-3 font-sans font-semibold text-neutral-900">{inv.entityName}</td>
                  <td className="py-3 px-3 font-sans text-neutral-600 max-w-xs truncate" title={inv.serviceDescription}>
                    {inv.serviceDescription}
                  </td>
                  <td className="py-3 px-3 text-right text-neutral-700">£{inv.netAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-neutral-500">£{inv.vatAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-bold text-neutral-900">£{inv.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center font-sans">
                    {inv.status === "paid" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 mr-1 text-amber-600" />
                        Due {inv.dueDate}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-sans space-x-1.5 whitespace-nowrap">
                    {inv.status === "awaiting_payment" && (
                      <button
                        onClick={() => settleInvoice(inv.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-emerald-700 text-white hover:bg-emerald-800 transition"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => handlePrintInvoice(inv.invoiceNumber, inv.entityName)}
                      className="px-2.5 py-1 text-[11px] font-medium rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
                      title="Print or view formal VAT fee note"
                    >
                      View Note
                    </button>
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
