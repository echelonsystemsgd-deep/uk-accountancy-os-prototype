"use client";

import React from "react";
import { ShieldCheck, Mail, Phone, MapPin, Building2, CheckCircle2, Lock, Smartphone, Briefcase } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function Footer() {
  const { openLoginModal, enterAccountantPortal, enterClientPortal } = useDemoStore();

  return (
    <footer className="bg-white border-t border-neutral-200 mt-16 text-xs text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Practice Overview & Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Firm Overview with Official Logo */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <img
                src="/logo.png"
                alt="KP Tax Consultants Official Emblem"
                width={140}
                height={40}
                className="h-10 w-auto object-contain shrink-0"
              />
              <div>
                <span className="font-bold text-neutral-900 block text-sm">KP Accountants</span>
                <span className="text-[11px] text-neutral-500">KP Tax Consultants</span>
              </div>
            </div>
            <p className="text-neutral-600 leading-relaxed text-[11px]">
              Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising portfolio landlords, property investors, and limited company SPVs on UK tax compliance and legitimate relief.
            </p>

            <div className="pt-1 flex items-center space-x-2">
              <button
                type="button"
                onClick={openLoginModal}
                className="px-2.5 py-1.5 rounded text-[11px] font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1"
              >
                <Lock className="w-3 h-3 text-neutral-500" />
                <span>Portal Sign In</span>
              </button>
            </div>
          </div>

          {/* Col 2: Core Property Tax Services */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
              Property Tax Advisory
            </h3>
            <ul className="space-y-1.5 text-[11px] text-neutral-600">
              <li>&bull; Section 24 Mortgage Interest Relief</li>
              <li>&bull; SPV Limited Company Purchases & Transfers</li>
              <li>&bull; Stamp Duty Land Tax (SDLT) Planning</li>
              <li>&bull; Landlord Self Assessment & MTD for ITSA</li>
              <li>&bull; Capital Gains Tax on UK Property Disposals (60-Day Returns)</li>
            </ul>
          </div>

          {/* Col 3: Regulatory & Professional Accreditations */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
              Professional Regulation
            </h3>
            <div className="space-y-2 text-[11px] text-neutral-600">
              <div className="flex items-start space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>ICAEW Regulated:</strong> Regulated by the Institute of Chartered Accountants in England & Wales.
                </span>
              </div>
              <div className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>CIOT Member:</strong> Chartered Tax Advisers providing specialist tax consultancy.
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Statutory Details & Contact */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
              Practice Information
            </h3>
            <ul className="space-y-1.5 text-[11px] text-neutral-600">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href="mailto:info@kptc.co.uk" className="hover:text-primary transition">info@kptc.co.uk</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href="tel:+447861690954" className="hover:text-primary transition font-medium">07861 690954</a>
              </li>
              <li className="flex items-center space-x-2">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a
                  href="https://wa.me/447861690954?text=Hello%20KP%20Tax%20Consultants,%20I%20would%20like%20to%20enquire%20about%20property%20tax%20advisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 transition font-semibold"
                >
                  WhatsApp: +44 7861 690954
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>7 Bell Yard, London, WC2A 2JR, United Kingdom</span>
              </li>
              <li className="flex items-center space-x-2">
                <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Company No. 12908850 (KP Tax Consultants Ltd)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-neutral-500 gap-2">
          <p>
            &copy; 2026 KP Tax Consultants Ltd / KP Accountants. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="/privacy" className="hover:text-neutral-900 transition">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/terms" className="hover:text-neutral-900 transition">Terms of Service</a>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => enterAccountantPortal("radar")}
              className="hover:text-neutral-900 transition"
            >
              Accountant Hub
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => enterClientPortal("dropzone")}
              className="hover:text-neutral-900 transition"
            >
              Landlord Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
