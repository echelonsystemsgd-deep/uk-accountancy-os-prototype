"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientInvoice } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
} from "lucide-react";

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

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#FFFFFF", "#10B981"],
        });
      } catch (err) {
        // ignore in non-browser env
      }
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#0B0F17] border-t sm:border border-[#D4AF37]/40 sm:rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stripe Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070A0F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#635BFF]/20 border border-[#635BFF]/50 flex items-center justify-center text-[#7A73FF]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <span>Stripe Corporate Checkout</span>
                <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-1.5 py-0.2 rounded">
                  256-bit SSL
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Pay to: <strong className="text-gold-300">Apex &amp; Co. Advisory Ltd</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors touch-target-48 sm:touch-target-auto"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isPaidSuccess ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  Payment Succeeded
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-white mt-1">
                  {formatGBPExact(invoice.amountTotal)} Settled
                </h4>
                <p className="text-xs text-slate-300 mt-2">
                  Invoice <strong className="text-gold-300">{invoice.invoiceNumber}</strong> has been marked as <strong>PAID</strong>.
                </p>
              </div>

              {/* Reactive sync feedback */}
              <div className="p-3.5 rounded-xl bg-[#070A0F] border border-white/10 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Practice Command Hub Updated:</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Unbilled WIP decreased and Practice Collected Revenue was automatically incremented.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-white/10 text-slate-200 text-xs font-semibold py-3 px-4 rounded-xl transition-all touch-target-48 active:scale-95"
                >
                  Return to Portal Invoices
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              {/* Invoice Summary Box */}
              <div className="p-4 rounded-xl bg-[#070A0F] border border-[#D4AF37]/30 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Invoice:</span>
                  <span className="font-mono text-white font-medium">{invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white text-right max-w-[200px] truncate">
                    {invoice.description}
                  </span>
                </div>
                <div className="flex justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-slate-400">Net Amount:</span>
                  <span className="font-mono text-slate-300">
                    {formatGBPExact(invoice.amountNet)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">VAT (20%):</span>
                  <span className="font-mono text-slate-300">
                    {formatGBPExact(invoice.vatAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2">
                  <span className="text-gold-300">Total Payable:</span>
                  <span className="font-mono text-gold-300 text-base">
                    {formatGBPExact(invoice.amountTotal)}
                  </span>
                </div>
              </div>

              {/* Simulated Apple Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-white hover:bg-slate-100 text-black font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm touch-target-48 active:scale-95 transition-all"
              >
                <span>Pay with</span>
                <span className="font-bold text-sm tracking-tight">Pay</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#0B0F17] px-3 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Or pay with Corporate Card
                </span>
              </div>

              {/* Card Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      UK Postcode
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#BA9528] text-black font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 touch-target-48"
                >
                  {isProcessing ? (
                    <span>Processing Secure Settlement...</span>
                  ) : (
                    <>
                      <span>Authorize Payment of {formatGBPExact(invoice.amountTotal)}</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by Stripe UK SCA &amp; FCA Regulated Banking Gateway</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
