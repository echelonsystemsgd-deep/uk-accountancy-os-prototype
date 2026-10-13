"use client";

import React from "react";
import PartnerMetrics from "./PartnerMetrics";
import ClientPipeline from "./ClientPipeline";
import MissingDocRadar from "./MissingDocRadar";
import { useDemoStore } from "@/lib/store";
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Download,
  Calendar,
} from "lucide-react";

export default function AdminHub() {
  const { setCurrentView, setIsIntakeOpen } = useDemoStore();

  return (
    <div className="py-8 sm:py-12 bg-[#070A0F] min-h-screen text-white space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-[#111827] px-2.5 py-0.5 rounded-full border border-white/5">
                Practice Management Hub
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-slate-400">Partner Admin Command Center</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Executive Partner Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time practice oversight across statutory pipelines, VAT filing deadlines, unbilled WIP, and automated missing document chasers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="inline-flex items-center gap-2 bg-[#111827] hover:bg-[#1A2338] border border-white/10 hover:border-[#D4AF37]/50 text-slate-200 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all touch-target-48 active:scale-95"
            >
              <span>Simulate New Intake Lead</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            </button>

            <button
              onClick={() => setCurrentView("portal")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black text-xs font-semibold py-2.5 px-4 rounded-xl shadow-gold-subtle hover:brightness-110 transition-all touch-target-48 active:scale-95"
            >
              <span>Test Client Dropzone</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>

        {/* Live KPI Cards */}
        <PartnerMetrics />

        {/* Missing Document Radar */}
        <MissingDocRadar />

        {/* Client Pipeline (Kanban / Table) */}
        <ClientPipeline />
      </div>
    </div>
  );
}
