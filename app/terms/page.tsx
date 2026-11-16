import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Terms of Engagement & Service | KP Tax Consultants & Mercian Wealth",
  description: "Standard terms of business and platform engagement for KP Tax Consultants Ltd / Mercian Wealth & Advisory.",
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>Standard Terms of Business</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Terms of Service &amp; Engagement
            </h1>
            <p className="text-xs text-[#8a9d94] font-mono">
              Governed by the Laws of England &amp; Wales &bull; KP Tax Consultants Ltd &amp; Mercian Wealth
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">1. Scope of Engagement</h2>
            <p>
              These Terms govern the use of the KP Tax Consultants software platform, client portal vault, and subsequent accounting and tax consultancy services provided by KP Tax Consultants Ltd and Mercian Wealth. Formal tax computation engagements are supplemented by individual Letters of Engagement adhering to ICAEW and CIOT professional regulations.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">2. Accuracy of Client Information</h2>
            <p>
              Clients are responsible for providing full, frank, and timely disclosure of all property income, allowable expenses, mortgage interest certificates, and capital enhancement receipts. All Section 24 calculations and Corporation Tax CT600 filings are prepared based strictly on verified documentation provided by the designated client officer or landlord.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">3. Statutory Anti-Money Laundering (AML) Compliance</h2>
            <p>
              In accordance with The Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017, KP Tax Consultants is statutorily mandated to verify the identity of all ultimate beneficial owners (UBOs) holding 25% or more of any SPV Limited company prior to dispatching tax packs to HMRC or Companies House.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">4. Professional Indemnity &amp; Limitation of Liability</h2>
            <p>
              KP Tax Consultants Ltd maintains full Professional Indemnity Insurance with an ICAEW-qualifying insurer. Maximum liability arising from any individual corporate tax or self-assessment advisory engagement is governed strictly by the provisions set out in the signed Letter of Engagement.
            </p>
          </section>

          <div className="pt-6 border-t border-[#1e382b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8a9d94]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#a4f4cf]" />
              <span>Chartered Tax Advisers &bull; ICAEW Supervised Practice</span>
            </div>
            <div>Last Updated: November 2026</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
