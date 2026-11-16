"use client";

import React from "react";
import Image from "next/image";
import { useDemoStore } from "@/lib/store";
import { CheckCircle2, ShieldCheck, Award, Building2, ArrowRight, PhoneCall, Calendar } from "lucide-react";

export default function AboutPracticeSection() {
  const { openIntakeModal } = useDemoStore();

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#080B11] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#a4f4cf] bg-[#162032] px-3.5 py-1.5 rounded-full border border-[#1F293D] w-fit font-mono">
            <Award className="w-3.5 h-3.5 text-[#a4f4cf]" />
            <span>ICAEW &amp; CIOT CHARTERED PRACTICE LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            Meet Your Chartered Partners. <br className="hidden sm:inline" />
            <span className="text-[#a4f4cf]">Real advice. Decades of property tax defense.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Led by Kalpesh Patel FCA and Pritpal Chaggar CTA. We specialize in Section 24 mitigation, buy-to-let SPV corporate accounting, and director loan extraction for UK portfolio landlords.
          </p>
        </div>

        {/* 2-Column Partners Grid featuring Real Photos & Tactile Cream Parchment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Partner 1: Kalpesh Patel FCA */}
          <div className="rounded-2xl bg-[#111726] border border-[#1F293D] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-[#a4f4cf]/40 transition-all">
            <div className="space-y-5">
              {/* Partner Portrait & Title */}
              <div className="flex items-start gap-4 border-b border-[#1F293D] pb-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-lg bg-[#080B11] shrink-0">
                  <Image
                    src="/team/kalpesh-patel.png"
                    alt="Kalpesh Patel FCA Senior Partner"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-0.5 text-center">
                    <span className="text-[9px] font-mono text-amber-300 font-bold">FCA</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] px-2.5 py-0.5 rounded border border-[#a4f4cf]/30 inline-block">
                    ICAEW Senior Partner
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                    Kalpesh Patel BSc (Hons), FCA
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Senior Practice Partner &bull; Fellow Chartered Accountant
                  </p>
                </div>
              </div>

              {/* Bio & Credentials */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Over 20 years advising high-net-worth property investors, family offices, and limited company groups on corporate tax architecture, annual CT600 statutory accounts, and bank compliance.
              </p>

              {/* Cream Parchment Accreditations Box */}
              <div className="p-4 rounded-xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] font-mono text-xs space-y-2 shadow-inner">
                <div className="flex justify-between items-center text-[11px] font-bold text-stone-900 border-b border-stone-200 pb-1">
                  <span>PRACTICE CREDENTIALS</span>
                  <span className="text-emerald-800">ICAEW Regulated</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Fellow of the Institute of Chartered Accountants (FCA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Companies House Authorized Electronic Presenter</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openIntakeModal({ notes: "Strategy call request for Kalpesh Patel FCA (CT600 & Corporation Tax)" })}
              className="w-full py-2.5 px-4 rounded-xl bg-[#162032] hover:bg-[#1f2c42] text-white border border-[#1F293D] font-mono font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>Book Strategy Call with Kalpesh Patel</span>
            </button>
          </div>

          {/* Partner 2: Pritpal Chaggar CTA */}
          <div className="rounded-2xl bg-[#111726] border border-[#1F293D] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-[#a4f4cf]/40 transition-all">
            <div className="space-y-5">
              {/* Partner Portrait & Title */}
              <div className="flex items-start gap-4 border-b border-[#1F293D] pb-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#a4f4cf]/40 shadow-lg bg-[#080B11] shrink-0">
                  <Image
                    src="/team/pritpal-chaggar.png"
                    alt="Pritpal Chaggar CTA Head of Property Tax"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-0.5 text-center">
                    <span className="text-[9px] font-mono text-[#a4f4cf] font-bold">CTA</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 px-2.5 py-0.5 rounded border border-amber-400/30 inline-block">
                    CIOT Chartered Tax Adviser
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                    Pritpal Chaggar BSc (Hons), ATT, CTA
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Head of Property Tax &bull; Chartered Tax Adviser
                  </p>
                </div>
              </div>

              {/* Bio & Credentials */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Specialist in UK land and property taxation, Section 24 mortgage interest relief planning, Section 162 Incorporation Relief, and SDLT Multiple Dwellings Relief compliance.
              </p>

              {/* Cream Parchment Accreditations Box */}
              <div className="p-4 rounded-xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] font-mono text-xs space-y-2 shadow-inner">
                <div className="flex justify-between items-center text-[11px] font-bold text-stone-900 border-b border-stone-200 pb-1">
                  <span>PRACTICE CREDENTIALS</span>
                  <span className="text-amber-800">CIOT Gold Standard</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Chartered Tax Adviser (CTA) &bull; Highest UK tax accreditation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>HMRC Formal Clearance &amp; Portfolio Restructuring</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openIntakeModal({ notes: "Strategy call request for Pritpal Chaggar CTA (Section 24 & Property Restructuring)" })}
              className="w-full py-2.5 px-4 rounded-xl bg-[#162032] hover:bg-[#1f2c42] text-white border border-[#1F293D] font-mono font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>Book Strategy Call with Pritpal Chaggar</span>
            </button>
          </div>
        </div>

        {/* Practice Offices & Locations Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111726] border border-[#1F293D] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#a4f4cf] block font-bold">
              OFFICES &bull; CITY OF LONDON &amp; BERKSHIRE
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white">
              Chartered Consultations in London &amp; Across the UK
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Headquartered at 14 New Street, London EC2M 4HE, with our regional advisory office in Berkshire. In-person partner appointments or encrypted video consultations available weekly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-3 rounded-xl font-bold font-mono text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] flex items-center justify-center space-x-2 shrink-0 transition active:scale-95 shadow-md"
          >
            <span>Book Initial Diagnostic (Free)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
