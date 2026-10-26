"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalSidebar from "@/components/shared/PortalSidebar";
import PartnerRadar from "@/components/admin/PartnerRadar";
import LandlordPipeline from "@/components/admin/LandlordPipeline";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import ChaserView from "@/components/admin/ChaserView";
import FinancialStatementsHub from "@/components/admin/FinancialStatementsHub";
import PracticeInvoicingHub from "@/components/admin/PracticeInvoicingHub";
import WealthAdvisoryHub from "@/components/admin/WealthAdvisoryHub";
import CreateEntityModal from "@/components/admin/CreateEntityModal";
import { Lock, ShieldCheck, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminPage() {
  const { currentView, currentUser, loginWithCredentials } = useDemoStore();

  const [email, setEmail] = useState<string>("mercianwealthgs@gmail.com");
  const [password, setPassword] = useState<string>("Gurtej@2008#");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAuthenticated = currentUser?.role === "admin" || currentUser?.role === "accountant";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed. Check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutofill = () => {
    setEmail("mercianwealthgs@gmail.com");
    setPassword("Gurtej@2008#");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />

      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="accountant-card max-w-md w-full p-6 sm:p-8 bg-white space-y-6 shadow-xl rounded-2xl border border-neutral-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-md border border-neutral-800">
                M
              </div>
              <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Mercian Practice OS Access
              </h1>
              <p className="text-xs text-neutral-500">
                UK Accountancy Cockpit &bull; Secure Partner Authentication Gate
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-xs text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-amber-900 font-medium">
                    Principal: <strong>Gurtej Singh</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[11px] font-semibold text-amber-800 hover:text-amber-900 underline"
                >
                  Quick Autofill
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Practice Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mercianwealthgs@gmail.com"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-700 flex items-center space-x-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Gurtej@2008#"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unlock Practice Cockpit</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 Encrypted &bull; London AWS / Supabase Node</span>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      <Footer />
      <CreateEntityModal />
    </div>
  );
}
