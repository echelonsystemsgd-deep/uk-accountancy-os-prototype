"use client";

import React, { useState, useEffect } from "react";
import { useDemoStore } from "@/lib/store";
import { EntityType, IntakeSubmission } from "@/lib/types";
import { X, Calendar, ShieldCheck, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export default function ConsultationModal() {
  const { isIntakeModalOpen, closeIntakeModal, intakeDefaultValues, addIntakeLead } =
    useDemoStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolioSize, setPortfolioSize] = useState("3-5 Properties");
  const [entityType, setEntityType] = useState<EntityType>("joint");
  const [annualRent, setAnnualRent] = useState(54000);
  const [mortgageInterest, setMortgageInterest] = useState(18000);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (intakeDefaultValues) {
      if (intakeDefaultValues.portfolioSize) setPortfolioSize(intakeDefaultValues.portfolioSize);
      if (intakeDefaultValues.annualRent) setAnnualRent(intakeDefaultValues.annualRent);
      if (intakeDefaultValues.mortgageInterest) setMortgageInterest(intakeDefaultValues.mortgageInterest);
      if (intakeDefaultValues.notes) setNotes(intakeDefaultValues.notes);
    }
  }, [intakeDefaultValues]);

  useEffect(() => {
    if (isIntakeModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isIntakeModalOpen]);

  if (!isIntakeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    addIntakeLead({
      fullName,
      email,
      phone: phone || "+44 7700 900812",
      portfolioSize,
      entityType,
      annualRent,
      mortgageInterest,
      notes: notes || "Requested property tax portfolio review.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="accountant-card max-w-lg w-full p-6 bg-white space-y-5 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="KP Tax Consultants"
              width={112}
              height={32}
              className="h-8 w-auto object-contain shrink-0"
            />
            <div>
              <h2 className="text-base font-bold text-neutral-900 leading-tight">
                Book Initial Property Tax Consultation
              </h2>
              <p className="text-xs text-neutral-500">
                With Kalpesh Patel FCA & Pritpal Chaggar CTA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIntakeModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="intake-full-name" className="font-semibold text-neutral-700 block">Your Full Name *</label>
              <input
                id="intake-full-name"
                aria-label="Your Full Name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. David Sterling"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="intake-email" className="font-semibold text-neutral-700 block">Email Address *</label>
              <input
                id="intake-email"
                aria-label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="d.sterling@synthetic-mail.co.uk"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="intake-phone" className="font-semibold text-neutral-700 block">UK Mobile Number</label>
              <input
                id="intake-phone"
                aria-label="UK Mobile Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900812"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="intake-portfolio-size" className="font-semibold text-neutral-700 block">Current Portfolio Size</label>
              <select
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
              >
                <option value="1-2 Properties">1-2 Properties</option>
                <option value="3-5 Properties">3-5 Properties</option>
                <option value="6-10 Properties">6-10 Properties</option>
                <option value="10+ Properties / Commercial">10+ Properties / Commercial</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-neutral-700 block">Ownership Structure</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "individual", label: "Individual Name" },
                { id: "joint", label: "Joint (Spouses)" },
                { id: "spv_ltd", label: "SPV Ltd Company" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEntityType(opt.id as any)}
                  className={`py-2 px-2 rounded border text-center font-medium transition text-[11px] ${
                    entityType === opt.id
                      ? "border-primary bg-neutral-50 text-neutral-900 font-semibold ring-1 ring-primary"
                      : "border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-neutral-700 block">Specific Tax Goals or Questions</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Concerned about Section 24 higher-rate tax, looking to incorporate 4 buy-to-lets into an SPV company..."
              className="w-full p-2.5 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
            />
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct Partner Consultation</span>
            </div>

            <button
              type="submit"
              className="touch-target-44 px-5 py-2.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1.5 shadow-sm"
            >
              <span>Submit & Open Practice Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
