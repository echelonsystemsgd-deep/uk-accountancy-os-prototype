"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Smartphone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function MtdGuidanceSection() {
  const { openIntakeModal } = useDemoStore();

  return (
    <section id="mtd-guidance" className="py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 bg-neutral-200/80 px-2.5 py-1 rounded w-fit">
            <Calendar className="w-3.5 h-3.5 text-neutral-700" />
            <span>HMRC Statutory Mandate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Making Tax Digital (MTD) for Landlords: Are You Ready for April 2026?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            The traditional once-a-year tax panic is ending. HMRC's Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires landlords to submit quarterly digital updates.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1: April 2026 */}
          <div className="accountant-card p-5 sm:p-6 space-y-4 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-neutral-100 text-neutral-900">
                Phase 1: April 2026
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Mandatory Threshold
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Gross Property Income Over £50,000
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Applies to gross rental turnover (before mortgage interest and property expenses). Landlords must record property transactions digitally and submit four quarterly updates directly to HMRC.
              </p>
            </div>
            <ul className="text-xs text-neutral-700 space-y-1.5 pt-2 border-t border-neutral-100">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quarter 1 Update: Due 5 August</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quarter 2 Update: Due 5 November</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quarter 3 Update: Due 5 February</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quarter 4 Update + Final Declaration: Due 5 May</span>
              </li>
            </ul>
          </div>

          {/* Phase 2: April 2027 */}
          <div className="accountant-card p-5 sm:p-6 space-y-4 border-l-4 border-l-slate-400">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-neutral-100 text-neutral-900">
                Phase 2: April 2027
              </span>
              <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                Secondary Threshold
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Gross Property Income Over £30,000
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Expands the mandatory quarterly digital filing rules to individuals with total gross property or self-employment turnover exceeding £30,000.
              </p>
            </div>
            <div className="p-3.5 rounded bg-emerald-50 text-xs text-emerald-900 space-y-1 border border-emerald-100">
              <span className="font-semibold block">How We Solve It:</span>
              <p className="text-[11px] leading-relaxed">
                You do not need to become an expert in accounting software. We provide you with our mobile dropzone to snap certificates and receipts. We validate the records and submit quarterly filings directly to HMRC on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="accountant-card p-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-neutral-900">
              Unsure if your gross rental income crosses the £50,000 threshold?
            </h4>
            <p className="text-xs text-neutral-600">
              We offer a complimentary 15-minute MTD readiness check for portfolio landlords.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal({ notes: "Requesting MTD for ITSA readiness assessment" })}
            className="touch-target-44 px-4 py-2.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition shrink-0 inline-flex items-center space-x-1.5"
          >
            <span>Request MTD Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
