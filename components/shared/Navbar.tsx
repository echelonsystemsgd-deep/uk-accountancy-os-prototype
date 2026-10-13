"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ViewMode } from "@/lib/types";
import {
  ShieldCheck,
  Building2,
  Calendar,
  Menu,
  X,
  LayoutDashboard,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    setIsIntakeOpen,
    missingReceiptsCount,
    unbilledWipAmount,
  } = useDemoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewMode; label: string; badge?: string }[] = [
    { id: "prospect", label: "Client Acquisition" },
    {
      id: "admin",
      label: "Practice Hub",
      badge: missingReceiptsCount > 0 ? `${missingReceiptsCount} alerts` : undefined,
    },
    { id: "portal", label: "Client Portal Dropzone" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070A0F]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all">
      {/* Top micro-bar: Chartered Trust Marks & MTD accreditation */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-[#0B0F17] border-b border-white/5 text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-gold-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            ICAEW & ACCA Chartered Practice
          </span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Making Tax Digital (MTD) HMRC Verified</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">Mayfair & City of London Partner Offices</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono text-[10px]">
            WIP: £{unbilledWipAmount.toLocaleString()} • Missing Receipts: {missingReceiptsCount}
          </span>
          <span className="text-white/20">•</span>
          <a
            href="tel:+442079460192"
            className="text-gold-300 hover:text-white transition-colors"
          >
            +44 (0) 20 7946 0192
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Monogram & Typography */}
        <div
          onClick={() => setCurrentView("prospect")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E2638] via-[#0E131F] to-[#070A0F] border border-[#D4AF37]/40 flex items-center justify-center shadow-gold-subtle group-hover:border-[#D4AF37] transition-all">
            <span className="font-serif-luxury text-xl font-bold text-gold-300 tracking-wider">
              A
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-white tracking-wide group-hover:text-gold-200 transition-colors">
              Apex & Co.
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-medium">
              Chartered Accountants & Advisors
            </span>
          </div>
        </div>

        {/* Center: Module View Switcher Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0B0F17] p-1.5 rounded-full border border-[#D4AF37]/30 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold shadow-gold-subtle"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.id === "admin" && (
                  <LayoutDashboard className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-gold-400"}`} />
                )}
                {item.id === "portal" && (
                  <FileCheck2 className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-gold-400"}`} />
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-black/30 text-black"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Book Consultation CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsIntakeOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#BA9528] text-black font-semibold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-gold-subtle hover:shadow-gold-glow active:scale-95 transition-all touch-target-48"
          >
            <span>Book Strategic Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/30 text-gold-300 touch-target-48 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070A0F]/98 border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400/80 px-2">
              Select Architecture Module
            </span>
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between touch-target-48 active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold"
                      : "bg-[#0B0F17] text-slate-200 border border-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-black/20 text-black"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsIntakeOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#BA9528] text-black font-semibold text-sm py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Strategic Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
