"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import {
  Calculator,
  ShieldCheck,
  Building2,
  TrendingUp,
  Coins,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from "lucide-react";

export default function QualifyPage() {
  const { openIntakeModal, enterClientPortal } = useDemoStore();

  const [annualRent, setAnnualRent] = useState<number>(39000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(20280);
  const [portfolioSize, setPortfolioSize] = useState<number>(2);
  const [isHigherRate, setIsHigherRate] = useState<boolean>(true);

  // Computations
  // SPV Corporation Tax:
  const operatingExpenses = Math.round(annualRent * 0.15); // ~15% letting, repairs, insurance
  const spvTaxableProfit = Math.max(0, annualRent - mortgageInterest - operatingExpenses);
  const spvTax = Math.round(spvTaxableProfit * 0.19);

  // Individual Personal Tax with Section 24 restriction:
  const personalRate = isHigherRate ? 0.40 : 0.20;
  const personalTaxableProfit = Math.max(0, annualRent - operatingExpenses); // No mortgage interest deduction!
  const personalGrossTax = personalTaxableProfit * personalRate;
  const s24TaxCredit = mortgageInterest * 0.20;
  const personalNetTax = Math.max(0, personalGrossTax - s24TaxCredit);

  const annualTaxSaved = Math.max(0, personalNetTax - spvTax);
  const fiveYearSavings = annualTaxSaved * 5;

  return (
    <div className="min-h-screen bg-obsidian-500 text-neutral-100 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-left">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest font-crest block">
            HMRC SECTION 24 & SPV TAX SCOPER
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            60-Second Property Portfolio Tax Calculator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Calculate your exposure to Section 24 phantom tax and discover how much Corporation Tax relief an SPV Limited Company structure delivers.
          </p>
        </div>

        {/* Calculator Interactive Card */}
        <div className="accountant-card p-6 sm:p-8 bg-cardSurface border border-gold/30 rounded-2xl shadow-gold space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Sliders */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-neutral-800 pb-2">
                <Calculator className="w-4 h-4 text-gold" />
                <span>1. Portfolio Variables</span>
              </h2>

              {/* Slider 1: Gross Rent */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-semibold">Annual Gross Rental Income</span>
                  <span className="font-extrabold text-gold text-sm num-tabular">
                    £{annualRent.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={12000}
                  max={250000}
                  step={1000}
                  value={annualRent}
                  onChange={(e) => setAnnualRent(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <span className="text-[10px] text-neutral-500 block">
                  £{(annualRent / 12).toFixed(0)}/month across {portfolioSize} properties
                </span>
              </div>

              {/* Slider 2: Mortgage Interest */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-semibold">Annual Mortgage Interest</span>
                  <span className="font-extrabold text-white text-sm num-tabular">
                    £{mortgageInterest.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={120000}
                  step={500}
                  value={mortgageInterest}
                  onChange={(e) => setMortgageInterest(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <span className="text-[10px] text-neutral-500 block">
                  Finance cost restricted under personal ownership
                </span>
              </div>

              {/* Slider 3: Portfolio Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-semibold">Number of Rental Properties</span>
                  <span className="font-extrabold text-white text-sm num-tabular">
                    {portfolioSize} Properties
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={1}
                  value={portfolioSize}
                  onChange={(e) => setPortfolioSize(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
              </div>

              {/* Personal Tax Band Toggle */}
              <div className="flex items-center space-x-2 pt-2 border-t border-neutral-800">
                <input
                  type="checkbox"
                  id="higherRateToggle"
                  checked={isHigherRate}
                  onChange={(e) => setIsHigherRate(e.target.checked)}
                  className="rounded border-neutral-700 text-gold focus:ring-gold bg-obsidian-400"
                />
                <label htmlFor="higherRateToggle" className="text-neutral-300 text-xs cursor-pointer">
                  I earn over £50,270 in total UK income (40% Higher Rate band)
                </label>
              </div>
            </div>

            {/* Right Column: Results & Savings */}
            <div className="p-6 rounded-xl bg-obsidian-400/90 border border-gold/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                  HMRC Tax Comparison Result
                </span>

                <div className="space-y-2 border-b border-neutral-800 pb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Personal Tax Bill (Section 24):</span>
                    <span className="font-bold text-ruby num-tabular">£{personalNetTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">SPV Corporation Tax (19%):</span>
                    <span className="font-bold text-emerald-400 num-tabular">£{spvTax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-neutral-400 block">Annual Tax Saved with SPV:</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-gold num-tabular">
                    +£{annualTaxSaved.toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold block">
                    5-Year Compounded Tax Savings: ~£{fiveYearSavings.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => openIntakeModal({ annualRent, mortgageInterest })}
                  className="touch-target-44 w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-gold hover:bg-gold-hover text-obsidian shadow-gold transition flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book SPV Advisory Consultation</span>
                </button>

                <button
                  type="button"
                  onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                  className="w-full py-2 text-center text-xs text-neutral-400 hover:text-white transition block"
                >
                  &rarr; Or preview SUKHPREET KAUR LEGACY WEALTH LTD Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
