"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ViewMode } from "@/lib/types";
import { RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

export default function FloatingDemoController() {
  const { currentView, setCurrentView, resetDemoState, demoStateMutationsCount } = useDemoStore();
  const [collapsed, setCollapsed] = useState(false);

  const views: { id: ViewMode; label: string }[] = [
    { id: "prospect", label: "Public Site" },
    { id: "admin", label: "Practice Hub" },
    { id: "portal", label: "Client Portal" },
  ];

  return (
    <aside
      aria-label="Demo Controller"
      className="fixed bottom-20 sm:bottom-5 right-4 z-40 select-none"
    >
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="bg-[#0B0D13] border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.6)] px-3 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-[#EDEDED] flex items-center gap-2 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
            Demo
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
        </button>
      ) : (
        <div className="bg-[#0B0D13] border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.6)] rounded-lg p-1 flex items-center gap-1 backdrop-blur-md">
          {/* View switcher buttons */}
          {views.map((v) => {
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setCurrentView(v.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#1A1F2D] text-[#EDEDED] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/[0.1]"
                    : "text-[#94A3B8] hover:text-[#EDEDED] border border-transparent"
                }`}
              >
                {v.label}
              </button>
            );
          })}

          <div className="w-px h-4 bg-white/10 mx-0.5" />

          {/* Reset Demo State button */}
          <button
            onClick={resetDemoState}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded transition-colors"
            title="Reset demo state"
            aria-label="Reset demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Minimize button */}
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded transition-colors"
            title="Collapse demo bar"
            aria-label="Collapse demo bar"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
}
