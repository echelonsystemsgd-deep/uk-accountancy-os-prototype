"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { Calendar, Clock, AlertTriangle, CheckCircle2, ChevronRight, Filter } from "lucide-react";

export default function AdminDeadlinesPage() {
  const { clients } = useDemo();

  const deadlines = [
    {
      client: "Belgrave Legacy Wealth Ltd",
      filing: "CT600 Corporation Tax Return & FRS 105",
      statutoryDate: "31 Dec 2026",
      internalTarget: "15 Nov 2026",
      lead: "Pritpal Chaggar CTA",
      status: "In Progress",
    },
    {
      client: "Mayfair Prime Residential SPV Ltd",
      filing: "Companies House Confirmation Statement (CS01)",
      statutoryDate: "28 Feb 2026",
      internalTarget: "10 Feb 2026",
      lead: "Kalpesh Patel FCA",
      status: "Docs Ready",
    },
    {
      client: "Marcus Sterling (Individual BTL)",
      filing: "Self Assessment SA100/105 Landlord Return",
      statutoryDate: "31 Jan 2026",
      internalTarget: "15 Dec 2025",
      lead: "Pritpal Chaggar CTA",
      status: "Chasing Statements",
    },
    {
      client: "Kensington Core Holding Ltd",
      filing: "Quarterly MTD ITSA Income Submissions",
      statutoryDate: "05 Apr 2026",
      internalTarget: "20 Mar 2026",
      lead: "Simran Kaur ACA",
      status: "Pre-Reconciled",
    },
  ];

  return (
    <AdminConsoleLayout
      pageTitle="Practice Deadlines Board &amp; Statutory Guidance Calendar"
      pageSubtitle="Statutory compliance dates are configurable guidance only, never hardcoded. Monitor client milestones practice-wide."
    >
      <div className="space-y-6 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#14241d] border border-[#1e382b]">
            <span className="text-[10px] uppercase text-[#8a9d94] block">Next 30 Days Due</span>
            <div className="text-xl font-bold text-amber-400 mt-1">3 Filings</div>
          </div>
          <div className="p-4 rounded-xl bg-[#14241d] border border-[#1e382b]">
            <span className="text-[10px] uppercase text-[#8a9d94] block">Pending Client Paperwork</span>
            <div className="text-xl font-bold text-red-400 mt-1">1 Overdue</div>
          </div>
          <div className="p-4 rounded-xl bg-[#14241d] border border-[#1e382b]">
            <span className="text-[10px] uppercase text-[#8a9d94] block">HMRC MTD Ready</span>
            <div className="text-xl font-bold text-[#a4f4cf] mt-1">100% Audit Tracked</div>
          </div>
        </div>

        <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-[#0c1813] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
              <tr>
                <th className="py-3 px-4">Client Portfolio</th>
                <th className="py-3 px-4">Statutory Filing</th>
                <th className="py-3 px-4">Internal Target</th>
                <th className="py-3 px-4">Official Deadline</th>
                <th className="py-3 px-4">Assigned Lead</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e382b]/60">
              {deadlines.map((d, idx) => (
                <tr key={idx} className="hover:bg-[#0c1813]/60 transition">
                  <td className="py-4 px-4 font-bold text-white">{d.client}</td>
                  <td className="py-4 px-4 text-slate-200">{d.filing}</td>
                  <td className="py-4 px-4 text-[#a4f4cf] font-bold">{d.internalTarget}</td>
                  <td className="py-4 px-4 text-[#8a9d94]">{d.statutoryDate}</td>
                  <td className="py-4 px-4 text-slate-300">{d.lead}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminConsoleLayout>
  );
}
