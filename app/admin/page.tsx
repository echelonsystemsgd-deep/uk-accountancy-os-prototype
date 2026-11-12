"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalSidebar from "@/components/shared/PortalSidebar";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import ChaserView from "@/components/admin/ChaserView";
import FinancialStatementsHub from "@/components/admin/FinancialStatementsHub";
import PracticeInvoicingHub from "@/components/admin/PracticeInvoicingHub";
import WealthAdvisoryHub from "@/components/admin/WealthAdvisoryHub";
import OpenBankingHub from "@/components/admin/OpenBankingHub";
import CreateEntityModal from "@/components/admin/CreateEntityModal";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, Crown } from "lucide-react";

export default function AdminPage() {
  const { currentView, setCurrentView, currentUser, loginWithCredentials, loginAsPartnerDemo, activeClient } = useDemoStore();

  const [email, setEmail] = useState<string>("kalpesh@kptc.co.uk");
  const [password, setPassword] = useState<string>("Partner@2024#");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAuthenticated = currentUser?.role === "admin" || currentUser?.role === "accountant";

  // Auto-switch to accountant practice OS view on route visit
  React.useEffect(() => {
    const accountantViews = ["radar", "pipeline", "statements", "invoicing", "open_banking", "wealth_advisory", "workspace", "chaser"];
    if (!accountantViews.includes(currentView)) {
      if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "accountant")) {
        loginAsPartnerDemo();
      } else {
        setCurrentView("radar");
      }
    }
  }, [currentView, currentUser, setCurrentView, loginAsPartnerDemo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed. Invalid email or password.");
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
                Chartered Practice Console
              </h1>
              <p className="text-xs text-neutral-400">
                Senior Partner Review &bull; Kalpesh Patel FCA &bull; ICAEW Regulated
              </p>
            </div>

            {/* 1-Click Instant Access */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span>Partner Instant Prototype Mode</span>
                </span>
                <span className="text-[10px] font-bold text-obsidian bg-gold px-2 py-0.5 rounded">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Bypass manual passwords and enter Practice Console immediately as senior partner.
              </p>
              <button
                type="button"
                onClick={() => loginAsPartnerDemo()}
                className="w-full py-2.5 px-3 rounded-lg bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs flex items-center justify-between shadow-gold transition active:scale-95"
              >
                <span>Enter as Senior Partner (Kalpesh Patel FCA)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Practitioner Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kalpesh@kptc.co.uk"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Password
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
                <span>{isSubmitting ? "Authenticating..." : "Sign In to Practice OS"}</span>
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
            {currentView === "radar" && <PartnerRadar />}
            {currentView === "pipeline" && <LandlordPipeline />}
            {currentView === "workspace" && <PropertyWorkspace />}
            {currentView === "chaser" && <ChaserView />}
            {currentView === "statements" && <FinancialStatementsHub />}
            {currentView === "invoicing" && <PracticeInvoicingHub />}
            {currentView === "wealth_advisory" && <WealthAdvisoryHub />}
            {currentView === "open_banking" && <OpenBankingHub />}
          </main>
        </div>
      )}

      {/* Floating Role Dock */}
      <LiveRoleDock />

      <CreateEntityModal />
      <Footer />
    </div>
  );
}
