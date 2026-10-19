import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | KP Tax Consultants Ltd",
  description: "UK GDPR and Data Protection compliance notice for KP Tax Consultants Ltd / Kai Accountants clients.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-neutral-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

        <div className="border-b border-neutral-200 pb-4 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>UK GDPR & Data Protection Act 2018 Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Privacy & Client Data Notice
          </h1>
          <p className="text-xs text-neutral-500">
            Last Updated: October 2026 &bull; KP Tax Consultants Ltd (Company No. 12908850)
          </p>
        </div>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">1. Data Controller Information</h2>
          <p>
            KP Tax Consultants Ltd (trading as Kai Accountants / KP Tax Consultants) is registered with the Information Commissioner&apos;s Office (ICO). We act as a Data Controller in respect of personal, financial, and corporate data collected through this demonstration portal and our professional accounting engagements.
          </p>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1">
            <p><strong>Registered Address:</strong> 7 Bell Yard, London, WC2A 2JR, United Kingdom</p>
            <p><strong>Direct Inquiries:</strong> info@kptc.co.uk | +44 7861 690954 (WhatsApp)</p>
          </div>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">2. Categories of Data Collected</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Identity & AML Verification:</strong> Passports, driving licences, proof of address, and Companies House director records.</li>
            <li><strong>Property Portfolio Data:</strong> Land Registry title documents, AST tenancy agreements, mortgage loan statements, and rental income ledgers.</li>
            <li><strong>HMRC & Tax Computations:</strong> Unique Taxpayer References (UTR), National Insurance numbers, P60 certificates, and prior Self Assessment tax returns.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">3. Purpose and Legal Basis for Processing</h2>
          <p>
            We process client data strictly under the legal bases of: (a) Performance of a Contract (statutory accounts, Section 24 restructuring, tax advisory); (b) Legal Obligation (Money Laundering Regulations 2017, HMRC compliance, Companies Act 2006); and (c) Legitimate Interest (providing proactive MTD 2026 advisory).
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">4. Data Security & Encryption</h2>
          <p>
            Client tax returns, AST deeds, and mortgage records are stored with AES-256 encryption at rest and TLS 1.3 in transit. We enforce strict role-based access control, ensuring only authorized Chartered Accountants (ICAEW) and Chartered Tax Advisers (CIOT) access sensitive client documents.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">5. Your Statutory Rights</h2>
          <p>
            Under UK GDPR, you have the right to request access to your personal data, rectify inaccuracies, request erasure where statutory retention obligations do not apply, and lodge a complaint with the ICO (www.ico.org.uk).
          </p>
        </section>
      </div>
    </div>
  );
}
