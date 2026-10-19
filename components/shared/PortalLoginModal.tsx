"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  X,
  Briefcase,
  Smartphone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";

export default function PortalLoginModal() {
  const { isLoginModalOpen, closeLoginModal, enterAccountantPortal, enterClientPortal } =
    useDemoStore();

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="accountant-card max-w-lg w-full p-6 bg-white space-y-5 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
              KP
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 leading-tight">
                Kai Accountants Portal Access
              </h2>
              <p className="text-xs text-neutral-500">
                Choose your portal environment:
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeLoginModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md transition"
            aria-label="Close login dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Two Portals */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* Option 1: Accountant Portal */}
          <div
            onClick={() => enterAccountantPortal("radar")}
            className="p-4 rounded-lg border-2 border-neutral-200 hover:border-primary hover:bg-neutral-50/70 transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded bg-primary text-white flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-primary transition">
                    Accountant Practice Portal
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    For Partners & Practice Staff
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition inline-flex items-center">
                <span>Enter</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
            <p className="text-xs text-neutral-600 pl-11">
              Access the Partner Radar, Landlord Pipeline, Per-Property Document Checklists, and WhatsApp Chaser Trail.
            </p>
          </div>

          {/* Option 2: Client Portal */}
          <div
            onClick={() => enterClientPortal("dropzone")}
            className="p-4 rounded-lg border-2 border-neutral-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded bg-emerald-700 text-white flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-800 transition">
                    Landlord Client Portal
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    For Portfolio Owners & SPV Directors
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition inline-flex items-center">
                <span>Enter</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
            <p className="text-xs text-neutral-600 pl-11">
              Passwordless mobile dropzone (375px) for snapping phone photos of mortgage certificates and viewing your encrypted document vault.
            </p>
          </div>
        </div>

        {/* Security Footnote */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
          <span>Encrypted with 256-bit TLS in UK Data Centers (London)</span>
        </div>
      </div>
    </div>
  );
}
