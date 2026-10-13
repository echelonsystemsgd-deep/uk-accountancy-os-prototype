"use client";

import React, { useState } from "react";
import { formatGBP } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function PracticeMonetizationBanner() {
  const { setIsIntakeOpen } = useDemoStore();
  const [clientCount, setClientCount] = useState<number>(150);
  const [feePerClient, setFeePerClient] = useState<number>(10);

  const monthlyRecurringRevenue = clientCount * feePerClient;
  const annualRecurringRevenue = monthlyRecurringRevenue * 12;

  return (
    <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 sm:p-8 text-[#EDEDED] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
            Practice Economics
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-[#EDEDED] tracking-tight mt-0.5">
            Client Portal White-Label Model
          </h3>
        </div>
        <div className="text-xs font-mono text-[#64748B]">
          Software Tier: £{feePerClient}/seat/mo
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
        Deploy this dedicated document ingestion and invoicing portal under your own firm brand. Eliminates manual receipt chasing while creating a predictable software subscription layer for your existing client base:
      </p>

      {/* Interactive Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#08090E] border border-white/[0.06] rounded-xl p-5 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#94A3B8]">Active Business Clients:</span>
              <span className="font-mono font-semibold text-[#EDEDED]">{clientCount} Ltd Companies</span>
            </div>
            <input
              type="range"
              min="30"
              max="400"
              step="10"
              value={clientCount}
              onChange={(e) => setClientCount(Number(e.target.value))}
              className="w-full h-2 bg-[#1A1F2D] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#94A3B8]">Monthly Charge to Client:</span>
              <span className="font-mono font-semibold text-[#EDEDED]">£{feePerClient} / month</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="5"
              value={feePerClient}
              onChange={(e) => setFeePerClient(Number(e.target.value))}
              className="w-full h-2 bg-[#1A1F2D] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#0D0F17] border border-white/[0.08] rounded-lg p-4 text-center space-y-1">
          <span className="text-[11px] font-mono text-[#64748B] uppercase">
            Net Recurring Revenue
          </span>
          <div className="font-mono text-2xl font-bold text-[#EDEDED]">
            +{formatGBP(monthlyRecurringRevenue)} <span className="text-xs font-normal text-[#64748B]">/ mo</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono font-medium">
            +{formatGBP(annualRecurringRevenue)} Net ARR
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-[#64748B]">
          Deployable under your practice domain with custom firm styling.
        </div>
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
          <span>Inquire for Practice</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
