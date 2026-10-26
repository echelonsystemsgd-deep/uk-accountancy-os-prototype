"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Smartphone,
} from "lucide-react";

export default function PortalLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithCredentials, enterClientPortal } =
    useDemoStore();

  const [activeTab, setActiveTab] = useState<"admin" | "client">("admin");
  const [email, setEmail] = useState<string>("mercianwealthgs@gmail.com");
  const [password, setPassword] = useState<string>("Gurtej@2008#");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Client tab fields
  const [clientEmail, setClientEmail] = useState<string>("marcus.sterling@sterlingholdings.co.uk");
  const [clientPasscode, setClientPasscode] = useState<string>("123456");

  React.useEffect(() => {
    if (isLoginModalOpen) {
      document.body.classList.add("modal-open");
      setErrorMessage(null);
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed. Please check credentials.");
      }
    } catch (err: any) {
      setErrorMessage("Connection error during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(clientEmail, clientPasscode);
      if (!res.success) {
        setErrorMessage(res.error || "Client verification failed.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail("mercianwealthgs@gmail.com");
    setPassword("Gurtej@2008#");
    setErrorMessage(null);
  };

  const fillClientCredentials = () => {
    setClientEmail("marcus.sterling@sterlingholdings.co.uk");
    setClientPasscode("123456");
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="accountant-card max-w-lg w-full p-6 sm:p-7 bg-white space-y-6 shadow-2xl relative rounded-xl border border-neutral-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm border border-neutral-800">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                  Mercian Wealth & Advisory
                </h2>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded">
                  PORTAL
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                UK Chartered Practice OS & Private Client Cockpit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeLoginModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md transition hover:bg-neutral-100"
            aria-label="Close login dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-neutral-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("admin");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition ${
              activeTab === "admin"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practice Admin / Partner</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("client");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition ${
              activeTab === "client"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Client Tax Portal</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Admin Login Form */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-amber-900 font-medium">
                  Configured for: <strong>Gurtej Singh</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-[11px] font-semibold text-amber-800 hover:text-amber-900 underline ml-2"
              >
                Autofill
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mercianwealthgs@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none font-medium"
                />
              </div>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none font-mono"
                />
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Master password provided: Gurtej@2008#
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-md shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authenticate Mercian Practice Admin</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Client Login Form */}
        {activeTab === "client" && (
          <form onSubmit={handleClientSubmit} className="space-y-4">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-900 font-medium">
                  Landlord Demo: <strong>Marcus Sterling</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={fillClientCredentials}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 underline ml-2"
              >
                Autofill
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Landlord / Investor Email
              </label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="marcus.sterling@sterlingholdings.co.uk"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                One-Time Secure Passcode / PIN
              </label>
              <input
                type="password"
                required
                value={clientPasscode}
                onChange={(e) => setClientPasscode(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-md shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Enter Landlord Dropzone</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Footnote */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit TLS 1.3 Encryption</span>
          </div>
          <span>UK Sovereign Data (London AWS/Supabase)</span>
        </div>
      </div>
    </div>
  );
}
