"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { CheckCircle2, ShieldCheck, Award, Building2 } from "lucide-react";

export default function AboutPracticeSection() {
  const { openIntakeModal } = useDemoStore();

  return (
    <section id="about" className="py-14 sm:py-20 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#a4f4cf] bg-[#a4f4cf]/10 px-3 py-1 rounded-full border border-[#a4f4cf]/20 w-fit font-mono">
            <Award className="w-3.5 h-3.5 text-[#a4f4cf]" />
            <span>ICAEW &amp; CIOT CHARTERED LEADERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            About KP Tax Consultants &amp; Advisory
          </h2>
          <p className="text-xs sm:text-sm text-[#8a9d94] leading-relaxed">
            Led by Kalpesh Patel FCA and Pritpal Chaggar CTA. Providing specialized property tax structuring, Section 24 mitigation, and corporate SPV accounting for UK portfolio landlords.
          </p>
        </div>

        {/* 2-Column Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Partner 1: Kalpesh Patel FCA */}
          <div className="p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Kalpesh Patel BSc (Hons), FCA
                  </h3>
                  <p className="text-xs text-[#a4f4cf] font-mono">
                    Senior Practice Partner &bull; Fellow Chartered Accountant
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] px-2 py-0.5 rounded border border-[#a4f4cf]/20">
                  ICAEW Regulated
                </span>
              </div>
              <p className="text-xs text-[#8a9d94] leading-relaxed">
                Over 20 years advising high-net-worth property investors, family offices, and limited company groups on corporate tax architecture, annual CT600 statutory accounts, and bank compliance.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                  <span>Fellow of the Institute of Chartered Accountants (FCA)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                  <span>Complex commercial refinancing &amp; SPV structuring</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Partner 2: Pritpal Chaggar CTA */}
          <div className="p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Pritpal Chaggar BSc (Hons), ATT, CTA
                  </h3>
                  <p className="text-xs text-[#a4f4cf] font-mono">
                    Head of Property Tax &bull; Chartered Tax Adviser
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] px-2 py-0.5 rounded border border-[#a4f4cf]/20">
                  CIOT Gold Standard
                </span>
              </div>
              <p className="text-xs text-[#8a9d94] leading-relaxed">
                Specialist in UK land and property taxation, Section 24 mortgage interest relief planning, Section 162 Incorporation Relief, and SDLT Multiple Dwellings Relief compliance.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                  <span>Chartered Tax Adviser (CTA) &bull; Highest UK tax accreditation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                  <span>HMRC formal clearance &amp; portfolio restructuring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practice Capabilities Summary Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#a4f4cf] block font-bold">
              DIRECTOR WEALTH EXTRACTION &amp; COMPLIANCE
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white">
              Engineered for UK Portfolio Landlords &amp; Family SPVs
            </h3>
            <p className="text-xs text-[#8a9d94] leading-relaxed">
              We eliminate manual bookkeeping bottlenecks, maximize allowable statutory property expenses, and structure tax-free capital extraction via Director’s Loan Accounts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-6 py-3 rounded-lg font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] transition flex items-center space-x-2 shrink-0 active:scale-95 shadow-sm"
          >
            <span>Book Partner Consultation</span>
            <ShieldCheck className="w-4 h-4 text-[#0c1813]" />
          </button>
        </div>
      </div>
    </section>
  );
}
