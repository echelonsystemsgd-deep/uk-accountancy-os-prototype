"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientInvoice } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import StripeCheckoutModal from "./StripeCheckoutModal";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Download,
  Receipt,
  FileCheck2,
  Sparkles,
} from "lucide-react";

export default function InvoicingHub() {
  const { invoices } = useDemoStore();
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);

  return (
    <div className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Invoicing &amp; Retainer Settlement Hub</span>
            <span className="text-xs font-mono font-normal bg-[#111827] text-gold-300 border border-white/10 px-2 py-0.5 rounded-full">
              Kensington BioTech Ltd
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Official practice invoices issued by Apex &amp; Co. Settle via 1-click corporate Stripe or download VAT receipts.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Corporate Gateway: <span className="text-emerald-400 font-mono">Stripe UK Ready</span>
        </div>
      </div>

      {/* Invoices List / Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#070A0F] text-slate-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Invoice &amp; Date</th>
              <th className="p-3">Advisory Service Description</th>
              <th className="p-3">Net + VAT (20%)</th>
              <th className="p-3">Total Payable</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Settlement Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map((inv) => {
              const isPaid = inv.status === "paid";
              return (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3">
                    <div className="font-mono font-semibold text-white">{inv.invoiceNumber}</div>
                    <div className="text-[10px] text-slate-400">Issued: {inv.issueDate}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-white max-w-xs">{inv.description}</div>
                    <div className="text-[10px] text-slate-400">Due: {inv.dueDate}</div>
                  </td>
                  <td className="p-3 font-mono">
                    <div>{formatGBPExact(inv.amountNet)} Net</div>
                    <div className="text-[10px] text-slate-400">+{formatGBPExact(inv.vatAmount)} VAT</div>
                  </td>
                  <td className="p-3 font-mono font-bold text-sm text-gold-300">
                    {formatGBPExact(inv.amountTotal)}
                  </td>
                  <td className="p-3">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>PAID</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>Awaiting Payment</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {isPaid ? (
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                        <span>{inv.paymentMethod || "Settled via Stripe"}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B89628] hover:brightness-110 text-black text-xs font-semibold py-2 px-3.5 rounded-xl shadow-gold-subtle active:scale-95 transition-all touch-target-48 sm:touch-target-auto"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-black" />
                        <span>Pay Invoice</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stripe Modal */}
      {selectedInvoice && (
        <StripeCheckoutModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
