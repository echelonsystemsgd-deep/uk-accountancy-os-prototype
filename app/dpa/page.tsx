import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileCheck, Building2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Addendum (DPA) | KP Tax Consultants Ltd",
  description: "Statutory UK GDPR Article 28 Data Processing Addendum for KP Tax Consultants Ltd client portfolio operations.",
};

export default function DpaPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-neutral-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Practice Front Door</span>
        </Link>

        <div className="border-b border-neutral-200 pb-4 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>UK GDPR Article 28 Statutory Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Data Processing Addendum (DPA)
          </h1>
          <p className="text-xs text-neutral-500">
            Executed by KP Tax Consultants Ltd (Company No. 12908850) &bull; Effective Tax Year 2024/25
          </p>
        </div>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">1. Parties & Purpose</h2>
          <p>
            This Data Processing Addendum (&quot;DPA&quot;) supplements the Master Terms of Service between KP Tax Consultants Ltd (&quot;Data Processor&quot;) and the Client / Landlord Entity (&quot;Data Controller&quot;) governing the processing of personal and corporate tax records via the Practice OS and Landlord Vault.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">2. Security of Processing (Article 32)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Data Residency:</strong> All customer data is hosted strictly in the United Kingdom (London Region, eu-west-2).</li>
            <li><strong>Encryption Standards:</strong> AES-256 encryption at rest for all document uploads and TLS 1.3 transport security in transit.</li>
            <li><strong>Access Controls:</strong> Role-based access control with tokenized magic links and cryptographic session verification.</li>
            <li><strong>6-Year Statutory Retention:</strong> Tax documentation retained in accordance with HMRC self-employed and corporate compliance schedules.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">3. Sub-Processors</h2>
          <p>
            The Data Controller acknowledges and agrees that the Data Processor utilizes verified UK/EU sub-processors for hosting, database management, and transactional communications, each bound by equivalent statutory data protection obligations.
          </p>
        </section>

        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-1">
          <p><strong>Practice Regulatory Body:</strong> Institute of Chartered Accountants in England and Wales (ICAEW)</p>
          <p><strong>Senior Partners:</strong> Kalpesh Patel BSc(Hons), FCA &bull; Pritpal Chaggar BSc(Hons), ATT, CTA</p>
          <p><strong>Registered Address:</strong> 7 Bell Yard, London, WC2A 2JR, United Kingdom</p>
        </div>
      </div>
    </div>
  );
}
