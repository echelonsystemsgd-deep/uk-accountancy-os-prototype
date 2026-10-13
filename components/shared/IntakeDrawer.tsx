"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { IntakeSubmission } from "@/lib/types";
import {
  X,
  Building,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Clock,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react";

export default function IntakeDrawer() {
  const { isIntakeOpen, setIsIntakeOpen, addIntakeClient, setCurrentView } = useDemoStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form fields
  const [companyName, setCompanyName] = useState("");
  const [incorporationYear, setIncorporationYear] = useState("2021");
  const [directorName, setDirectorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [turnoverBracket, setTurnoverBracket] = useState("£500k – £1M");
  const [currentSoftware, setCurrentSoftware] = useState("Xero");
  const [bottlenecks, setBottlenecks] = useState<string[]>([
    "Receipt chasing & disorganized records",
  ]);
  const [preferredTime, setPreferredTime] = useState("Tomorrow Afternoon (2:00 PM)");

  if (!isIntakeOpen) return null;

  const toggleBottleneck = (item: string) => {
    if (bottlenecks.includes(item)) {
      setBottlenecks(bottlenecks.filter((b) => b !== item));
    } else {
      setBottlenecks([...bottlenecks, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: IntakeSubmission = {
      companyName: companyName || "Mayfair Technology Ventures Ltd",
      incorporationYear,
      directorName: directorName || "Alexander Wright",
      email: email || "a.wright@mayfairtech.co.uk",
      phone: phone || "+44 7700 900214",
      turnoverBracket,
      currentSoftware,
      bottlenecks,
      preferredConsultationTime: preferredTime,
    };

    setTimeout(() => {
      addIntakeClient(submission);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleClose = () => {
    setIsIntakeOpen(false);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
    }, 300);
  };

  const handleViewInPartnerHub = () => {
    handleClose();
    setCurrentView("admin");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      {/* Drawer / Modal Container */}
      <div
        className="w-full sm:max-w-xl bg-[#0B0F17] border-t sm:border border-[#D4AF37]/40 sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Handle bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070A0F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E2638] to-[#070A0F] border border-[#D4AF37]/40 flex items-center justify-center">
              <span className="font-serif-luxury text-sm font-bold text-gold-300">A</span>
            </div>
            <div>
              <h3 className="font-serif-luxury text-base sm:text-lg font-semibold text-white">
                Book Strategic Consultation
              </h3>
              <p className="text-[11px] text-gold-400">
                UK Limited Company Advisory & Tax Architecture
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors touch-target-48 sm:touch-target-auto"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center mx-auto text-gold-300 shadow-gold-subtle">
                <CheckCircle2 className="w-8 h-8 text-gold-400" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
                  Consultation Confirmed
                </span>
                <h4 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  Intake File Created
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-white">{directorName || "Director"}</strong>. Your company file for{" "}
                  <strong className="text-gold-300">{companyName || "your Limited Company"}</strong> has been registered with our senior tax team.
                </p>
              </div>

              {/* Reactive link badge */}
              <div className="p-4 rounded-xl bg-[#111827] border border-[#D4AF37]/30 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-gold-300 font-medium">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Reactive State Synchronized Across Demo:</span>
                </div>
                <p className="text-slate-300">
                  This intake submission has instantly populated into the <strong className="text-white">Partner Command Hub</strong> under the <em>'New Intake'</em> pipeline column.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleViewInPartnerHub}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
                >
                  <span>Inspect in Partner Pipeline</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#111827] border border-white/10 hover:border-white/20 text-slate-200 text-xs py-3.5 px-4 rounded-xl touch-target-48 active:scale-95 transition-all"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Intake Form */
            <div>
              {/* Progress Stepper Indicator */}
              <div className="flex items-center justify-between mb-6">
                {[
                  { num: 1, label: "Company Info" },
                  { num: 2, label: "Turnover & Stack" },
                  { num: 3, label: "Bottlenecks & Slot" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                        step === s.num
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#BA9528] text-black shadow-gold-subtle"
                          : step > s.num
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span className="text-[11px] font-medium text-slate-300 hidden sm:inline">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Step 1: Company Name & Incorporation */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-medium text-gold-300 mb-1.5">
                        Registered UK Limited Company Name *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Apex Strategic Holdings Ltd"
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Incorporation Year
                        </label>
                        <select
                          value={incorporationYear}
                          onChange={(e) => setIncorporationYear(e.target.value)}
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-3 text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2018-2019">2018 – 2019</option>
                          <option value="Pre-2018">Pre-2018</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Director Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={directorName}
                          onChange={(e) => setDirectorName(e.target.value)}
                          placeholder="e.g. Julian Montgomery"
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="director@company.co.uk"
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Direct Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 7700 900..."
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!companyName || !directorName || !email) {
                            setCompanyName(companyName || "Mayfair Digital Ventures Ltd");
                            setDirectorName(directorName || "Harrison Blake");
                            setEmail(email || "h.blake@mayfairdigital.co.uk");
                            setPhone(phone || "+44 7700 900512");
                          }
                          setStep(2);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
                      >
                        <span>Continue to Step 2 (Turnover & Stack)</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Turnover Bracket & Current Software */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-medium text-gold-300 mb-2">
                        Annual Turnover Bracket *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "£150k – £500k",
                          "£500k – £1M",
                          "£1M – £2.5M",
                          "£2.5M – £5M+",
                        ].map((bracket) => (
                          <button
                            key={bracket}
                            type="button"
                            onClick={() => setTurnoverBracket(bracket)}
                            className={`p-3 rounded-xl text-xs font-medium text-left border transition-all touch-target-48 active:scale-95 ${
                              turnoverBracket === bracket
                                ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-gold-subtle"
                                : "bg-[#070A0F] border-white/10 text-slate-300 hover:border-white/20"
                            }`}
                          >
                            <span className="block font-semibold text-gold-300">{bracket}</span>
                            <span className="text-[10px] text-slate-400">UK Limited Turnover</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gold-300 mb-2">
                        Current Bookkeeping & Accounting Software *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Xero", "QuickBooks", "FreeAgent", "Spreadsheets", "Sage", "Other"].map(
                          (sw) => (
                            <button
                              key={sw}
                              type="button"
                              onClick={() => setCurrentSoftware(sw)}
                              className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all touch-target-48 active:scale-95 ${
                                currentSoftware === sw
                                  ? "bg-[#D4AF37]/20 border-[#D4AF37] text-gold-300 font-semibold"
                                  : "bg-[#070A0F] border-white/10 text-slate-300 hover:border-white/20"
                              }`}
                            >
                              {sw}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 touch-target-48 active:scale-95"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95 transition-all"
                      >
                        <span>Continue to Final Step</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Core Bottlenecks & Preferred Consultation Time */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-medium text-gold-300 mb-2">
                        Core Accounting Bottlenecks (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          "Receipt chasing & disorganized expense records",
                          "Unpredictable Corporation Tax bills at year-end",
                          "Missing R&D tax relief / Capital Allowances",
                          "Lack of proactive tax planning & director dividend advice",
                          "Late VAT filings & unhelpful accountant communication",
                        ].map((issue) => {
                          const isSelected = bottlenecks.includes(issue);
                          return (
                            <div
                              key={issue}
                              onClick={() => toggleBottleneck(issue)}
                              className={`p-3 rounded-xl text-xs flex items-center justify-between border cursor-pointer transition-all touch-target-48 active:scale-95 ${
                                isSelected
                                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white"
                                  : "bg-[#070A0F] border-white/10 text-slate-300 hover:border-white/20"
                              }`}
                            >
                              <span>{issue}</span>
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? "bg-[#D4AF37] text-black font-bold"
                                    : "border border-white/30"
                                }`}
                              >
                                {isSelected ? "✓" : ""}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gold-300 mb-1.5">
                        Preferred Consultation Slot (30-min Zoom / In-Person Mayfair)
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value="Tomorrow Morning (10:00 AM)">Tomorrow Morning (10:00 AM)</option>
                          <option value="Tomorrow Afternoon (2:00 PM)">Tomorrow Afternoon (2:00 PM)</option>
                          <option value="Thursday (11:30 AM)">Thursday (11:30 AM)</option>
                          <option value="Friday (3:00 PM)">Friday (3:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 touch-target-48 active:scale-95"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle touch-target-48 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Registering File with Partner...</span>
                        ) : (
                          <>
                            <span>Confirm & Schedule Consultation</span>
                            <Sparkles className="w-4 h-4 text-black" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
