"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function MtdGuidanceSection() {
  const { openIntakeModal } = useDemoStore();

  return (
    <section id="mtd-guidance" className="py-14 sm:py-20 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#a4f4cf] bg-[#a4f4cf]/10 px-3 py-1 rounded-full border border-[#a4f4cf]/20 w-fit font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#a4f4cf]" />
            <span>HMRC Statutory Mandate &amp; SPV Transition</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Making Tax Digital &amp; Corporate Restructuring
          </h2>
          <p className="text-xs sm:text-sm text-[#8a9d94] leading-relaxed">
            HMRC requires quarterly digital reporting for personal landlords. Meanwhile, incorporating an SPV shields you from Section 24 restrictions and consolidates your filings into one predictable annual CT600 Corporation Tax return.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1: April 2026 */}
          <div className="p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20 font-mono">
                Phase 1: April 2026
              </span>
              <span className="text-xs font-semibold text-[#a4f4cf] bg-[#a4f4cf]/10 px-2 py-0.5 rounded border border-[#a4f4cf]/20 font-mono">
                MTD Mandatory
              </span>
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Gross Rental Turnover Over £50,000
              </h3>
              <p className="text-xs text-[#8a9d94] mt-1 leading-relaxed">
                Personal landlords must maintain digital records and file 4 quarterly summary updates to HMRC, plus a final Year-End declaration. Failure to comply triggers points-based penalty surcharges.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#1e382b]">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>Quarterly digital submissions replacing annual Self-Assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>Digital linking mandatory (spreadsheets require bridging software)</span>
              </li>
            </ul>
          </div>

          {/* Phase 2: April 2027 */}
          <div className="p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20 font-mono">
                Phase 2: April 2027
              </span>
              <span className="text-xs font-semibold text-[#8a9d94] bg-[#1e382b] px-2 py-0.5 rounded font-mono">
                Secondary Threshold
              </span>
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Gross Rental Turnover £30,000 to £50,000
              </h3>
              <p className="text-xs text-[#8a9d94] mt-1 leading-relaxed">
                The threshold lowers to bring medium-sized landlords into mandatory digital compliance. Manual book-keeping or paper receipts become non-compliant under HMRC audit scrutiny.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#1e382b]">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>All UK residential rental properties encompassed</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>Sub-contractor and agency invoice retention strictly digital</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate SPV Exemption Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#a4f4cf]">
              <ShieldCheck className="w-4 h-4 text-[#a4f4cf]" />
              <span className="font-bold">THE STATUTORY SPV ADVANTAGE</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white">
              Limited Companies Are Exempt from MTD for ITSA
            </h3>
            <p className="text-xs text-[#8a9d94] leading-relaxed">
              Properties held within an SPV Limited Company file under Corporation Tax (CT600), bypassing the 4x annual reporting requirement while securing 100% mortgage interest deductibility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-2.5 rounded-lg font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] transition flex items-center space-x-2 shrink-0 active:scale-95 shadow-sm"
          >
            <span>Plan SPV Incorporation</span>
            <ArrowRight className="w-4 h-4 text-[#0c1813]" />
          </button>
        </div>
      </div>
    </section>
  );
}
