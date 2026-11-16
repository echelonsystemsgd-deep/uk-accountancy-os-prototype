"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastContainer from "@/components/shared/ToastContainer";
import { useDemo } from "@/lib/store";
import { ShieldCheck, ArrowRight, Building2, User, Mail, Phone, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EnquiryPage() {
  const { triggerToast } = useDemo();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolioSize, setPortfolioSize] = useState("1-3");
  const [serviceNeeded, setServiceNeeded] = useState("SPV_CT600");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    triggerToast(
      "Enquiry Received",
      "Your property accounting enquiry has been assigned to Kalpesh Patel FCA & Pritpal Chaggar CTA.",
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-[#0c1813] text-slate-100 flex flex-col justify-between selection:bg-[#a4f4cf] selection:text-[#0c1813]">
      <ToastContainer />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-left">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Direct Client Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Schedule Practice Consultation &amp; Scope SPV
          </h1>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
            Connect directly with ICAEW &amp; CIOT partners to review your Section 24 exposure, structure your Director’s Loan Account (DLA), and prepare for MTD ITSA.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-[#14241d] border border-[#1e382b] text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#a4f4cf]/20 text-[#a4f4cf] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-white">Enquiry Confirmed</h2>
              <p className="text-sm text-[#8a9d94] max-w-md mx-auto">
                Thank you, {fullName}. Pritpal Chaggar CTA or Kalpesh Patel FCA will review your portfolio details and revert within 4 business hours.
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold text-xs font-mono"
              >
                Access Client Portal
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white font-medium text-xs font-mono"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-2xl bg-[#14241d] border border-[#1e382b] shadow-2xl space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 font-sans font-medium mb-1.5">Full Name</label>
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
                <label className="block text-slate-300 font-sans font-medium mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gurtej@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-sans font-medium mb-1.5">Contact Phone</label>
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
                <label className="block text-slate-300 font-sans font-medium mb-1.5">Portfolio Size</label>
                <select
                  value={portfolioSize}
                  onChange={(e) => setPortfolioSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
                >
                  <option value="1-3">1 - 3 Properties (Initial SPV)</option>
                  <option value="4-10">4 - 10 Properties (Active Portfolio)</option>
                  <option value="10+">10+ Properties (Commercial / Multi-SPV)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1.5">Primary Accounting Requirement</label>
              <select
                value={serviceNeeded}
                onChange={(e) => setServiceNeeded(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              >
                <option value="SPV_CT600">SPV Limited Company Accounts &amp; CT600 Filing</option>
                <option value="SECTION_24">Section 24 Mortgage Relief Restructuring</option>
                <option value="DLA_ADVISORY">Director's Loan Account (DLA) &amp; Equity Extraction</option>
                <option value="MTD_ITSA">Making Tax Digital (MTD ITSA) Quarterly Compliance</option>
                <option value="SELF_ASSESSMENT">Landlord Self Assessment Tax Return (SA100/105)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1.5">Portfolio Notes / Specific Questions</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention lenders (e.g. Paragon, Aldermore), mortgage amounts, or upcoming property purchases..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] font-display font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#a4f4cf]/20"
            >
              <span>Submit Practice Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
