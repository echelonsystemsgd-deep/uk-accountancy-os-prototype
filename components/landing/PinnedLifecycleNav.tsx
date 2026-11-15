"use client";

import React, { useState, useEffect } from "react";

const STAGES = [
  { id: "stage-ingest", number: "01", label: "Bank Ingest" },
  { id: "stage-ocr", number: "02", label: "OCR Match" },
  { id: "stage-vat", number: "03", label: "VAT & S24" },
  { id: "stage-dla", number: "04", label: "DLA Reconcile" },
  { id: "stage-ct600", number: "05", label: "CT600 Engine" },
  { id: "stage-filed", number: "06", label: "HMRC Filed" },
];

export default function PinnedLifecycleNav() {
  const [activeStage, setActiveStage] = useState("stage-ingest");

  return (
    <div className="sticky top-16 z-30 w-full bg-[#0c1813]/95 backdrop-blur-md border-y border-[#1e382b] py-2.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8a9d94] whitespace-nowrap hidden md:inline">
            FROM INGESTION TO HMRC FILING:
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStage(s.id)}
                className={`touch-target-44 px-3 py-1 rounded-full text-xs font-mono tracking-tight whitespace-nowrap transition flex items-center space-x-1.5 ${
                  activeStage === s.id
                    ? "bg-[#a4f4cf] text-[#0c1813] font-bold shadow-sm"
                    : "text-[#8a9d94] hover:text-white hover:bg-[#14241d]"
                }`}
              >
                <span className="text-[10px] opacity-75">{s.number}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-[#a4f4cf] whitespace-nowrap hidden lg:flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a4f4cf] animate-pulse" />
            <span>Audit Trail Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
