"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import {
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const { loginWithCredentials, enterClientPortal, enterAccountantPortal } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"client" | "accountant">("client");
  const [email, setEmail] = useState("sukhpreet@legacywealth.co.uk");
  const [password, setPassword] = useState("Sukhpreet@2024#");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginWithCredentials(email, password);
    setIsLoading(false);
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
    <div className="min-h-screen bg-obsidian-500 text-neutral-100 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="accountant-card max-w-lg w-full p-6 sm:p-8 bg-cardSurface border border-gold/30 rounded-2xl shadow-gold space-y-6 text-left">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <span className="text-[11px] font-bold text-gold uppercase tracking-widest font-crest">
              MERCIAN WEALTH TAX & LEDGER
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unified Security Gateway
            </h1>
            <p className="text-xs text-neutral-400">
              Role-Based Encrypted Access for Directors and Appointed Chartered Accountants
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-obsidian-400 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => handleTabChange("client")}
              className={`touch-target-44 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === "client"
                  ? "bg-gold text-obsidian shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>SPV Client / Director</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("accountant")}
              className={`touch-target-44 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === "accountant"
                  ? "bg-gold text-obsidian shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Chartered Accountant</span>
            </button>
          </div>

          {/* 1-Click Instant Review Button */}
          <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>Instant Prototype Review Access</span>
              </span>
              <span className="text-[10px] font-bold text-obsidian bg-gold px-2 py-0.5 rounded">
                1-Click
              </span>
            </div>
            <p className="text-[11px] text-neutral-300">
              {activeTab === "client"
                ? "Enter directly as Sukhpreet Kaur (SUKHPREET KAUR LEGACY WEALTH LTD)."
                : "Enter practice cockpit as Kalpesh Patel FCA (Appointed Partner)."}
            </p>
            <button
              type="button"
              onClick={() => {
                if (activeTab === "client") {
                  enterClientPortal("client_overview", "client-legacy-wealth");
                } else {
                  enterAccountantPortal("radar");
                }
              }}
              className="touch-target-44 w-full py-2.5 px-3 rounded-lg bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs flex items-center justify-between shadow-gold transition active:scale-95"
            >
              <span>{activeTab === "client" ? "Launch Director Portal (Sukhpreet Kaur)" : "Launch Partner Console (Kalpesh Patel FCA)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                {activeTab === "client" ? "Director Email" : "Practice Partner Email"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                Encrypted Passkey / Password
              </label>
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

            <button
              type="submit"
              disabled={isLoading}
              className="touch-target-44 w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold border border-neutral-700 transition flex items-center justify-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>{isLoading ? "Verifying Credentials..." : "Authenticate Session"}</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
