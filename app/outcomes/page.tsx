"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import OutcomesRoiSection from "@/components/landing/OutcomesRoiSection";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, CheckCircle2, Building2, PoundSterling, Wallet } from "lucide-react";

export default function OutcomesPage() {
  const { isIntakeModalOpen, openIntakeModal } = useDemoStore();

  const caseStudies = [
    {
      company: "Belgrave Legacy Wealth SPV Ltd",
      location: "Solihull, West Midlands",
      portfolio: "4 Residential BTL Properties",
      annualRent: "£48,200",
      mortgageInterest: "£18,240",
      annualTaxSaved: "£4,560",
      dlaBalance: "£72,450",
      description:
        "Transitioned 4 properties out of 40% personal higher-rate tax into a dedicated SPV. 100% of mortgage interest is now deducted as allowable finance costs, saving £4,560 annually while extracting rental profits tax-free through DLA repayment.",
    },
    {
      company: "Mayfair Prime Residential SPV Ltd",
      location: "London, City of Westminster",
      portfolio: "2 Prime Apartment Units",
      annualRent: "£36,000",
      mortgageInterest: "£14,800",
      annualTaxSaved: "£3,700",
      dlaBalance: "£45,200",
      description:
        "Leveraged Section 162 Incorporation Relief to move Central London rental assets into corporate ownership without triggering immediate Stamp Duty or Capital Gains Tax, establishing a clean audit trail.",
    },
    {
      company: "Harborne Commercial Holding Ltd",
      location: "Birmingham, West Midlands",
      portfolio: "6 Multi-Unit HMO & Commercial Properties",
      annualRent: "£78,500",
      mortgageInterest: "£31,200",
      annualTaxSaved: "£7,800",
      dlaBalance: "£110,000",
      description:
        "Automated multi-property Open Banking reconciliation and contractor invoice VAT splits. Direct DLA tracking protects against Section 455 penalties while director draws £2,400/month tax-free.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#a4f4cf]">Measurable Outcomes</span>
        </div>

        {/* Page Header */}
        <div className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162032] border border-[#1F293D] text-[#a4f4cf] text-xs font-semibold font-mono uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Tangible Financial Results</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Client Outcomes &amp; ROI. <br />
            <span className="text-[#a4f4cf]">Real savings. Verifiable statutory protection.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Review how UK landlords eliminate Section 24 tax traps, unlock tax-free equity repayments through Director's Loan Accounts, and maintain audit-proof compliance with HM Revenue &amp; Customs.
          </p>
        </div>

        {/* Outcomes Metrics Component */}
        <div className="pt-2">
          <OutcomesRoiSection />
        </div>

        {/* Real-World Case Studies in Tactile Cream & Green */}
        <div className="space-y-6 text-left pt-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[#a4f4cf] tracking-wider block">
              PORTFOLIO SPOTLIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Verified Practice Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#fbfbf8] border border-[#e2e0d5] text-[#171c19] flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="border-b border-stone-200 pb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-stone-900 leading-snug">
                        {cs.company}
                      </h3>
                      <span className="text-[11px] font-mono text-stone-500 block">
                        {cs.location} &bull; {cs.portfolio}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200">
                      <span className="text-[10px] text-stone-500 block uppercase">Annual Tax Saved</span>
                      <span className="font-bold text-emerald-800 text-sm">{cs.annualTaxSaved}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200">
                      <span className="text-[10px] text-stone-500 block uppercase">DLA Balance</span>
                      <span className="font-bold text-[#0c1813] text-sm">{cs.dlaBalance}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {cs.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ICAEW Verified</span>
                  </span>
                  <span>100% Tax Deductible</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111726] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-white">How Much Tax Could Your Portfolio Save?</h3>
            <p className="text-xs text-slate-400">Calculate your exact Section 24 relief in 60 seconds or schedule a partner strategy session.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/calculator"
              className="touch-target-44 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#162032] hover:bg-[#1f2c42] text-white border border-[#1F293D] transition"
            >
              Open Calculator
            </Link>
            <button
              type="button"
              onClick={() => openIntakeModal()}
              className="touch-target-44 px-5 py-2.5 rounded-xl font-bold font-mono text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] flex items-center space-x-2 shadow-md transition active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
