"use client";

import React from "react";
import MobileDropzone from "./MobileDropzone";
import InvoicingHub from "./InvoicingHub";
import PracticeMonetizationBanner from "./PracticeMonetizationBanner";
import { useDemoStore } from "@/lib/store";
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  CreditCard,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ClientPortal() {
  const { setCurrentView } = useDemoStore();

  return (
    <div className="py-8 sm:py-12 bg-[#070A0F] min-h-screen text-white space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Portal Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-[#111827] px-2.5 py-0.5 rounded-full border border-white/5">
                Client Software Portal
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-slate-300">PracticeOS Dropzone &amp; Billing</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Kensington BioTech Ltd
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Active Client ID: <span className="font-mono text-gold-300">#KB-12849</span> • Assigned Partner: <span className="text-white font-medium">Edward Thorne, FCA</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-xs">
              <span className="text-slate-400 block text-[10px]">Next HMRC Submission</span>
              <span className="font-semibold text-emerald-400">Quarterly VAT (07 Nov)</span>
            </div>

            <button
              onClick={() => setCurrentView("admin")}
              className="inline-flex items-center gap-2 bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-gold-300 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all touch-target-48 active:scale-95"
            >
              <span>Switch to Partner Admin Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Mobile-First Client Dropzone */}
        <MobileDropzone />

        {/* 2. Invoicing & Stripe Payment Hub */}
        <InvoicingHub />

        {/* 3. Commercial Practice Monetization Callout Banner */}
        <PracticeMonetizationBanner />

        {/* Portal Login Screen & Credibility Credit */}
        <div className="text-center py-4 border-t border-white/5 text-xs text-slate-400 space-y-1">
          <p>
            Client Session Authenticated via Bank-Grade Biometrics &amp; 2FA • Session ID: #SEC-98402
          </p>
          <div className="pt-2">
            <span className="text-slate-400">Designed &amp; Engineered by </span>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 hover:text-white font-medium underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-300 transition-all inline-flex items-center gap-1"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-3 h-3 text-gold-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
