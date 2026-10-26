import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Engagement & Service | KP Tax Consultants Ltd",
  description: "Standard terms of business and platform engagement for KP Tax Consultants Ltd / KP Accountants.",
};

export default function TermsPage() {
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
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4 text-primary" />
            <span>Standard Terms of Business</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Terms of Service & Engagement
          </h1>
          <p className="text-xs text-neutral-500">
            Governed by the Laws of England & Wales &bull; KP Tax Consultants Ltd
          </p>
        </div>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">1. Scope of Engagement</h2>
          <p>
            These Terms govern the use of the KP Tax Consultants demonstration platform, client portal dropzone, and subsequent accounting and tax consultancy services provided by KP Tax Consultants Ltd. Formal tax computation engagements are supplemented by individual Letters of Engagement adhering to ICAEW and CIOT professional regulations.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">2. Accuracy of Client Information</h2>
          <p>
            Clients and portfolio landlords are responsible for providing complete and accurate financial records, including rental ledgers, mortgage certificates, and capital expenditure invoices. Computations under Section 24, SPV transfers, and Self Assessments rely upon verified client submissions.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">3. Demonstration Prototype Disclaimer</h2>
          <p>
            The interactive tax calculators and automated dropzone previewed on this website are illustrative models designed to assist landlords in projecting potential tax savings. Final tax filings, capital gains reports, and corporation tax submissions must be reviewed and signed off by a qualified Chartered Accountant (FCA) or Chartered Tax Adviser (CTA).
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-900">4. Professional Indemnity Insurance</h2>
          <p>
            In accordance with ICAEW guidelines, KP Tax Consultants Ltd maintains comprehensive Professional Indemnity Insurance covering all tax advisory, accountancy compliance, and corporate structuring engagements.
          </p>
        </section>
      </div>
    </div>
  );
}
