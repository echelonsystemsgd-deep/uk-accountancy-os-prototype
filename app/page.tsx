"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalLoginModal from "@/components/shared/PortalLoginModal";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import MobileBottomDock from "@/components/shared/MobileBottomDock";

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
import PropertyPortfolioHub from "@/components/portal/PropertyPortfolioHub";
import LandlordBillTrackerHub from "@/components/portal/LandlordBillTrackerHub";
import DlaTrackerHub from "@/components/portal/DlaTrackerHub";
import MileageLogHub from "@/components/portal/MileageLogHub";
import TaxOptimizerHub from "@/components/portal/TaxOptimizerHub";
import TaxPackGeneratorHub from "@/components/portal/TaxPackGeneratorHub";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";
import ClientMessages from "@/components/portal/ClientMessages";

// Portal Sidebar Component
import PortalSidebar from "@/components/shared/PortalSidebar";

export default function Home() {
  const { currentMode, currentView } = useDemoStore();

  return (
    <div className="min-h-screen bg-obsidian-500 text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header & Navigation */}
      <Navbar />

      {/* Main Viewport Container */}
      {currentMode === "landing" ? (
        <main className="flex-1 w-full text-neutral-100">
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
          {/* Permanent Sidebar on Desktop (md+), Slide-out Drawer on Mobile */}
          <PortalSidebar />

          {/* Main Working View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden text-neutral-100">
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

            {/* Client Portal Hubs for SUKHPREET KAUR LEGACY WEALTH LTD */}
            {currentView === "client_overview" && (
              <div className="animate-in fade-in duration-200">
                <ClientOverview />
              </div>
            )}

            {currentView === "client_properties" && (
              <div className="animate-in fade-in duration-200">
                <PropertyPortfolioHub />
              </div>
            )}

            {currentView === "client_bills" && (
              <div className="animate-in fade-in duration-200">
                <LandlordBillTrackerHub />
              </div>
            )}

            {currentView === "client_dla" && (
              <div className="animate-in fade-in duration-200">
                <DlaTrackerHub />
              </div>
            )}

            {currentView === "client_mileage" && (
              <div className="animate-in fade-in duration-200">
                <MileageLogHub />
              </div>
            )}

            {currentView === "client_tax_optimizer" && (
              <div className="animate-in fade-in duration-200">
                <TaxOptimizerHub />
              </div>
            )}

            {currentView === "client_tax_pack" && (
              <div className="animate-in fade-in duration-200">
                <TaxPackGeneratorHub />
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

      {/* Global Footer (Rendered only on public landing page) */}
      {currentMode === "landing" && <Footer />}

      {/* Modal: Client & Accountant Portal Login Selector */}
      <PortalLoginModal />

      {/* Modal: Interactive Consultation Intake */}
      <ConsultationModal />

      {/* Modal: Practice Creation Wizard */}
      <CreateEntityModal />

      {/* Mobile Bottom Dock on smartphone viewports */}
      <MobileBottomDock />
    </div>
  );
}
