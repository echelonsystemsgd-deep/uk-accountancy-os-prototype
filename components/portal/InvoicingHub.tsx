"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientInvoice } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import StripeCheckoutModal from "./StripeCheckoutModal";
import { CreditCard, Check } from "lucide-react";

export default function InvoicingHub() {
  const { invoices } = useDemoStore();
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);

  return (
    <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
            Invoicing &amp; Retainer Billing
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Issued advisory statements and monthly practice retainers. Settle via corporate card.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B]">
          Client: <span className="text-[#EDEDED]">Kensington BioTech Ltd</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#94A3B8]">
          <thead className="bg-[#0A0C13] text-[#64748B] font-semibold border-b border-white/[0.08] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Invoice &amp; Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Net + VAT</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {invoices.map((inv) => {
              const isPaid = inv.status === "paid";
              return (
                <tr key={inv.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-3">
                    <div className="font-mono font-medium text-[#EDEDED]">{inv.invoiceNumber}</div>
                    <div className="text-[10px] text-[#64748B]">Issued: {inv.issueDate}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-[#EDEDED] max-w-xs">{inv.description}</div>
                    <div className="text-[10px] text-[#64748B]">Due: {inv.dueDate}</div>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <div>{formatGBPExact(inv.amountNet)} Net</div>
                    <div className="text-[10px] text-[#64748B]">+{formatGBPExact(inv.vatAmount)} VAT</div>
                  </td>
                  <td className="p-3 font-mono font-semibold text-[#EDEDED]">
                    {formatGBPExact(inv.amountTotal)}
                  </td>
                  <td className="p-3">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                        <Check className="w-2.5 h-2.5" />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border bg-amber-500/10 border-amber-500/20 text-amber-300">
                        <span>Due</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {isPaid ? (
                      <span className="text-[11px] font-mono text-[#64748B]">
                        Settled
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1 bg-[#D4AF37] hover:bg-[#C5A028] text-black text-xs font-semibold py-1.5 px-3 rounded-md transition-colors"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Pay</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <StripeCheckoutModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
