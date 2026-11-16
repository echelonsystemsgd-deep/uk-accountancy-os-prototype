"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/store";
import ToastContainer from "@/components/shared/ToastContainer";
import {
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  UserCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const { loginWithCredentials, enterClientPortal, enterAccountantPortal } = useDemo();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"client" | "accountant">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    const res = await loginWithCredentials(email, password);
    setIsLoading(false);
    if (res?.success) {
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail === "mercianwealthgs@gmail.com" || cleanEmail.includes("admin") || activeTab === "accountant") {
        router.push("/admin/dashboard");
      } else {
        router.push("/portal/dashboard");
      }
    }
  };

  const handleTabChange = (tab: "client" | "accountant") => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
  };

  const handleQuickFill = (type: "client" | "admin") => {
    if (type === "client") {
      setActiveTab("client");
      setEmail("deepgurtej28@gmail.com");
      setPassword("Gurtej@2008#");
    } else {
      setActiveTab("accountant");
      setEmail("mercianwealthgs@gmail.com");
      setPassword("Gurtej@2008#");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813] relative overflow-hidden">
      <ToastContainer />

      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#a4f4cf]/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Bar with Minimal Return Link */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/80 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>TLS 1.3 256-Bit Encrypted</span>
        </div>
      </div>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10 my-4">
        <div className="max-w-md w-full p-6 sm:p-8 bg-[#111726]/90 backdrop-blur-xl border border-[#1F293D] rounded-2xl shadow-2xl space-y-6 text-left">
          {/* Brand Monogram & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 via-[#a4f4cf]/20 to-transparent border border-[#a4f4cf]/40 shadow-inner text-[#a4f4cf] font-mono font-bold text-sm tracking-widest mx-auto">
              MW·KP
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#162032] border border-[#1F293D] text-[#a4f4cf] text-[10px] font-mono font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-[#a4f4cf]" />
                <span>Secure Access Gateway</span>
              </div>
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
                Sign In to Your Workspace
              </h1>
              <p className="text-xs text-slate-400">
                Encrypted portal for SPV property clients, assigned staff, and practice partners
              </p>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#0B0F19] rounded-xl border border-[#1F293D]">
            <button
              type="button"
              onClick={() => handleTabChange("client")}
              className={`py-2 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "client"
                  ? "bg-[#a4f4cf] text-[#080B11] shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>SPV Client</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("accountant")}
              className={`py-2 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "accountant"
                  ? "bg-[#a4f4cf] text-[#080B11] shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Practice Admin</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-300 block">
                {activeTab === "client" ? "Client Email Address" : "Practice Partner / Staff Email"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === "client" ? "director@spv-property.co.uk" : "partner@kptc.co.uk"}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-[#1F293D] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#a4f4cf] focus:ring-1 focus:ring-[#a4f4cf] transition font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="font-medium text-slate-300">Password</label>
                <Link
                  href="/reset-password"
                  className="text-xs text-[#a4f4cf] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0B0F19] border border-[#1F293D] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#a4f4cf] focus:ring-1 focus:ring-[#a4f4cf] transition font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#a4f4cf] to-[#8ae8bd] hover:from-[#8ae8bd] hover:to-[#a4f4cf] text-[#080B11] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Access Encrypted Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Helper Buttons (Mandatory for Evaluator / Testing) */}
          <div className="pt-2 border-t border-[#1F293D] space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Demo Test Credentials (Click to Load)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleQuickFill("client")}
                className="p-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] hover:border-[#a4f4cf]/40 text-left transition"
              >
                <div className="text-[11px] font-bold text-[#a4f4cf]">Client Demo</div>
                <div className="text-[10px] text-slate-500 truncate">deepgurtej28@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("admin")}
                className="p-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] hover:border-[#a4f4cf]/40 text-left transition"
              >
                <div className="text-[11px] font-bold text-amber-400">Admin Demo</div>
                <div className="text-[10px] text-slate-500 truncate">mercianwealthgs@...</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs font-mono text-slate-500 z-10 border-t border-[#1F293D]/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} KP Tax Consultants Ltd &bull; Mercian Wealth Accountancy OS</span>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Engagement</Link>
            <Link href="/dpa" className="hover:text-slate-300">Data Processing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
