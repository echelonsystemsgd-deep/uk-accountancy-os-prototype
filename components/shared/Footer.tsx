"use client";

import React from "react";
import { Mail, Phone, MapPin, CheckCircle2, Lock, Building2 } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function Footer() {
  const { enterClientPortal } = useDemoStore();

  return (
    <footer className="bg-[#0B0F19] border-t border-[#1F293D] mt-16 text-xs text-slate-400 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Firm Overview */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0077C8] text-white flex items-center justify-center font-bold text-xs shrink-0">
                MW
              </div>
              <div>
                <span className="font-bold text-white block text-sm tracking-tight">
                  MERCIAN WEALTH
                </span>
                <span className="text-[11px] text-[#38BDF8] font-medium">Digital Infrastructure &amp; Tax Suite</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Engineered in Berkshire, United Kingdom. Providing high-converting digital infrastructure, automated SPV property ledgers, and Section 24 corporate tax mitigation systems.
            </p>

            <div className="pt-1 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => enterClientPortal("client_overview", "client-legacy-wealth")}
                className="touch-target-44 px-3 py-1.5 rounded-md text-[11px] font-bold text-white bg-[#0077C8] hover:bg-[#0284C7] transition inline-flex items-center space-x-1.5 shadow-sm"
              >
                <Lock className="w-3 h-3" />
                <span>SPV Client Portal</span>
              </button>
            </div>
          </div>

          {/* Col 2: Core Property Tax Services */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Autonomous Systems
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>&bull; Section 24 Corporate SPV Relief</li>
              <li>&bull; Director’s Loan Account (DLA) Architecture</li>
              <li>&bull; Capital vs Revenue Repairs Indexing</li>
              <li>&bull; 1-Click HMRC CT600 Accountant Packs</li>
              <li>&bull; Autonomous Zero-Cost OCR Receipt Ingest</li>
            </ul>
          </div>

          {/* Col 3: Regulatory Accreditations */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Infrastructure Standards
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sub-Second Edge Infrastructure</span>
              </li>
              <li className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HMRC Making Tax Digital Standard</span>
              </li>
              <li className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Encrypted AES-256 Vault Architecture</span>
              </li>
              <li className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Client Asset Ownership</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Contact */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Operations &amp; Dispatch
            </h3>
            <div className="space-y-2 text-[11px] text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Berkshire, United Kingdom</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>contact@mercianwealth.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>WhatsApp: +44 7851 055929</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 border-t border-[#1F293D] text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} Mercian Wealth. Digital Infrastructure &amp; Autonomous Accounting OS.
          </p>
          <div className="flex items-center space-x-4">
            <a href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/terms" className="hover:text-slate-300 transition">Terms of Service</a>
            <span>&bull;</span>
            <a href="/dpa" className="hover:text-slate-300 transition">GDPR Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
