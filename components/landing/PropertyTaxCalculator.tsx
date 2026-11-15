"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PropertyTaxCalculator() {
  const { openIntakeModal, enterClientPortal } = useDemoStore();

  const [propertiesCount, setPropertiesCount] = useState<number>(3);
  const [grossRent, setGrossRent] = useState<number>(39000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(20280);
  const [isHigherRate, setIsHigherRate] = useState<boolean>(true);

  // Computations
  const personalRate = isHigherRate ? 0.40 : 0.20;
  const rawPersonalTax = grossRent * personalRate;
  const section24Credit = mortgageInterest * 0.20;
  const netPersonalTax = Math.max(0, rawPersonalTax - section24Credit);

  // SPV Corporation Tax (100% Mortgage Interest Deductible)
  const spvAllowableProfit = Math.max(0, grossRent - mortgageInterest - 4500); // minus running costs
  const spvTax = spvAllowableProfit * 0.19;

  const estimatedTaxSaving = Math.max(0, netPersonalTax - spvTax);

  const handleEnquireWithPortfolio = () => {
    openIntakeModal({
      annualRent: grossRent,
      mortgageInterest: mortgageInterest,
      portfolioSize: `${propertiesCount} units`,
      notes: `Calculator Enquiry: ${propertiesCount} units, £${grossRent.toLocaleString()} rent, £${mortgageInterest.toLocaleString()} interest. Estimated tax saving: £${Math.round(estimatedTaxSaving).toLocaleString()}/year.`,
    });
  };

  return (
    <section id="tax-calculator" className="py-14 sm:py-20 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#a4f4cf] bg-[#a4f4cf]/10 px-3 py-1 rounded-full border border-[#a4f4cf]/20 w-fit font-mono">
            <Calculator className="w-3.5 h-3.5 text-[#a4f4cf]" />
            <span>Interactive Section 24 &amp; SPV Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            How Section 24 Restricts Your Buy-to-Let Mortgage Relief
          </h2>
          <p className="text-xs sm:text-sm text-[#8a9d94] leading-relaxed">
            Personal landlords can no longer deduct mortgage interest from rental turnover. An SPV Limited Company allows 100% finance deductions and enables tax-free capital extraction via Director’s Loan repayments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Portfolio Financial Assumptions
              </span>
              <span className="text-xs text-[#8a9d94] font-mono">HMRC 2024/25 Rules</span>
            </div>

            {/* Slider 1: Properties Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Portfolio Properties</span>
                <span className="font-bold text-white num-tabular text-sm font-mono">{propertiesCount} Units</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={propertiesCount}
                onChange={(e) => setPropertiesCount(Number(e.target.value))}
                className="w-full accent-[#a4f4cf] cursor-pointer"
              />
            </div>

            {/* Slider 2: Gross Rent */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Annual Gross Rental Income</span>
                <span className="font-bold text-white num-tabular text-sm font-mono">£{grossRent.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={12000}
                max={150000}
                step={1000}
                value={grossRent}
                onChange={(e) => setGrossRent(Number(e.target.value))}
                className="w-full accent-[#a4f4cf] cursor-pointer"
              />
            </div>

            {/* Slider 3: Mortgage Interest */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Annual Mortgage Interest Payments</span>
                <span className="font-bold text-white num-tabular text-sm font-mono">£{mortgageInterest.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={80000}
                step={500}
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(Number(e.target.value))}
                className="w-full accent-[#a4f4cf] cursor-pointer"
              />
            </div>

            {/* Higher Rate Checkbox */}
            <div className="flex items-center space-x-2 pt-2 border-t border-[#1e382b]">
              <input
                type="checkbox"
                id="calcHigherRate"
                checked={isHigherRate}
                onChange={(e) => setIsHigherRate(e.target.checked)}
                className="rounded border-[#1e382b] text-[#a4f4cf] focus:ring-[#a4f4cf] bg-[#0c1813]"
              />
              <label htmlFor="calcHigherRate" className="text-slate-300 text-xs cursor-pointer">
                I am a 40% Higher Rate Taxpayer in my personal name (Income over £50,270)
              </label>
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-6">
            <div className="space-y-1 border-b border-[#1e382b] pb-4">
              <span className="text-[10px] font-bold text-[#a4f4cf] uppercase tracking-wider block font-mono">
                Estimated Tax Comparison
              </span>
              <h3 className="text-lg font-display font-bold text-white">Annual SPV Tax Shield</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1e382b]">
                <span className="text-[#8a9d94]">Personal Tax Bill (Section 24):</span>
                <span className="font-bold text-red-400 font-mono">£{Math.round(netPersonalTax).toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#1e382b]">
                <span className="text-[#8a9d94]">SPV Corporation Tax (19%):</span>
                <span className="font-bold text-[#a4f4cf] font-mono">£{Math.round(spvTax).toLocaleString()}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-1">
                <span className="text-[11px] text-[#8a9d94] block font-mono">Estimated Annual Savings:</span>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#a4f4cf] font-mono">
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
                className="touch-target-44 w-full py-2.5 px-4 rounded-lg font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] transition flex items-center justify-center space-x-2 active:scale-95 shadow-sm"
              >
                <span>Book SPV Restructuring Diagnostic</span>
                <ArrowRight className="w-4 h-4 text-[#0c1813]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
