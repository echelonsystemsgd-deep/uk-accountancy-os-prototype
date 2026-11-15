"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import ConsultationModal from "@/components/landing/ConsultationModal";

// Landing Page Components (Public Acquisition)
import LandingHero from "@/components/landing/LandingHero";
import PinnedLifecycleNav from "@/components/landing/PinnedLifecycleNav";
import PropertyServicesGrid from "@/components/landing/PropertyServicesGrid";
import PropertyTaxCalculator from "@/components/landing/PropertyTaxCalculator";
import MtdGuidanceSection from "@/components/landing/MtdGuidanceSection";
import AboutPracticeSection from "@/components/landing/AboutPracticeSection";
import PropertyFaqSection from "@/components/landing/PropertyFaqSection";

export default function Home() {
  const { isIntakeModalOpen } = useDemoStore();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header & Navigation */}
      <Navbar />

      {/* Public Landing Viewport */}
      <main className="flex-1 w-full text-neutral-100">
        <div className="animate-in fade-in duration-200">
          {/* Green Hero Section (First Bit in Green) */}
          <LandingHero />

          {/* Sticky Lifecycle Sub-Nav */}
          <PinnedLifecycleNav />

          {/* Rest of Landing Page (Kept in Institutional Slate & Blue) */}
          <section id="services">
            <PropertyServicesGrid />
          </section>

          <section id="calculator">
            <PropertyTaxCalculator />
          </section>

          <section id="mtd-guidance">
            <MtdGuidanceSection />
          </section>

          <section id="about">
            <AboutPracticeSection />
          </section>

          <section id="faq">
            <PropertyFaqSection />
          </section>
        </div>
      </main>

      {/* Consultation Modal */}
      {isIntakeModalOpen && <ConsultationModal />}

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
