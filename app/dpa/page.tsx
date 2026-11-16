import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileCheck, Building2, Lock } from "lucide-react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Data Processing Addendum (DPA) | KP Tax Consultants & Mercian Wealth",
  description: "Statutory UK GDPR Article 28 Data Processing Addendum for KP Tax Consultants Ltd client portfolio operations.",
};

export default function DpaPage() {
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
              <span>UK GDPR Article 28 Statutory Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Data Processing Addendum (DPA)
            </h1>
            <p className="text-xs text-[#8a9d94] font-mono">
              Binding Controller-to-Processor Terms &bull; UK GDPR &amp; Data Protection Act 2018
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">1. Background &amp; Applicability</h2>
            <p>
              This Data Processing Addendum (&quot;DPA&quot;) supplements the Terms of Engagement entered into between KP Tax Consultants Ltd / Mercian Wealth (&quot;Data Processor&quot;) and the client entity (&quot;Data Controller&quot;) with respect to the processing of personal data in connection with accountancy, payroll, corporation tax, and property SPV management services.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">2. Scope &amp; Processing Instructions</h2>
            <p>
              The Processor shall process personal data solely on documented instructions from the Controller, including with respect to transfers of personal data to HM Revenue &amp; Customs (HMRC), Companies House, and authorised Open Banking account service providers.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">3. Security Measures (Article 32)</h2>
            <p>
              The Processor has implemented appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Pseudonymisation and AES-256-GCM encryption of sensitive statutory identifiers (UTR, NINO).</li>
              <li>Continuous confidentiality, integrity, availability, and resilience of processing systems.</li>
              <li>Automated antivirus scanning via ClamAV on all inbound documents prior to review.</li>
              <li>Role-based access controls and append-only tamper-proof audit trails for all staff actions.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <h2 className="text-base font-display font-bold text-white">4. Sub-Processors</h2>
            <p>
              The Controller provides general written authorisation for the engagement of hosting and infrastructure sub-processors (Supabase Inc., Vercel Inc., Resend, Twilio) operating within UK/EU adequacy standards with standard contractual clauses where required.
            </p>
          </section>

          <div className="pt-6 border-t border-[#1e382b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8a9d94]">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#a4f4cf]" />
              <span>Article 28 Verified &bull; ICAEW Supervised Practice</span>
            </div>
            <div>Valid from: November 2026</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
