"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { Calendar, Clock, Save, ShieldCheck } from "lucide-react";

export default function AdminAvailabilityPage() {
  const { triggerToast } = useDemo();

  const [bufferBefore, setBufferBefore] = useState("15");
  const [bufferAfter, setBufferAfter] = useState("15");
  const [minNotice, setMinNotice] = useState("24");
  const [slotDuration, setSlotDuration] = useState("45");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Availability Rules Saved", "Consultation calendar updated with new buffer rules.", "success");
  };

  return (
    <AdminConsoleLayout
      pageTitle="Calendar Availability &amp; Booking Rules"
      pageSubtitle="Configure ongoing consultation slots, buffer intervals, and minimum notice requirements"
    >
      <form onSubmit={handleSave} className="max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-6 font-mono text-xs">
        <span className="text-xs uppercase tracking-wider text-[#a4f4cf] font-bold block font-sans">
          Booking Scheduling Constraints
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-slate-300 font-sans font-medium mb-1">Standard Slot Duration</label>
            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
            >
              <option value="30">30 Minutes (Quick Diagnostic)</option>
              <option value="45">45 Minutes (Full SPV Consultation)</option>
              <option value="60">60 Minutes (Complex Portfolio Restructure)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-sans font-medium mb-1">Minimum Booking Notice</label>
            <select
              value={minNotice}
              onChange={(e) => setMinNotice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
            >
              <option value="12">12 Hours Notice</option>
              <option value="24">24 Hours Notice (Recommended)</option>
              <option value="48">48 Hours Notice</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-sans font-medium mb-1">Buffer Before Meeting</label>
            <select
              value={bufferBefore}
              onChange={(e) => setBufferBefore(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
            >
              <option value="0">0 Minutes</option>
              <option value="10">10 Minutes</option>
              <option value="15">15 Minutes (Recommended)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-sans font-medium mb-1">Buffer After Meeting</label>
            <select
              value={bufferAfter}
              onChange={(e) => setBufferAfter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
            >
              <option value="0">0 Minutes</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes (Post-Meeting Filing Notes)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold font-sans text-xs flex items-center gap-2 hover:bg-[#8ae8bd] transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Availability Rules</span>
          </button>
        </div>
      </form>
    </AdminConsoleLayout>
  );
}
