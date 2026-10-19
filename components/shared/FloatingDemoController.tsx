"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import { RotateCcw, ChevronDown, ChevronUp, Layers, Globe, Briefcase, Smartphone } from "lucide-react";

export default function FloatingDemoController() {
  const { currentView, setCurrentView, resetDemoState } = useDemoStore();
  const [collapsed, setCollapsed] = useState(false);

  const viewOptions: { id: ScreenView; label: string; group: string }[] = [
    { id: "landing", label: "Public Site", group: "Acquisition" },
    { id: "radar", label: "1. Radar", group: "Accountant Hub" },
    { id: "pipeline", label: "2. Pipeline", group: "Accountant Hub" },
    { id: "workspace", label: "3. Workspace", group: "Accountant Hub" },
    { id: "chaser", label: "5. Chaser", group: "Accountant Hub" },
    { id: "dropzone", label: "4. Dropzone (375px)", group: "Client Portal" },
    { id: "vault", label: "Client Vault", group: "Client Portal" },
  ];

  return (
    <aside
      aria-label="Demo Controller"
      className="fixed bottom-4 right-4 z-40 select-none hidden sm:block"
    >
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="bg-white border border-neutral-300 shadow-md px-3 py-1.5 rounded-lg text-xs text-neutral-700 hover:text-neutral-900 flex items-center gap-2 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span className="font-semibold text-neutral-800">
            View Switcher
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      ) : (
        <div className="bg-white border border-neutral-300 shadow-xl rounded-lg p-1.5 flex items-center gap-1">
          <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Switch:
          </div>

          {viewOptions.map((v) => {
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setCurrentView(v.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {v.label}
              </button>
            );
          })}

          <div className="w-px h-4 bg-neutral-200 mx-0.5" />

          {/* Reset Demo State button */}
          <button
            type="button"
            onClick={resetDemoState}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors"
            title="Reset demo state back to pristine baseline"
            aria-label="Reset demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Minimize button */}
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
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
