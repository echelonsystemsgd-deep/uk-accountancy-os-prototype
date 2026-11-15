"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/store";
import { Menu, X, ArrowRight, ShieldCheck, Lock } from "lucide-react";

export default function Navbar() {
  const { openIntakeModal } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#losses", label: "Tax Leaks" },
    { href: "/#all-spvs", label: "SPV Ledger" },
    { href: "/calculator", label: "Section 24 Engine" },
    { href: "/#outcomes", label: "Outcomes" },
    { href: "/about", label: "About Practice" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0c1813]/95 backdrop-blur-md border-b border-[#1e382b] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
            {/* Practice Branding */}
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold font-mono text-xs shadow-sm">
                MW
              </div>
              <div className="space-y-0 text-left">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="font-display font-extrabold text-white text-sm sm:text-base tracking-tight">
                    MERCIAN WEALTH
                  </span>
                  <span className="text-[#a4f4cf] text-xs font-semibold hidden sm:inline">&bull; Tax &amp; Ledger</span>
                </div>
                <p className="text-[10px] text-[#8a9d94] font-medium whitespace-nowrap hidden md:block">
                  UK Property SPV Infrastructure &bull; ICAEW &bull; CIOT
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
                    className={`transition py-1 flex items-center ${
                      isActive ? "text-white font-bold" : "hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3 shrink-0 whitespace-nowrap">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#14241d] hover:bg-[#1e382b] text-white border border-[#1e382b] flex items-center space-x-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5 text-[#8a9d94]" />
                <span>Portal Login</span>
              </Link>
              <button
                onClick={() => openIntakeModal()}
                className="px-4 py-2 rounded-lg text-xs font-display font-bold bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] transition shadow-sm flex items-center space-x-1"
              >
                <span>Scope Your SPV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#14241d] border border-[#1e382b]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#0c1813]/98 backdrop-blur-md pt-20 px-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e382b]">
            <span className="font-display font-bold text-white text-base">Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 text-base font-semibold text-[#8a9d94]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-white border-b border-[#1e382b]/50 flex justify-between items-center"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#8a9d94]" />
              </Link>
            ))}
          </nav>
          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openIntakeModal();
              }}
              className="w-full py-3 rounded-xl bg-[#a4f4cf] text-[#0c1813] font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>Scope Your Property SPV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#14241d] border border-[#1e382b] text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#8a9d94]" />
              <span>Client / Accountant Login</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
