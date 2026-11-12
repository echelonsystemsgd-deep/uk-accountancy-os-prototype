"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalSidebar from "@/components/shared/PortalSidebar";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import MobileBottomDock from "@/components/shared/MobileBottomDock";
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
import { Smartphone, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

export default function PortalPage() {
  const { currentView, setCurrentView, currentUser, loginWithCredentials, loginAsClientDemo, activeClient } = useDemoStore();

  const [email, setEmail] = useState<string>("sukhpreet@legacywealth.co.uk");
  const [password, setPassword] = useState<string>("Sukhpreet@2024#");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-switch to client mode on direct route visit
  React.useEffect(() => {
    const validClientViews = [
      "client_overview",
      "client_properties",
      "client_bills",
      "client_dla",
      "client_mileage",
      "client_tax_optimizer",
      "client_tax_pack",
      "dropzone",
      "vault",
      "client_messages",
    ];

    if (!validClientViews.includes(currentView)) {
      if (!currentUser || currentUser.role !== "client") {
        loginAsClientDemo("client-legacy-wealth");
      } else {
        setCurrentView("client_overview");
      }
    }
  }, [currentView, currentUser, setCurrentView, loginAsClientDemo]);

  const isAuthenticated = Boolean(currentUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Client verification failed. Invalid email or password.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-500 text-neutral-100 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />

      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="accountant-card max-w-md w-full p-6 sm:p-8 bg-cardSurface border border-gold/30 space-y-6 shadow-2xl rounded-2xl">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block font-crest">
                MERCIAN WEALTH TAX & LEDGER
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                SPV Client Portal Access
              </h1>
              <p className="text-xs text-neutral-400">
                SUKHPREET KAUR LEGACY WEALTH LTD &bull; Section 24 Corporate Tax Vault
              </p>
            </div>

            {/* 1-Click Instant Access */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span>Director Instant Prototype Access</span>
                </span>
                <span className="text-[10px] font-bold text-obsidian bg-gold px-2 py-0.5 rounded">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Test the SPV portfolio ledger, DLA tracker, OCR scanner, and 1-Click HMRC Tax Pack generator.
              </p>
              <button
                type="button"
                onClick={() => loginAsClientDemo("client-legacy-wealth")}
                className="w-full py-2.5 px-3 rounded-lg bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs flex items-center justify-between shadow-gold transition active:scale-95"
              >
                <span>Enter as Sukhpreet Kaur (Director)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Director Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sukhpreet@legacywealth.co.uk"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-ruby/15 border border-ruby/30 text-ruby text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition border border-neutral-700 flex items-center justify-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5 text-gold" />
                <span>{isSubmitting ? "Authenticating..." : "Sign In to Client Portal"}</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Permanent Desktop Sidebar */}
          <PortalSidebar />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {currentView === "client_overview" && <ClientOverview />}
            {currentView === "client_properties" && <PropertyPortfolioHub />}
            {currentView === "client_bills" && <LandlordBillTrackerHub />}
            {currentView === "client_dla" && <DlaTrackerHub />}
            {currentView === "client_mileage" && <MileageLogHub />}
            {currentView === "client_tax_optimizer" && <TaxOptimizerHub />}
            {currentView === "client_tax_pack" && <TaxPackGeneratorHub />}
            {currentView === "dropzone" && <MobileDropzone />}
            {currentView === "vault" && <ClientDocumentVault />}
            {currentView === "client_messages" && <ClientMessages />}
          </main>
        </div>
      )}

      {/* Floating Role Dock */}
      <LiveRoleDock />

      {/* Mobile Ergonomic Bottom Dock for Thumb-Zone Navigation */}
      <MobileBottomDock />

      <Footer />
    </div>
  );
}
