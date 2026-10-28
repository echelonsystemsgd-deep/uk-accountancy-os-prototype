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
  AlertCircle,
  Briefcase,
  Smartphone,
} from "lucide-react";

export default function PortalLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithCredentials, loginAsPartnerDemo, loginAsClientDemo } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"admin" | "client">("admin");
  const [email, setEmail] = useState<string>("kalpesh@kptc.co.uk");
  const [password, setPassword] = useState<string>("admin123");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Client tab fields
  const [clientEmail, setClientEmail] = useState<string>("marcus.sterling@sterlingholdings.co.uk");
  const [clientPassword, setClientPassword] = useState<string>("123456");
  const [showClientPassword, setShowClientPassword] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage(res.error || "Authentication failed. Invalid email or password.");
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
      const res = await loginWithCredentials(clientEmail, clientPassword);
      if (!res.success) {
        setErrorMessage(res.error || "Client verification failed. Invalid credentials.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="accountant-card max-w-lg w-full p-6 sm:p-7 bg-white space-y-6 shadow-2xl relative rounded-xl border border-neutral-200">
        {/* Header with Official KP Tax Consultants Emblem */}
        <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="KP Tax Consultants Official Emblem"
              width={120}
              height={36}
              className="h-9 w-auto object-contain shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                  KP Accountants Portal Access
                </h2>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200 rounded">
                  SECURE
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Chartered Tax Advisers &bull; ICAEW Regulated Practice
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
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Practice Staff / Partner</span>
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
            <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Landlord Client Portal</span>
          </button>
        </div>

        {/* Prototype Review Quick Access (For KPTC Accountants) */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-950 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>KP Accountants Prototype Evaluation Mode</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
              1-Click Demo
            </span>
          </div>
          <p className="text-[11px] text-amber-800/90 leading-relaxed">
            Partners and staff can bypass manual password entry to immediately evaluate the 8 Practice OS modules and client vault.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={loginAsPartnerDemo}
              className="w-full py-2 px-3 rounded-lg bg-neutral-900 text-amber-300 hover:bg-neutral-800 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition active:scale-95"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ Enter as Partner (Kalpesh Patel FCA)</span>
            </button>
            <button
              type="button"
              onClick={loginAsClientDemo}
              className="w-full py-2 px-3 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>⚡ Enter as Landlord Client</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Practice Admin Form */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Accountant Practice Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@firm.co.uk"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
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
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-primary hover:bg-neutral-800 text-white font-semibold text-xs rounded-md shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sign In to Practice OS</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Client Login Form */}
        {activeTab === "client" && (
          <form onSubmit={handleClientSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Landlord / Investor Email
              </label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. landlord@example.co.uk"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password / Access Key
                </label>
                <button
                  type="button"
                  onClick={() => setShowClientPassword(!showClientPassword)}
                  className="text-[11px] text-neutral-500 hover:text-neutral-700 flex items-center space-x-1"
                >
                  {showClientPassword ? (
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
                type={showClientPassword ? "text" : "password"}
                required
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
                placeholder="Enter password"
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
          <span>UK Sovereign Data (London)</span>
        </div>
      </div>
    </div>
  );
}
