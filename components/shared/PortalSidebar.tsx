"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Send,
  Smartphone,
  FolderLock,
  MessageSquare,
  Globe,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Building2,
  FileText,
  Lock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Scale,
  PoundSterling,
  Plus,
  Crown,
  LogOut,
  Landmark,
  Receipt,
} from "lucide-react";

export default function PortalSidebar() {
  const {
    currentMode,
    currentView,
    setCurrentView,
    activeClient,
    clients,
    invoices,
    setSelectedClientId,
    metrics,
    openCreateEntityModal,
    resetDemoState,
    enterAccountantPortal,
    enterClientPortal,
    exitToLanding,
    currentUser,
    logout,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
  } = useDemoStore();

  // Control body scroll lock when mobile drawer is open
  React.useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isMobileSidebarOpen]);

  // If on public landing page, no portal sidebar is needed
  if (currentMode === "landing") return null;

  const isAccountant = currentMode === "accountant";

  const accountantLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "radar", label: "Partner Practice Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "pipeline", label: "Landlord Pipeline", badge: `${clients.length}`, icon: <Users className="w-4 h-4" /> },
    { id: "open_banking", label: "Open Banking & HMRC MTD", badge: "Live Feed", icon: <Landmark className="w-4 h-4 text-emerald-600" /> },
    { id: "statements", label: "Financial Statements & P&L", icon: <Scale className="w-4 h-4" /> },
    { id: "invoicing", label: "Practice Invoicing & WIP", badge: `${invoices.filter(i => i.status === "awaiting_payment").length} due`, icon: <PoundSterling className="w-4 h-4" /> },
    { id: "wealth_advisory", label: "Wealth & Estate Advisory", badge: "IHT / SPV", icon: <Crown className="w-4 h-4 text-amber-500" /> },
    { id: "workspace", label: "Property & Owner Hub", icon: <FolderKanban className="w-4 h-4" /> },
    { id: "chaser", label: "Multi-Channel Chaser", badge: `${metrics.missingDocumentsCount} pending`, icon: <Send className="w-4 h-4" /> },
  ];

  const clientLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "client_overview", label: "Portfolio & Tax Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "client_bills", label: "Bills & Outgoings Hub", badge: `${(activeClient.bills || []).length} logged`, icon: <Receipt className="w-4 h-4 text-emerald-600" /> },
    { id: "dropzone", label: "Document Dropzone", badge: `${activeClient.documents.filter(d => d.status === "pending").length} needed`, icon: <Smartphone className="w-4 h-4" /> },
    { id: "vault", label: "Encrypted Document Vault", badge: `${activeClient.documents.filter(d => d.status === "verified").length}`, icon: <FolderLock className="w-4 h-4" /> },
    { id: "client_messages", label: "Direct Advisor Thread", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const currentLinks = isAccountant ? accountantLinks : clientLinks;

  const SidebarContent = (
    <div className="flex flex-col min-h-full justify-between p-4 space-y-6 text-left pb-12">
      <div className="space-y-6">
        {/* Portal Profile Card */}
        <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2.5">
          <div className="flex items-center space-x-3">
            {isAccountant ? (
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-400/40 shadow-xs">
                {currentUser?.name ? currentUser.name.split(" ").map(n => n[0]).join("") : "KP"}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {(currentUser?.name || activeClient.primaryContact || "LC")
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <div className="truncate">
              <span className="font-bold text-xs text-neutral-900 block truncate">
                {isAccountant ? (currentUser?.name || "Kalpesh Patel FCA") : (currentUser?.name || activeClient.primaryContact)}
              </span>
              <span className="text-[11px] text-neutral-500 block truncate">
                {isAccountant ? "KP Tax Consultants Ltd" : (currentUser?.firmName || activeClient.entityName)}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">Active Mode:</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
              isAccountant ? "bg-primary text-white" : "bg-emerald-100 text-emerald-800"
            }`}>
              {isAccountant ? "Practice OS" : "Client Portal"}
            </span>
          </div>
        </div>

        {/* Client Selector (Available in BOTH Practice OS and Landlord Portal for Prototype Evaluation) */}
        <div className="space-y-2 bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-neutral-700 block uppercase tracking-wider">
              {isAccountant ? "Active Client Portfolio:" : "Switch Portfolio (Prototype):"}
            </label>
            <span className="text-[10px] text-primary font-mono font-medium">
              {clients.length} Portfolios
            </span>
          </div>

          <select
            value={activeClient.id}
            onChange={(e) => {
              const newId = e.target.value;
              setSelectedClientId(newId);
              if (isAccountant) {
                if (currentView === "radar" || currentView === "pipeline") {
                  setCurrentView("workspace");
                }
              } else {
                if (!["client_overview", "dropzone", "vault", "client_messages"].includes(currentView)) {
                  setCurrentView("client_overview");
                }
              }
            }}
            className="w-full text-xs border border-neutral-300 rounded-lg p-2.5 bg-neutral-50/70 text-neutral-900 font-semibold focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition shadow-2xs"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.entityName} — {c.primaryContact}
              </option>
            ))}
          </select>

          {/* Active Portfolio Detail Card (Immediate Visual Feedback on Client Change) */}
          <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80 text-[11px] space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Entity:</span>
              <span className="font-bold text-neutral-900 truncate max-w-[150px]">{activeClient.entityName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Contact:</span>
              <span className="font-semibold text-neutral-800 truncate max-w-[150px]">{activeClient.primaryContact}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Structure:</span>
              <span className="font-semibold text-neutral-700">
                {activeClient.entityType === "spv_ltd" ? "SPV Limited Company" : activeClient.entityType === "joint" ? "Joint Landlords (BTL)" : "Personal / LLP"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Gross Rental:</span>
              <span className="font-bold text-emerald-700">£{activeClient.totalRentalIncome.toLocaleString()} / year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Assigned Lead:</span>
              <span className="font-semibold text-neutral-800">{activeClient.assignedAccountant}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60">
              <span className="text-neutral-500 font-medium">Missing Docs:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeClient.documents.filter(d => d.status === "pending").length > 0
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}>
                {activeClient.documents.filter(d => d.status === "pending").length > 0
                  ? `${activeClient.documents.filter(d => d.status === "pending").length} Needed`
                  : "All Verified (Review Ready)"}
              </span>
            </div>
          </div>

          {/* Quick Context Action Button */}
          {isAccountant ? (
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setCurrentView("workspace")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold border text-center transition ${
                  currentView === "workspace"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Owner Hub
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("statements")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold border text-center transition ${
                  currentView === "statements"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                P&L / CT600
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 pt-1">
              <button
                type="button"
                onClick={() => setCurrentView("client_overview")}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-semibold border text-center transition ${
                  currentView === "client_overview"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("client_bills")}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-semibold border text-center transition ${
                  currentView === "client_bills"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Bills & Spend
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("dropzone")}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-semibold border text-center transition ${
                  currentView === "dropzone"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Dropzone
              </button>
            </div>
          )}

          {/* Quick Creation Trigger (Accountant Mode) */}
          {isAccountant && (
            <button
              type="button"
              onClick={openCreateEntityModal}
              className="w-full mt-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition flex items-center justify-center space-x-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>+ New Client / Invoice / Asset</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1.5">
            {isAccountant ? "Practice Modules" : "Landlord Services"}
          </span>
          <nav className="space-y-1">
            {currentLinks.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? isAccountant
                        ? "bg-primary text-white shadow-xs"
                        : "bg-emerald-700 text-white shadow-xs"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Navigation Actions */}
        <div className="pt-2 border-t border-neutral-200 space-y-1.5">
          <button
            type="button"
            onClick={() => {
              exitToLanding();
              setMobileSidebarOpen(false);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Public Website</span>
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              setMobileSidebarOpen(false);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition border border-red-100"
          >
            <LogOut className="w-3.5 h-3.5 text-red-500" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="pt-4 border-t border-neutral-200 space-y-2 text-[11px] text-neutral-500">
        <div className="flex items-center justify-between text-neutral-600">
          <span className="font-medium">System Status:</span>
          <span className="inline-flex items-center text-emerald-700 font-semibold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
            Live Operational
          </span>
        </div>

        <div className="p-2.5 rounded bg-neutral-100/80 text-[10px] space-y-0.5 border border-neutral-200">
          <div className="flex items-center space-x-1 font-semibold text-neutral-700">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            <span>Supabase Cloud Active</span>
          </div>
          <p className="text-neutral-500">
            London (eu-west-2) &bull; AES-256 RLS
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Permanent Desktop Sidebar (Hidden on Mobile, Visible on lg+) */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-neutral-200 bg-white min-h-[calc(100vh-5rem)] sticky top-20 self-start">
        {SidebarContent}
      </aside>

      {/* 2. Mobile Floating Menu Trigger Button (Visible on screens < lg) */}
      <div className="lg:hidden fixed bottom-5 left-4 z-40">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="touch-target-44 btn-tactile px-4 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow-xl flex items-center space-x-2 border border-neutral-700 active:scale-95 transition-all"
          aria-label="Open portal navigation"
        >
          <Menu className="w-4 h-4" />
          <span>{isAccountant ? "Practice Menu" : "Portal Menu"}</span>
        </button>
      </div>

      {/* 3. Mobile Slide-Over Drawer with Backdrop */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Panel */}
          <div className="relative w-84 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-250">
            <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="KP Tax Consultants Official Emblem"
                  className="h-7 w-auto object-contain shrink-0"
                />
                <span className="font-bold text-xs text-neutral-900 truncate">
                  {isAccountant ? "Practice OS Menu" : "Landlord Portal Menu"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg touch-target-44 flex items-center justify-center"
                aria-label="Close menu drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {SidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
