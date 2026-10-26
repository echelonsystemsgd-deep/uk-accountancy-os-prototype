"use client";

import React, { useEffect } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import EnvironmentSwitcherBar from "@/components/shared/EnvironmentSwitcherBar";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import PortalSidebar from "@/components/shared/PortalSidebar";
import ClientOverview from "@/components/portal/ClientOverview";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";
import ClientMessages from "@/components/portal/ClientMessages";

export default function PortalPage() {
  const { currentView, enterClientPortal } = useDemoStore();

  useEffect(() => {
    enterClientPortal("dropzone");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <ToastContainer />
      <EnvironmentSwitcherBar />
      <Navbar />

      <div className="flex-1 w-full max-w-[1600px] mx-auto flex">
        <PortalSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {currentView === "dropzone" && <MobileDropzone />}
          {currentView === "vault" && <ClientDocumentVault />}
          {currentView === "client_overview" && <ClientOverview />}
          {currentView === "client_messages" && <ClientMessages />}
        </main>
      </div>

      <Footer />
      <LiveRoleDock />
    </div>
  );
}
