"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Award, Building2, UserCheck, ArrowRight, Crown } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function AboutPracticeSection() {
  const { openIntakeModal, enterClientPortal } = useDemoStore();

  return (
    <section id="about-firm" className="py-14 sm:py-20 bg-[#0B0F19] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Trust Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="accountant-card p-6 bg-[#162032] border border-[#1F293D] rounded-xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#0077C8] text-white flex items-center justify-center font-bold text-sm">
                MW
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                  MERCIAN WEALTH
                </span>
                <h3 className="text-xl font-bold text-white">Digital Infrastructure for UK Accounting</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered in Berkshire, UK. High-performance software infrastructure for property portfolio SPVs, automating Section 24 mitigation, receipt capture, and CT600 statutory preparation.
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F293D] space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-Second Cloud Speed &amp; 100% Asset Ownership</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>HMRC Registered Making Tax Digital Architecture</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated SPV Client Portal &amp; Section 24 Shield</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                ENGINEERED CONVERSION INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built for Speed of Decision, Trust, and Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Mercian Wealth builds autonomous client intake systems, booking engines, and tax platforms. We engineered this platform so portfolio companies like <strong>SUKHPREET KAUR LEGACY WEALTH LTD</strong> operate with institutional precision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-cardSurface border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-gold uppercase block">Senior Partner</span>
                <h4 className="font-bold text-white text-sm">Kalpesh Patel FCA</h4>
                <p className="text-neutral-400">Fellow Chartered Accountant specializing in property SPVs, group restructures, and CT600 Corporation Tax.</p>
              </div>

              <div className="p-4 rounded-xl bg-cardSurface border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-gold uppercase block">Tax Principal</span>
                <h4 className="font-bold text-white text-sm">Pritpal Chaggar CTA</h4>
                <p className="text-neutral-400">Chartered Tax Adviser advising on Section 24 mitigation, Stamp Duty (SDLT), and inheritance tax (IHT) planning.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openIntakeModal()}
                className="touch-target-44 px-5 py-3 rounded-xl font-bold text-xs bg-gold hover:bg-gold-hover text-obsidian shadow-gold transition inline-flex items-center space-x-2 active:scale-95"
              >
                <span>Book Practice Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
