"use client";

import React from "react";
import { useDemo } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import ConsultationModal from "@/components/landing/ConsultationModal";

// Complete XLANE-Engineered Landing Experience
import LandingHero from "@/components/landing/LandingHero";
import ClearNextStepsSection from "@/components/landing/ClearNextStepsSection";
import LossesSection from "@/components/landing/LossesSection";
import InteractiveJourneySection from "@/components/landing/InteractiveJourneySection";
import AllSpvsDashboardSection from "@/components/landing/AllSpvsDashboardSection";
import RepeatComplianceSection from "@/components/landing/RepeatComplianceSection";
import VideoWalkthroughSection from "@/components/landing/VideoWalkthroughSection";
import OutcomesRoiSection from "@/components/landing/OutcomesRoiSection";
import PropertyTaxCalculator from "@/components/landing/PropertyTaxCalculator";
import AboutPracticeSection from "@/components/landing/AboutPracticeSection";
import PropertyFaqSection from "@/components/landing/PropertyFaqSection";
import CloseCtaSection from "@/components/landing/CloseCtaSection";

export default function Home() {
  const { isIntakeModalOpen } = useDemo();

  return (
    <div className="min-h-screen bg-[#0c1813] text-neutral-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Institutional Sticky Header */}
      <Navbar />

      {/* Main XLANE-Structured Narrative */}
      <main className="flex-1 w-full text-neutral-100">
        <div className="animate-in fade-in duration-300">
          {/* 01. Hero & Real-Time Open Banking Demonstrator */}
          <LandingHero />

          {/* 02. Clear Next Steps: 3-Step Confusion-Free Onboarding */}
          <ClearNextStepsSection />

          {/* 03. The Losses Section (01-04 Cost of Manual Processing) */}
          <LossesSection />

          {/* 03. The 6-Step Journey with Sticky Subnav & Interactive Tactile Cards */}
          <InteractiveJourneySection />

          {/* 04. Multi-Entity SPV Portfolio Ledger Dashboard */}
          <AllSpvsDashboardSection />

          {/* 05. Recurring MTD ITSA Compliance Engine */}
          <RepeatComplianceSection />

          {/* 06. Interactive Video & Product Walkthrough */}
          <VideoWalkthroughSection />

          {/* 07. Measurable ROI & Outcomes (01-04 Impact Cards) */}
          <OutcomesRoiSection />

          {/* 08. Interactive Section 24 Mortgage Relief Comparison Tool */}
          <section id="calculator">
            <PropertyTaxCalculator />
          </section>

          {/* 09. Practice Authority (KP Tax Consultants FCA & CTA Credentials) */}
          <section id="about">
            <AboutPracticeSection />
          </section>

          {/* 10. Statutory HMRC Compliance & Section 24 FAQs */}
          <section id="faq">
            <PropertyFaqSection />
          </section>

          {/* 11. Final High-Contrast Direct CTA Card */}
          <CloseCtaSection />
        </div>
      </main>

      {/* Consultation Intake Modal */}
      {isIntakeModalOpen && <ConsultationModal />}

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
