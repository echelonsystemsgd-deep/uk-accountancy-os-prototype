"use client";

import React, { useState } from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import { useDemo } from "@/lib/store";
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function ClientBookingsPage() {
  const { triggerToast } = useDemo();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const upcomingConsultations = [
    {
      id: "c-101",
      title: "SPV Mortgage Restructure & DLA Review",
      accountant: "Pritpal Chaggar CTA",
      dateTime: "Thursday, 20 Nov 2026 at 14:00 GMT",
      location: "Zoom Video Meeting",
      link: "https://zoom.us/j/9920148812",
      status: "confirmed",
    },
  ];

  const availableSlots = [
    "Friday, 21 Nov — 10:00 GMT",
    "Friday, 21 Nov — 14:30 GMT",
    "Monday, 24 Nov — 11:00 GMT",
    "Tuesday, 25 Nov — 15:00 GMT",
  ];

  const handleBookSlot = (slot: string) => {
    setSelectedSlot(slot);
    triggerToast(
      "Consultation Booked",
      `Session confirmed for ${slot} with Pritpal Chaggar CTA. Calendar invite dispatched via email.`,
      "success"
    );
  };

  return (
    <ClientPortalLayout
      pageTitle="Appointments &amp; Consultation Bookings"
      pageSubtitle="Schedule 1-on-1 strategy sessions with your assigned Chartered Tax Adviser"
    >
      <div className="space-y-8 font-mono">
        {/* Active Upcoming Bookings */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-wider text-[#a4f4cf] font-bold block">
            Upcoming Confirmed Appointments
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingConsultations.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-xl bg-[#14241d] border border-[#1e382b] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    Confirmed
                  </span>
                  <span className="text-[#8a9d94]">Ref #{c.id}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">{c.title}</h3>
                  <p className="text-xs text-[#a4f4cf]">With {c.accountant}</p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1e382b] pt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8a9d94]" />
                    <span>{c.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-[#a4f4cf]" />
                    <a href={c.link} target="_blank" rel="noreferrer" className="text-[#a4f4cf] hover:underline">
                      Join Video Meeting Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book a New Slot */}
        <div className="p-6 rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-4">
          <span className="text-xs uppercase tracking-wider text-[#a4f4cf] font-bold block">
            Available 45-Min Partner Slots (Next 7 Days)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {availableSlots.map((slot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#0c1813] border border-[#1e382b] flex items-center justify-between hover:border-[#a4f4cf]/40 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#a4f4cf]" />
                  <span className="text-slate-200">{slot}</span>
                </div>
                <button
                  onClick={() => handleBookSlot(slot)}
                  className="px-3 py-1 rounded bg-[#a4f4cf] text-[#0c1813] font-bold hover:bg-[#8ae8bd] transition"
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClientPortalLayout>
  );
}
