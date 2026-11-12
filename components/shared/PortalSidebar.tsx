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
  Coins,
  Car,
  FileCheck2,
  Sparkles,
  ChevronDown,
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

  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);

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

  if (currentMode === "landing") return null;

  const isAccountant = currentMode === "accountant";

  const accountantLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "radar", label: "Partner Practice Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "pipeline", label: "Landlord Pipeline", badge: `${clients.length}`, icon: <Users className="w-4 h-4" /> },
    { id: "open_banking", label: "Open Banking & HMRC MTD", badge: "Live Feed", icon: <Landmark className="w-4 h-4 text-emerald-400" /> },
    { id: "statements", label: "Financial Statements & P&L", icon: <Scale className="w-4 h-4" /> },
    { id: "invoicing", label: "Practice Invoicing & WIP", badge: `${invoices.filter((i) => i.status === "awaiting_payment").length} due`, icon: <PoundSterling className="w-4 h-4" /> },
    { id: "wealth_advisory", label: "Wealth & Estate Advisory", badge: "SPV / IHT", icon: <Crown className="w-4 h-4 text-gold" /> },
    { id: "workspace", label: "Property & Owner Hub", icon: <FolderKanban className="w-4 h-4" /> },
    { id: "chaser", label: "Multi-Channel Chaser", badge: `${metrics.missingDocumentsCount} pending`, icon: <Send className="w-4 h-4" /> },
  ];

  const clientLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "client_overview", label: "Portfolio & Tax Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "client_properties", label: "Property Portfolio & Leases", badge: `${activeClient.properties.length}`, icon: <Building2 className="w-4 h-4 text-gold" /> },
    { id: "client_bills", label: "Bills, Outgoings & OCR", badge: `${(activeClient.bills || []).length}`, icon: <Receipt className="w-4 h-4 text-emerald-400" /> },
    { id: "client_dla", label: "Director’s Loan Account", badge: `£${Math.round((activeClient.dlaBalance || 134625) / 1000)}k`, icon: <Coins className="w-4 h-4 text-gold" /> },
    { id: "client_mileage", label: "HMRC Mileage & Travel", icon: <Car className="w-4 h-4" /> },
    { id: "client_tax_optimizer", label: "Tax Shield & Salary Matrix", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { id: "vault", label: "Encrypted Document Vault", badge: `${activeClient.documents.filter((d) => d.status === "verified").length}`, icon: <FolderLock className="w-4 h-4" /> },
    { id: "client_tax_pack", label: "Generate Year-End Tax Pack", badge: "✦ Ready", icon: <FileCheck2 className="w-4 h-4 text-gold" /> },
    { id: "client_messages", label: "Direct Advisor Thread", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const currentLinks = isAccountant ? accountantLinks : clientLinks;

  const SidebarContent = (
    <div className="flex flex-col min-h-full justify-between p-4 space-y-6 text-left pb-16">
      <div className="space-y-5">
        {/* Entity Switcher Card */}
        <div className="p-3 rounded-xl border border-neutral-800 bg-obsidian-400/90 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              {isAccountant ? "Client Entity Context" : "Operating SPV Entity"}
            </span>
            <button
              type="button"
              onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
              className="text-[10px] text-gold hover:text-gold-light flex items-center space-x-1 font-semibold"
            >
              <span>Switch</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div
            onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
            className="cursor-pointer flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-neutral-800/50 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-xs shrink-0 border border-gold/30">
              {activeClient.entityType === "spv_ltd" ? "SPV" : "BTL"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{activeClient.entityName}</h4>
              <p className="text-[10px] text-neutral-400 truncate">
                {activeClient.primaryContact} &bull; {activeClient.taxYear}
              </p>
            </div>
          </div>

          {/* Switcher Dropdown */}
          {isEntityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 p-2 bg-obsidian-500 border border-gold/40 rounded-xl shadow-2xl space-y-1">
              <span className="text-[10px] font-bold text-gold uppercase px-2 py-1 block">
                Available Portfolio Entities
              </span>
              {clients.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedClientId(c.id);
                    setIsEntityDropdownOpen(false);
                  }}
                  className={`w-full p-2 rounded-lg text-left text-xs transition flex items-center justify-between ${
                    c.id === activeClient.id
                      ? "bg-gold/15 text-gold font-bold border border-gold/30"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="block truncate">{c.entityName}</span>
                    <span className="text-[10px] text-neutral-400 block">{c.entityType === "spv_ltd" ? "Corporate SPV" : "Personal Joint"}</span>
                  </div>
                  {c.id === activeClient.id && <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2 block mb-1">
            {isAccountant ? "Practice Console Navigation" : "Investor Workspace"}
          </span>

          {currentLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileSidebarOpen(false);
                }}
                className={`touch-target-44 w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/40 shadow-sm"
                    : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={isActive ? "text-gold" : "text-neutral-400"}>{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      link.badge.includes("✦") || link.badge.includes("k")
                        ? "bg-gold/20 text-gold"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Switcher: Jump between Client & Accountant Mode */}
      <div className="space-y-3 border-t border-neutral-800/80 pt-4">
        <div className="p-3 rounded-xl bg-obsidian-400/90 border border-neutral-800 space-y-2">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            Role Switcher
          </span>
          {isAccountant ? (
            <button
              type="button"
              onClick={() => enterClientPortal("client_overview")}
              className="touch-target-44 w-full py-2 px-3 rounded-lg bg-gold hover:bg-gold-hover text-obsidian text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>Switch to Client Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => enterAccountantPortal("radar")}
              className="touch-target-44 w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition flex items-center justify-center space-x-1.5 border border-neutral-700"
            >
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Partner Practice Console</span>
            </button>
          )}

          <button
            type="button"
            onClick={exitToLanding}
            className="w-full py-1 text-center text-[11px] text-neutral-500 hover:text-neutral-300 transition block"
          >
            &larr; Return to Public Front
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Only active when mobile drawer menu button is toggled) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-obsidian-400 border-r border-neutral-800 h-full overflow-y-auto z-10 flex flex-col justify-between">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold text-gold uppercase tracking-wider">
                Mercian Wealth Suite
              </span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="touch-target-44 p-2 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
