"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import { Globe, Briefcase, Smartphone, ChevronUp, ChevronDown, Check, Zap, Crown, Building2 } from "lucide-react";

export default function LiveRoleDock() {
  const { currentMode, currentView, setCurrentView, enterAccountantPortal, enterClientPortal, exitToLanding, metrics } = useDemoStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-14 md:bottom-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-auto">
      {/* Expanded Subview Quick Selectors */}
      {expanded && (
        <div className="bg-obsidian-400/95 backdrop-blur-md text-white border border-gold/40 rounded-2xl p-4 shadow-gold space-y-3.5 w-80 animate-in fade-in slide-in-from-bottom-2 duration-150 text-left">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-gold" /> Quick Navigator
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="touch-target-44 text-neutral-400 hover:text-white p-1 rounded text-xs"
            >
              ✕
            </button>
          </div>

          {/* Client Portal Views */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wider flex items-center space-x-1">
              <Building2 className="w-3 h-3" />
              <span>Sukhpreet Kaur SPV Portal</span>
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                onClick={() => { enterClientPortal("client_overview", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_overview" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Dashboard
              </button>
              <button
                onClick={() => { enterClientPortal("client_properties", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_properties" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Properties
              </button>
              <button
                onClick={() => { enterClientPortal("client_bills", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_bills" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Bills & OCR
              </button>
              <button
                onClick={() => { enterClientPortal("client_dla", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_dla" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; DLA Ledger
              </button>
              <button
                onClick={() => { enterClientPortal("client_tax_pack", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_tax_pack" ? "bg-gold/20 text-gold font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; ✦ Tax Pack
              </button>
              <button
                onClick={() => { enterClientPortal("client_tax_optimizer", "client-legacy-wealth"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_tax_optimizer" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Tax Shield
              </button>
            </div>
          </div>

          {/* Practice OS Views */}
          <div className="space-y-1.5 border-t border-neutral-800 pt-2">
            <span className="text-[10px] font-bold text-gold block uppercase tracking-wider flex items-center space-x-1">
              <Crown className="w-3 h-3" />
              <span>Partner Practice Console</span>
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                onClick={() => { enterAccountantPortal("radar"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "radar" ? "bg-gold/20 text-gold font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Radar KPIs
              </button>
              <button
                onClick={() => { enterAccountantPortal("pipeline"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "pipeline" ? "bg-gold/20 text-gold font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Multi-Entity CRM
              </button>
              <button
                onClick={() => { enterAccountantPortal("statements"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "statements" ? "bg-gold/20 text-gold font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Statements & P&L
              </button>
              <button
                onClick={() => { enterAccountantPortal("open_banking"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "open_banking" ? "bg-gold/20 text-gold font-bold" : "hover:bg-neutral-800 text-neutral-300"}`}
              >
                &bull; Bank Feed Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Pill */}
      <div className="flex items-center space-x-1 bg-obsidian-400/90 backdrop-blur-md border border-gold/40 p-1.5 rounded-full shadow-gold">
        <button
          onClick={() => exitToLanding()}
          className={`touch-target-44 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "landing" ? "bg-neutral-800 text-white font-bold" : "text-neutral-400 hover:text-white"
          }`}
          title="Return to Public Marketing Front"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Public Front</span>
        </button>

        <button
          onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
          className={`touch-target-44 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "client" ? "bg-gold text-obsidian font-bold shadow-sm" : "text-neutral-400 hover:text-white"
          }`}
          title="Switch to Client SPV Portal"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Client SPV</span>
        </button>

        <button
          onClick={() => enterAccountantPortal("radar")}
          className={`touch-target-44 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "accountant" ? "bg-gold text-obsidian font-bold shadow-sm" : "text-neutral-400 hover:text-white"
          }`}
          title="Switch to Chartered Accountant Practice Cockpit"
        >
          <Crown className="w-3.5 h-3.5" />
          <span>Accountant</span>
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="touch-target-44 p-1.5 rounded-full text-neutral-400 hover:text-gold transition"
          aria-label="Expand quick navigator"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
