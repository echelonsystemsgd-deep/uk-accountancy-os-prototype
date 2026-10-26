"use client";

import React, { useEffect } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import EnvironmentSwitcherBar from "@/components/shared/EnvironmentSwitcherBar";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import PortalSidebar from "@/components/shared/PortalSidebar";
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import ChaserView from "@/components/admin/ChaserView";
import FinancialStatementsHub from "@/components/admin/FinancialStatementsHub";
import PracticeInvoicingHub from "@/components/admin/PracticeInvoicingHub";
import WealthAdvisoryHub from "@/components/admin/WealthAdvisoryHub";
import CreateEntityModal from "@/components/admin/CreateEntityModal";

export default function AdminPage() {
  const { currentView, enterAccountantPortal } = useDemoStore();

  useEffect(() => {
    enterAccountantPortal("radar");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <ToastContainer />
      <EnvironmentSwitcherBar />
      <Navbar />

      <div className="flex-1 w-full max-w-[1600px] mx-auto flex">
        <PortalSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {currentView === "radar" && <PartnerRadar />}
          {currentView === "pipeline" && <LandlordPipeline />}
          {currentView === "statements" && <FinancialStatementsHub />}
          {currentView === "invoicing" && <PracticeInvoicingHub />}
          {currentView === "wealth_advisory" && <WealthAdvisoryHub />}
          {currentView === "workspace" && <PropertyWorkspace />}
          {currentView === "chaser" && <ChaserView />}
        </main>
      </div>

      <Footer />
      <CreateEntityModal />
      <LiveRoleDock />
    </div>
  );
}
