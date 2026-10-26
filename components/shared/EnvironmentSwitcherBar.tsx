"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { Globe, Briefcase, Smartphone, Database, CheckCircle2 } from "lucide-react";

export default function EnvironmentSwitcherBar() {
  const { currentMode, currentView, setCurrentView, enterAccountantPortal, enterClientPortal, exitToLanding, metrics } = useDemoStore();

  return (
    <div className="w-full bg-slate-950 text-slate-200 border-b border-slate-800 text-xs px-3 sm:px-6 py-2 sticky top-0 z-[60] shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Status indicator */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-tight text-white uppercase text-[10px] sm:text-xs">
            KP Tax OS Live System
          </span>
          <span className="hidden sm:inline text-slate-500">&bull;</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Supabase London eu-west-2 Active
          </span>
        </div>

        {/* 3 Live Environment Door Switchers */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          {/* Public Acquisition Door */}
          <button
            type="button"
            onClick={exitToLanding}
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition flex items-center space-x-1.5 ${
              currentMode === "landing"
                ? "bg-slate-800 text-white shadow-xs border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>1. Public Practice Portal</span>
          </button>

          {/* Accountant OS Door */}
          <button
            type="button"
            onClick={() => enterAccountantPortal("radar")}
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition flex items-center space-x-1.5 ${
              currentMode === "accountant"
                ? "bg-slate-800 text-white shadow-xs border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Accountant Practice OS</span>
            <span className="hidden lg:inline-flex ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {metrics.missingDocumentsCount} Needed
            </span>
          </button>

          {/* Client Dropzone & Vault Door */}
          <button
            type="button"
            onClick={() => enterClientPortal("dropzone")}
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition flex items-center space-x-1.5 ${
              currentMode === "client"
                ? "bg-slate-800 text-white shadow-xs border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Landlord Dropzone & Vault</span>
            <span className="hidden lg:inline-flex ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live OCR
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
