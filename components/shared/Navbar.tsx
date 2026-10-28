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

  // Control body scroll lock when mobile menu is open
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

  // 1. PUBLIC LANDING PAGE HEADER
  if (currentMode === "landing") {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Practice Branding with Official Logo */}
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
            >
              <img
                src="/logo.png"
                alt="KP Tax Consultants Official Emblem"
                width={140}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="font-extrabold text-neutral-900 text-base sm:text-lg tracking-tight leading-none">
                    KP Accountants
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
            <nav className="hidden lg:flex items-center space-x-6 text-xs sm:text-sm font-medium text-neutral-600 whitespace-nowrap">
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
              {/* Direct WhatsApp Channel for instant lead response */}
              <a
                href="https://wa.me/447861690954?text=Hello%20KP%20Tax%20Consultants,%20I%20would%20like%20to%20enquire%20about%20Section%2024%20and%20property%20tax%20advisory"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition inline-flex items-center space-x-1.5 border border-emerald-200"
                aria-label="Direct WhatsApp Enquiry"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

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

            {/* Mobile / Tablet Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={openLoginModal}
                className="sm:hidden px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-800 bg-neutral-100 border border-neutral-200"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition touch-target-44 flex items-center justify-center"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full-Screen Static Mobile Navigation Drawer (Locked Viewport, No Background Scroll) */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-white flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="flex flex-col space-y-3 text-base font-semibold text-neutral-900">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-1">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => handleScrollTo("specialisms")}
                className="text-left py-2.5 border-b border-neutral-100 hover:text-primary transition flex items-center justify-between"
              >
                <span>Property Specialisms</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("tax-calculator")}
                className="text-left py-2.5 border-b border-neutral-100 hover:text-primary transition flex items-center justify-between"
              >
                <span>Section 24 Calculator</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("mtd-guidance")}
                className="text-left py-2.5 border-b border-neutral-100 hover:text-primary transition flex items-center justify-between"
              >
                <span>MTD 2026 Mandate</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("about-firm")}
                className="text-left py-2.5 border-b border-neutral-100 hover:text-primary transition flex items-center justify-between"
              >
                <span>About Our Firm</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("faqs")}
                className="text-left py-2.5 border-b border-neutral-100 hover:text-primary transition flex items-center justify-between"
              >
                <span>Frequently Asked Questions</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-3">
              <a
                href="https://wa.me/447861690954?text=Hello%20KP%20Tax%20Consultants,%20I%20would%20like%20to%20enquire%20about%20property%20tax%20advisory"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full touch-target-44 btn-tactile py-3 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 text-center flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp (+44 7861 690954)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full touch-target-44 btn-tactile py-3 rounded-lg text-sm font-semibold text-neutral-800 bg-neutral-100 border border-neutral-200 text-center flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-neutral-500" />
                <span>Portal Sign In (Client or Staff)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openIntakeModal();
                }}
                className="w-full touch-target-44 btn-tactile py-3 rounded-lg text-sm font-semibold text-white bg-primary text-center shadow-md flex items-center justify-center space-x-2"
              >
                <span>Book Direct Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-neutral-400 text-center pt-1">
                Chartered Tax Advisers (CTA) &bull; ICAEW Regulated Practice
              </p>
            </div>
          </div>
        )}
      </header>
    );
  }

  // 2. ACCOUNTANT PRACTICE OS HEADER
  if (currentMode === "accountant") {
    const accountantNav: { id: ScreenView; label: string; icon: React.ReactNode }[] = [
      { id: "radar", label: "Partner Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "pipeline", label: "Landlord Pipeline", icon: <Users className="w-4 h-4" /> },
      { id: "open_banking", label: "Open Banking & MTD", icon: <Landmark className="w-4 h-4 text-emerald-600" /> },
      { id: "statements", label: "Statutory Statements", icon: <Scale className="w-4 h-4" /> },
      { id: "invoicing", label: "Practice Invoicing", icon: <PoundSterling className="w-4 h-4" /> },
      { id: "wealth_advisory", label: "Wealth & Estate", icon: <Crown className="w-4 h-4 text-amber-500" /> },
      { id: "workspace", label: "Property Hub", icon: <FolderKanban className="w-4 h-4" /> },
      { id: "chaser", label: "Chaser Engine", icon: <Send className="w-4 h-4" /> },
    ];

    return (
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Header Brand with Official Logo & Mobile Drawer Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={toggleMobileSidebar}
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition touch-target-44 flex items-center justify-center -ml-1"
                aria-label="Toggle Practice OS Menu"
              >
                <Menu className="w-5 h-5 text-neutral-800" />
              </button>
              <img
                src="/logo.png"
                alt="KP Tax Consultants Official Emblem"
                width={140}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-neutral-900 text-sm sm:text-lg">KP Accountants</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wider border border-neutral-200">
                    Practice OS
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium hidden sm:block">Kalpesh Patel FCA &bull; Chartered Accountants &bull; ICAEW Regulated</p>
              </div>
            </div>

            {/* Authenticated Staff Actions */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-100 text-xs border border-neutral-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-neutral-800">{currentUser?.name || "Kalpesh Patel FCA"}</span>
                <span className="text-neutral-400">&bull;</span>
                <span className="text-neutral-500 text-[11px] font-mono">{currentUser?.email || "kalpesh@kptc.co.uk"}</span>
              </div>

              <button
                type="button"
                onClick={logout}
                className="btn-tactile px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition inline-flex items-center space-x-1 sm:space-x-1.5 whitespace-nowrap"
                title="Sign out of practice session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Accountant Subtabs (Visible on Header as Quick Switcher) */}
          <nav className="flex space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs">
            {accountantNav.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "border-primary text-primary font-bold bg-neutral-50"
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
    { id: "client_overview", label: "Overview & Roadmap", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "dropzone", label: "Upload Dropzone", icon: <Smartphone className="w-4 h-4" /> },
    { id: "vault", label: "Document Vault", icon: <FolderLock className="w-4 h-4" /> },
    { id: "client_messages", label: "Advisor Messages", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Header Brand with Official Logo & Mobile Drawer Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition touch-target-44 flex items-center justify-center -ml-1"
              aria-label="Toggle Landlord Portal Menu"
            >
              <Menu className="w-5 h-5 text-neutral-800" />
            </button>
            <img
              src="/logo.png"
              alt="KP Tax Consultants Official Emblem"
              width={140}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain shrink-0"
            />
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-neutral-900 text-sm sm:text-lg">KP Accountants</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-200">
                  Client Portal
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium hidden sm:block">Account: Marcus & Sarah Sterling &bull; Section 24 Review</p>
            </div>
          </div>

          {/* Authenticated Client Actions */}
          <div className="flex items-center space-x-2.5">
            {currentView === "dropzone" && (
              <button
                type="button"
                onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 transition whitespace-nowrap"
              >
                <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
                <span>{mobileFrameEnabled ? "Full Responsive" : "375px Phone Bezel"}</span>
              </button>
            )}

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold">{currentUser?.name || "Marcus Sterling"}</span>
            </div>

            <button
              type="button"
              onClick={logout}
              className="btn-tactile px-3 py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition inline-flex items-center space-x-1.5 whitespace-nowrap"
              title="Sign out of client session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Client Subtabs */}
        <nav className="flex space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs">
          {clientNav.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-emerald-700 text-emerald-800 font-bold bg-emerald-50"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === "dropzone" && metrics.missingDocumentsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
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
