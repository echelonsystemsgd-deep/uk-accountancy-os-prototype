"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { X, Calendar as CalendarIcon, Clock, Check, ArrowRight, ShieldCheck, User, Mail, Building2 } from "lucide-react";

export default function CalendarBookingModal() {
  const { isCalendarOpen, setIsCalendarOpen, bookCalendarMeeting, setCurrentView } = useDemoStore();

  const availableSlots = [
    { id: "slot-1", day: "Today", time: "14:00", label: "Today, 14:00 (London GMT)", urgent: true },
    { id: "slot-2", day: "Today", time: "16:30", label: "Today, 16:30 (London GMT)" },
    { id: "slot-3", day: "Tomorrow", time: "10:30", label: "Tomorrow, 10:30 (London GMT)", popular: true },
    { id: "slot-4", day: "Tomorrow", time: "14:15", label: "Tomorrow, 14:15 (London GMT)" },
    { id: "slot-5", day: "Thursday", time: "11:00", label: "Thursday, 11:00 (London GMT)" },
    { id: "slot-6", day: "Friday", time: "15:30", label: "Friday, 15:30 (London GMT)" },
  ];

  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isCalendarOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingName = name || "Alexander Wright";
    const bookingEmail = email || "a.wright@mayfairtech.co.uk";
    const bookingCompany = company || "Mayfair Technology Ventures Ltd";

    setTimeout(() => {
      bookCalendarMeeting({
        name: bookingName,
        email: bookingEmail,
        company: bookingCompany,
        slot: selectedSlot.label,
        note: "15-minute live consultation confirmed via Instant Calendar Booking.",
      });
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 400);
  };

  const handleClose = () => {
    setIsCalendarOpen(false);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 200);
  };

  const handleViewInPartnerHub = () => {
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
        className="w-full sm:max-w-lg bg-[#0D0F17] border-t sm:border border-white/[0.1] sm:rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden text-[#EDEDED] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0A0C13]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                Instant Calendar Booking
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight mt-0.5">
              Lock in a 15-Minute Strategy Review
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Direct partner calendar access. Zero 48-hour email delays.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#64748B] hover:text-[#EDEDED] rounded-lg transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isConfirmed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-[#EDEDED]">
                  Calendar Slot Confirmed
                </h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mt-1 leading-relaxed">
                  Your 15-minute consultation is locked for <strong className="text-[#EDEDED]">{selectedSlot.label}</strong> with an ICAEW Senior Tax Partner.
                </p>
              </div>

              {/* Cross-module sync callout */}
              <div className="p-3.5 rounded-lg bg-[#0B0D13] border border-white/[0.08] text-left text-xs space-y-1">
                <div className="font-medium text-[#EDEDED]">Practice Hub Synchronized</div>
                <p className="text-[#64748B]">
                  This meeting was automatically registered in the <em>Practice Dashboard</em> under 'New Intake' with direct calendar notes.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleViewInPartnerHub}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
                >
                  <span>Inspect in Partner Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#131622] border border-white/[0.08] hover:border-white/20 text-[#94A3B8] hover:text-[#EDEDED] text-xs py-2.5 px-4 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              {/* Select Live Slot */}
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-2 flex items-center justify-between">
                  <span>Available Live Partner Slots</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#161A26] border-white/25 text-[#EDEDED]"
                            : "bg-[#08090E] border-white/[0.08] text-[#94A3B8] hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{slot.day}</span>
                          <span className="font-mono text-[#EDEDED]">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-[#64748B]">
                          <Clock className="w-3 h-3" />
                          <span>15 min video</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2-Field Confirmation (Name + Email + Company) */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Director Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Julian Montgomery"
                      className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg pl-8 pr-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="director@company.co.uk"
                        className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg pl-8 pr-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                      UK Limited Company
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Strategic Ltd"
                        className="w-full bg-[#08090E] border border-white/[0.1] focus:border-[#D4AF37] rounded-lg pl-8 pr-3 py-2 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? "Locking in slot..."
                      : `Confirm & Lock ${selectedSlot.label}`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#64748B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero obligation • Direct chartered partner video consultation</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
