"use client";

import React from "react";
import MobileDropzone from "./MobileDropzone";
import InvoicingHub from "./InvoicingHub";
import PracticeMonetizationBanner from "./PracticeMonetizationBanner";
import { useDemoStore } from "@/lib/store";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function ClientPortal() {
  const { setCurrentView } = useDemoStore();

  return (
    <div className="py-8 sm:py-12 bg-[#07080C] min-h-screen text-[#EDEDED] space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Portal Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                Client Software Portal
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-[#64748B]">Kensington BioTech Ltd (#KB-12849)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight mt-0.5">
              Client Dropzone &amp; Invoicing
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Assigned Partner: <strong className="text-[#EDEDED]">Edward Thorne, FCA</strong> • Next Submission: <span className="text-emerald-400 font-mono">Quarterly VAT (07 Nov)</span>
            </p>
          </div>

          <button
            onClick={() => setCurrentView("admin")}
            className="inline-flex items-center gap-1.5 bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] hover:border-white/20 text-[#EDEDED] text-xs font-medium py-2 px-3.5 rounded-lg transition-colors"
          >
            <span>Switch to Practice Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. Ingestion Dropzone */}
        <MobileDropzone />

        {/* 2. Invoicing Hub */}
        <InvoicingHub />

        {/* 3. Monetization Feature Box */}
        <PracticeMonetizationBanner />

        {/* Portal Footer Credibility */}
        <div className="text-center py-4 border-t border-white/[0.06] text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>End-to-end encrypted client vault session</span>
          <div className="flex items-center gap-1">
            <span>Designed &amp; Engineered by</span>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDEDED] hover:text-[#D4AF37] font-medium underline underline-offset-4 transition-colors inline-flex items-center gap-0.5 ml-1"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
