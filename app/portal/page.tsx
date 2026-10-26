"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalSidebar from "@/components/shared/PortalSidebar";
import ClientOverview from "@/components/portal/ClientOverview";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";
import ClientMessages from "@/components/portal/ClientMessages";
import { Smartphone, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

export default function PortalPage() {
  const { currentView, currentUser, loginWithCredentials } = useDemoStore();

  const [email, setEmail] = useState<string>("marcus.sterling@sterlingholdings.co.uk");
  const [passcode, setPasscode] = useState<string>("123456");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAuthenticated = Boolean(currentUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, passcode);
      if (!res.success) {
        setErrorMessage(res.error || "Client verification failed.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutofill = () => {
    setEmail("marcus.sterling@sterlingholdings.co.uk");
    setPasscode("123456");
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
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Landlord Tax Portal Access
              </h1>
              <p className="text-xs text-neutral-500">
                Secure Document Dropzone & Vault &bull; 2024/25 Property Tax Return
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-xs text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-900 font-medium">
                    Demo Client: <strong>Marcus Sterling</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 underline"
                >
                  Quick Autofill
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Registered Landlord / Investor Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus.sterling@sterlingholdings.co.uk"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  One-Time Passcode or Security PIN
                </label>
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Enter Private Dropzone</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 Encrypted &bull; 256-Bit Vault Protection</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex">
          <PortalSidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
            {currentView === "dropzone" && <MobileDropzone />}
            {currentView === "vault" && <ClientDocumentVault />}
            {currentView === "client_overview" && <ClientOverview />}
            {currentView === "client_messages" && <ClientMessages />}
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
}
