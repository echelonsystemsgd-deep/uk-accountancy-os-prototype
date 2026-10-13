"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingDemoController from "@/components/shared/FloatingDemoController";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import ToastContainer from "@/components/shared/ToastContainer";
import IntakeDrawer from "@/components/shared/IntakeDrawer";
import CalendarBookingModal from "@/components/shared/CalendarBookingModal";
import WhatsAppQuickChat from "@/components/shared/WhatsAppQuickChat";

// Module 1 Components
import HeroSection from "@/components/frontend/HeroSection";
import TaxCalculator from "@/components/frontend/TaxCalculator";
import ServiceGrid from "@/components/frontend/ServiceGrid";
import CaseStudiesSection from "@/components/frontend/CaseStudiesSection";
import ComparisonSection from "@/components/frontend/ComparisonSection";
import TransferTimelineSection from "@/components/frontend/TransferTimelineSection";
import FaqSection from "@/components/frontend/FaqSection";

// Module 2 Components
import AdminHub from "@/components/admin/AdminHub";

// Module 3 Components
import ClientPortal from "@/components/portal/ClientPortal";

export default function Home() {
  const { currentView } = useDemoStore();

  return (
    <main className="min-h-screen bg-[#07080C] text-[#EDEDED] flex flex-col selection:bg-[#D4AF37]/25 selection:text-white">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header */}
      <Navbar />

      {/* Dynamic Module Viewport */}
      <div className="flex-1">
        {currentView === "prospect" && (
          <div className="animate-in fade-in duration-300">
            <HeroSection />
            <TaxCalculator />
            <ServiceGrid />
            <CaseStudiesSection />
            <ComparisonSection />
            <TransferTimelineSection />
            <FaqSection />
          </div>
        )}

        {currentView === "admin" && (
          <div className="animate-in fade-in duration-300">
            <AdminHub />
          </div>
        )}

        {currentView === "portal" && (
          <div className="animate-in fade-in duration-300">
            <ClientPortal />
          </div>
        )}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Intake Drawer (Detailed Specification Review) */}
      <IntakeDrawer />

      {/* Instant 60-Second Live Calendar Booking Slide-over / Modal */}
      <CalendarBookingModal />

      {/* Floating WhatsApp Quick-Chat Action Badge & Live Consultation Dialog */}
      <WhatsAppQuickChat />

      {/* Sticky Mobile Action Bar (Tested on 375px, 390px, 414px) */}
      <StickyMobileBar />

      {/* Floating Demo Controller Pill */}
      <FloatingDemoController />
    </main>
  );
}
