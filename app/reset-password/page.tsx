"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import { useDemo } from "@/lib/store";
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { triggerToast } = useDemo();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    triggerToast(
      "Password Reset Dispatched",
      `Encrypted reset instructions delivered to ${email}.`,
      "success"
    );
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
              <span>Credential Recovery</span>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-[#8a9d94]">
              Enter your registered account email to receive a secure single-use recovery token
            </p>
          </div>

          {isSent ? (
            <div className="p-6 rounded-xl bg-[#0c1813] border border-[#1e382b] text-center space-y-4 font-mono text-xs">
              <CheckCircle2 className="w-8 h-8 text-[#a4f4cf] mx-auto" />
              <p className="text-slate-200">
                A password reset link has been dispatched to <span className="text-[#a4f4cf] font-bold">{email}</span>. Valid for 15 minutes.
              </p>
              <Link
                href="/login"
                className="inline-block px-5 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 font-sans font-medium mb-1">Account Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-display font-bold text-xs bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] flex items-center justify-center space-x-2 transition shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Reset Link</span>
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-[#8a9d94] font-sans">
            Remember password?{" "}
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
