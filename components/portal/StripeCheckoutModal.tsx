"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientInvoice } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import confetti from "canvas-confetti";
import { X, Lock, Check } from "lucide-react";

interface StripeCheckoutModalProps {
  invoice: ClientInvoice;
  onClose: () => void;
}

export default function StripeCheckoutModal({
  invoice,
  onClose,
}: StripeCheckoutModalProps) {
  const { payInvoice } = useDemoStore();
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("888");
  const [nameOnCard, setNameOnCard] = useState("Dr. Alistair Vance");
  const [postalCode, setPostalCode] = useState("W1J 6EN");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      payInvoice(invoice.id);
      setIsProcessing(false);
      setIsPaidSuccess(true);

      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#EDEDED", "#10B981"],
        });
      } catch (err) {
        // ignore in non-browser env
      }
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#0D0F17] border-t sm:border border-white/[0.1] sm:rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden text-[#EDEDED] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0A0C13]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#64748B]" />
            <span className="text-xs font-semibold text-[#EDEDED] tracking-tight">
              Pay Invoice: {invoice.invoiceNumber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isPaidSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-[#EDEDED]">
                Payment Completed
              </h4>
              <p className="text-xs text-[#94A3B8]">
                {formatGBPExact(invoice.amountTotal)} settled. Status updated to <strong>Paid</strong> in practice ledger.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-[#131622] hover:bg-[#1A1F2D] border border-white/[0.08] text-[#EDEDED] text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              {/* Summary */}
              <div className="p-3.5 rounded-lg bg-[#08090E] border border-white/[0.06] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Service:</span>
                  <span className="text-[#EDEDED] truncate max-w-[200px]">{invoice.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Net Amount:</span>
                  <span className="font-mono text-[#94A3B8]">{formatGBPExact(invoice.amountNet)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">VAT (20%):</span>
                  <span className="font-mono text-[#94A3B8]">{formatGBPExact(invoice.vatAmount)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-white/[0.06] font-semibold text-[#EDEDED]">
                  <span>Total Due:</span>
                  <span className="font-mono">{formatGBPExact(invoice.amountTotal)}</span>
                </div>
              </div>

              {/* Standard card inputs */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-[#EDEDED] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-[#EDEDED] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-[#EDEDED] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="w-full bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg px-3 py-2 text-xs text-[#EDEDED] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg px-3 py-2 text-xs text-[#EDEDED] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : `Pay ${formatGBPExact(invoice.amountTotal)}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
