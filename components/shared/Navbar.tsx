"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoStore } from "@/lib/store";
import {
  Menu,
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Navbar() {
  const { openIntakeModal } = useDemoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/services", label: "SPV Solutions" },
    { href: "/calculator", label: "Section 24 Engine" },
    { href: "/mtd", label: "HMRC MTD Roadmap" },
    { href: "/about", label: "About Mercian" },
    { href: "/faq", label: "HMRC Rules FAQ" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0c1813]/95 backdrop-blur-md border-b border-[#1e382b] shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
            {/* Practice Branding */}
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold text-xs shadow-sm">
                MW
              </div>
              <div className="space-y-0 text-left">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight">
                    MERCIAN WEALTH
                  </span>
                  <span className="text-[#a4f4cf] text-xs font-semibold hidden sm:inline">&bull; Tax &amp; Ledger</span>
                </div>
                <p className="text-[10px] text-[#8a9d94] font-medium whitespace-nowrap hidden md:block">
                  UK Property SPV Infrastructure &bull; City of London &bull; Berkshire
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs sm:text-sm font-semibold text-[#8a9d94] whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition py-1 touch-target-44 flex items-center ${
                      isActive ? "text-white font-bold" : "hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center space-x-2.5 shrink-0 whitespace-nowrap">
              <Link
                href="/login"
                className="touch-target-44 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#14241d] hover:bg-[#1e382b] text-white border border-[#1e382b] flex items-center space-x-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5 text-[#a4f4cf]" />
                <span>Portal Login</span>
              </Link>

              <button
                type="button"
                onClick={() => openIntakeModal()}
                className="touch-target-44 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#0c1813] bg-[#a4f4cf] hover:bg-[#8ae8bd] transition inline-flex items-center space-x-1.5 shadow-sm active:scale-95"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0c1813]" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                href="/login"
                className="touch-target-44 px-3 py-1.5 rounded-md text-xs font-bold text-[#0c1813] bg-[#a4f4cf] shadow-sm"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="touch-target-44 p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#14241d] transition"
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
        <div className="lg:hidden fixed inset-0 z-[100] bg-[#0c1813] flex flex-col justify-between animate-in fade-in duration-200 shadow-2xl">
          <div className="h-16 px-4 border-b border-[#1e382b] flex items-center justify-between bg-[#14241d] shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold text-xs">
                MW
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wider">
                MERCIAN WEALTH TAX
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target-44 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm font-semibold text-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-[#a4f4cf] font-mono block mb-2">
              PAGE DIRECTORY
            </span>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target-44 w-full text-left py-2.5 border-b border-[#1e382b] hover:text-[#a4f4cf] transition flex items-center justify-between"
            >
              <span>Home Overview</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target-44 w-full text-left py-2.5 border-b border-[#1e382b] hover:text-[#a4f4cf] transition flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="p-6 bg-[#14241d] border-t border-[#1e382b] space-y-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target-44 w-full py-2.5 rounded-lg text-center font-bold text-xs bg-[#0c1813] text-white border border-[#1e382b] block"
            >
              Client / Admin Portal Login
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openIntakeModal();
              }}
              className="touch-target-44 w-full py-2.5 rounded-lg text-center font-bold text-xs bg-[#a4f4cf] text-[#0c1813] block"
            >
              Book Strategic Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
