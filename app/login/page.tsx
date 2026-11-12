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
  UserCheck,
} from "lucide-react";

export default function LoginPage() {
  const { loginWithCredentials, enterClientPortal, enterAccountantPortal } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"client" | "accountant">("client");
  const [email, setEmail] = useState("deepgurtej28@gmail.com");
  const [password, setPassword] = useState("Gurtej@2008#");
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
      setEmail("deepgurtej28@gmail.com");
      setPassword("Gurtej@2008#");
    } else {
      setEmail("mercianwealthgs@gmail.com");
      setPassword("Gurtej@2008#");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="accountant-card max-w-md w-full p-6 sm:p-8 bg-[#162032] border border-[#1F293D] rounded-2xl shadow-sm space-y-6 text-left">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Mercian Wealth Access Gateway</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-400">
              Encrypted portal for SPV property clients and practice administrators
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#111827] rounded-xl border border-[#1F293D]">
            <button
              type="button"
              onClick={() => handleTabChange("client")}
              className={`touch-target-44 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "client"
                  ? "bg-[#0077C8] text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Client Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("accountant")}
              className={`touch-target-44 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === "accountant"
                  ? "bg-[#0077C8] text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Practice Admin</span>
            </button>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {activeTab === "client" ? "Client Email" : "Practice Admin Email"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white focus:outline-none focus:border-[#0077C8] text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white focus:outline-none focus:border-[#0077C8] pr-10 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="touch-target-44 w-full py-2.5 rounded-lg bg-[#0077C8] hover:bg-[#0284C7] text-white font-semibold transition flex items-center justify-center space-x-2 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-white" />
              <span>{isLoading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4 text-white ml-1" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
