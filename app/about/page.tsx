"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AboutPracticeSection from "@/components/landing/AboutPracticeSection";
import ConsultationModal from "@/components/landing/ConsultationModal";
import { useDemoStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, Building2, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
          <span className="text-[#a4f4cf] font-mono">About Practice</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[#a4f4cf] text-xs font-semibold font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>Chartered Practice &amp; Property Tax Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            About KP Tax Consultants &amp; Advisory
          </h1>
          <p className="text-[#8a9d94] text-sm sm:text-base max-w-2xl leading-relaxed">
            Led by Kalpesh Patel FCA and Pritpal Chaggar CTA. Serving UK property investors, developers, and corporate landlords nationwide.
          </p>
        </div>

        {/* About Section */}
        <div className="pt-4">
          <AboutPracticeSection />
        </div>
      </main>

      {isIntakeModalOpen && <ConsultationModal />}
      <Footer />
    </div>
  );
}
