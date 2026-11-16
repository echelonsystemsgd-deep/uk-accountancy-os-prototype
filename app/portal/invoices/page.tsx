"use client";

import React from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import { FileText, CheckCircle2, Download, AlertCircle } from "lucide-react";

export default function ClientInvoicesPage() {
  const invoices = [
    {
      invoiceNumber: "INV-KPTC-2026-081",
      date: "01 Nov 2026",
      dueDate: "15 Nov 2026",
      description: "SPV Annual Accounts & Corporation Tax (Belgrave Legacy Wealth Ltd)",
      amount: "£1,250.00",
      status: "paid",
      paymentMethod: "Bank Transfer",
    },
    {
      invoiceNumber: "INV-KPTC-2026-042",
      date: "15 Sep 2026",
      dueDate: "30 Sep 2026",
      description: "Section 24 Portfolio Restructuring Diagnostic & DLA Ledger Setup",
      amount: "£650.00",
      status: "paid",
      paymentMethod: "Direct Debit",
    },
  ];

  return (
    <ClientPortalLayout
      pageTitle="Practice Invoices &amp; Statements"
      pageSubtitle="Record of engagement billing and fee schedules for reference only"
    >
      <div className="space-y-6 font-mono">
        <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] flex items-center gap-3 text-xs text-[#8a9d94]">
          <AlertCircle className="w-4 h-4 text-[#a4f4cf] shrink-0" />
          <span>
            Practice fees are settled directly via standard BACS bank transfer to KP Tax Consultants. Online card processing is disabled.
          </span>
        </div>

        <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c1813] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Service Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e382b]/60">
              {invoices.map((inv) => (
                <tr key={inv.invoiceNumber} className="hover:bg-[#0c1813]/60 transition">
                  <td className="py-4 px-4 font-bold text-white">{inv.invoiceNumber}</td>
                  <td className="py-4 px-4 text-[#8a9d94]">{inv.date}</td>
                  <td className="py-4 px-4 text-slate-200">{inv.description}</td>
                  <td className="py-4 px-4 font-bold text-[#a4f4cf]">{inv.amount}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid via {inv.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-xs text-[#8a9d94] hover:text-white inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ClientPortalLayout>
  );
}
