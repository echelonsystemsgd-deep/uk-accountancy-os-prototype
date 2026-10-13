"use client";

import React, { useState } from "react";
import { formatGBP } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  Coins,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function PracticeMonetizationBanner() {
  const { setIsIntakeOpen } = useDemoStore();
  const [clientCount, setClientCount] = useState<number>(150);
  const [feePerClient, setFeePerClient] = useState<number>(10);

  const monthlyRecurringRevenue = clientCount * feePerClient;
  const annualRecurringRevenue = monthlyRecurringRevenue * 12;

  return (
    <div className="bg-gradient-to-br from-[#121826] via-[#0E131F] to-[#070A0F] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-gold-subtle relative overflow-hidden text-white">
      {/* Background gold badge watermark */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-6">
        {/* Banner Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-gold-300">
              <Coins className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-semibold block">
                Practice Monetization Architecture
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                Turn Practice Overhead Into Recurring Profit
              </h3>
            </div>
          </div>

          <span className="text-xs font-mono bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold-300 px-3 py-1 rounded-full">
            White-Label Commercial Model
          </span>
        </div>

        {/* Commercial Proposition Headline */}
        <div className="max-w-3xl">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Independent accountancy practices waste <strong className="text-gold-300">15+ partner hours per week</strong> chasing missing receipts and fielding WhatsApp status requests. White-label this self-serve portal under your own firm brand to eradicate chasing while unlocking high-margin software recurring revenue:
          </p>
        </div>

        {/* Interactive White-Label Revenue Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#070A0F]/80 border border-white/10 rounded-xl p-5 sm:p-6 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Your Active Business Clients:</span>
                <span className="font-mono font-bold text-gold-300 text-sm">{clientCount} Limited Companies</span>
              </div>
              <input
                type="range"
                min="30"
                max="400"
                step="10"
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Monthly Portal Charge to Client:</span>
                <span className="font-mono font-bold text-gold-300 text-sm">£{feePerClient}/month</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={feePerClient}
                onChange={(e) => setFeePerClient(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>
          </div>

          {/* Revenue Calculation Callout */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#D4AF37]/30 rounded-xl p-4 text-center space-y-2">
            <span className="text-[11px] uppercase font-mono text-slate-400">
              Net Practice Recurring Income
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
              +{formatGBP(monthlyRecurringRevenue)} <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <div className="text-xs text-gold-300 font-semibold">
              +{formatGBP(annualRecurringRevenue)} Pure ARR to Practice Bottom Line
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-white/5">
              Requires 0 additional staff or bookkeeping headcount.
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Zap className="w-4 h-4 text-gold-400" />
            <span>Deployable in 7 working days under your firm's domain &amp; styling.</span>
          </div>

          <button
            onClick={() => setIsIntakeOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-6 rounded-xl shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all touch-target-48"
          >
            <span>Deploy White-Label Portal for Your Practice</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
