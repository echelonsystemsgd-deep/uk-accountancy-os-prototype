"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle2, Lock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c1813] border-t border-[#1e382b] text-xs text-[#8a9d94] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Firm Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#a4f4cf] text-[#0c1813] flex items-center justify-center font-bold font-mono text-xs shrink-0">
                MW
              </div>
              <div>
                <span className="font-display font-bold text-white block text-sm tracking-tight">
                  MERCIAN WEALTH
                </span>
                <span className="text-[11px] text-[#a4f4cf] font-mono">Tax &amp; Accountancy OS</span>
              </div>
            </div>
            <p className="text-[#8a9d94] leading-relaxed text-[11px]">
              High-density digital accountancy infrastructure for UK property SPVs and chartered accountancy practices. Automated Section 24 mortgage relief, live bank feed reconciliation, and audit-proof CT600 tax packs.
            </p>
            <div className="pt-1">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold text-[#0c1813] bg-[#a4f4cf] hover:bg-[#8ae8bd] transition inline-flex items-center space-x-1.5 shadow-sm"
              >
                <Lock className="w-3 h-3 text-[#0c1813]" />
                <span>SPV Client Portal</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Core Solutions */}
          <div className="space-y-3 font-mono text-[11px]">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Property Solutions
            </h3>
            <ul className="space-y-2 text-[#8a9d94]">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  • Section 24 SPV Corporate Relief
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  • Director’s Loan Account (DLA) Architecture
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition">
                  • Section 24 Comparison Calculator
                </Link>
              </li>
              <li>
                <Link href="/mtd" className="hover:text-white transition">
                  • Making Tax Digital (MTD ITSA) Readiness
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  • 1-Click CT600 &amp; Micro-Entity FRS 105
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice Regulatory Credentials */}
          <div className="space-y-3 font-mono text-[11px]">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Chartered Practice Standards
            </h3>
            <ul className="space-y-2 text-[#8a9d94]">
              <li className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>ICAEW Regulated (Senior Partner)</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>CIOT Accredited (Chartered Tax Adviser)</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>HMRC Supervised &amp; AML Registered</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>Companies House Authorised Presenter</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-3 font-mono text-[11px]">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Offices &amp; Contact
            </h3>
            <div className="space-y-2 text-[#8a9d94]">
              <p className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>14 New Street, London EC2M 4HE</span>
              </p>
              <p className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0 mt-0.5" />
                <span>Berkshire Practice Office, RG42</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>+44 7851 055929</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#a4f4cf] shrink-0" />
                <span>mercianwealthgs@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Statutory Disclaimers */}
        <div className="pt-6 border-t border-[#1e382b] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#8a9d94] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>
              &copy; 2026 KP Tax Consultants Ltd. Regulated by ICAEW &amp; CIOT. All rights reserved.
            </p>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14241d] hover:bg-[#1a3325] border border-[#234433] hover:border-[#a4f4cf]/60 text-[10px] font-mono text-[#a4f4cf] transition shadow-sm group"
            >
              <span>Built &amp; Designed by Mercian Wealth</span>
              <ArrowUpRight className="w-3 h-3 text-[#a4f4cf] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Engagement
            </Link>
            <Link href="/dpa" className="hover:text-white transition">
              Data Processing Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
