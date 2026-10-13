"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ViewMode } from "@/lib/types";
import { Globe, Shield, RefreshCw, LayoutDashboard, ChevronUp, ChevronDown, Sparkles } from "lucide-react";

export default function FloatingDemoController() {
  const { currentView, setCurrentView, resetDemoState, demoStateMutationsCount } = useDemoStore();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const views: { id: ViewMode; label: string; shortLabel: string; icon: any; badge?: string }[] = [
    { id: "prospect", label: "Prospect View (Front-End)", shortLabel: "Prospect", icon: Globe },
    { id: "portal", label: "Client Portal (Dropzone)", shortLabel: "Client Portal", icon: Shield, badge: "Dropzone" },
    { id: "admin", label: "Partner Admin (Command)", shortLabel: "Partner Admin", icon: LayoutDashboard, badge: "Live KPIs" },
  ];

  return (
    <aside aria-label="Demo Controller" className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Expanded Pill Box */}
      {isExpanded ? (
        <div className="bg-[#0B0F17]/95 border border-[#D4AF37]/50 shadow-gold-pill rounded-2xl p-2.5 backdrop-blur-xl flex flex-col gap-2 max-w-[340px] sm:max-w-none text-white animate-in fade-in slide-in-from-bottom-2">
          {/* Header row */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-white/10 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-300">
                Live Sales Demo Controller
              </span>
              {demoStateMutationsCount > 0 && (
                <span className="bg-[#D4AF37]/20 text-gold-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                  {demoStateMutationsCount} synced
                </span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              title="Minimize controller"
              aria-label="Minimize demo controller"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Toggle Buttons */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
            {views.map((v) => {
              const Icon = v.icon;
              const isActive = currentView === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setCurrentView(v.id)}
                  className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 touch-target-48 active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-b from-[#D4AF37] to-[#B89628] text-black shadow-gold-subtle font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  title={v.label}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-black" : "text-gold-400"}`} />
                  <span className="text-[11px] leading-tight text-center whitespace-nowrap">
                    {v.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controller Footer: Reset Demo State */}
          <div className="flex items-center justify-between pt-1 px-1">
            <button
              onClick={resetDemoState}
              className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-gold-300 transition-colors py-1.5 px-2 rounded-lg hover:bg-white/5 active:scale-95 touch-target-48 sm:touch-target-auto"
              title="Reset metrics and client state to pristine demo baseline"
            >
              <RefreshCw className="w-3 h-3 text-gold-400" />
              <span>Reset Demo State</span>
            </button>

            <span className="text-[10px] text-slate-400 hidden sm:inline">
              £495–£7.5k OS Demo
            </span>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Pill */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 bg-[#0B0F17]/95 border border-[#D4AF37]/60 hover:border-[#D4AF37] shadow-gold-pill rounded-full py-2 px-3.5 backdrop-blur-xl text-white active:scale-95 transition-all group touch-target-48"
          aria-label="Open sales demo controller"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs font-semibold text-gold-300">
            Demo Controller:{" "}
            <span className="text-white capitalize">{currentView}</span>
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      )}
    </aside>
  );
}
