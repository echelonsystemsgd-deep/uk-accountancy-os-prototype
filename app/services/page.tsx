"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PropertyServicesGrid from "@/components/landing/PropertyServicesGrid";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
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
          <span className="text-sky-400">SPV Property Solutions</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Specialised Corporate Property Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            UK Property SPV &amp; Tax Solutions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Full corporate structuring, Section 24 mortgage relief compliance, and autonomous accounting infrastructure engineered for UK portfolio landlords.
          </p>
        </div>

        {/* Services Grid (In Blue/Slate System) */}
        <div className="pt-4">
          <PropertyServicesGrid />
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl bg-[#162032] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Ready to Structure Your Property SPV?</h3>
            <p className="text-xs text-slate-400">Speak with our senior chartered advisers for a bespoke tax scoper.</p>
          </div>
          <button
            type="button"
            onClick={() => openIntakeModal()}
            className="touch-target-44 px-5 py-2.5 rounded-lg font-bold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-2 shadow-sm transition active:scale-95 shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
