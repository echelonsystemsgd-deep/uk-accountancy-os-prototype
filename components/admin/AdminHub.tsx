"use client";

import React from "react";
import PartnerMetrics from "./PartnerMetrics";
import PracticeCharts from "./PracticeCharts";
import ClientPipeline from "./ClientPipeline";
import MissingDocRadar from "./MissingDocRadar";
import { useDemoStore } from "@/lib/store";
import { ArrowRight, Plus } from "lucide-react";

export default function AdminHub() {
  const { setCurrentView, setIsIntakeOpen } = useDemoStore();

  return (
    <div className="py-8 sm:py-12 bg-[#07080C] min-h-screen text-[#EDEDED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Module Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                Practice Management Hub
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight mt-0.5">
              Practice Dashboard
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xl">
              Partner oversight across client onboarding, statutory VAT deadlines, unbilled WIP, and document compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] hover:border-white/20 text-[#EDEDED] text-xs font-medium py-2 px-3.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Lead</span>
            </button>

            <button
              onClick={() => setCurrentView("portal")}
              className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black text-xs font-semibold py-2 px-3.5 rounded-lg transition-colors shadow-sm"
            >
              <span>Test Client Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Live KPI Metrics */}
        <PartnerMetrics />

        {/* 2. Interactive Charts (Linear/Tremor Style) */}
        <PracticeCharts />

        {/* 3. Document Ingestion & Compliance */}
        <MissingDocRadar />

        {/* 4. Client Pipeline & Ingestion Table */}
        <ClientPipeline />
      </div>
    </div>
  );
}
