"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import {
  Globe,
  LayoutDashboard,
  Users,
  FolderKanban,
  Smartphone,
  Send,
  RotateCcw,
  AlertCircle,
  Building2,
  FileCheck2,
  FolderLock,
  Lock,
  Menu,
  X,
  Briefcase,
  ArrowRight,
  LogOut,
  ExternalLink,
  MessageSquare,
  Phone,
  Scale,
  PoundSterling,
  Plus,
  Crown,
  Landmark,
  Receipt,
  Sparkles,
  Coins,
  ShieldCheck,
  Car,
  Zap,
} from "lucide-react";

export default function Navbar() {
  const {
    currentMode,
    currentView,
    setCurrentView,
    activeClient,
    metrics,
    resetDemoState,
    openIntakeModal,
    openLoginModal,
    enterAccountantPortal,
    enterClientPortal,
    exitToLanding,
    currentUser,
    logout,
    toggleMobileSidebar,
  } = useDemoStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentMode !== "landing") {
      exitToLanding();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [mobileMenuOpen]);

  // 1. PUBLIC LANDING PAGE HEADER (Mercian Wealth Brand Standard)
  if (currentMode === "landing") {
    return (
      <>
        <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#1F293D] shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
              {/* Practice Branding */}
              <div
                onClick={() => exitToLanding()}
                className="flex items-center space-x-3 cursor-pointer group shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0077C8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  MW
                </div>
                <div className="space-y-0 text-left">
                  <div className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                      MERCIAN WEALTH
                    </span>
                    <span className="text-[#38BDF8] text-xs font-semibold">&bull; Tax &amp; Ledger OS</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap hidden sm:block">
                    UK Property SPV Infrastructure &bull; Berkshire, United Kingdom
                  </p>
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-6 text-xs sm:text-sm font-semibold text-slate-300 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleScrollTo("tax-calculator")}
                  className="hover:text-white transition py-1 flex items-center space-x-1"
                >
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>3-Tap Section 24 Scoper</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo("specialisms")}
                  className="hover:text-white transition py-1"
                >
                  SPV Solutions
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo("mtd-guidance")}
                  className="hover:text-white transition py-1"
                >
                  HMRC MTD Roadmap
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo("faqs")}
                  className="hover:text-white transition py-1"
                >
                  HMRC Rules FAQ
                </button>
              </nav>

              {/* Right Action CTAs */}
              <div className="hidden sm:flex items-center space-x-2.5 shrink-0 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => enterAccountantPortal("radar")}
                  className="touch-target-44 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition inline-flex items-center space-x-1.5 border border-slate-700"
                >
                  <Crown className="w-3.5 h-3.5 text-sky-400" />
                  <span>Accountant Console</span>
                </button>

                <button
                  type="button"
                  onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                  className="touch-target-44 px-3.5 py-1.5 rounded-md text-xs font-bold text-white bg-[#0077C8] hover:bg-[#0284C7] transition inline-flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                  <Building2 className="w-3.5 h-3.5 text-white" />
                  <span>SPV Client Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile / Tablet Quick Launch */}
              <div className="flex lg:hidden items-center space-x-2">
                <button
                  type="button"
                  onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                  className="touch-target-44 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#0077C8] shadow-sm"
                >
                  Launch SPV Portal
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="touch-target-44 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-obsidian-500 flex flex-col justify-between animate-in fade-in duration-200 shadow-2xl">
            <div className="h-16 px-4 border-b border-neutral-800 flex items-center justify-between bg-obsidian-400 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center font-crest font-extrabold text-gold text-sm">
                  M
                </div>
                <span className="font-crest font-bold text-white text-sm tracking-wider">
                  MERCIAN WEALTH TAX
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target-44 p-2 text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm font-semibold text-neutral-200">
              <span className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => handleScrollTo("specialisms")}
                className="touch-target-44 w-full text-left py-2.5 border-b border-neutral-800 hover:text-gold transition flex items-center justify-between"
              >
                <span>Property Specialisms</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("tax-calculator")}
                className="touch-target-44 w-full text-left py-2.5 border-b border-neutral-800 hover:text-gold transition flex items-center justify-between"
              >
                <span>Section 24 Calculator</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("mtd-guidance")}
                className="touch-target-44 w-full text-left py-2.5 border-b border-neutral-800 hover:text-gold transition flex items-center justify-between"
              >
                <span>SPV Structuring</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("about-firm")}
                className="touch-target-44 w-full text-left py-2.5 border-b border-neutral-800 hover:text-gold transition flex items-center justify-between"
              >
                <span>About Mercian</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("faqs")}
                className="touch-target-44 w-full text-left py-2.5 border-b border-neutral-800 hover:text-gold transition flex items-center justify-between"
              >
                <span>HMRC FAQs</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </button>

              <div className="pt-6 border-t border-neutral-800 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    enterClientPortal("client_overview", "client-legacy-wealth");
                  }}
                  className="touch-target-44 w-full py-3 rounded-xl text-xs font-bold bg-gold text-obsidian text-center shadow-gold flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Launch Client Portal (Sukhpreet Kaur)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    enterAccountantPortal("radar");
                  }}
                  className="touch-target-44 w-full py-3 rounded-xl text-xs font-bold bg-neutral-800 text-neutral-200 border border-neutral-700 text-center flex items-center justify-center space-x-2"
                >
                  <Crown className="w-4 h-4 text-gold" />
                  <span>Chartered Accountant Console</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // 2. ACCOUNTANT PRACTICE OS HEADER
  if (currentMode === "accountant") {
    const accountantNav: { id: ScreenView; label: string; icon: React.ReactNode }[] = [
      { id: "radar", label: "Partner Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "pipeline", label: "Landlord Pipeline", icon: <Users className="w-4 h-4" /> },
      { id: "open_banking", label: "Open Banking & MTD", icon: <Landmark className="w-4 h-4 text-emerald-400" /> },
      { id: "statements", label: "Statutory Statements", icon: <Scale className="w-4 h-4" /> },
      { id: "invoicing", label: "Practice Invoicing", icon: <PoundSterling className="w-4 h-4" /> },
      { id: "wealth_advisory", label: "Wealth & Estate", icon: <Crown className="w-4 h-4 text-gold" /> },
      { id: "workspace", label: "Property Hub", icon: <FolderKanban className="w-4 h-4" /> },
      { id: "chaser", label: "Chaser Engine", icon: <Send className="w-4 h-4" /> },
    ];

    return (
      <header className="sticky top-0 z-40 bg-obsidian-500/95 backdrop-blur-md border-b border-neutral-800 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={toggleMobileSidebar}
                className="lg:hidden touch-target-44 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition flex items-center justify-center -ml-1"
                aria-label="Toggle Practice Menu"
              >
                <Menu className="w-5 h-5 text-gold" />
              </button>

              <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center font-crest font-extrabold text-gold text-sm shrink-0">
                M
              </div>
              <div className="space-y-0.5 text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-crest font-bold text-white text-sm sm:text-base tracking-wider">
                    MERCIAN WEALTH
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold/15 text-gold uppercase tracking-wider border border-gold/30">
                    Partner Console
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-medium hidden sm:block">
                  Context: <strong className="text-neutral-200">{activeClient.entityName}</strong> &bull; {activeClient.assignedAccountant}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-obsidian-400 text-xs border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-neutral-200">{currentUser?.name || "Kalpesh Patel FCA"}</span>
                <span className="text-neutral-500">&bull;</span>
                <span className="text-neutral-400 text-[11px] font-mono">{currentUser?.email || "kalpesh@kptc.co.uk"}</span>
              </div>

              <button
                type="button"
                onClick={logout}
                className="touch-target-44 px-3 py-1.5 rounded-lg text-xs font-semibold text-ruby bg-ruby/10 hover:bg-ruby/20 border border-ruby/30 transition inline-flex items-center space-x-1.5 whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5 text-ruby" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <nav className="flex space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-neutral-800/80 pt-1 text-xs">
            {accountantNav.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "border-gold text-gold font-bold bg-gold/5"
                      : "border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>
    );
  }

  // 3. DEDICATED CLIENT PORTAL HEADER
  const clientNav: { id: ScreenView; label: string; icon: React.ReactNode }[] = [
    { id: "client_overview", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "client_properties", label: "Properties & Leases", icon: <Building2 className="w-4 h-4 text-gold" /> },
    { id: "client_bills", label: "Bills & OCR", icon: <Receipt className="w-4 h-4 text-emerald-400" /> },
    { id: "client_dla", label: "DLA Ledger", icon: <Coins className="w-4 h-4 text-gold" /> },
    { id: "client_mileage", label: "HMRC Mileage", icon: <Car className="w-4 h-4" /> },
    { id: "client_tax_optimizer", label: "Tax Shield", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { id: "client_tax_pack", label: "Tax Pack", icon: <FileCheck2 className="w-4 h-4 text-gold" /> },
    { id: "vault", label: "Document Vault", icon: <FolderLock className="w-4 h-4" /> },
    { id: "client_messages", label: "Advisor Messages", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0E1526]/95 backdrop-blur-md border-b border-[#1E293D] shadow-sm transition-all">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              onClick={toggleMobileSidebar}
              className="lg:hidden touch-target-44 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition flex items-center justify-center -ml-1"
              aria-label="Toggle Portal Menu"
            >
              <Menu className="w-5 h-5 text-slate-300" />
            </button>

            {/* Institutional Brand Badge */}
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-[#0077C8] text-white flex items-center justify-center font-bold text-xs shrink-0 tracking-tight shadow-sm">
                MT
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">
                  MERCIAN TAX &amp; LEDGER
                </span>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-700 hidden sm:block" />

            {/* Active Legal Entity Switcher / Identity */}
            <div className="space-y-0 text-left">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-xs sm:text-sm tracking-tight truncate max-w-[280px] sm:max-w-md">
                  {activeClient.entityName}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  Co. #14892011 &bull; Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Director: <span className="text-slate-200">{activeClient.primaryContact}</span> &bull; Accounting Period: FY 2024/25 (Ending 31 Mar)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => setCurrentView("client_tax_pack")}
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#0077C8] hover:bg-[#0284C7] text-white transition shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>CT600 Tax Pack</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="touch-target-44 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition inline-flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Client Subtabs (Xero Parity Tab Bar) */}
        <nav className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-slate-800/80 pt-1 text-xs">
          {clientNav.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`touch-target-44 flex items-center space-x-2 px-3.5 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[#0077C8] text-white font-bold bg-[#0077C8]/10"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
