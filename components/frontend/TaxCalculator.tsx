"use client";

import React, { useMemo } from "react";
import { useDemoStore } from "@/lib/store";
import { formatGBP } from "@/lib/utils";
import {
  Calculator,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function TaxCalculator() {
  const {
    calculatorTurnover,
    setCalculatorTurnover,
    calculatorMargin,
    setCalculatorMargin,
    setIsIntakeOpen,
  } = useDemoStore();

  // Financial calculations
  const {
    estimatedProfit,
    corporationTax,
    taxRateEffective,
    potentialSavings,
    recommendedRetainer,
    netTaxAfterAdvisory,
  } = useMemo(() => {
    const profit = Math.round((calculatorTurnover * calculatorMargin) / 100);

    // UK Corporation Tax Calculation (2024-2026 HMRC Rates)
    let ct = 0;
    if (profit <= 50000) {
      ct = profit * 0.19; // Small profits rate
    } else if (profit >= 250000) {
      ct = profit * 0.25; // Main rate
    } else {
      // Marginal relief: 25% minus (250,000 - profit) * (3/200)
      const baseTax = profit * 0.25;
      const marginalRelief = (250000 - profit) * (3 / 200);
      ct = Math.max(profit * 0.19, baseTax - marginalRelief);
    }

    const effectiveRate = profit > 0 ? (ct / profit) * 100 : 19;

    // Potential savings through proactive R&D, full expensing capital allowances, director pension structuring
    const savings = Math.round(
      Math.min(ct * 0.28, Math.max(4500, profit * 0.045))
    );

    // Recommended monthly retainer tier (£495 - £2,250/mo)
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
      className="py-16 sm:py-24 bg-[#0B0F17] border-b border-[#D4AF37]/20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#D4AF37]/30 text-xs text-gold-300 font-mono mb-3">
            <Calculator className="w-3.5 h-3.5 text-gold-400" />
            <span>Interactive UK Tax Intelligence</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Corporation Tax &amp; Fee Estimator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Adjust your annual turnover and operating margin to visualize your estimated HMRC Corporation Tax liability, quantifiable relief savings, and the recommended strategic retainer fee.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-6 bg-[#070A0F] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* Turnover Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-wider uppercase text-gold-300">
                  Annual Turnover (£)
                </label>
                <span className="font-mono text-lg font-bold text-white bg-[#111827] px-3 py-1 rounded-lg border border-white/10">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                <span>£150k</span>
                <span>£1.5M</span>
                <span>£3M</span>
                <span>£5M+</span>
              </div>
            </div>

            {/* Profit Margin Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-wider uppercase text-gold-300">
                  Estimated Net Profit Margin (%)
                </label>
                <span className="font-mono text-lg font-bold text-white bg-[#111827] px-3 py-1 rounded-lg border border-white/10">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                <span>10% (Low Margin)</span>
                <span>25% (Standard)</span>
                <span>40%</span>
                <span>55% (High Margin)</span>
              </div>
            </div>

            {/* Summary metrics snapshot */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5">
                <span className="text-[11px] text-slate-400 block">Estimated Taxable Profit</span>
                <span className="font-serif-luxury text-lg font-semibold text-white mt-0.5 block">
                  {formatGBP(estimatedProfit)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5">
                <span className="text-[11px] text-slate-400 block">Effective Tax Rate</span>
                <span className="font-mono text-lg font-semibold text-gold-300 mt-0.5 block">
                  {taxRateEffective}%
                </span>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="p-4 rounded-xl bg-[#101623] border border-[#D4AF37]/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                Calculations strictly follow current <strong>HMRC Finance Act rules</strong>, including small profits rate (19%), marginal taper relief, and 25% main corporation tax bands.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Results & Retainer Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#111827] to-[#070A0F] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-gold-subtle space-y-6">
            <div className="border-b border-white/10 pb-5">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
                Tax Architecture Breakdown
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Your Strategic Advisory Model
              </h3>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F17] border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block">Unmanaged Corporation Tax</span>
                  <span className="text-[11px] text-slate-400">Standard statutory filing</span>
                </div>
                <span className="font-mono text-xl font-bold text-rose-400">
                  {formatGBP(corporationTax)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-xs font-semibold text-gold-300 block">
                      Potential Relief &amp; Allowances
                    </span>
                    <span className="text-[11px] text-slate-300">
                      R&amp;D claims, full expensing, pensions
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xl font-bold text-emerald-400">
                  - {formatGBP(potentialSavings)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#070A0F] border border-[#D4AF37]/40">
                <div>
                  <span className="text-xs text-slate-300 font-medium block">
                    Optimized Net Corporation Tax
                  </span>
                  <span className="text-[11px] text-gold-400">With Apex &amp; Co. Architecture</span>
                </div>
                <span className="font-mono text-2xl font-bold text-white">
                  {formatGBP(netTaxAfterAdvisory)}
                </span>
              </div>
            </div>

            {/* Recommended Monthly Retainer */}
            <div className="p-5 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/50 shadow-gold-subtle">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-gold-400 tracking-wider">
                    Recommended Monthly Retainer
                  </span>
                  <h4 className="font-serif-luxury text-xl font-bold text-white mt-0.5">
                    Strategic Partner Retainer
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Statutory Year-End + Quarterly MTD VAT + AI Dropzone + Dedicated Partner
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-gold-300">
                    £{recommendedRetainer}
                  </span>
                  <span className="text-xs text-slate-400 block font-normal">/ month + VAT</span>
                </div>
              </div>
            </div>

            {/* Lock in CTA */}
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#BA9528] text-black font-semibold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-gold-glow hover:brightness-110 active:scale-95 transition-all touch-target-48"
            >
              <span>Lock In Strategy &amp; Book Partner Review</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
