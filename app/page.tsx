"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalLoginModal from "@/components/shared/PortalLoginModal";

// Landing Page Components (Public Acquisition)
import LandingHero from "@/components/landing/LandingHero";
import PropertyServicesGrid from "@/components/landing/PropertyServicesGrid";
import PropertyTaxCalculator from "@/components/landing/PropertyTaxCalculator";
import MtdGuidanceSection from "@/components/landing/MtdGuidanceSection";
import AboutPracticeSection from "@/components/landing/AboutPracticeSection";
import PropertyFaqSection from "@/components/landing/PropertyFaqSection";
import ConsultationModal from "@/components/landing/ConsultationModal";

// Accountant Practice OS Components
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import ChaserView from "@/components/admin/ChaserView";
import FinancialStatementsHub from "@/components/admin/FinancialStatementsHub";
import PracticeInvoicingHub from "@/components/admin/PracticeInvoicingHub";
import WealthAdvisoryHub from "@/components/admin/WealthAdvisoryHub";
import OpenBankingHub from "@/components/admin/OpenBankingHub";
import CreateEntityModal from "@/components/admin/CreateEntityModal";

// Dedicated Client Portal Components
import ClientOverview from "@/components/portal/ClientOverview";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";
import ClientMessages from "@/components/portal/ClientMessages";
// Portal Sidebar Component
import PortalSidebar from "@/components/shared/PortalSidebar";

export default function Home() {
  const { currentMode, currentView } = useDemoStore();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header & Navigation (Dynamically changes by AppMode) */}
      <Navbar />

      {/* Main Viewport Container: Direct Full Width for Landing; Flex with Permanent Sidebar for Accountant & Client Portals */}
      {currentMode === "landing" ? (
        <main className="flex-1 w-full">
          <div className="animate-in fade-in duration-200">
            <LandingHero />
            <PropertyServicesGrid />
            <PropertyTaxCalculator />
            <MtdGuidanceSection />
            <AboutPracticeSection />
            <PropertyFaqSection />
          </div>
        </main>
      ) : (
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex">
          {/* Permanent Sidebar on Desktop (lg+), Slide-out Drawer on Mobile */}
          <PortalSidebar />

          {/* Main Working View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
            {/* Accountant Practice OS Views */}
            {currentView === "radar" && (
              <div className="animate-in fade-in duration-200">
                <PartnerRadar />
              </div>
            )}

            {currentView === "pipeline" && (
              <div className="animate-in fade-in duration-200">
                <LandlordPipeline />
              </div>
            )}

            {currentView === "statements" && (
              <div className="animate-in fade-in duration-200">
                <FinancialStatementsHub />
              </div>
            )}

            {currentView === "wealth_advisory" && (
              <div className="animate-in fade-in duration-200">
                <WealthAdvisoryHub />
              </div>
            )}

            {currentView === "open_banking" && (
              <div className="animate-in fade-in duration-200">
                <OpenBankingHub />
              </div>
            )}

            {currentView === "invoicing" && (
              <div className="animate-in fade-in duration-200">
                <PracticeInvoicingHub />
              </div>
            )}

            {currentView === "workspace" && (
              <div className="animate-in fade-in duration-200">
                <PropertyWorkspace />
              </div>
            )}

            {currentView === "chaser" && (
              <div className="animate-in fade-in duration-200">
                <ChaserView />
              </div>
            )}

            {/* Landlord Client Portal Views */}
            {currentView === "client_overview" && (
              <div className="animate-in fade-in duration-200">
                <ClientOverview />
              </div>
            )}

            {currentView === "dropzone" && (
              <div className="animate-in fade-in duration-200">
                <MobileDropzone />
              </div>
            )}

            {currentView === "vault" && (
              <div className="animate-in fade-in duration-200">
                <ClientDocumentVault />
              </div>
            )}

            {currentView === "client_messages" && (
              <div className="animate-in fade-in duration-200">
                <ClientMessages />
              </div>
            )}
          </main>
        </div>
      )}

      {/* Global Footer with Official Regulatory Badges & Placeholders */}
      <Footer />

      {/* Modal: Client & Accountant Portal Login Selector */}
      <PortalLoginModal />

      {/* Modal: Interactive Consultation Intake */}
      <ConsultationModal />

      {/* Modal: Practice Creation Wizard (New Client, Property, Fee Note) */}
      <CreateEntityModal />
    </div>
  );
}
