"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo } from "@/lib/store";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import ToastContainer from "@/components/shared/ToastContainer";
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  MessageSquare,
  Clock,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Bell,
  ArrowUpRight,
} from "lucide-react";

interface ClientPortalLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  actions?: React.ReactNode;
}

export default function ClientPortalLayout({
  children,
  pageTitle,
  pageSubtitle,
  actions,
}: ClientPortalLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, triggerToast, activeClient } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const assignedRaw = activeClient?.assignedAccountant || "Pritpal Chaggar CTA";
  const parts = assignedRaw.split(" ");
  const designation = parts.length > 1 ? parts[parts.length - 1] : "CTA";
  const accountantName = parts.length > 1 ? parts.slice(0, parts.length - 1).join(" ") : assignedRaw;
  const accountantInitials = parts.slice(0, 2).map((p: string) => p[0]).join("") || "PC";

  const handleLogout = () => {
    logout();
    triggerToast("Session Ended", "You have been logged out securely.", "info");
    router.push("/");
  };

  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { href: "/portal/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/portal/deadlines", label: "Deadlines & Tasks", icon: <Calendar className="w-4 h-4" /> },
    { href: "/portal/documents", label: "Documents & Vault", icon: <FolderOpen className="w-4 h-4" /> },
    { href: "/portal/messages", label: "Accountant Messages", icon: <MessageSquare className="w-4 h-4" /> },
    { href: "/portal/bookings", label: "Appointments", icon: <Clock className="w-4 h-4" /> },
    { href: "/portal/invoices", label: "Invoices (Ref)", icon: <FileText className="w-4 h-4" /> },
    { href: "/portal/profile", label: "Profile & Security", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c1813]/95 backdrop-blur-md border-b border-[#1e382b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/portal/dashboard" className="flex items-center space-x-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold font-mono text-xs">
                MW
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-display font-extrabold text-white text-sm block tracking-tight">
                  MERCIAN &bull; CLIENT PORTAL
                </span>
                <span className="text-[10px] text-[#8a9d94] font-mono block">
                  KP Tax Consultants Supervised &bull; ICAEW
                </span>
              </div>
            </Link>

            {/* Assigned Accountant Badge (Direct Client Requirement - Dynamic Reactive State) */}
            <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#111726] border border-[#1F293D]">
              <div className="w-7 h-7 rounded-full bg-[#162032] border border-[#a4f4cf]/40 flex items-center justify-center text-xs font-bold text-[#a4f4cf]">
                {accountantInitials}
              </div>
              <div className="text-left text-xs font-mono">
                <div className="text-white font-bold leading-tight flex items-center gap-1.5">
                  <span>{accountantName}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#a4f4cf]/20 text-[#a4f4cf] font-semibold">{designation}</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Your Assigned Chartered Accountant</span>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => triggerToast("All Deadlines Met", "No statutory compliance alerts.", "info")}
                className="p-2 rounded-lg bg-[#14241d] border border-[#1e382b] text-[#8a9d94] hover:text-white"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
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
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-1.5 rounded-lg flex items-center space-x-2 transition ${
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
            <span className="font-display font-bold text-white text-base">Client Portal Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-3 font-mono text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg flex items-center justify-between hover:bg-[#14241d] border border-transparent hover:border-[#1e382b]"
              >
                <div className="flex items-center space-x-3">
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
                handleLogout();
              }}
              className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center justify-center gap-2 font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Page Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
        {/* Page Top Banner */}
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

        {/* Content Body */}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e382b] bg-[#0c1813] py-6 px-4 text-xs text-[#8a9d94] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>&copy; 2026 KP Tax Consultants &bull; ICAEW &amp; CIOT Regulated Client Vault</p>
          <a
            href="https://mercianwealth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#14241d] hover:bg-[#1a3325] border border-[#234433] hover:border-[#a4f4cf]/60 text-[10px] font-mono text-[#a4f4cf] transition group"
          >
            <span>Built &amp; Designed by Mercian Wealth</span>
            <ArrowUpRight className="w-2.5 h-2.5 text-[#a4f4cf] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </footer>
    </div>
  );
}
