"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PropertyServicesGrid from "@/components/landing/PropertyServicesGrid";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
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
          <span className="text-[#a4f4cf] font-mono">SPV Property Solutions</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[#a4f4cf] text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Specialised Corporate Property Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            UK Property SPV &amp; Tax Solutions
          </h1>
          <p className="text-[#8a9d94] text-sm sm:text-base max-w-2xl leading-relaxed">
            Full corporate structuring, Section 24 mortgage relief compliance, and autonomous accounting infrastructure engineered for UK portfolio landlords.
          </p>
        </div>

        {/* Services Grid */}
        <div className="pt-4">
          <PropertyServicesGrid />
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-white">Ready to Structure Your Property SPV?</h3>
            <p className="text-xs text-[#8a9d94]">Speak directly with Kalpesh Patel FCA or Pritpal Chaggar CTA for a bespoke diagnostic.</p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-2.5 rounded-lg font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] flex items-center space-x-2 shadow-sm transition active:scale-95 shrink-0"
          >
            <span>Book Partner Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#0c1813]" />
          </button>
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
