"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import { useDemo } from "@/lib/store";
import { ShieldCheck, ArrowRight, Lock, Mail, User, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { triggerToast } = useDemo();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      triggerToast("Terms Required", "Please accept the Terms of Engagement & Privacy Notice.", "warning");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerToast("Account Created", "Your client onboarding workspace is ready.", "success");
      router.push("/portal/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full p-6 sm:p-8 bg-[#14241d] border border-[#1e382b] rounded-2xl shadow-2xl space-y-6 text-left">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 text-[#a4f4cf] text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client Onboarding</span>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
              Create Client Portal Account
            </h1>
            <p className="text-xs text-[#8a9d94]">
              Manage UK property SPVs, upload statutory documents, and track Section 24 relief
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Gurtej Singh"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Contact Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7851 055929"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <div className="flex items-start gap-2 pt-1 font-sans text-[11px] text-[#8a9d94]">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#1e382b] bg-[#0c1813] text-[#a4f4cf] focus:ring-0"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <Link href="/terms" className="text-[#a4f4cf] underline">
                  Terms of Engagement
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#a4f4cf] underline">
                  Privacy Notice
                </Link>{" "}
                under UK GDPR.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-display font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? "Provisioning Vault..." : "Register Client Account"}</span>
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#8a9d94] font-sans">
            Already registered?{" "}
            <Link href="/login" className="text-[#a4f4cf] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
