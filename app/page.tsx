"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingDemoController from "@/components/shared/FloatingDemoController";
import ToastContainer from "@/components/shared/ToastContainer";

// Landing Page Components (Public Acquisition)
import LandingHero from "@/components/landing/LandingHero";
import PropertyTaxCalculator from "@/components/landing/PropertyTaxCalculator";
import PropertyServicesGrid from "@/components/landing/PropertyServicesGrid";
import MtdGuidanceSection from "@/components/landing/MtdGuidanceSection";
import PropertyFaqSection from "@/components/landing/PropertyFaqSection";
import ConsultationModal from "@/components/landing/ConsultationModal";

// Accountant Practice OS Components
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import ChaserView from "@/components/admin/ChaserView";

// Dedicated Client Portal Components
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";

export default function Home() {
  const { currentView } = useDemoStore();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header & Navigation */}
      <Navbar />

      {/* Dynamic Viewport */}
      <main className="flex-1 w-full">
        {/* Tier 1: Public Acquisition Landing Page */}
        {currentView === "landing" && (
          <div className="animate-in fade-in duration-200">
            <LandingHero />
            <PropertyTaxCalculator />
            <PropertyServicesGrid />
            <MtdGuidanceSection />
            <PropertyFaqSection />
          </div>
        )}

        {/* Tier 2: Accountant Practice OS */}
        {currentView === "radar" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <PartnerRadar />
          </div>
        )}

        {currentView === "pipeline" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <LandlordPipeline />
          </div>
        )}

        {currentView === "workspace" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <PropertyWorkspace />
          </div>
        )}

        {currentView === "chaser" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <ChaserView />
          </div>
        )}

        {/* Tier 3: Dedicated Client Portal */}
        {currentView === "dropzone" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <MobileDropzone />
          </div>
        )}

        {currentView === "vault" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
            <ClientDocumentVault />
          </div>
        )}
      </main>

      {/* Global Footer with Official Regulatory Badges & Placeholders */}
      <Footer />

      {/* Interactive Consultation Intake Modal */}
      <ConsultationModal />

      {/* Floating Demo Switcher */}
      <FloatingDemoController />
    </div>
  );
}
