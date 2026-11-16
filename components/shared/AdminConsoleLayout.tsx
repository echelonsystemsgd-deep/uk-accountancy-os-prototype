"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo } from "@/lib/store";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import ToastContainer from "@/components/shared/ToastContainer";
import {
  LayoutDashboard,
  Users,
  Filter,
  UserCheck,
  Calendar,
  FileCheck2,
  FolderOpen,
  MessageSquare,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Activity,
  Layers,
  ChevronRight,
  Search,
  Plus,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface AdminConsoleLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminConsoleLayout({
  children,
  pageTitle,
  pageSubtitle,
  actions,
}: AdminConsoleLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, triggerToast, currentStaffPerspective, setCurrentStaffPerspective } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    triggerToast("Session Ended", "You have been logged out securely.", "info");
    router.push("/");
  };

  const navCategories = [
    {
      group: "Control Center",
      items: [
        { href: "/admin/dashboard", label: "Command Center", icon: <LayoutDashboard className="w-4 h-4" /> },
        { href: "/admin/pipeline", label: "Enquiries Pipeline", icon: <Filter className="w-4 h-4" /> },
        { href: "/admin/clients", label: "Clients Directory", icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      group: "Compliance & Filings",
      items: [
        { href: "/admin/deadlines", label: "Deadlines Board", icon: <Calendar className="w-4 h-4" /> },
        { href: "/admin/reviews", label: "Review Queue", icon: <FileCheck2 className="w-4 h-4" /> },
      ],
    },
    {
      group: "Communications",
      items: [
        { href: "/admin/messages", label: "Messages Inbox", icon: <MessageSquare className="w-4 h-4" /> },
        { href: "/admin/availability", label: "Calendar Rules", icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      group: "Practice Management",
      items: [
        { href: "/admin/staff-assignments", label: "Staff Assignments", icon: <UserCheck className="w-4 h-4" /> },
        { href: "/admin/services", label: "Services & Pricing", icon: <Layers className="w-4 h-4" /> },
        { href: "/admin/audit-logs", label: "Audit Trail", icon: <Activity className="w-4 h-4" /> },
        { href: "/admin/settings", label: "Practice Settings", icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />

      {/* Desktop Fixed Left Sidebar (256px / w-64) */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#0B0F19] border-r border-[#1F293D] z-30">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#1F293D] flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-[#a4f4cf] text-[#080B11] flex items-center justify-center font-bold font-mono text-xs shadow-sm">
              KP
            </div>
            <div className="text-left">
              <span className="font-display font-extrabold text-white text-xs block tracking-tight uppercase">
                KP Tax Consultants
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                Partner Console · ICAEW
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">
          {navCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                {cat.group}
              </div>
              <div className="space-y-0.5">
                {cat.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                        isActive
                          ? "bg-[#162032] text-[#a4f4cf] border border-[#1F293D] font-bold shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-[#162032]/50"
                      }`}
                    >
                      <span className={isActive ? "text-[#a4f4cf]" : "text-slate-500"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Practice Partner Profile Footer */}
        <div className="p-3 border-t border-[#1F293D] bg-[#080B11]/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#111726] border border-[#1F293D]">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
                KP
              </div>
              <div className="text-left min-w-0 truncate">
                <span className="text-xs font-bold text-white block truncate">
                  Kalpesh Patel FCA
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  Senior Equity Partner
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-[#162032] transition shrink-0"
              title="Log Out to Homepage"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container Wrapper (Offset 64 on Desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-[#080B11]/90 backdrop-blur-md border-b border-[#1F293D] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile Brand & Hamburger */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-[#111726] border border-[#1F293D] text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-[#a4f4cf] text-[#080B11] flex items-center justify-center font-bold text-xs">
              KP
            </div>
            <span className="font-bold text-xs text-white">PARTNER CONSOLE</span>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SPVs, CRNs, nominal codes (⌘K)..."
                className="w-full pl-9 pr-8 py-1.5 bg-[#111726] border border-[#1F293D] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a4f4cf] font-mono transition"
              />
              <span className="text-[10px] font-mono text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 border border-[#1F293D] px-1 py-0.2 rounded bg-[#080B11]">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Header Status & Actions */}
          <div className="flex items-center space-x-3">
            {/* Staff / Partner Perspective Switcher */}
            <div className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#111726] border border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-500">Perspective:</span>
              <select
                value={currentStaffPerspective || "all"}
                onChange={(e) => {
                  const val = e.target.value === "all" ? null : e.target.value;
                  setCurrentStaffPerspective(val);
                  triggerToast(
                    val ? `Staff Filter: ${val}` : "Partner Console",
                    val ? `Displaying clients assigned to ${val}.` : "Showing all practice client portfolios.",
                    "info"
                  );
                }}
                className="bg-transparent text-[#a4f4cf] focus:outline-none font-bold cursor-pointer"
              >
                <option value="all" className="bg-[#0B0F19] text-white">Partner (All SPVs)</option>
                <option value="Pritpal Chaggar CTA" className="bg-[#0B0F19] text-[#a4f4cf]">Staff: Pritpal CTA</option>
                <option value="Simran Kaur ACA" className="bg-[#0B0F19] text-[#a4f4cf]">Staff: Simran ACA</option>
                <option value="Kalpesh Patel FCA" className="bg-[#0B0F19] text-[#a4f4cf]">Staff: Kalpesh FCA</option>
              </select>
            </div>

            {/* Live Status Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#111726] border border-[#1F293D] text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>HMRC MTD Gateway Active</span>
            </div>

            {/* Notifications */}
            <button
              onClick={() => triggerToast("System Health 100%", "All client tax records synced with Companies House.", "info")}
              className="p-2 rounded-xl bg-[#111726] border border-[#1F293D] text-slate-400 hover:text-white transition"
              aria-label="System Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Quick Action: New Entity */}
            <Link
              href="/admin/pipeline"
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] font-mono font-bold text-xs transition shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New SPV Lead</span>
            </Link>

            {/* Desktop Log Out */}
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#111726] border border-[#1F293D] text-xs font-mono text-slate-400 hover:text-white transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex"
        >
          <div className="w-72 bg-[#0B0F19] border-r border-[#1F293D] h-full flex flex-col p-4 space-y-6 overflow-y-auto modal-scrollable">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#a4f4cf] text-[#080B11] flex items-center justify-center font-bold text-xs font-mono">
                  KP
                </div>
                <span className="font-bold text-sm text-white">PARTNER CONSOLE</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-[#111726] border border-[#1F293D] text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5 flex-1">
              {navCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    {cat.group}
                  </div>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-mono ${
                          pathname === item.href
                            ? "bg-[#162032] text-[#a4f4cf] font-bold border border-[#1F293D]"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1F293D]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out to Website</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
