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
  Crown,
} from "lucide-react";

export default function PortalLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithCredentials, loginAsPartnerDemo, loginAsClientDemo } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"client" | "accountant">("client");
  const [email, setEmail] = useState<string>("sukhpreet@legacywealth.co.uk");
  const [password, setPassword] = useState<string>("Sukhpreet@2024#");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed. Invalid email or password.");
      } else {
        closeLoginModal();
      }
    } catch (err: any) {
      setErrorMessage("Authentication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (tab: "client" | "accountant") => {
    setActiveTab(tab);
    if (tab === "client") {
      setEmail("sukhpreet@legacywealth.co.uk");
      setPassword("Sukhpreet@2024#");
    } else {
      setEmail("kalpesh@kptc.co.uk");
      setPassword("Partner@2024#");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="accountant-card max-w-md w-full p-6 sm:p-7 bg-cardSurface border border-gold/30 rounded-2xl shadow-gold space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider font-crest block">
              MERCIAN WEALTH SECURITY
            </span>
            <h3 className="text-lg font-bold text-white">Unified Portal Access</h3>
          </div>
          <button
            type="button"
            onClick={closeLoginModal}
            className="touch-target-44 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-obsidian-400 rounded-lg border border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleTabChange("client")}
            className={`py-2 rounded-md transition flex items-center justify-center space-x-1.5 ${
              activeTab === "client" ? "bg-gold text-obsidian shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Director / Client</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("accountant")}
            className={`py-2 rounded-md transition flex items-center justify-center space-x-1.5 ${
              activeTab === "accountant" ? "bg-gold text-obsidian shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Chartered Accountant</span>
          </button>
        </div>

        {/* Instant Access Box */}
        <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Instant Prototype Sign In</span>
            </span>
            <span className="text-[10px] font-bold text-obsidian bg-gold px-2 py-0.5 rounded">
              Bypass
            </span>
          </div>
          <p className="text-[11px] text-neutral-300">
            {activeTab === "client"
              ? "Access SUKHPREET KAUR LEGACY WEALTH LTD portfolio ledger."
              : "Access practice cockpit as Kalpesh Patel FCA."}
          </p>
          <button
            type="button"
            onClick={() => {
              if (activeTab === "client") {
                loginAsClientDemo("client-legacy-wealth");
              } else {
                loginAsPartnerDemo();
              }
              closeLoginModal();
            }}
            className="touch-target-44 w-full py-2.5 px-3 rounded-lg bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs flex items-center justify-between shadow-gold transition active:scale-95"
          >
            <span>{activeTab === "client" ? "Enter as Sukhpreet Kaur" : "Enter as Kalpesh Patel FCA"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-2.5 rounded-lg bg-ruby/15 border border-ruby/30 text-ruby text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={closeLoginModal}
              className="touch-target-44 px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="touch-target-44 px-5 py-2.5 rounded-lg font-bold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
