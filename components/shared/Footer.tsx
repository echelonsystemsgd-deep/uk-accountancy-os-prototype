"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const { setCurrentView, setIsIntakeOpen } = useDemoStore();

  return (
    <footer className="bg-[#07080C] border-t border-white/[0.08] pt-12 pb-24 sm:pb-12 text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/[0.06]">
          {/* Practice Details */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#0E111A] border border-white/[0.12] flex items-center justify-center text-[#EDEDED] font-semibold text-xs">
                A
              </div>
              <span className="text-sm font-semibold text-[#EDEDED] tracking-tight">
                Apex &amp; Co. Chartered Accountants
              </span>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed max-w-sm">
              Strategic accounting, Corporation Tax architecture, and compliance for UK limited companies and corporate directors.
            </p>
            <div className="text-[11px] text-[#64748B] pt-1 font-mono">
              ICAEW Firm No. 902814 • ACCA Practice Assurance • HMRC MTD Ready
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#EDEDED] uppercase tracking-wider mb-3">
              Platform Views
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView("prospect")}
                  className="hover:text-[#EDEDED] transition-colors"
                >
                  Public Acquisition Site
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("admin")}
                  className="hover:text-[#EDEDED] transition-colors"
                >
                  Practice Hub Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("portal")}
                  className="hover:text-[#EDEDED] transition-colors"
                >
                  Client Dropzone Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="text-[#D4AF37] hover:text-[#C5A028] transition-colors"
                >
                  Book Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* London Office */}
          <div>
            <h4 className="text-xs font-semibold text-[#EDEDED] uppercase tracking-wider mb-3">
              Office
            </h4>
            <div className="text-xs text-[#64748B] space-y-1 leading-relaxed">
              <p className="text-[#94A3B8]">28 Berkeley Square, Mayfair</p>
              <p>London, W1J 6EN</p>
              <p className="pt-2 font-mono">contact@apexandco-advisory.co.uk</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Mercian Wealth Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} Apex &amp; Co. Advisory Ltd. Reg No. 10984120. Supervised under MLR 2017.
          </div>

          <div className="flex items-center gap-1">
            <span>Designed &amp; Engineered by</span>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDEDED] hover:text-[#D4AF37] font-medium underline underline-offset-4 transition-colors inline-flex items-center gap-0.5 ml-1"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
