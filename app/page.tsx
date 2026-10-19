"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingDemoController from "@/components/shared/FloatingDemoController";
import ToastContainer from "@/components/shared/ToastContainer";

// The 5 Demonstrator Screens
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ChaserView from "@/components/admin/ChaserView";

export default function Home() {
  const { currentView } = useDemoStore();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Global Header & Navigation */}
      <Navbar />

      {/* Dynamic 5-Screen Demonstration Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        {currentView === "workspace" && (
          <div className="animate-in fade-in duration-200">
            <PropertyWorkspace />
          </div>
        )}

        {currentView === "dropzone" && (
          <div className="animate-in fade-in duration-200">
            <MobileDropzone />
          </div>
        )}

        {currentView === "chaser" && (
          <div className="animate-in fade-in duration-200">
            <ChaserView />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Demo Switcher */}
      <FloatingDemoController />
    </div>
  );
}
