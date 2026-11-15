"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PropertyTaxCalculator from "@/components/landing/PropertyTaxCalculator";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  const { isIntakeModalOpen, openIntakeModal } = useDemoStore();

  return (
    <div className="min-h-screen bg-[#0c1813] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center space-x-2 text-xs text-[#8a9d94]">
          <Link href="/" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#a4f4cf] font-mono">Section 24 Engine</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[#a4f4cf] text-xs font-semibold font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>HMRC Section 24 Finance Cost Simulation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Section 24 Mortgage Relief Engine
          </h1>
          <p className="text-[#8a9d94] text-sm sm:text-base max-w-2xl leading-relaxed">
            Calculate your exact tax exposure between holding property in personal names versus an SPV limited company under Finance Act 2015 rules.
          </p>
        </div>

        {/* Calculator Component */}
        <div className="pt-4">
          <PropertyTaxCalculator />
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
