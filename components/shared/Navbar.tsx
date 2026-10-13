"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ViewMode } from "@/lib/types";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const { currentView, setCurrentView, setIsCalendarOpen } = useDemoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewMode; label: string }[] = [
    { id: "prospect", label: "Public Site" },
    { id: "admin", label: "Practice Hub" },
    { id: "portal", label: "Client Portal" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080C]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView("prospect")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0E111A] border border-white/[0.12] flex items-center justify-center text-[#EDEDED] font-semibold text-sm group-hover:border-white/25 transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
              Apex &amp; Co.
            </span>
            <span className="text-[11px] text-[#64748B] font-normal tracking-normal -mt-0.5">
              Chartered Accountants
            </span>
          </div>
        </div>

        {/* Center: Clean Segment Control (Linear / Mercury Style) */}
        <nav className="hidden md:flex items-center bg-[#0B0D13] p-1 rounded-lg border border-white/[0.08]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#161A26] text-[#EDEDED] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/[0.08]"
                    : "text-[#94A3B8] hover:text-[#EDEDED] hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Single Clean Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2 px-4 rounded-lg transition-colors shadow-sm active:scale-95"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0E111A] border border-white/[0.08] text-[#94A3B8] hover:text-[#EDEDED] active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0D13] border-b border-white/[0.08] px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-1">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#161A26] text-[#EDEDED] border border-white/[0.08]"
                      : "text-[#94A3B8] hover:text-[#EDEDED]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-white/[0.06]">
            <button
              onClick={() => {
                setIsCalendarOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
