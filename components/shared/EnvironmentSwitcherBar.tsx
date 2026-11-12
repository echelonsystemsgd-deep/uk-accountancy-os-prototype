"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { Globe, Briefcase, Smartphone, Sparkles, Building2, Crown } from "lucide-react";

export default function EnvironmentSwitcherBar() {
  const { currentMode, enterAccountantPortal, enterClientPortal, exitToLanding, metrics, currentUser } = useDemoStore();

  return (
    <div className="w-full bg-obsidian-400 text-neutral-200 border-b border-neutral-800 text-xs px-3 sm:px-6 py-1.5 sticky top-0 z-[60] shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Status indicator */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          <span className="font-bold tracking-tight text-white uppercase text-[10px] sm:text-xs font-crest">
            MERCIAN WEALTH TAX & LEDGER
          </span>
          <span className="hidden sm:inline text-neutral-600">&bull;</span>
          <span className="hidden sm:inline text-gold text-[11px] font-semibold">
            SUKHPREET KAUR LEGACY WEALTH LTD
          </span>
        </div>

        {/* 3 Live Environment Switchers */}
        <div className="w-full md:w-auto flex items-center space-x-1 sm:space-x-1.5 bg-obsidian-500/90 p-1 rounded-lg border border-neutral-800 overflow-x-auto scrollbar-none">
          {/* Public Acquisition Door */}
          <button
            type="button"
            onClick={exitToLanding}
            className={`touch-target-44 px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition shrink-0 flex items-center space-x-1.5 ${
              currentMode === "landing"
                ? "bg-neutral-800 text-white shadow-xs border border-neutral-700 font-bold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-neutral-300" />
            <span>1. Public Practice</span>
          </button>

          {/* Dedicated SPV Client Portal Door */}
          <button
            type="button"
            onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
            className={`touch-target-44 px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition shrink-0 flex items-center space-x-1.5 ${
              currentMode === "client"
                ? "bg-gold text-obsidian shadow-sm border border-gold font-bold"
                : "text-neutral-400 hover:text-gold hover:bg-neutral-800/50"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>2. Sukhpreet Kaur SPV</span>
            <span className="hidden lg:inline-flex ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-obsidian text-gold border border-gold/40">
              £134k DLA
            </span>
          </button>

          {/* Partner Practice OS Door */}
          <button
            type="button"
            onClick={() => enterAccountantPortal("radar")}
            className={`touch-target-44 px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition shrink-0 flex items-center space-x-1.5 ${
              currentMode === "accountant"
                ? "bg-gold text-obsidian shadow-sm border border-gold font-bold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>3. Partner Practice OS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
