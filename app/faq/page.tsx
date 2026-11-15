"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PropertyFaqSection from "@/components/landing/PropertyFaqSection";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FaqPage() {
  const { isIntakeModalOpen, openIntakeModal } = useDemoStore();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-mono">Frequently Asked Questions</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>HMRC Compliance &amp; Operational Knowledgebase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Clear, authoritative answers on Section 24, SPV incorporation, Director's Loan Accounts, and Making Tax Digital.
          </p>
        </div>

        {/* FAQ Section (In Blue/Slate System) */}
        <div className="pt-4">
          <PropertyFaqSection />
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
