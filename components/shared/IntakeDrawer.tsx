"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { IntakeSubmission } from "@/lib/types";
import { X, Check, ArrowRight, ArrowLeft } from "lucide-react";

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
    }, 400);
  };

  const handleClose = () => {
    setIsIntakeOpen(false);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
    }, 200);
  };

  const handleViewInPracticeHub = () => {
    handleClose();
    setCurrentView("admin");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      onClick={handleClose}
    >
      <div
        className="w-full sm:max-w-xl bg-[#0D0F17] border-t sm:border border-white/[0.1] sm:rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col overflow-hidden text-[#EDEDED]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0A0C13]">
          <div>
            <h3 className="text-sm font-semibold text-[#EDEDED] tracking-tight">
              Book Strategic Consultation
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              UK Limited Company Advisory &amp; Tax Planning
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-[#EDEDED]">
                  Consultation Request Registered
                </h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mt-1 leading-relaxed">
                  The client file for <strong className="text-[#EDEDED]">{companyName || "Limited Company"}</strong> has been logged to the Practice Pipeline.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.08] text-left text-xs space-y-1">
                <div className="font-medium text-[#EDEDED]">Pipeline Synchronized</div>
                <p className="text-[#64748B]">
                  This submission is now visible under <em>New Intake</em> in the Practice Hub.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleViewInPracticeHub}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
                >
                  <span>View in Practice Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#131622] border border-white/[0.08] hover:border-white/20 text-[#94A3B8] hover:text-[#EDEDED] text-xs py-2.5 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                {[
                  { num: 1, label: "Company" },
                  { num: 2, label: "Scale & Stack" },
                  { num: 3, label: "Priorities" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${
                        step === s.num
                          ? "bg-[#D4AF37] text-black"
                          : step > s.num
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/[0.04] text-[#64748B] border border-white/[0.06]"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span className="text-xs text-[#94A3B8] font-medium hidden sm:inline">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                        Registered Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Apex Strategic Holdings Ltd"
                        className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                          Incorporation Year
                        </label>
                        <select
                          value={incorporationYear}
                          onChange={(e) => setIncorporationYear(e.target.value)}
                          className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] focus:outline-none transition-colors"
                        >
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="Pre-2020">Pre-2020</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                          Director Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={directorName}
                          onChange={(e) => setDirectorName(e.target.value)}
                          placeholder="Julian Montgomery"
                          className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="director@company.co.uk"
                          className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 7700 900..."
                          className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
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
                        className="w-full flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#94A3B8] mb-2">
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
                            className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-colors ${
                              turnoverBracket === bracket
                                ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                                : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                            }`}
                          >
                            {bracket}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#94A3B8] mb-2">
                        Current Accounting Software *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Xero", "QuickBooks", "FreeAgent", "Spreadsheets", "Sage", "Other"].map(
                          (sw) => (
                            <button
                              key={sw}
                              type="button"
                              onClick={() => setCurrentSoftware(sw)}
                              className={`p-2 rounded-lg text-xs font-medium text-center border transition-colors ${
                                currentSoftware === sw
                                  ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                                  : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                              }`}
                            >
                              {sw}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-3 py-2 rounded-lg bg-[#131622] border border-white/[0.08] text-[#94A3B8] text-xs flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#94A3B8] mb-2">
                        Primary Areas for Review
                      </label>
                      <div className="space-y-1.5">
                        {[
                          "Receipt chasing & disorganized expense records",
                          "Unpredictable Corporation Tax bills at year-end",
                          "Missing R&D tax relief / Capital Allowances",
                          "Director dividend and remuneration structuring",
                          "Quarterly VAT submissions & MTD compliance",
                        ].map((issue) => {
                          const isSelected = bottlenecks.includes(issue);
                          return (
                            <div
                              key={issue}
                              onClick={() => toggleBottleneck(issue)}
                              className={`p-2.5 rounded-lg text-xs flex items-center justify-between border cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                                  : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                              }`}
                            >
                              <span>{issue}</span>
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? "bg-[#D4AF37] text-black font-semibold"
                                    : "border border-white/20"
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
                      <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                        Preferred Consultation Time
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#EDEDED] focus:outline-none transition-colors"
                      >
                        <option value="Tomorrow Morning (10:00 AM)">Tomorrow Morning (10:00 AM)</option>
                        <option value="Tomorrow Afternoon (2:00 PM)">Tomorrow Afternoon (2:00 PM)</option>
                        <option value="Thursday (11:30 AM)">Thursday (11:30 AM)</option>
                        <option value="Friday (3:00 PM)">Friday (3:00 PM)</option>
                      </select>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-3 py-2 rounded-lg bg-[#131622] border border-white/[0.08] text-[#94A3B8] text-xs flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Schedule Consultation"}</span>
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
