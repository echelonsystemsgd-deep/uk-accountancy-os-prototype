"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import PortalSidebar from "@/components/shared/PortalSidebar";
import EnvironmentSwitcherBar from "@/components/shared/EnvironmentSwitcherBar";
import LiveRoleDock from "@/components/shared/LiveRoleDock";
import ClientOverview from "@/components/portal/ClientOverview";
import MobileDropzone from "@/components/portal/MobileDropzone";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";
import ClientMessages from "@/components/portal/ClientMessages";
import { Smartphone, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

export default function PortalPage() {
  const { currentView, currentUser, loginWithCredentials, loginAsClientDemo } = useDemoStore();

  const [email, setEmail] = useState<string>("marcus.sterling@sterlingholdings.co.uk");
  const [password, setPassword] = useState<string>("123456");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <ToastContainer />
      <EnvironmentSwitcherBar />
      <Navbar />

      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="accountant-card max-w-md w-full p-6 sm:p-8 bg-white space-y-6 shadow-xl rounded-2xl border border-neutral-200">
            <div className="text-center space-y-2">
              <img
                src="/logo.png"
                alt="KP Tax Consultants Official Emblem"
                width={140}
                height={40}
                className="h-11 w-auto object-contain mx-auto"
              />
              <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Landlord Tax Portal Access
              </h1>
              <p className="text-xs text-neutral-500">
                Secure Document Dropzone & Vault &bull; 2024/25 Property Tax Return
              </p>
            </div>

            {/* 1-Click Prototype Review Access for Landlord Dropzone */}
            <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Landlord Client Prototype Mode</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Test the mobile document dropzone, camera upload OCR, and statutory tax vault with 1 click.
              </p>
              <button
                type="button"
                onClick={loginAsClientDemo}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition active:scale-95"
              >
                <span>⚡ Enter as Landlord Client (Marcus Sterling)</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-xs text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Landlord / Investor Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. landlord@example.co.uk"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700">
                    Password / Access Key
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
                  placeholder="Enter password"
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
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Enter Landlord Dropzone</span>
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
      <LiveRoleDock />
    </div>
  );
}
