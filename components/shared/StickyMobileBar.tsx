"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ArrowUpRight } from "lucide-react";

export default function StickyMobileBar() {
  const { currentView, setCurrentView, setIsIntakeOpen } = useDemoStore();

  const scrollToCalculator = () => {
    if (currentView !== "prospect") {
      setCurrentView("prospect");
    }
    setTimeout(() => {
      const el = document.getElementById("tax-calculator-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#07080C]/95 backdrop-blur-md border-t border-white/[0.08] px-4 py-3">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {currentView === "prospect" ? (
          <>
            <button
              onClick={scrollToCalculator}
              className="flex-1 bg-[#0E111A] border border-white/[0.08] text-[#94A3B8] hover:text-[#EDEDED] font-medium text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              Fee Calculator
            </button>
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="flex-1 flex items-center justify-center gap-1 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              <span>Book Strategy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : currentView === "portal" ? (
          <>
            <button
              onClick={() => setCurrentView("prospect")}
              className="flex-1 bg-[#0E111A] border border-white/[0.08] text-[#94A3B8] hover:text-[#EDEDED] font-medium text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              Public Site
            </button>
            <button
              onClick={() => setCurrentView("admin")}
              className="flex-1 bg-[#161A26] border border-white/[0.12] text-[#EDEDED] font-semibold text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              Practice Hub
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentView("portal")}
              className="flex-1 bg-[#0E111A] border border-white/[0.08] text-[#94A3B8] hover:text-[#EDEDED] font-medium text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              Client Portal
            </button>
            <button
              onClick={() => setCurrentView("prospect")}
              className="flex-1 bg-[#161A26] border border-white/[0.12] text-[#EDEDED] font-semibold text-xs rounded-lg py-2.5 px-3 transition-colors touch-target-48"
            >
              Public Site
            </button>
          </>
        )}
      </div>
    </div>
  );
}
