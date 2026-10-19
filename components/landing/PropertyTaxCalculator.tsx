"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Calculator,
  ArrowRight,
  HelpCircle,
  TrendingDown,
  Building2,
  CheckCircle2,
  PoundSterling,
} from "lucide-react";

export default function PropertyTaxCalculator() {
  const { openIntakeModal } = useDemoStore();

  const [propertiesCount, setPropertiesCount] = useState<number>(3);
  const [grossRent, setGrossRent] = useState<number>(54000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(18000);
  const [otherExpenses, setOtherExpenses] = useState<number>(6000);
  const [isHigherRate, setIsHigherRate] = useState<boolean>(true); // 40% higher rate taxpayer

  // Net Cash Profit before tax
  const actualProfit = grossRent - mortgageInterest - otherExpenses;

  // Personal Ownership under Section 24 (Finance (No. 2) Act 2015):
  // Taxable rental profit ignores finance costs:
  const taxableProfitUnderS24 = grossRent - otherExpenses;
  const taxRate = isHigherRate ? 0.40 : 0.20;
  const grossTaxDue = taxableProfitUnderS24 * taxRate;
  // 20% basic rate tax reduction on finance costs:
  const s24TaxCredit = mortgageInterest * 0.20;
  const netPersonalTax = Math.max(0, grossTaxDue - s24TaxCredit);

  // SPV Limited Company Ownership:
  // 100% of mortgage interest is deductible before corporation tax:
  const spvTaxableProfit = Math.max(0, actualProfit);
  // Corporation tax: 19% on first £50k, 25% main rate
  const spvTax = spvTaxableProfit <= 50000 
    ? spvTaxableProfit * 0.19 
    : (50000 * 0.19) + ((spvTaxableProfit - 50000) * 0.25);

  // Tax Difference
  const estimatedTaxSaving = Math.max(0, netPersonalTax - spvTax);

  // Recommended Practice Fixed Fee (Tiered by unit count & complexity)
  const monthlyRetainer = Math.round(150 + propertiesCount * 45);

  const handleEnquireWithPortfolio = () => {
    openIntakeModal({
      portfolioSize: `${propertiesCount} Properties`,
      annualRent: grossRent,
      mortgageInterest: mortgageInterest,
      notes: `Prospective portfolio review. Current gross rent: £${grossRent.toLocaleString()}, Annual mortgage interest: £${mortgageInterest.toLocaleString()}. Evaluated for Section 24 vs SPV restructuring.`,
    });
  };

  return (
    <section id="tax-calculator" className="py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded w-fit">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Section 24 & SPV Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            How Section 24 Restricts Your Buy-to-Let Mortgage Relief
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Adjust the sliders below to estimate your current tax exposure under personal ownership versus an SPV Limited Company, and view transparent monthly practice pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 accountant-card p-5 sm:p-6 space-y-6">
            {/* Slider 1: Number of Properties */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-neutral-900">
                  Number of Buy-to-Let Properties:
                </label>
                <span className="font-bold text-primary text-sm num-tabular">
                  {propertiesCount} {propertiesCount === 1 ? "Property" : "Properties"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={propertiesCount}
                onChange={(e) => setPropertiesCount(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-neutral-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>1 Unit</span>
                <span>5 Units</span>
                <span>10 Units</span>
                <span>15+ Units</span>
              </div>
            </div>

            {/* Slider 2: Gross Annual Rental Income */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-neutral-900">
                  Total Gross Annual Rental Income:
                </label>
                <span className="font-bold text-primary text-sm num-tabular">
                  £{grossRent.toLocaleString()}/year
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={250000}
                step={5000}
                value={grossRent}
                onChange={(e) => setGrossRent(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-neutral-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>£15k</span>
                <span>£100k</span>
                <span>£175k</span>
                <span>£250k+</span>
              </div>
            </div>

            {/* Slider 3: Annual Mortgage Interest */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-neutral-900">
                  Total Annual Mortgage Interest Paid:
                </label>
                <span className="font-bold text-primary text-sm num-tabular">
                  £{mortgageInterest.toLocaleString()}/year
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={120000}
                step={1000}
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-neutral-200 rounded cursor-pointer"
              />
              <p className="text-[11px] text-neutral-500">
                Finance costs restricted to a 20% basic tax credit under personal ownership rules.
              </p>
            </div>

            {/* Tax Bracket Toggle */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-neutral-900 block">Personal Tax Bracket</span>
                <span className="text-neutral-500 text-[11px]">
                  {isHigherRate ? "Higher Rate (40%) or Additional (45%)" : "Basic Rate (20%)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsHigherRate(!isHigherRate)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                  isHigherRate
                    ? "bg-primary text-white"
                    : "bg-neutral-200 text-neutral-700"
                }`}
              >
                {isHigherRate ? "Higher Rate (40%)" : "Basic Rate (20%)"}
              </button>
            </div>
          </div>

          {/* Comparative Results Column (5 cols) */}
          <div className="lg:col-span-5 accountant-card p-5 sm:p-6 space-y-5 bg-white border-2 border-primary/10">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Comparative Tax Analysis
              </h3>
              <p className="text-xs text-neutral-500">
                Estimated annual tax payable based on your figures:
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="space-y-3">
              {/* Option A: Personal Ownership */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">Personal Name (Section 24)</span>
                  <span className="font-bold text-neutral-900 text-sm num-tabular">
                    £{Math.round(netPersonalTax).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Taxed on rent minus expenses, with finance relief capped at 20%.
                </p>
              </div>

              {/* Option B: SPV Ltd Company */}
              <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/60 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">SPV Company Structure</span>
                  <span className="font-bold text-emerald-800 text-sm num-tabular">
                    £{Math.round(spvTax).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  100% of mortgage interest deducted before Corporation Tax (19%–25%).
                </p>
              </div>
            </div>

            {/* Estimated Annual Differential */}
            {estimatedTaxSaving > 0 && (
              <div className="p-3 rounded-lg bg-primary text-white space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>Estimated Annual Tax Difference:</span>
                  <span className="text-base text-emerald-300 num-tabular">
                    ~£{Math.round(estimatedTaxSaving).toLocaleString()}/year
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-tight">
                  Potential saving via corporate structuring or mortgage interest restructuring.
                </p>
              </div>
            )}

            {/* Transparent Fixed Fee Retainer */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-neutral-900 block">Recommended Retainer:</span>
                <span className="text-[11px] text-neutral-500">Includes Self Assessment & MTD filings</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-neutral-900 num-tabular">
                  £{monthlyRetainer}
                </span>
                <span className="text-neutral-500 text-xs">/month + VAT</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={handleEnquireWithPortfolio}
              className="w-full touch-target-44 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-neutral-800 active:scale-95 transition shadow-sm inline-flex items-center justify-center space-x-2"
            >
              <span>Enquire With This Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
