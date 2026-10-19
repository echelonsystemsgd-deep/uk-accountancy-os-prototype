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
} from "lucide-react";

export default function Navbar() {
  const {
    currentMode,
    currentView,
    setCurrentView,
    metrics,
    resetDemoState,
    mobileFrameEnabled,
    setMobileFrameEnabled,
    openIntakeModal,
    openLoginModal,
    enterAccountantPortal,
    enterClientPortal,
    exitToLanding,
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

  // 1. PUBLIC LANDING PAGE HEADER
  if (currentMode === "landing") {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Practice Branding */}
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm group-hover:bg-neutral-800 transition">
                KP
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="font-extrabold text-neutral-900 text-base sm:text-lg tracking-tight leading-none">
                    Kai Accountants
                  </span>
                  <span className="text-neutral-300 text-xs">/</span>
                  <span className="text-neutral-600 text-xs sm:text-xs font-semibold">KP Tax</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-medium whitespace-nowrap hidden sm:block">
                  Chartered UK Property Tax Advisers &bull; ICAEW
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links (Single Line, Never Wraps) */}
            <nav className="hidden xl:flex items-center space-x-6 text-xs sm:text-sm font-medium text-neutral-600 whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleScrollTo("specialisms")}
                className="hover:text-primary transition py-1"
              >
                Property Specialisms
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("tax-calculator")}
                className="hover:text-primary transition py-1"
              >
                Section 24 Calculator
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("mtd-guidance")}
                className="hover:text-primary transition py-1"
              >
                MTD 2026 Mandate
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("about-firm")}
                className="hover:text-primary transition py-1"
              >
                About Our Firm
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("faqs")}
                className="hover:text-primary transition py-1"
              >
                FAQs
              </button>
            </nav>

            {/* Right Action CTAs (Single Line, Never Wraps) */}
            <div className="hidden sm:flex items-center space-x-2.5 shrink-0 whitespace-nowrap">
              {/* Login Button with 2 Options */}
              <button
                type="button"
                onClick={openLoginModal}
                className="btn-tactile px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1.5 border border-neutral-200/80 whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Portal Login</span>
              </button>

              <button
                type="button"
                onClick={() => openIntakeModal()}
                className="btn-tactile px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                type="button"
                onClick={openLoginModal}
                className="px-2.5 py-1.5 rounded text-xs font-semibold text-neutral-800 bg-neutral-100"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-600 hover:text-neutral-900"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
            <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-800">
              <button
                type="button"
                onClick={() => handleScrollTo("specialisms")}
                className="text-left py-2 border-b border-neutral-100"
              >
                Property Specialisms
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("tax-calculator")}
                className="text-left py-2 border-b border-neutral-100"
              >
                Section 24 Calculator
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("mtd-guidance")}
                className="text-left py-2 border-b border-neutral-100"
              >
                MTD 2026 Mandate
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("about-firm")}
                className="text-left py-2 border-b border-neutral-100"
              >
                About Our Firm
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("faqs")}
                className="text-left py-2 border-b border-neutral-100"
              >
                FAQs
              </button>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-2.5 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 text-center"
              >
                Portal Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openIntakeModal();
                }}
                className="w-full py-2.5 rounded text-xs font-semibold text-white bg-primary text-center"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // 2. ACCOUNTANT PRACTICE OS HEADER
  if (currentMode === "accountant") {
    const accountantNav: { id: ScreenView; label: string; icon: React.ReactNode }[] = [
      { id: "radar", label: "1. Partner Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "pipeline", label: "2. Landlord Pipeline", icon: <Users className="w-4 h-4" /> },
      { id: "workspace", label: "3. Property Workspace", icon: <FolderKanban className="w-4 h-4" /> },
      { id: "chaser", label: "5. Chaser & Activity Trail", icon: <Send className="w-4 h-4" /> },
    ];

    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Header Brand */}
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
                KP
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-neutral-900 text-base sm:text-lg">Kai Accountants</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wider border border-neutral-200">
                    Practice OS
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium">Partner: Kalpesh Patel FCA &bull; Property Practice Lead</p>
              </div>
            </div>

            {/* Cross-Portal Switcher Actions */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => enterClientPortal("dropzone")}
                className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition inline-flex items-center space-x-1.5"
                title="Switch directly to the Landlord Client Portal view"
              >
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Switch to Client Portal</span>
                <span className="sm:hidden">Client View</span>
              </button>

              <button
                type="button"
                onClick={exitToLanding}
                className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition inline-flex items-center space-x-1.5"
                title="Exit back to the public website"
              >
                <Globe className="w-4 h-4 text-neutral-500" />
                <span className="hidden sm:inline">Public Website</span>
              </button>

              <button
                type="button"
                onClick={resetDemoState}
                className="p-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition"
                title="Reset demo state back to baseline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Accountant Subtabs */}
          <nav className="flex space-x-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs sm:text-sm">
            {accountantNav.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`touch-target-44 flex items-center space-x-2 px-4 py-2.5 font-medium border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "border-primary text-primary font-bold bg-neutral-50/50"
                      : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
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
    { id: "dropzone", label: "4. Upload Dropzone", icon: <Smartphone className="w-4 h-4" /> },
    { id: "vault", label: "Encrypted Document Vault", icon: <FolderLock className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Header Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
              KP
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-neutral-900 text-base sm:text-lg">Kai Accountants</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-200">
                  Client Portal
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">Account: Marcus & Sarah Sterling &bull; Section 24 Review</p>
            </div>
          </div>

          {/* Cross-Portal Switcher Actions */}
          <div className="flex items-center space-x-3">
            {currentView === "dropzone" && (
              <button
                type="button"
                onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 transition"
              >
                <Smartphone className="w-4 h-4 text-neutral-600" />
                <span>{mobileFrameEnabled ? "Full Responsive" : "375px Phone Bezel"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => enterAccountantPortal("radar")}
              className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-semibold text-primary bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition inline-flex items-center space-x-1.5"
              title="Switch directly to the Accountant Practice OS view"
            >
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Switch to Accountant Hub</span>
              <span className="sm:hidden">Staff Hub</span>
            </button>

            <button
              type="button"
              onClick={exitToLanding}
              className="touch-target-44 btn-tactile px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition inline-flex items-center space-x-1.5"
              title="Exit back to the public website"
            >
              <Globe className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Public Website</span>
            </button>

            <button
              type="button"
              onClick={resetDemoState}
              className="p-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition"
              title="Reset demo state back to baseline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Client Subtabs */}
        <nav className="flex space-x-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs sm:text-sm">
          {clientNav.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`touch-target-44 flex items-center space-x-2 px-4 py-2.5 font-medium border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-emerald-700 text-emerald-800 font-bold bg-emerald-50/50"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === "dropzone" && metrics.missingDocumentsCount > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    {metrics.missingDocumentsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
