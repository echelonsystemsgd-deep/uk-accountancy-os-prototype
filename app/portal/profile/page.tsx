"use client";

import React, { useState } from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import { useDemo } from "@/lib/store";
import { User, ShieldCheck, Lock, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";

export default function ClientProfilePage() {
  const { triggerToast } = useDemo();
  const [fullName, setFullName] = useState("Gurtej Singh");
  const [email] = useState("deepgurtej28@gmail.com");
  const [phone, setPhone] = useState("+44 7851 055929");
  const [showUtr, setShowUtr] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Profile Updated", "Client contact preferences saved.", "success");
  };

  return (
    <ClientPortalLayout
      pageTitle="Client Profile &amp; Security Settings"
      pageSubtitle="Manage verified contact details, encrypted statutory identifiers, and session credentials"
    >
      <div className="max-w-3xl space-y-8 font-mono text-xs">
        {/* Contact Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-5">
          <span className="text-xs uppercase tracking-wider text-[#a4f4cf] font-bold block font-sans">
            Primary Contact Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813]/60 border border-[#1e382b] text-[#8a9d94] text-xs cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">Phone Number (SMS Notifications)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold font-sans text-xs flex items-center gap-1.5 transition hover:bg-[#8ae8bd]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

        {/* Encrypted Identifiers Vault (pgcrypto AES-256) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#a4f4cf]" />
              <span className="text-xs uppercase tracking-wider text-white font-bold font-sans">
                Statutory Identifiers (pgcrypto AES-256 Encrypted)
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Audit-Logged
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-[#0c1813] border border-[#1e382b] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8a9d94] block uppercase">Unique Taxpayer Reference (UTR)</span>
                <span className="text-white font-bold text-sm">
                  {showUtr ? "99201 48911" : "•••••• 4891"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUtr(!showUtr);
                  if (!showUtr) triggerToast("Access Logged", "Decryption event recorded in audit logs.", "info");
                }}
                className="text-xs text-[#8a9d94] hover:text-white flex items-center gap-1"
              >
                {showUtr ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showUtr ? "Hide" : "Reveal"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0c1813] border border-[#1e382b] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8a9d94] block uppercase">National Insurance Number (NINO)</span>
                <span className="text-white font-bold text-sm">•••••• 21B</span>
              </div>
              <span className="text-[10px] text-[#8a9d94]">Locked by Practice Admin</span>
            </div>
          </div>
        </div>
      </div>
    </ClientPortalLayout>
  );
}
