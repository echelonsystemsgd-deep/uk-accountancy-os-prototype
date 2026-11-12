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
  Building2,
} from "lucide-react";

export default function MtdGuidanceSection() {
  const { openIntakeModal, enterClientPortal } = useDemoStore();

  return (
    <section id="mtd-guidance" className="py-14 sm:py-20 bg-[#0B0F19] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 w-fit">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>HMRC Statutory Mandate &amp; SPV Transition</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Making Tax Digital &amp; Corporate Restructuring
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            HMRC requires quarterly digital reporting for personal landlords. Meanwhile, incorporating an SPV shields you from Section 24 restrictions and consolidates your filings into one predictable annual CT600 Corporation Tax return.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1: April 2026 */}
          <div className="accountant-card p-6 bg-[#162032] border border-[#1F293D] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Phase 1: April 2026
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                MTD Mandatory
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Gross Rental Turnover Over £50,000
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Applies to gross personal rent before mortgage interest. Requires digital record-keeping and 4 quarterly filings plus year-end declaration to HMRC.
              </p>
            </div>
            <ul className="text-xs text-neutral-300 space-y-2 pt-2 border-t border-neutral-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quarterly digital submissions via HMRC API</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Digital receipt retention and bank feed matching</span>
              </li>
            </ul>
          </div>

          {/* Phase 2: SPV Corporate Alternative */}
          <div className="accountant-card p-6 bg-cardSurface border-2 border-gold/40 rounded-2xl space-y-4 shadow-gold">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold text-obsidian">
                The SPV Alternative
              </span>
              <span className="text-xs font-bold text-gold">
                Corporate Tax Regime
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                SPV Limited Company (Corporation Tax)
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Properties held within an SPV (like SUKHPREET KAUR LEGACY WEALTH LTD) are governed by Corporation Tax. Full mortgage interest is deductible and accounts are filed annually at Companies House & HMRC.
              </p>
            </div>
            <ul className="text-xs text-neutral-300 space-y-2 pt-2 border-t border-neutral-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>100% Mortgage interest allowable against rent</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Tax-free capital extraction via Director’s Loan Account</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
