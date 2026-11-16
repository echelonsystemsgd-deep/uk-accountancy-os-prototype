"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { UserCheck, ShieldCheck, CheckCircle2, UserPlus, ArrowRight } from "lucide-react";

export default function AdminStaffAssignmentsPage() {
  const { clients, triggerToast } = useDemo();
  const [selectedStaff, setSelectedStaff] = useState("Pritpal Chaggar CTA");

  const staffMembers = [
    { name: "Pritpal Chaggar CTA", role: "Partner & Tax Principal", clientCount: 14, capacity: "85%" },
    { name: "Kalpesh Patel FCA", role: "Senior Partner (ICAEW)", clientCount: 18, capacity: "92%" },
    { name: "Simran Kaur ACA", role: "Senior Practice Accountant", clientCount: 12, capacity: "65%" },
    { name: "Arjan Gill", role: "Junior Accounting Assistant", clientCount: 6, capacity: "40%" },
  ];

  const handleReassign = (clientName: string, newStaff: string) => {
    triggerToast(
      "Client Reassigned",
      `${clientName} reassigned to ${newStaff}. Audit log updated & client notified.`,
      "success"
    );
  };

  return (
    <AdminConsoleLayout
      pageTitle="Staff Assignments &amp; Client Access Control"
      pageSubtitle="Strict isolation rules: staff members only see their assigned clients. Partners hold full reassignment override."
    >
      <div className="space-y-8 font-mono text-xs">
        {/* Staff Capacity Roster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffMembers.map((staff, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#14241d] border border-[#1e382b] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#a4f4cf] uppercase font-bold">Active Staff</span>
                <span className="text-[10px] text-emerald-400 font-bold">{staff.capacity} Load</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-sans">{staff.name}</h3>
                <p className="text-[11px] text-[#8a9d94]">{staff.role}</p>
              </div>
              <div className="pt-2 border-t border-[#1e382b] flex justify-between text-[11px]">
                <span className="text-[#8a9d94]">Assigned Clients:</span>
                <span className="text-white font-bold">{staff.clientCount} Portfolios</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Assignment Table */}
        <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl">
          <div className="p-4 bg-[#0c1813] border-b border-[#1e382b] flex items-center justify-between">
            <span className="font-bold text-white uppercase text-xs">
              Client Allocation Matrix
            </span>
            <span className="text-[10px] text-[#8a9d94]">Row-Level Security Enforced</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#14241d] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
              <tr>
                <th className="py-3 px-4">Client Portfolio</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Current Lead Accountant</th>
                <th className="py-3 px-4 text-right">Reassign Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e382b]/60">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-[#0c1813]/60 transition">
                  <td className="py-4 px-4 font-bold text-white">
                    {c.entityName}
                    <span className="text-[10px] text-[#8a9d94] block">{c.primaryContact}</span>
                  </td>
                  <td className="py-4 px-4 text-[#8a9d94]">{c.entityType}</td>
                  <td className="py-4 px-4">
                    <span className="text-[#a4f4cf] font-semibold">{c.assignedAccountant || "Pritpal Chaggar CTA"}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <select
                      onChange={(e) => handleReassign(c.entityName, e.target.value)}
                      defaultValue="Pritpal Chaggar CTA"
                      className="px-2.5 py-1 rounded bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs font-mono"
                    >
                      {staffMembers.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
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
