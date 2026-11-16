"use client";

import React, { useState } from "react";
import { useDemo } from "@/lib/store";
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
  UserCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const { loginWithCredentials, enterClientPortal, enterAccountantPortal } = useDemo();

  const [activeTab, setActiveTab] = useState<"client" | "accountant">("client");
  
  // Clean unfilled state as strictly mandated
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    await loginWithCredentials(email, password);
    setIsLoading(false);
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
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full p-6 sm:p-8 bg-[#14241d] border border-[#1e382b] rounded-2xl shadow-2xl space-y-6 text-left">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[#a4f4cf] text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a4f4cf]" />
              <span>Mercian &amp; KPTC Access Gateway</span>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-[#8a9d94]">
              Encrypted portal for SPV property clients, assigned staff, and practice partners
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#0c1813] rounded-xl border border-[#1e382b]">
            <button
              type="button"
              onClick={() => handleTabChange("client")}
              className={`py-2.5 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "client"
                  ? "bg-[#a4f4cf] text-[#0c1813] shadow-sm font-bold"
                  : "text-[#8a9d94] hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>SPV Client</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("accountant")}
              className={`py-2.5 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "accountant"
                  ? "bg-[#a4f4cf] text-[#0c1813] shadow-sm font-bold"
                  : "text-[#8a9d94] hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Practice Admin</span>
            </button>
          </div>

          {/* Login Form (Clean & Unfilled) */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 font-medium mb-1 font-sans">
                {activeTab === "client" ? "Client Email" : "Practice Admin Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeTab === "client" ? "client@example.com" : "partner@kptc.co.uk"}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] transition text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] transition text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a9d94] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 rounded-lg font-display font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] disabled:opacity-40 disabled:pointer-events-none text-[#0c1813] flex items-center justify-center space-x-2 shadow-sm transition active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? "Authenticating..." : "Access Encrypted Portal"}</span>
            </button>
          </form>

          {/* Quick-Fill Developer / Evaluation Helper */}
          <div className="pt-3 border-t border-[#1e382b] space-y-2 text-[11px] font-mono">
            <span className="text-[#8a9d94] block text-[10px] uppercase tracking-wider font-sans">
              Demo Credentials (Click to load):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("client")}
                className="p-2 rounded bg-[#0c1813] border border-[#1e382b] hover:border-[#a4f4cf]/40 text-left transition"
              >
                <span className="text-[#a4f4cf] block font-bold">Client Demo</span>
                <span className="text-[10px] text-[#8a9d94] truncate block">deepgurtej28@...</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("admin")}
                className="p-2 rounded bg-[#0c1813] border border-[#1e382b] hover:border-[#a4f4cf]/40 text-left transition"
              >
                <span className="text-[#a4f4cf] block font-bold">Admin Demo</span>
                <span className="text-[10px] text-[#8a9d94] truncate block">mercianwealthgs@...</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
