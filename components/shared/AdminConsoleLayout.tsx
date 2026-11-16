"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const { logout, triggerToast } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/admin/pipeline", label: "Enquiries Pipeline", icon: <Filter className="w-4 h-4" /> },
    { href: "/admin/clients", label: "Clients Directory", icon: <Users className="w-4 h-4" /> },
    { href: "/admin/staff-assignments", label: "Staff Assignments", icon: <UserCheck className="w-4 h-4" /> },
    { href: "/admin/deadlines", label: "Deadlines Board", icon: <Calendar className="w-4 h-4" /> },
    { href: "/admin/reviews", label: "Review Queue", icon: <FileCheck2 className="w-4 h-4" /> },
    { href: "/admin/messages", label: "Inbox Messages", icon: <MessageSquare className="w-4 h-4" /> },
    { href: "/admin/services", label: "Services & Pricing", icon: <Layers className="w-4 h-4" /> },
    { href: "/admin/availability", label: "Calendar Rules", icon: <Calendar className="w-4 h-4" /> },
    { href: "/admin/audit-logs", label: "Audit Trail", icon: <Activity className="w-4 h-4" /> },
    { href: "/admin/settings", label: "Practice Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c1813]/95 backdrop-blur-md border-b border-[#1e382b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/admin/dashboard" className="flex items-center space-x-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold font-mono text-xs">
                KP
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-display font-extrabold text-white text-sm block tracking-tight">
                  KP TAX CONSULTANTS &bull; PARTNER CONSOLE
                </span>
                <span className="text-[10px] text-[#8a9d94] font-mono block">
                  Senior Partners: Kalpesh Patel FCA &bull; Pritpal Chaggar CTA
                </span>
              </div>
            </Link>

            {/* Right CTAs */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => triggerToast("System Optimal", "Audit logs & RLS active.", "info")}
                className="p-2 rounded-lg bg-[#14241d] border border-[#1e382b] text-[#8a9d94] hover:text-white"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>
              <button
                onClick={() => logout()}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#8a9d94] hover:text-white bg-[#14241d] border border-[#1e382b]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 lg:hidden rounded-lg bg-[#14241d] border border-[#1e382b] text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-nav Links (Desktop) */}
        <div className="hidden lg:block border-t border-[#1e382b]/80 bg-[#14241d]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 py-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
                      isActive
                        ? "bg-[#a4f4cf] text-[#0c1813] font-bold shadow-sm"
                        : "text-[#8a9d94] hover:text-white hover:bg-[#1e382b]/40"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-50 lg:hidden bg-[#0c1813]/98 backdrop-blur-md pt-20 px-6 space-y-6 overscroll-contain overflow-y-auto modal-scrollable"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#1e382b] sticky top-0 bg-[#0c1813]/98 z-10 pt-2">
            <span className="font-display font-bold text-white text-base">Partner Admin Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-2.5 font-mono text-xs">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg flex items-center justify-between hover:bg-[#14241d] border border-transparent hover:border-[#1e382b]"
              >
                <div className="flex items-center space-x-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8a9d94]" />
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#1e382b]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full py-2.5 rounded-xl bg-[#14241d] border border-[#1e382b] text-white font-mono text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#1e382b]">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="text-xs sm:text-sm text-[#8a9d94]">
                {pageSubtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2.5">{actions}</div>}
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e382b] bg-[#0c1813] py-6 text-center text-xs text-[#8a9d94] font-mono">
        <p>&copy; 2026 KP Tax Consultants &bull; London &amp; Berkshire Offices &bull; ICAEW Regulated</p>
      </footer>
    </div>
  );
}
