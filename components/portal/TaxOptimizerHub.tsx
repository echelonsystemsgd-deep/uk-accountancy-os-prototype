"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Calculator,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Percent,
  Coins,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  PoundSterling,
  Building2,
  User,
  ArrowRight,
} from "lucide-react";

export default function TaxOptimizerHub() {
  const { activeClient } = useDemoStore();

  // Interactive Modeler Inputs
  const [customRentalTurnover, setCustomRentalTurnover] = useState<number>(activeClient.totalRentalIncome || 39000);
  const [customMortgageInterest, setCustomMortgageInterest] = useState<number>(20280);
  const [customOperatingExpenses, setCustomOperatingExpenses] = useState<number>(6420);
  const [directorSalary, setDirectorSalary] = useState<number>(12570);
  const [isHigherRatePersonal, setIsHigherRatePersonal] = useState<boolean>(true); // 40% income tax if held personally

  // 1. SPV Limited Company Calculation
  const spvGrossTurnover = customRentalTurnover;
  // Under SPV: Mortgage interest is 100% deductible business expense!
  const spvAllowableCosts = customOperatingExpenses + customMortgageInterest;
  const spvTaxableProfit = Math.max(0, spvGrossTurnover - spvAllowableCosts);

  // Corporation Tax with Marginal Relief
  let corporationTax = 0;
  let ctRateEffective = "19.00%";

  if (spvTaxableProfit <= 50000) {
    corporationTax = spvTaxableProfit * 0.19;
    ctRateEffective = "19.00% (Small Profits Rate)";
  } else if (spvTaxableProfit > 250000) {
    corporationTax = spvTaxableProfit * 0.25;
    ctRateEffective = "25.00% (Main Rate)";
  } else {
    // Marginal relief formula: (Profit * 25%) - ((£250,000 - Profit) * 3/200)
    const grossCt = spvTaxableProfit * 0.25;
    const marginalRelief = (250000 - spvTaxableProfit) * (3 / 200);
    corporationTax = grossCt - marginalRelief;
    ctRateEffective = `${((corporationTax / spvTaxableProfit) * 100).toFixed(2)}% (Marginal Relief)`;
  }

  const spvRetainedProfit = spvTaxableProfit - corporationTax;

  // 2. Individual Personal Ownership Calculation (Section 24 Restricted)
  const personalRate = isHigherRatePersonal ? 0.40 : 0.20;
  // Under Section 24: Mortgage interest is NOT deducted from gross profit!
  const personalTaxableProfit = Math.max(0, customRentalTurnover - customOperatingExpenses);
  const personalGrossTax = personalTaxableProfit * personalRate;
  // Section 24: 20% basic rate tax credit applied to mortgage interest
  const section24TaxCredit = customMortgageInterest * 0.20;
  const personalNetTax = Math.max(0, personalGrossTax - section24TaxCredit);
  const personalNetRetained = customRentalTurnover - customOperatingExpenses - customMortgageInterest - personalNetTax;

  // 3. Tax Difference & Annual Savings
  const annualTaxSaved = personalNetTax - corporationTax;
  const cashDifference = (customRentalTurnover - spvAllowableCosts - corporationTax) - personalNetRetained;

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Banner */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                Section 24 Tax Shield & Optimization
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Operating Entity: <strong className="text-neutral-200">{activeClient.entityName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              UK Tax Shield & Extraction Optimizer
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Compare 100% SPV Corporation Tax relief against individual Section 24 restrictions. Model optimal salary, dividend allowance, and tax-free DLA withdrawals.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Tax Saved: £{Math.max(0, annualTaxSaved).toLocaleString()}/year
            </span>
          </div>
        </div>

        {/* 4 Telemetry Comparison Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">SPV Corporation Tax</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 num-tabular">
              £{Math.round(corporationTax).toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">{ctRateEffective}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Personal Tax (Section 24)</span>
            <span className="text-xl sm:text-2xl font-bold text-ruby num-tabular">
              £{Math.round(personalNetTax).toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              {isHigherRatePersonal ? "40% Higher Rate" : "20% Basic Rate"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-gold/30 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Annual Tax Saved via SPV</span>
            <span className="text-xl sm:text-2xl font-extrabold text-gold num-tabular">
              +£{Math.round(annualTaxSaved).toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block">
              Legitimate SPV corporate shield
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Available DLA Buffer</span>
            <span className="text-xl sm:text-2xl font-bold text-white num-tabular">
              £{(activeClient.dlaBalance || 134625).toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block">
              0% Tax-free extraction limit
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Architectural Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: SPV Ltd Company (Sukhpreet Kaur Legacy Wealth Ltd) */}
        <div className="accountant-card p-5 bg-cardSurface border-2 border-emerald-500/40 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Current Optimized Structure
                </span>
                <h3 className="text-base font-bold text-white">SPV Limited Company</h3>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">
              Optimal
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
              <span className="text-neutral-400">Gross Rental Turnover:</span>
              <span className="font-bold text-white num-tabular">£{spvGrossTurnover.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
              <span className="text-neutral-400">Operating Expenses (Repairs, Insurance, Letting):</span>
              <span className="font-bold text-neutral-300 num-tabular">-£{customOperatingExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 bg-emerald-500/5 px-2 rounded">
              <span className="text-emerald-300 font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mortgage Interest (100% SPV Allowable):</span>
              </span>
              <span className="font-bold text-emerald-400 num-tabular">-£{customMortgageInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 font-semibold">
              <span className="text-neutral-300">Net Taxable Corporate Profit:</span>
              <span className="text-white num-tabular">£{spvTaxableProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 text-emerald-400 font-bold">
              <span>Corporation Tax (19% Rate):</span>
              <span className="num-tabular">£{Math.round(corporationTax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-extrabold text-sm text-white pt-2">
              <span>Net Corporate Retained Cash:</span>
              <span className="text-emerald-400 num-tabular">£{Math.round(spvRetainedProfit).toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 space-y-1">
            <span className="font-bold flex items-center space-x-1">
              <Coins className="w-3.5 h-3.5" />
              <span>Tax-Free Extraction Route:</span>
            </span>
            <p>
              Retained profits can be transferred directly to your personal bank account as <strong>Director’s Loan Repayments</strong> with <strong>£0 tax</strong> up to your £{(activeClient.dlaBalance || 134625).toLocaleString()} capital buffer.
            </p>
          </div>
        </div>

        {/* Right: Personal Ownership (What would happen without the SPV) */}
        <div className="accountant-card p-5 bg-cardSurface border border-ruby/30 rounded-xl space-y-4 opacity-95">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-ruby/10 text-ruby border border-ruby/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-ruby uppercase tracking-wider block">
                  Unoptimized Personal Name
                </span>
                <h3 className="text-base font-bold text-white">Individual Ownership (Section 24)</h3>
              </div>
            </div>
            <span className="text-xs font-bold text-ruby bg-ruby/20 px-2 py-1 rounded">
              High Tax Penalty
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
              <span className="text-neutral-400">Gross Rental Turnover:</span>
              <span className="font-bold text-white num-tabular">£{customRentalTurnover.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
              <span className="text-neutral-400">Operating Expenses:</span>
              <span className="font-bold text-neutral-300 num-tabular">-£{customOperatingExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 bg-ruby/5 px-2 rounded">
              <span className="text-ruby font-semibold flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-ruby" />
                <span>Mortgage Interest Deduction:</span>
              </span>
              <span className="font-bold text-ruby num-tabular">NOT ALLOWED (£0)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 font-semibold">
              <span className="text-neutral-300">Artificial Taxable Income:</span>
              <span className="text-ruby num-tabular">£{personalTaxableProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-800/60 text-ruby font-bold">
              <span>Gross Tax @ {isHigherRatePersonal ? "40%" : "20%"} minus Section 24 20% Credit:</span>
              <span className="num-tabular">£{Math.round(personalNetTax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-extrabold text-sm text-white pt-2">
              <span>Actual Cash In Pocket:</span>
              <span className="text-neutral-300 num-tabular">£{Math.round(personalNetRetained).toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-ruby/10 border border-ruby/20 text-[11px] text-red-300 space-y-1">
            <span className="font-bold flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Section 24 Phantom Income Danger:</span>
            </span>
            <p>
              In your personal name, HMRC taxes you on money you paid to the bank as mortgage interest. The SPV eliminates this completely.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sliders for Custom Portfolio Exploration */}
      <div className="accountant-card p-5 bg-cardSurface border border-neutral-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-gold" />
          <span>Adjust Portfolio Scenarios</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>Gross Annual Rent</span>
              <span className="font-bold text-white num-tabular">£{customRentalTurnover.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={150000}
              step={1000}
              value={customRentalTurnover}
              onChange={(e) => setCustomRentalTurnover(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>Annual Mortgage Interest</span>
              <span className="font-bold text-white num-tabular">£{customMortgageInterest.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={90000}
              step={500}
              value={customMortgageInterest}
              onChange={(e) => setCustomMortgageInterest(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>Operating Costs</span>
              <span className="font-bold text-white num-tabular">£{customOperatingExpenses.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={200}
              value={customOperatingExpenses}
              onChange={(e) => setCustomOperatingExpenses(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t border-neutral-800">
          <input
            type="checkbox"
            id="higherRate"
            checked={isHigherRatePersonal}
            onChange={(e) => setIsHigherRatePersonal(e.target.checked)}
            className="rounded border-neutral-700 text-gold focus:ring-gold bg-obsidian-400"
          />
          <label htmlFor="higherRate" className="text-neutral-300 text-xs">
            Model personal tax at 40% Higher Rate band (income over £50,270)
          </label>
        </div>
      </div>
    </div>
  );
}
