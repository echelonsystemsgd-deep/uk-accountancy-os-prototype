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
} from "lucide-react";

export default function LandingHero() {
  const { setCurrentView, openIntakeModal } = useDemoStore();

  return (
    <section className="relative pt-8 pb-16 sm:pb-20 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Regulatory Trust Crest Banner */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 bg-neutral-50 px-3.5 py-2 rounded-lg border border-neutral-200 w-fit">
          <div className="flex items-center space-x-1.5 font-semibold text-neutral-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Chartered Tax Advisers (CTA)</span>
          </div>
          <span className="text-neutral-300">&bull;</span>
          <div className="flex items-center space-x-1.5 font-semibold text-neutral-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Fellow Chartered Accountants (FCA)</span>
          </div>
          <span className="text-neutral-300">&bull;</span>
          <span className="text-neutral-600">Regulated by ICAEW & CIOT</span>
        </div>

        {/* Main Hero Proposition */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            UK Property Tax Specialists for Portfolio Landlords & SPVs
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We help buy-to-let landlords and property investors minimize legitimate tax under Section 24 mortgage interest rules, structure company property purchases, and prepare for Making Tax Digital without administrative chaos.
          </p>
        </div>

        {/* Primary CTA Row (44px min touch targets) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("tax-calculator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="touch-target-44 px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-neutral-800 active:scale-95 transition shadow-sm inline-flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Section 24 Relief & Fees</span>
          </button>

          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition inline-flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-neutral-600" />
            <span>Book Initial Consultation</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView("dropzone")}
            className="touch-target-44 px-4 py-3 rounded-md text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition inline-flex items-center space-x-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-neutral-500" />
            <span>Existing Client Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Outcome Proof Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-900 block">Section 24 Relief</span>
            <p className="text-xs text-neutral-600">
              Personal vs SPV comparative modelling to preserve allowable finance costs.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-900 block">MTD for ITSA Ready</span>
            <p className="text-xs text-neutral-600">
              Seamless quarterly digital reporting for landlords earning over £50,000 (April 2026).
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-900 block">Frictionless Uploads</span>
            <p className="text-xs text-neutral-600">
              Snap photos of mortgage certificates and bank statements directly from your smartphone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
