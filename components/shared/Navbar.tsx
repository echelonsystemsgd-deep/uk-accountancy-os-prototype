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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Practice Branding */}
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold text-sm tracking-wide">
                KP
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-neutral-900 text-base sm:text-lg tracking-tight">
                    Kai Accountants
                  </span>
                  <span className="text-neutral-400 text-xs">/</span>
                  <span className="text-neutral-600 text-xs font-semibold">KP Tax Consultants</span>
                </div>
                <p className="text-xs text-neutral-500 font-medium">
                  Chartered UK Property Tax Advisers
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium text-neutral-600">
              <button
                type="button"
                onClick={() => handleScrollTo("specialisms")}
                className="hover:text-neutral-900 transition"
              >
                Property Specialisms
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("tax-calculator")}
                className="hover:text-neutral-900 transition"
              >
                Section 24 Calculator
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("mtd-guidance")}
                className="hover:text-neutral-900 transition"
              >
                MTD 2026 Mandate
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("about-firm")}
                className="hover:text-neutral-900 transition"
              >
                About Our Firm
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("faqs")}
                className="hover:text-neutral-900 transition"
              >
                FAQs
              </button>
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Login Button with 2 Options */}
              <button
                type="button"
                onClick={openLoginModal}
                className="touch-target-44 px-3.5 py-2 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Portal Login</span>
              </button>

              <button
                type="button"
                onClick={() => openIntakeModal()}
                className="touch-target-44 px-4 py-2 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1 shadow-sm"
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
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Header Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
                KP
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-neutral-900 text-sm">Kai Accountants</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wider">
                    Practice OS
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Partner: Kalpesh Patel FCA</p>
              </div>
            </div>

            {/* Cross-Portal Switcher Actions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => enterClientPortal("dropzone")}
                className="touch-target-44 px-3 py-1.5 rounded text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition inline-flex items-center space-x-1.5"
                title="Switch directly to the Landlord Client Portal view"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Switch to Client Portal</span>
                <span className="sm:hidden">Client</span>
              </button>

              <button
                type="button"
                onClick={exitToLanding}
                className="touch-target-44 px-3 py-1.5 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1"
                title="Exit back to the public website"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden sm:inline">Public Site</span>
              </button>

              <button
                type="button"
                onClick={resetDemoState}
                className="p-2 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition"
                title="Reset demo state back to baseline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Accountant Subtabs */}
          <nav className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs">
            {accountantNav.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
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
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Header Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
              KP
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-neutral-900 text-sm">Kai Accountants</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Client Portal
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">Account: Marcus & Sarah Sterling</p>
            </div>
          </div>

          {/* Cross-Portal Switcher Actions */}
          <div className="flex items-center space-x-2">
            {currentView === "dropzone" && (
              <button
                type="button"
                onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
                className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
                <span>{mobileFrameEnabled ? "Full View" : "375px Phone Frame"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => enterAccountantPortal("radar")}
              className="touch-target-44 px-3 py-1.5 rounded text-xs font-semibold text-primary bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1.5"
              title="Switch directly to the Accountant Practice OS view"
            >
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Switch to Accountant Hub</span>
              <span className="sm:hidden">Staff</span>
            </button>

            <button
              type="button"
              onClick={exitToLanding}
              className="touch-target-44 px-3 py-1.5 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1"
              title="Exit back to the public website"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            <button
              type="button"
              onClick={resetDemoState}
              className="p-2 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition"
              title="Reset demo state back to baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Client Subtabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs">
          {clientNav.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-emerald-700 text-emerald-800 font-bold"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === "dropzone" && metrics.missingDocumentsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
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
