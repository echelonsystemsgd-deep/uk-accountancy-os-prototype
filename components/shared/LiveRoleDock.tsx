"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import { Globe, Briefcase, Smartphone, ChevronUp, ChevronDown, Check, Zap } from "lucide-react";

export default function LiveRoleDock() {
  const { currentMode, currentView, setCurrentView, enterAccountantPortal, enterClientPortal, exitToLanding, metrics } = useDemoStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-auto">
      {/* Expanded Subview Quick Selectors */}
      {expanded && (
        <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-xl p-3 shadow-2xl space-y-3 w-72 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Zap className="w-3 h-3 mr-1 text-emerald-400" /> Quick View Navigator
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded text-xs"
            >
              ✕
            </button>
          </div>

          {/* Practice OS Views */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 block uppercase">
              Partner Practice OS
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                onClick={() => { enterAccountantPortal("radar"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "radar" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Radar KPIs
              </button>
              <button
                onClick={() => { enterAccountantPortal("wealth_advisory"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "wealth_advisory" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Wealth & Advisory
              </button>
              <button
                onClick={() => { enterAccountantPortal("pipeline"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "pipeline" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Pipeline CRM
              </button>
              <button
                onClick={() => { enterAccountantPortal("statements"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "statements" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Statements & P&L
              </button>
              <button
                onClick={() => { enterAccountantPortal("invoicing"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "invoicing" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Invoicing & WIP
              </button>
              <button
                onClick={() => { enterAccountantPortal("workspace"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "workspace" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Property Hub
              </button>
              <button
                onClick={() => { enterAccountantPortal("chaser"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "chaser" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Chaser Engine
              </button>
              <button
                onClick={() => { enterAccountantPortal("open_banking"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "open_banking" ? "bg-amber-500/20 text-amber-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Open Banking
              </button>
            </div>
          </div>

          {/* Client Portal Views */}
          <div className="space-y-1 border-t border-slate-800 pt-2">
            <span className="text-[10px] font-bold text-emerald-400 block uppercase">
              Landlord Client Portal
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                onClick={() => { enterClientPortal("dropzone"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "dropzone" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Mobile Dropzone
              </button>
              <button
                onClick={() => { enterClientPortal("vault"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "vault" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Document Vault
              </button>
              <button
                onClick={() => { enterClientPortal("client_overview"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_overview" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Tax Overview
              </button>
              <button
                onClick={() => { enterClientPortal("client_messages"); setExpanded(false); }}
                className={`px-2 py-1.5 rounded text-left transition ${currentView === "client_messages" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
              >
                &bull; Advisor Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating Pill Dock */}
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-full px-2 py-1.5 shadow-2xl flex items-center space-x-1">
        <button
          onClick={exitToLanding}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "landing"
              ? "bg-slate-800 text-white shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
          title="Return to Public Landing Page"
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Public Site</span>
        </button>

        <button
          onClick={() => enterAccountantPortal("radar")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "accountant"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
          title="Switch to Partner Practice OS"
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Practice OS</span>
        </button>

        <button
          onClick={() => enterClientPortal("dropzone")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition ${
            currentMode === "client"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "text-slate-400 hover:text-white"
          }`}
          title="Switch to Landlord Mobile Dropzone"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Landlord Vault</span>
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Toggle Navigation Menu"
        >
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
