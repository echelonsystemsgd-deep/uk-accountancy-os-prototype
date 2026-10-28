"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  ShieldCheck,
  Building2,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown,
  Calendar,
  PoundSterling,
  Briefcase,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

export default function LandingHero() {
  const { openIntakeModal, openLoginModal, enterAccountantPortal, enterClientPortal, metrics } = useDemoStore();

  return (
    <section className="relative pt-8 pb-16 sm:pb-20 border-b border-neutral-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Regulatory Trust Crest Banner */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 w-fit">
              <div className="flex items-center space-x-1 font-semibold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Chartered Tax Advisers (CTA)</span>
              </div>
              <span className="text-neutral-300">&bull;</span>
              <div className="flex items-center space-x-1 font-semibold text-neutral-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Fellow Chartered Accountants (FCA)</span>
              </div>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-neutral-500">ICAEW Regulated</span>
            </div>

            {/* Main Hero Proposition */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                UK Property Tax Specialists for Portfolio Landlords & SPVs
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                We help buy-to-let landlords and property investors minimize legitimate tax under Section 24 mortgage restrictions, structure company property purchases, and prepare for Making Tax Digital without administrative chaos.
              </p>
            </div>

            {/* Primary CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("tax-calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="touch-target-44 btn-tactile px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-neutral-800 transition shadow-sm inline-flex items-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Section 24 Relief & Fees</span>
              </button>

              <button
                type="button"
                onClick={() => openIntakeModal()}
                className="touch-target-44 btn-tactile px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-neutral-600" />
                <span>Book Initial Consultation</span>
              </button>

              <button
                type="button"
                onClick={openLoginModal}
                className="touch-target-44 btn-tactile px-3.5 py-3 rounded-md text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition inline-flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Portal Login</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clear 3-Step Next-Action Roadmap */}
            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Clear 3-Step Client Journey:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/90 space-y-1 hover:border-neutral-300 transition">
                  <div className="flex items-center space-x-1.5 font-bold text-neutral-900">
                    <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-mono">1</span>
                    <span>Calculate Tax Exposure</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-tight">Run your numbers in our live Section 24 model.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/90 space-y-1 hover:border-neutral-300 transition">
                  <div className="flex items-center space-x-1.5 font-bold text-neutral-900">
                    <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-mono">2</span>
                    <span>Strategic Advisory Call</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-tight">Review SPV transfers & tax reducers with a CTA partner.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/90 space-y-1 hover:border-neutral-300 transition">
                  <div className="flex items-center space-x-1.5 font-bold text-neutral-900">
                    <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-mono">3</span>
                    <span>1-Click Phone Dropzone</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-tight">Snap mortgage photos & log property bills without paperwork.</p>
                </div>
              </div>
            </div>

            {/* 3 Outcome Proof Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-neutral-900 block">Section 24 Relief</span>
                <p className="text-neutral-500 text-[11px]">
                  Personal vs SPV comparative modelling.
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-neutral-900 block">MTD for ITSA 2026</span>
                <p className="text-neutral-500 text-[11px]">
                  Quarterly digital reporting prepared now.
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-neutral-900 block">Frictionless Uploads</span>
                <p className="text-neutral-500 text-[11px]">
                  Snap photos of mortgage certificates on your phone.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Curated Architectural Photography Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100">
              {/* High-Resolution Prime UK Residential Architecture Image */}
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
                alt="Prime UK Buy-to-Let Residential Portfolio Development"
                width={1000}
                height={667}
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

              {/* Floating Stat Overlay 1 (Top Right) */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-2.5 shadow-lg border border-neutral-200 text-xs space-y-0.5 animate-float-gentle">
                <div className="flex items-center space-x-1 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% SPV Deductible</span>
                </div>
                <span className="text-[10px] text-neutral-500 block">Mortgage Interest Relieved</span>
              </div>

              {/* Bottom Image Caption & Metrics */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block text-sm">
                    Active Portfolio Management
                  </span>
                  <span className="text-[11px] text-neutral-600">
                    Joint BTLs, HMOs & SPV Limited Companies
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-extrabold text-sm num-tabular">
                    42 Portfolios
                  </span>
                  <span className="text-[10px] text-neutral-500 block">118 units tracked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Interactive Live Environment Cards (Unmissable Tier Showcase) */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                Three Integrated Operating Environments
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                Explore the Complete Operating System
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm sm:text-right">
              Switch freely between external prospect acquisition, partner practice management, and landlord document collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Public Acquisition */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50 transition shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    Tier 1: Acquisition
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">Public Facing</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Client Acquisition Front Door
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Interactive Section 24 calculator, MTD 2026 mandate guide, and partner credentials that turn visitors into booked clients.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("tax-calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 transition text-center shadow-xs"
              >
                Scroll to Calculator ↓
              </button>
            </div>

            {/* Card 2: Partner Practice OS */}
            <div className="p-4 rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-md transition shadow-xs flex flex-col justify-between space-y-3 ring-1 ring-amber-400/20">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Tier 2: Practice OS
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold">{metrics.missingDocumentsCount} items pending</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Accountant Practice Radar & CRM
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Real-time pipeline kanban, multi-channel WhatsApp chaser, CSV export, and bi-directional Xero & Karbon sync.
                </p>
              </div>
              <button
                type="button"
                onClick={() => enterAccountantPortal("radar")}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition text-center shadow-xs inline-flex items-center justify-center space-x-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>Launch Practice OS →</span>
              </button>
            </div>

            {/* Card 3: Landlord Mobile Dropzone */}
            <div className="p-4 rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-white hover:shadow-md transition shadow-xs flex flex-col justify-between space-y-3 ring-1 ring-emerald-400/20">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Tier 3: Landlord Portal
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Zero Passwords</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Mobile Dropzone & Encrypted Vault
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  375px camera uploader with AI OCR receipt extraction, live 60-second signed document previews, and advisor chat.
                </p>
              </div>
              <button
                type="button"
                onClick={() => enterClientPortal("dropzone")}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 transition text-center shadow-xs inline-flex items-center justify-center space-x-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
                <span>Launch Landlord Portal →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
