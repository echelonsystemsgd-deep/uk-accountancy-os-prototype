"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ShieldCheck, Award, Lock, ExternalLink, ChevronRight } from "lucide-react";

export default function Footer() {
  const { setCurrentView, setIsIntakeOpen } = useDemoStore();

  return (
    <footer className="bg-[#05070B] border-t border-[#D4AF37]/20 pt-16 pb-24 sm:pb-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand & Value Prop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/40 flex items-center justify-center">
                <span className="font-serif-luxury text-lg font-bold text-gold-300">A</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-semibold text-white tracking-wide">
                  Apex & Co.
                </span>
                <p className="text-[10px] tracking-widest uppercase text-gold-400">
                  Chartered Accountants & Strategic Tax Advisors
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Advising British founders, limited companies, and high-net-worth directors on corporation tax architecture, HMRC compliance, R&D tax relief, and high-level fractional CFO strategy.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F17] border border-[#D4AF37]/25 text-[11px] text-gold-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                ICAEW Firm No. 902814
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F17] border border-[#D4AF37]/25 text-[11px] text-gold-300 font-mono">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                ACCA Practice Assurance
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F17] border border-white/10 text-[11px] text-slate-300 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                HMRC MTD Ready
              </span>
            </div>
          </div>

          {/* Practice Modules */}
          <div>
            <h4 className="font-serif-luxury text-white text-base font-semibold mb-3 tracking-wide">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView("prospect")}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  <span>Public Client Acquisition Front-End</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("admin")}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  <span>Practice Command Hub (Partner View)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("portal")}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  <span>Client Software Portal (Dropzone)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1 text-gold-400 font-medium"
                >
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  <span>Book Strategic Tax Review</span>
                </button>
              </li>
            </ul>
          </div>

          {/* London Mayfair Headquarters */}
          <div>
            <h4 className="font-serif-luxury text-white text-base font-semibold mb-3 tracking-wide">
              Private Practice Offices
            </h4>
            <address className="not-italic text-xs text-slate-400 space-y-1 leading-relaxed">
              <p className="text-white font-medium">Mayfair Head Office</p>
              <p>28 Berkeley Square, Mayfair</p>
              <p>London, W1J 6EN</p>
              <p className="pt-2">City Chambers: 1 Cornhill, London EC3V 3ND</p>
              <p className="pt-1 text-gold-300">inquiries@apexandco-advisory.co.uk</p>
            </address>
          </div>
        </div>

        {/* Bottom Tier: Legal, AML notice & Mercian Wealth Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Apex & Co. Advisory Ltd. All rights reserved. Registered in England & Wales No. 10984120. Supervised by the ICAEW under the Money Laundering Regulations 2017.
          </div>

          {/* Agency Credibility Attribution */}
          <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#0B0F17] border border-[#D4AF37]/30 text-slate-300">
            <span>Designed & Engineered by</span>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 hover:text-white font-medium underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-300 transition-all inline-flex items-center gap-1"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-3 h-3 text-gold-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
