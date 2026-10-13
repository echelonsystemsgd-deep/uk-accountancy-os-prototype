"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { Calculator, ArrowUpRight, Shield, LayoutDashboard } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#070A0F]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-3 py-2 pb-safe">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {currentView === "prospect" ? (
          <>
            <button
              onClick={scrollToCalculator}
              className="flex-1 flex items-center justify-center gap-2 bg-[#111827] border border-[#D4AF37]/30 text-gold-300 font-medium text-xs rounded-xl py-3 px-3 touch-target-48 active:scale-95 transition-all"
            >
              <Calculator className="w-4 h-4 text-gold-400" />
              <span>Instant Fee Quote</span>
            </button>
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs rounded-xl py-3 px-3 shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
            >
              <span>Book Strategy</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>
          </>
        ) : currentView === "portal" ? (
          <>
            <button
              onClick={() => setCurrentView("prospect")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#111827] border border-white/10 text-slate-300 text-xs rounded-xl py-3 px-3 touch-target-48 active:scale-95 transition-all"
            >
              <span>Back to Site</span>
            </button>
            <button
              onClick={() => setCurrentView("admin")}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs rounded-xl py-3 px-3 shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-black" />
              <span>Partner Hub</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentView("portal")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#111827] border border-[#D4AF37]/30 text-gold-300 font-medium text-xs rounded-xl py-3 px-3 touch-target-48 active:scale-95 transition-all"
            >
              <Shield className="w-4 h-4 text-gold-400" />
              <span>Client Dropzone</span>
            </button>
            <button
              onClick={() => setCurrentView("prospect")}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs rounded-xl py-3 px-3 shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
            >
              <span>Prospect View</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
