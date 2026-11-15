"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import InteractiveAccountingDemonstrator from "./InteractiveAccountingDemonstrator";
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
  Receipt,
  FileCheck2,
  Check,
  MessageSquare,
} from "lucide-react";

export default function LandingHero() {
  const { enterClientPortal, enterAccountantPortal, openIntakeModal, triggerToast } = useDemoStore();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [entityType, setEntityType] = useState<"spv_ltd" | "personal_btl" | "commercial">("spv_ltd");
  const [grossRent, setGrossRent] = useState<number>(42000);
  const [mortgageInterest, setMortgageInterest] = useState<number>(22500);

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
    <section className="relative pt-10 sm:pt-16 pb-20 border-b border-[#1e382b] bg-[#0c1813] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Proof Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#8a9d94] bg-[#14241d] px-3.5 py-1.5 rounded-full border border-[#1e382b] w-fit shadow-sm">
          <div className="flex items-center space-x-1.5 font-bold text-[#a4f4cf]">
            <span className="w-2 h-2 rounded-full bg-[#a4f4cf] animate-pulse" />
            <span className="font-mono">MERCIAN WEALTH &amp; ADVISORY</span>
          </div>
          <span className="text-[#1e382b]">&bull;</span>
          <span className="text-slate-300">City of London &bull; Berkshire</span>
          <span className="text-[#1e382b]">&bull;</span>
          <span className="font-mono text-[#a4f4cf]">HMRC MTD Supervised</span>
        </div>

        {/* Hero Headline & Subtitle in Bricolage Grotesque */}
        <div className="max-w-4xl space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
            From Bank Feed to HMRC. <br />
            <span className="text-[#a4f4cf]">Zero Chasing. 100% Tax Relief.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8a9d94] leading-relaxed max-w-2xl">
            A high-density accountancy operating system built for UK property SPVs and chartered practices. 
            Automated Section 24 mortgage relief, live bank feed reconciliation, and end-of-month landlord spending records with vector A4 PDF generation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openIntakeModal()}
              className="touch-target-44 px-6 py-3 rounded-lg font-bold text-sm bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] flex items-center space-x-2 shadow-sm transition active:scale-95"
            >
              <span>Scope Your Property SPV</span>
              <ArrowRight className="w-4 h-4 text-[#0c1813]" />
            </button>

            <a
              href="https://wa.me/447851055929?text=Hi%20Mercian%20Wealth,%20I'd%20like%20to%20discuss%20our%20property%20SPV%20tax%20and%20accounting."
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target-44 px-5 py-3 rounded-lg font-semibold text-sm bg-[#14241d] hover:bg-[#1e382b] text-white border border-[#1e382b] flex items-center space-x-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-[#a4f4cf]" />
              <span>WhatsApp Direct (+44 7851 055929)</span>
            </a>
          </div>
        </div>

        {/* Live Interactive Ingestion Demonstrator (The XLANE Benchmark) */}
        <div className="pt-4">
          <InteractiveAccountingDemonstrator />
        </div>

        {/* 3-Tap Section 24 Mortgage Relief Scoper (High-Converting Functional Tool) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1e382b] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#a4f4cf] block">
                Instant Sub-Second Tax Audit
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                UK Section 24 Mortgage Relief Calculator
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8a9d94]">
              Finance Act 2015 &bull; HMRC Section 24 Rules
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Gross Rental Income */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Annual Gross Rental Income (£)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={grossRent}
                onChange={(e) => setGrossRent(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white font-mono text-sm focus:outline-none focus:border-[#a4f4cf]"
              />
              <p className="text-[11px] text-[#8a9d94]">Total rental turnover across portfolio</p>
            </div>

            {/* Step 2: Mortgage Interest Paid */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Annual Mortgage Interest (£)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white font-mono text-sm focus:outline-none focus:border-[#a4f4cf]"
              />
              <p className="text-[11px] text-[#8a9d94]">Interest-only finance costs (Paragon, Shawbrook, etc.)</p>
            </div>

            {/* Step 3: Result & Direct WhatsApp Dispatch */}
            <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#a4f4cf] block">
                  SPV Limited Company Net Savings
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#a4f4cf] font-mono">
                  £{netSaved.toLocaleString()}
                  <span className="text-xs text-[#8a9d94] font-sans font-normal ml-1">/year saved</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleSendWhatsAppDispatch}
                className="touch-target-44 w-full py-2.5 px-3 rounded-lg font-bold text-xs bg-[#14241d] hover:bg-[#1e382b] text-white border border-[#1e382b] flex items-center justify-center space-x-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#a4f4cf]" />
                <span>Deliver Audit via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
