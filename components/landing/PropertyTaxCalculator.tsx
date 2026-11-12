"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Calculator,
  ArrowRight,
  TrendingDown,
  Building2,
  CheckCircle2,
  PoundSterling,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function PropertyTaxCalculator() {
  const { openIntakeModal, enterClientPortal } = useDemoStore();

  const [propertiesCount, setPropertiesCount] = useState<number>(2);
  const [grossRent, setGrossRent] = useState<number>(39000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(20280);
  const [otherExpenses, setOtherExpenses] = useState<number>(6420);
  const [isHigherRate, setIsHigherRate] = useState<boolean>(true);

  // Computations
  const actualProfit = grossRent - mortgageInterest - otherExpenses;

  // Personal Ownership under Section 24:
  const taxableProfitUnderS24 = Math.max(0, grossRent - otherExpenses);
  const taxRate = isHigherRate ? 0.40 : 0.20;
  const grossTaxDue = taxableProfitUnderS24 * taxRate;
  const s24TaxCredit = mortgageInterest * 0.20;
  const netPersonalTax = Math.max(0, grossTaxDue - s24TaxCredit);

  // SPV Limited Company Ownership:
  const spvTaxableProfit = Math.max(0, actualProfit);
  let spvTax = 0;
  if (spvTaxableProfit <= 50000) {
    spvTax = spvTaxableProfit * 0.19;
  } else if (spvTaxableProfit > 250000) {
    spvTax = spvTaxableProfit * 0.25;
  } else {
    spvTax = (spvTaxableProfit * 0.25) - ((250000 - spvTaxableProfit) * (3 / 200));
  }

  const estimatedTaxSaving = Math.max(0, netPersonalTax - spvTax);

  const handleEnquireWithPortfolio = () => {
    openIntakeModal({
      portfolioSize: `${propertiesCount} Properties`,
      annualRent: grossRent,
      mortgageInterest: mortgageInterest,
      notes: `Prospective portfolio review. Current gross rent: £${grossRent.toLocaleString()}, Annual mortgage interest: £${mortgageInterest.toLocaleString()}. Evaluated for Section 24 vs SPV restructuring.`,
    });
  };

  return (
    <section id="tax-calculator" className="py-14 sm:py-20 bg-[#0B0F19] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 w-fit">
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Section 24 &amp; SPV Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Section 24 Restricts Your Buy-to-Let Mortgage Relief
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Personal landlords can no longer deduct mortgage interest from rental turnover. An SPV Limited Company allows 100% finance deductions and enables tax-free capital extraction via Director’s Loan repayments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 accountant-card p-6 bg-[#162032] border border-[#1F293D] rounded-xl space-y-6">
            {/* Slider 1: Properties Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Portfolio Properties</span>
                <span className="font-bold text-white num-tabular text-sm">{propertiesCount} Units</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={propertiesCount}
                onChange={(e) => setPropertiesCount(Number(e.target.value))}
                className="w-full accent-[#0077C8] cursor-pointer"
              />
            </div>

            {/* Slider 2: Gross Rent */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Annual Gross Rental Income</span>
                <span className="font-bold text-white num-tabular text-sm">£{grossRent.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={12000}
                max={150000}
                step={1000}
                value={grossRent}
                onChange={(e) => setGrossRent(Number(e.target.value))}
                className="w-full accent-[#0077C8] cursor-pointer"
              />
            </div>

            {/* Slider 3: Mortgage Interest */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Annual Mortgage Interest Payments</span>
                <span className="font-bold text-white num-tabular text-sm">£{mortgageInterest.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={80000}
                step={500}
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(Number(e.target.value))}
                className="w-full accent-[#0077C8] cursor-pointer"
              />
            </div>

            {/* Higher Rate Checkbox */}
            <div className="flex items-center space-x-2 pt-2 border-t border-[#1F293D]">
              <input
                type="checkbox"
                id="calcHigherRate"
                checked={isHigherRate}
                onChange={(e) => setIsHigherRate(e.target.checked)}
                className="rounded border-slate-700 text-[#0077C8] focus:ring-sky-500 bg-slate-800"
              />
              <label htmlFor="calcHigherRate" className="text-slate-300 text-xs cursor-pointer">
                I am a 40% Higher Rate Taxpayer in my personal name (Income over £50,270)
              </label>
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 accountant-card p-6 bg-[#162032] border border-[#1F293D] rounded-xl space-y-6">
            <div className="space-y-1 border-b border-[#1F293D] pb-4">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                Estimated Tax Comparison
              </span>
              <h3 className="text-lg font-bold text-white">Annual SPV Tax Shield</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1F293D]">
                <span className="text-slate-400">Personal Tax Bill (Section 24):</span>
                <span className="font-bold text-red-400 num-tabular">£{Math.round(netPersonalTax).toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#1F293D]">
                <span className="text-slate-400">SPV Corporation Tax (19%):</span>
                <span className="font-bold text-emerald-400 num-tabular">£{Math.round(spvTax).toLocaleString()}</span>
              </div>

              <div className="p-4 rounded-lg bg-[#111827] border border-[#1F293D] space-y-1">
                <span className="text-[11px] text-slate-400 block">Estimated Annual Savings:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 num-tabular">
                  +£{Math.round(estimatedTaxSaving).toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-300 block font-medium">
                  Saved every year under SPV limited company rules
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleEnquireWithPortfolio}
                className="touch-target-44 w-full py-2.5 px-4 rounded-lg font-bold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white transition flex items-center justify-center space-x-2 active:scale-95"
              >
                <span>Book SPV Restructuring Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white transition block"
              >
                &rarr; Or launch Sukhpreet Kaur SPV Live Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
