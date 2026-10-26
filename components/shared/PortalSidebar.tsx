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
} from "lucide-react";

export default function PortalSidebar() {
  const {
    currentMode,
    currentView,
    setCurrentView,
    activeClient,
    clients,
    setSelectedClientId,
    metrics,
    resetDemoState,
    enterAccountantPortal,
    enterClientPortal,
    exitToLanding,
  } = useDemoStore();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Control body scroll lock when mobile drawer is open
  React.useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [mobileDrawerOpen]);

  // If on public landing page, no portal sidebar is needed
  if (currentMode === "landing") return null;

  const isAccountant = currentMode === "accountant";

  const accountantLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "radar", label: "Partner Practice Radar", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "pipeline", label: "Landlord Pipeline", badge: `${clients.length}`, icon: <Users className="w-4 h-4" /> },
    { id: "workspace", label: "Property & Owner Hub", icon: <FolderKanban className="w-4 h-4" /> },
    { id: "chaser", label: "Multi-Channel Chaser", badge: `${metrics.missingDocumentsCount} pending`, icon: <Send className="w-4 h-4" /> },
  ];

  const clientLinks: { id: ScreenView; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: "client_overview", label: "Portfolio & Tax Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "dropzone", label: "Document Dropzone", badge: `${activeClient.documents.filter(d => d.status === "pending").length} needed`, icon: <Smartphone className="w-4 h-4" /> },
    { id: "vault", label: "Encrypted Document Vault", badge: `${activeClient.documents.filter(d => d.status === "verified").length}`, icon: <FolderLock className="w-4 h-4" /> },
    { id: "client_messages", label: "Direct Advisor Thread", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const currentLinks = isAccountant ? accountantLinks : clientLinks;

  const SidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 space-y-6 text-left">
      <div className="space-y-6">
        {/* Portal Profile Card */}
        <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2.5">
          <div className="flex items-center space-x-3">
            {isAccountant ? (
              <img
                src="/team/kalpesh-patel.png"
                alt="Kalpesh Patel FCA"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary shrink-0 shadow-xs"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                MS
              </div>
            )}
            <div className="truncate">
              <span className="font-bold text-xs text-neutral-900 block truncate">
                {isAccountant ? "Kalpesh Patel FCA" : activeClient.primaryContact}
              </span>
              <span className="text-[11px] text-neutral-500 block truncate">
                {isAccountant ? "Partner & CTA Lead" : activeClient.entityName}
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

        {/* Client Selector (Accountant View Only) */}
        {isAccountant && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-600 block uppercase tracking-wider">
              Active Client Portfolio:
            </label>
            <select
              value={activeClient.id}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full text-xs border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 font-medium focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.entityName} ({c.documents.filter((d) => d.status === "pending").length} missing)
                </option>
              ))}
            </select>
          </div>
        )}

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
                    setMobileDrawerOpen(false);
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

        {/* Cross-Portal Switcher Actions */}
        <div className="pt-2 border-t border-neutral-200 space-y-1.5">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1">
            Environment
          </span>

          {isAccountant ? (
            <button
              type="button"
              onClick={() => {
                enterClientPortal("client_overview");
                setMobileDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <div className="flex items-center space-x-2">
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Switch to Client Portal</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                enterAccountantPortal("radar");
                setMobileDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-primary bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Switch to Practice OS</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              exitToLanding();
              setMobileDrawerOpen(false);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Public Website</span>
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
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="touch-target-44 btn-tactile px-4 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow-xl flex items-center space-x-2 border border-neutral-700"
          aria-label="Open portal navigation"
        >
          <Menu className="w-4 h-4" />
          <span>{isAccountant ? "Practice Menu" : "Portal Menu"}</span>
        </button>
      </div>

      {/* 3. Mobile Slide-Over Drawer with Backdrop */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
            <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between">
              <span className="font-bold text-sm text-neutral-900">
                {isAccountant ? "Practice OS Navigation" : "Landlord Portal Navigation"}
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
