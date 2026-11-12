"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  PoundSterling,
  Sparkles,
  Zap,
  Crown,
  Coins,
  MessageSquare,
  FileCheck2,
  Check,
} from "lucide-react";

export default function LandingHero() {
  const { enterClientPortal, enterAccountantPortal, openIntakeModal, triggerToast } = useDemoStore();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [entityType, setEntityType] = useState<"spv_ltd" | "personal_btl" | "commercial">("spv_ltd");
  const [grossRent, setGrossRent] = useState<number>(39000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(20280);

  // Computations
  const personalTaxDrag = Math.round(grossRent * 0.40 - mortgageInterest * 0.20);
  const spvProfit = Math.max(0, grossRent - mortgageInterest - 6420);
  const spvCorpTax = Math.round(spvProfit * 0.19);
  const netSaved = Math.max(0, personalTaxDrag - spvCorpTax);

  const handleSendWhatsAppDispatch = () => {
    triggerToast(
      "WhatsApp Lead Dispatched",
      `Tax audit for £${grossRent.toLocaleString()} turnover delivered to WhatsApp (+44 7851 055929) in 3.2s.`,
      "success"
    );
  };

  return (
    <section className="relative pt-12 pb-20 border-b border-[#1F293D] bg-[#0B0F19] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Proof Pill (Mercian Wealth Signature) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 bg-[#162032] px-3.5 py-1.5 rounded-full border border-[#1F293D] w-fit shadow-sm">
          <div className="flex items-center space-x-1 font-bold text-[#0077C8]">
            <Zap className="w-3.5 h-3.5 fill-[#0077C8]" />
            <span>Mercian Wealth Infrastructure</span>
          </div>
          <span className="text-slate-600">&bull;</span>
          <span className="text-slate-300 font-medium">Engineered in Berkshire, United Kingdom</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-emerald-400 font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sub-400ms Velocity</span>
          </span>
        </div>

        {/* Hero Copy & Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Autonomous Accounting &amp; SPV Tax Infrastructure.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Conversion-focused digital infrastructure built for UK property directors and chartered accountancy practices. Eliminate Section 24 tax leakage, reconcile live bank feeds, and compile HMRC CT600 filing packs in 1-click.
            </p>

            {/* Direct Access Buttons (Zero AI Slop) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                className="touch-target-44 px-5 py-3 rounded-lg font-bold text-xs sm:text-sm bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-2 shadow-md transition active:scale-95"
              >
                <Building2 className="w-4 h-4 text-white" />
                <span>Launch SPV Client Portal (Sukhpreet Kaur)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => enterAccountantPortal("radar")}
                className="touch-target-44 px-4 py-3 rounded-lg font-semibold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-2 transition active:scale-95"
              >
                <Crown className="w-4 h-4 text-sky-400" />
                <span>Chartered Practice Console</span>
              </button>
            </div>

            {/* Feature Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1F293D] text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Section 24 Shield</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant WhatsApp Alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Downtime Sandbox</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Tap Section 24 Order/Intake Builder (Mercian Wealth Core Component) */}
          <div className="lg:col-span-5 accountant-card p-6 bg-[#162032] border border-[#1F293D] rounded-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  3-Tap Interactive Intake Builder
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Section 24 Tax Leakage Scoper
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0077C8]/15 text-[#38BDF8] border border-[#0077C8]/30">
                Step {activeStep} of 3
              </span>
            </div>

            {/* Step 1: Select Ownership Structure */}
            {activeStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <label className="text-xs font-semibold text-slate-300 block">
                  Tap 1: Select Current Property Ownership
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setEntityType("spv_ltd")}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition ${
                      entityType === "spv_ltd"
                        ? "border-[#0077C8] bg-[#0077C8]/10 text-white"
                        : "border-[#1F293D] bg-[#111827] text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">SPV Limited Company (Recommended)</span>
                      <span className="text-[11px] text-slate-400">100% allowable finance costs &bull; 19% Corporation Tax</span>
                    </div>
                    {entityType === "spv_ltd" && <Check className="w-4 h-4 text-sky-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEntityType("personal_btl")}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition ${
                      entityType === "personal_btl"
                        ? "border-[#0077C8] bg-[#0077C8]/10 text-white"
                        : "border-[#1F293D] bg-[#111827] text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">Individual Higher Rate (Section 24 Drag)</span>
                      <span className="text-[11px] text-slate-400">Mortgage interest restricted to basic 20% tax credit</span>
                    </div>
                    {entityType === "personal_btl" && <Check className="w-4 h-4 text-sky-400" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="w-full mt-2 py-2.5 rounded-lg font-bold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white transition flex items-center justify-center space-x-1.5"
                >
                  <span>Continue to Financial Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Step 2: Financial Metrics Input */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <label className="text-xs font-semibold text-slate-300 block">
                  Tap 2: Annual Rent &amp; Mortgage Interest
                </label>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Gross Rental Turnover:</span>
                    <strong className="text-white font-mono">£{grossRent.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min={12000}
                    max={150000}
                    step={1000}
                    value={grossRent}
                    onChange={(e) => setGrossRent(Number(e.target.value))}
                    className="w-full accent-[#0077C8]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Annual Mortgage Interest:</span>
                    <strong className="text-white font-mono">£{mortgageInterest.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min={4000}
                    max={80000}
                    step={500}
                    value={mortgageInterest}
                    onChange={(e) => setMortgageInterest(Number(e.target.value))}
                    className="w-full accent-[#0077C8]"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="flex-1 py-2.5 rounded-lg font-bold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white transition flex items-center justify-center space-x-1.5"
                  >
                    <span>Compute Tax Shield Savings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Instant Calculation & WhatsApp Dispatch */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150 text-xs">
                <div className="p-3.5 rounded-lg bg-[#111827] border border-[#1F293D] space-y-2">
                  <span className="text-slate-400 text-[11px] block">Computed Annual Tax Shield:</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                      +£{netSaved.toLocaleString()}/yr
                    </span>
                    <span className="text-[10px] text-slate-400">Net Cash Preserved</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed border-t border-[#1F293D] pt-2">
                    Under SPV corporate accounting, mortgage finance of £{mortgageInterest.toLocaleString()} is 100% tax deductible against rental income.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSendWhatsAppDispatch}
                  className="touch-target-44 w-full py-3 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 shadow-sm transition active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Memo via WhatsApp in 5 Seconds</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-slate-400 hover:text-white"
                  >
                    &larr; Adjust Figures
                  </button>
                  <button
                    type="button"
                    onClick={() => enterClientPortal("client_tax_optimizer", "client-legacy-wealth")}
                    className="text-sky-400 hover:text-sky-300 font-medium"
                  >
                    Open Full Tax Shield &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
