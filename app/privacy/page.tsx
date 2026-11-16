import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | KP Tax Consultants & Mercian Wealth",
  description: "UK GDPR and Data Protection compliance notice for KP Tax Consultants Ltd / Mercian Wealth clients.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-left">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#a4f4cf] hover:underline transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

        <div className="p-6 sm:p-10 bg-[#14241d] border border-[#1e382b] rounded-2xl shadow-2xl space-y-8">
          <div className="border-b border-[#1e382b] pb-5 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1813] border border-[#1e382b] text-xs font-mono font-semibold text-[#a4f4cf]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>UK GDPR &amp; Data Protection Act 2018 Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Privacy &amp; Client Data Notice
            </h1>
            <p className="text-xs text-[#8a9d94] font-mono">
              Information Commissioner’s Office (ICO) Registration: ZA184029 &bull; KP Tax Consultants Ltd
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">1. Data Controller Identification</h2>
            <p>
              KP Tax Consultants Ltd acts as Data Controller under the UK GDPR for all personal identifying information, financial statements, and tax documentation collected through this platform. Our Data Protection Officer can be reached directly via{" "}
              <a href="mailto:pchaggar@kptc.co.uk" className="text-[#a4f4cf] underline font-mono">
                pchaggar@kptc.co.uk
              </a>.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">2. Categories of Data Processed</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Identity &amp; Contact: Full legal names, residential addresses, passports, driving licences, email addresses, and verified mobile numbers.</li>
              <li>Statutory Identifiers: Unique Taxpayer References (UTR), National Insurance Numbers (NINO), and Companies House Company Registration Numbers (CRN) — all encrypted with AES-256-GCM.</li>
              <li>Financial Documentation: Buy-to-let mortgage interest certificates, rental bank account transactions, contractor maintenance invoices, and capital cost ledgers.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">3. Statutory 6-Year Retention &amp; 90-Day Inactive Purge</h2>
            <p>
              Under UK tax legislation (TMA 1970 s.12B and FA 1998 Schedule 18), all accounting records supporting Corporation Tax CT600 or Self-Assessment SA100 returns must be maintained for 6 years following the end of the relevant statutory accounting period. Unverified accounts with no engagement are queued for automated purge after a 90-day progressive notification sequence.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">4. Encryption &amp; Security Measures</h2>
            <p>
              All traffic is secured via TLS 1.3 with HSTS enabled. Client document storage buckets are fully private with Row-Level Security, virus scanning via ClamAV on upload, and audit logging of all sensitive credential accesses.
            </p>
          </section>

          <div className="pt-6 border-t border-[#1e382b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8a9d94]">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#a4f4cf]" />
              <span>AES-256-GCM Hardware-Encrypted Vault &bull; London eu-west-2</span>
            </div>
            <div>Revision 2026.11</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
