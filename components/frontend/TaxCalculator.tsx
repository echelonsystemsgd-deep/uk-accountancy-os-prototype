"use client";

import React, { useMemo } from "react";
import { useDemoStore } from "@/lib/store";
import { formatGBP } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function TaxCalculator() {
  const {
    calculatorTurnover,
    setCalculatorTurnover,
    calculatorMargin,
    setCalculatorMargin,
    setIsIntakeOpen,
  } = useDemoStore();

  // Financial calculations strictly according to current UK HMRC rules
  const {
    estimatedProfit,
    corporationTax,
    taxRateEffective,
    potentialSavings,
    recommendedRetainer,
    netTaxAfterAdvisory,
  } = useMemo(() => {
    const profit = Math.round((calculatorTurnover * calculatorMargin) / 100);

    let ct = 0;
    if (profit <= 50000) {
      ct = profit * 0.19;
    } else if (profit >= 250000) {
      ct = profit * 0.25;
    } else {
      const baseTax = profit * 0.25;
      const marginalRelief = (250000 - profit) * (3 / 200);
      ct = Math.max(profit * 0.19, baseTax - marginalRelief);
    }

    const effectiveRate = profit > 0 ? (ct / profit) * 100 : 19;
    const savings = Math.round(
      Math.min(ct * 0.28, Math.max(4500, profit * 0.045))
    );

    let monthlyFee = 495;
    if (calculatorTurnover >= 3000000) {
      monthlyFee = 1950;
    } else if (calculatorTurnover >= 1500000) {
      monthlyFee = 1350;
    } else if (calculatorTurnover >= 750000) {
      monthlyFee = 850;
    } else if (calculatorTurnover >= 400000) {
      monthlyFee = 595;
    }

    const netTax = Math.max(0, Math.round(ct - savings));

    return {
      estimatedProfit: profit,
      corporationTax: Math.round(ct),
      taxRateEffective: effectiveRate.toFixed(1),
      potentialSavings: savings,
      recommendedRetainer: monthlyFee,
      netTaxAfterAdvisory: netTax,
    };
  }, [calculatorTurnover, calculatorMargin]);

  return (
    <section
      id="tax-calculator-section"
      className="py-16 sm:py-24 bg-[#07080C] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Corporation Tax &amp; Retainer Calculator
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            Adjust your annual turnover and operating margin to estimate HMRC Corporation Tax liability, potential relief deductions, and recommended retainer.
          </p>
        </div>

        {/* 2-Column Institutional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 sm:p-8 space-y-6">
            {/* Turnover Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                  Annual Turnover
                </label>
                <span className="font-mono text-base font-semibold text-[#EDEDED] bg-[#08090E] px-2.5 py-1 rounded border border-white/[0.08]">
                  {formatGBP(calculatorTurnover)}
                </span>
              </div>
              <input
                type="range"
                min="150000"
                max="5000000"
                step="50000"
                value={calculatorTurnover}
                onChange={(e) => setCalculatorTurnover(Number(e.target.value))}
                className="w-full h-2 bg-[#1A1F2D] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-[#64748B] font-mono mt-1.5">
                <span>£150k</span>
                <span>£1.5M</span>
                <span>£3M</span>
                <span>£5M</span>
              </div>
            </div>

            {/* Profit Margin Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                  Net Profit Margin
                </label>
                <span className="font-mono text-base font-semibold text-[#EDEDED] bg-[#08090E] px-2.5 py-1 rounded border border-white/[0.08]">
                  {calculatorMargin}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="55"
                step="5"
                value={calculatorMargin}
                onChange={(e) => setCalculatorMargin(Number(e.target.value))}
                className="w-full h-2 bg-[#1A1F2D] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-[#64748B] font-mono mt-1.5">
                <span>10%</span>
                <span>25%</span>
                <span>40%</span>
                <span>55%</span>
              </div>
            </div>

            {/* Intermediate Calculation Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.06]">
                <span className="text-xs text-[#64748B] block">Estimated Taxable Profit</span>
                <span className="font-mono text-base font-semibold text-[#EDEDED] mt-0.5 block">
                  {formatGBP(estimatedProfit)}
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.06]">
                <span className="text-xs text-[#64748B] block">Effective Tax Rate</span>
                <span className="font-mono text-base font-semibold text-[#EDEDED] mt-0.5 block">
                  {taxRateEffective}%
                </span>
              </div>
            </div>

            <div className="text-xs text-[#64748B] border-t border-white/[0.06] pt-4">
              Calculations adhere to standard UK Finance Act bands: Small Profits Rate (19%), Marginal Taper, and Main Rate (25%).
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Advisory Breakdown
              </span>
              <h3 className="text-xl font-bold text-[#EDEDED] mt-1">
                Estimated Liability &amp; Allowances
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.06]">
                <div>
                  <span className="text-xs text-[#94A3B8] block">Standard Corporation Tax</span>
                  <span className="text-[11px] text-[#64748B]">Before allowances</span>
                </div>
                <span className="font-mono text-base font-semibold text-[#EDEDED]">
                  {formatGBP(corporationTax)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20">
                <div>
                  <span className="text-xs font-medium text-emerald-400 block">
                    Identified Allowances &amp; Relieves
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Full expensing, R&amp;D, pensions
                  </span>
                </div>
                <span className="font-mono text-base font-semibold text-emerald-400">
                  - {formatGBP(potentialSavings)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.1]">
                <div>
                  <span className="text-xs font-medium text-[#EDEDED] block">
                    Optimized Tax Liability
                  </span>
                  <span className="text-[11px] text-[#64748B]">With strategic architecture</span>
                </div>
                <span className="font-mono text-lg font-bold text-[#EDEDED]">
                  {formatGBP(netTaxAfterAdvisory)}
                </span>
              </div>
            </div>

            {/* Recommended Retainer Box */}
            <div className="p-4 rounded-lg bg-[#08090E] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#64748B] block">Recommended Retainer Tier</span>
                <span className="text-sm font-semibold text-[#EDEDED]">Strategic Partner Retainer</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-[#EDEDED]">
                  £{recommendedRetainer}
                </span>
                <span className="text-xs text-[#64748B] block">/ month + VAT</span>
              </div>
            </div>

            <button
              onClick={() => setIsIntakeOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-3 px-4 rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <span>Book Review Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
