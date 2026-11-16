"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import InteractiveJourneySection from "@/components/landing/InteractiveJourneySection";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, ShieldCheck, Cpu, CheckCircle2, Clock } from "lucide-react";

export default function HowItWorksPage() {
  const { isIntakeModalOpen, openIntakeModal } = useDemoStore();

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#a4f4cf]">How It Works</span>
        </div>

        {/* Page Header */}
        <div className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162032] border border-[#1F293D] text-[#a4f4cf] text-xs font-semibold font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Closed-Loop Accounting Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            How It Works. <br />
            <span className="text-[#a4f4cf]">From Bank Entry to HMRC Accepted.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Explore the 6-stage automated lifecycle engineered for UK property SPVs and chartered practices. Raw mortgage interest debits and contractor receipts are parsed, classified, and sealed into audit-proof statutory tax packs.
          </p>
        </div>

        {/* Interactive 6-Stage Console */}
        <div className="pt-2">
          <InteractiveJourneySection />
        </div>

        {/* Reassurance Grid in Tactile Cream & Green */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-6 rounded-2xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 shadow-md">
            <div className="text-[10px] font-mono font-bold uppercase text-stone-500">Security Guarantee</div>
            <h4 className="text-base font-display font-bold text-stone-900">Open Banking Read-Only</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We connect via FCA-regulated Open Banking protocols with 256-bit encryption. We can never move funds, initiate payments, or alter bank balances.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 shadow-md">
            <div className="text-[10px] font-mono font-bold uppercase text-stone-500">Statutory Accuracy</div>
            <h4 className="text-base font-display font-bold text-stone-900">99.4% Nominal Match</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nominal matching mapped to HMRC Property Income Manual (PIM2000). Capital improvements are partitioned from allowable revenue repairs automatically.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] space-y-3 shadow-md">
            <div className="text-[10px] font-mono font-bold uppercase text-stone-500">Professional Sign-Off</div>
            <h4 className="text-base font-display font-bold text-stone-900">FCA &amp; CTA Supervision</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every tax pack is reviewed and signed off by Kalpesh Patel FCA or Pritpal Chaggar CTA before submission to HMRC and Companies House.
            </p>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111726] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-white">Ready to Connect Your SPV Accounts?</h3>
            <p className="text-xs text-slate-400">Speak with our senior chartered partners for a bespoke onboarding roadmap.</p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-3 rounded-xl font-bold font-mono text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] flex items-center space-x-2 shadow-md transition active:scale-95 shrink-0"
          >
            <span>Book Partner Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
