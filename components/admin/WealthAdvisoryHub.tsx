"use client";

import React, { useState, useId } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Shield,
  TrendingUp,
  Landmark,
  Building,
  Coins,
  ArrowUpRight,
  Sparkles,
  Sliders,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Percent,
  Calculator,
  UserCheck,
  Crown,
  ChevronRight,
  PieChart,
} from "lucide-react";

export default function WealthAdvisoryHub() {
  const { clients, triggerToast } = useDemoStore();

  const idPrefix = useId();

  // IHT Estate Planning Interactive States
  const [estateValue, setEstateValue] = useState<number>(2750000);
  const [includeSpousalExemption, setIncludeSpousalExemption] = useState<boolean>(true);
  const [includeRnrb, setIncludeRnrb] = useState<boolean>(true);
  const [bprQualifyingAssets, setBprQualifyingAssets] = useState<number>(650000);
  const [giftPlanningAmount, setGiftPlanningAmount] = useState<number>(200000);

  // Calculations
  const nilRateBand = includeSpousalExemption ? 650000 : 325000;
  const rnrbBand = includeRnrb ? (includeSpousalExemption ? 350000 : 175000) : 0;
  const totalAllowances = nilRateBand + rnrbBand;

  // Unmitigated IHT
  const unmitigatedTaxable = Math.max(0, estateValue - 325000);
  const unmitigatedLiability = unmitigatedTaxable * 0.4;

  // Mitigated IHT with Mercian Wealth & SPV Trust Structuring
  const netEstateAfterBpr = Math.max(0, estateValue - bprQualifyingAssets - giftPlanningAmount);
  const mitigatedTaxable = Math.max(0, netEstateAfterBpr - totalAllowances);
  const mitigatedLiability = mitigatedTaxable * 0.4;
  const totalTaxSaved = Math.max(0, unmitigatedLiability - mitigatedLiability);

  // Section 24 Comparison Calculator States
  const [portfolioRentalGross, setPortfolioRentalGross] = useState<number>(96000);
  const [portfolioMortgageInterest, setPortfolioMortgageInterest] = useState<number>(44000);
  const [otherPersonalIncome, setOtherPersonalIncome] = useState<number>(65000);

  // Personal Ownership Under Section 24
  // Personal: Taxed at marginal rate on Gross Profit, then 20% basic rate tax reducer on mortgage interest
  const personalGrossTaxableProfit = portfolioRentalGross; // without deducting finance costs
  const personalMarginalRate = 0.40; // Higher rate payer
  const personalGrossTax = personalGrossTaxableProfit * personalMarginalRate;
  const section24TaxCredit = portfolioMortgageInterest * 0.20;
  const personalActualTax = personalGrossTax - section24TaxCredit;
  const personalNetCashAfterMortgageAndTax = portfolioRentalGross - portfolioMortgageInterest - personalActualTax;

  // SPV Limited Company Ownership
  // SPV: Deducts 100% of mortgage interest as allowable business expense
  const spvNetProfit = portfolioRentalGross - portfolioMortgageInterest;
  const spvCorporationTax = spvNetProfit * 0.19; // small profits rate 19%
  const spvNetRetainedCash = spvNetProfit - spvCorporationTax;
  const spvAnnualAdvantage = spvNetRetainedCash - personalNetCashAfterMortgageAndTax;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Mercian Wealth & Advisory */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950 p-6 sm:p-8 text-white shadow-xl border border-amber-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Mercian Private Wealth & Tax Cockpit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Wealth Advisory & Estate Architecture
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Proprietary tax mitigation models, Section 24 SPV corporate structuring, and multi-generational Inheritance Tax (IHT) modeling for private clients and property entrepreneurs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                window.print();
                triggerToast(
                  "Wealth Report Prepared",
                  "Estate planning memorandum formatted for client presentation.",
                  "success"
                );
              }}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold text-xs shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Advisory Memorandum</span>
            </button>
          </div>
        </div>

        {/* High-Level Practice Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
          <div>
            <div className="text-neutral-400 font-medium">Assets Under Oversight</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">£18.4M</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Across 42 Landlord SPVs</div>
          </div>
          <div>
            <div className="text-neutral-400 font-medium">Section 24 Tax Mitigated</div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-300 mt-1">£412K/yr</div>
            <div className="text-[11px] text-neutral-300 mt-0.5">Via Corporate Restructuring</div>
          </div>
          <div>
            <div className="text-neutral-400 font-medium">IHT Reliefs Secured</div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">£2.65M</div>
            <div className="text-[11px] text-neutral-300 mt-0.5">BPR, Trusts & RNRB</div>
          </div>
          <div>
            <div className="text-neutral-400 font-medium">Principal Wealth Advisor</div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">Gurtej Singh</div>
            <div className="text-[11px] text-amber-300 mt-0.5">Mercian Wealth & Advisory</div>
          </div>
        </div>
      </div>

      {/* Two Column Interactive Engine: IHT Model & Section 24 SPV Arbitrage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Inheritance Tax (IHT) 40% Mitigation Simulator */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Inheritance Tax (IHT) Simulator
                </h3>
                <p className="text-xs text-neutral-500">
                  UK 40% Estate Duty & Relief Optimizer (2024/25 Rules)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
              HMRC Compliant
            </span>
          </div>

          {/* Slider: Gross Estate Value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={`${idPrefix}-estateValue`} className="font-semibold text-neutral-700">Gross Estate Valuation</label>
              <span className="font-mono font-bold text-neutral-900 text-sm">
                £{estateValue.toLocaleString()}
              </span>
            </div>
            <input
              id={`${idPrefix}-estateValue`}
              type="range"
              min={500000}
              max={8000000}
              step={50000}
              value={estateValue}
              onChange={(e) => setEstateValue(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>£500k</span>
              <span>£4M</span>
              <span>£8M+</span>
            </div>
          </div>

          {/* Relief Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div
              onClick={() => setIncludeSpousalExemption(!includeSpousalExemption)}
              className={`p-3 rounded-lg border cursor-pointer transition flex items-start space-x-2.5 ${
                includeSpousalExemption
                  ? "bg-amber-50/70 border-amber-300 text-neutral-900"
                  : "bg-neutral-50 border-neutral-200 text-neutral-500"
              }`}
            >
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${includeSpousalExemption ? "text-amber-600" : "text-neutral-300"}`} />
              <div>
                <div className="font-semibold">Spousal Transfer (2x Nil Rate)</div>
                <div className="text-[11px] text-neutral-500">£650,000 threshold</div>
              </div>
            </div>

            <div
              onClick={() => setIncludeRnrb(!includeRnrb)}
              className={`p-3 rounded-lg border cursor-pointer transition flex items-start space-x-2.5 ${
                includeRnrb
                  ? "bg-amber-50/70 border-amber-300 text-neutral-900"
                  : "bg-neutral-50 border-neutral-200 text-neutral-500"
              }`}
            >
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${includeRnrb ? "text-amber-600" : "text-neutral-300"}`} />
              <div>
                <div className="font-semibold">Residence Nil-Rate (RNRB)</div>
                <div className="text-[11px] text-neutral-500">Up to £350,000 family home</div>
              </div>
            </div>
          </div>

          {/* BPR & Gift Planning Sliders */}
          <div className="space-y-4 pt-2 border-t border-neutral-100 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={`${idPrefix}-bprQualifying`} className="font-medium text-neutral-700">
                  Business Property Relief (100% Trading SPV / AIM):
                </label>
                <span className="font-mono font-bold text-neutral-900">
                  £{bprQualifyingAssets.toLocaleString()}
                </span>
              </div>
              <input
                id={`${idPrefix}-bprQualifying`}
                type="range"
                min={0}
                max={2000000}
                step={25000}
                value={bprQualifyingAssets}
                onChange={(e) => setBprQualifyingAssets(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={`${idPrefix}-giftPlanning`} className="font-medium text-neutral-700">
                  Potentially Exempt Transfers (PETs / Trust Gifting):
                </label>
                <span className="font-mono font-bold text-neutral-900">
                  £{giftPlanningAmount.toLocaleString()}
                </span>
              </div>
              <input
                id={`${idPrefix}-giftPlanning`}
                type="range"
                min={0}
                max={1000000}
                step={25000}
                value={giftPlanningAmount}
                onChange={(e) => setGiftPlanningAmount(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Calculation Comparison Output Card */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-4">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>Inheritance Tax Audit Impact</span>
              <span>40% Statutory Rate</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-neutral-400 text-[11px] block">Without Mitigation</span>
                <span className="text-lg font-bold text-red-400 mt-1 block">
                  £{Math.round(unmitigatedLiability).toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400">40% on excess over £325k</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                <span className="text-emerald-300 text-[11px] block">Mercian Structured</span>
                <span className="text-lg font-bold text-emerald-400 mt-1 block">
                  £{Math.round(mitigatedLiability).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-300/80">With Nil Rate, RNRB & BPR</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300">Net Wealth Preserved for Heirs:</span>
              <span className="text-base font-extrabold text-amber-300 font-mono">
                +£{Math.round(totalTaxSaved).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Module 2: Section 24 Mortgage Restriction Arbitrage Engine */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Section 24 SPV Corporate Arbitrage
                </h3>
                <p className="text-xs text-neutral-500">
                  Personal vs Limited Company Buy-to-Let Comparison
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
              Finance Act 2015
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={`${idPrefix}-rentalGross`} className="font-semibold text-neutral-700">
                  Annual Portfolio Rental Income:
                </label>
                <span className="font-mono font-bold text-neutral-900">
                  £{portfolioRentalGross.toLocaleString()}/yr
                </span>
              </div>
              <input
                id={`${idPrefix}-rentalGross`}
                type="range"
                min={30000}
                max={300000}
                step={2000}
                value={portfolioRentalGross}
                onChange={(e) => setPortfolioRentalGross(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={`${idPrefix}-mortgageInterest`} className="font-semibold text-neutral-700">
                  Annual Mortgage Interest Cost (Finance Cost):
                </label>
                <span className="font-mono font-bold text-neutral-900">
                  £{portfolioMortgageInterest.toLocaleString()}/yr
                </span>
              </div>
              <input
                id={`${idPrefix}-mortgageInterest`}
                type="range"
                min={10000}
                max={150000}
                step={1000}
                value={portfolioMortgageInterest}
                onChange={(e) => setPortfolioMortgageInterest(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Side by side comparison breakdown */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
              <div className="font-bold text-red-900">Personal Ownership</div>
              <div className="text-[11px] text-red-700">Taxed on Gross Income</div>
              <div className="pt-2 border-t border-red-200/80 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>Gross Tax (40%):</span>
                  <span>£{Math.round(personalGrossTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-800">
                  <span>Sec 24 Credit (20%):</span>
                  <span>-£{Math.round(section24TaxCredit).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-red-950 pt-1 border-t border-red-200">
                  <span>HMRC Tax Bill:</span>
                  <span>£{Math.round(personalActualTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-neutral-900 pt-1">
                  <span>Net Pocketed:</span>
                  <span>£{Math.round(personalNetCashAfterMortgageAndTax).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-2">
              <div className="font-bold text-emerald-900">SPV Ltd Company</div>
              <div className="text-[11px] text-emerald-700">100% Interest Deductible</div>
              <div className="pt-2 border-t border-emerald-200 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>Net Taxable Profit:</span>
                  <span>£{Math.round(spvNetProfit).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Corp Tax (19%):</span>
                  <span>£{Math.round(spvCorporationTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-950 pt-1 border-t border-emerald-200">
                  <span>HMRC Tax Bill:</span>
                  <span>£{Math.round(spvCorporationTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-900 pt-1">
                  <span>Retained Cash:</span>
                  <span>£{Math.round(spvNetRetainedCash).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-amber-400 font-bold block">Annual Corporate SPV Cash Benefit:</span>
              <span className="text-[11px] text-neutral-400">Extra cash retained each year in your business</span>
            </div>
            <span className="text-xl font-extrabold text-amber-300 font-mono">
              +£{Math.round(spvAnnualAdvantage).toLocaleString()}/yr
            </span>
          </div>
        </div>
      </div>

      {/* Family Office Portfolio Roster */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Active Private Client & Family Office Portfolios Under Mercian Advisory
            </h3>
            <p className="text-xs text-neutral-500">
              Cross-entity tracking of high-net-worth real estate structures
            </p>
          </div>
          <span className="text-xs font-semibold text-neutral-500">
            {clients.length} Active Holdings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clients.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-900 hover:shadow-md transition bg-neutral-50/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 truncate">
                  {c.entityName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-200 rounded text-neutral-700">
                  {c.entityType.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-neutral-600">
                Contact: <strong className="text-neutral-900">{c.primaryContact}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 text-[11px]">
                <div>
                  <span className="text-neutral-500 block">Rental Income</span>
                  <span className="font-bold font-mono text-neutral-900">
                    £{c.totalRentalIncome.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Lead Advisor</span>
                  <span className="font-medium text-neutral-800 truncate block">
                    {c.assignedAccountant.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
