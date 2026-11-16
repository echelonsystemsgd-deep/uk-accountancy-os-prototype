"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { Layers, Plus, CheckCircle2, Edit3, Trash2 } from "lucide-react";

export default function AdminServicesPage() {
  const { triggerToast } = useDemo();

  const [services, setServices] = useState([
    {
      code: "SPV_CT600",
      name: "SPV Limited Company Accounts & CT600",
      category: "Statutory Reporting",
      frequency: "Annual",
      price: "£1,250.00",
      status: "Active",
    },
    {
      code: "SECTION_24_ADV",
      name: "Section 24 Mortgage Relief Restructuring",
      category: "Tax Advisory",
      frequency: "One-Off",
      price: "£1,850.00",
      status: "Active",
    },
    {
      code: "MTD_ITSA_SUB",
      name: "Making Tax Digital (MTD ITSA) Quarterly Filings",
      category: "Compliance",
      frequency: "Quarterly",
      price: "£150.00 / qtr",
      status: "Active",
    },
    {
      code: "DLA_S455_PROT",
      name: "Director's Loan Account (DLA) & S455 Safeguard",
      category: "Tax Advisory",
      frequency: "Annual",
      price: "£450.00",
      status: "Active",
    },
    {
      code: "PAYROLL_MONTHLY",
      name: "Director Monthly Payroll & RTI Submission",
      category: "Statutory",
      frequency: "Monthly",
      price: "£45.00 / mo",
      status: "Active",
    },
    {
      code: "CONF_STATEMENT",
      name: "Companies House Confirmation Statement (CS01)",
      category: "Corporate Secretarial",
      frequency: "Annual",
      price: "£95.00",
      status: "Active",
    },
  ]);

  return (
    <AdminConsoleLayout
      pageTitle="Services Catalog &amp; Engagement Pricing"
      pageSubtitle="Configure statutory engagement offerings, pricing templates, and standard billing frequencies"
      actions={
        <button
          onClick={() => triggerToast("Add Service", "New service template modal opened.", "info")}
          className="px-4 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-mono font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Service</span>
        </button>
      }
    >
      <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl font-mono text-xs">
        <table className="w-full text-left">
          <thead className="bg-[#0c1813] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
            <tr>
              <th className="py-3 px-4">Service Code</th>
              <th className="py-3 px-4">Service Title</th>
              <th className="py-3 px-4">Practice Category</th>
              <th className="py-3 px-4">Frequency</th>
              <th className="py-3 px-4">Base Fee</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e382b]/60">
            {services.map((s) => (
              <tr key={s.code} className="hover:bg-[#0c1813]/60 transition">
                <td className="py-4 px-4 font-bold text-[#a4f4cf]">{s.code}</td>
                <td className="py-4 px-4 text-white font-semibold font-sans">{s.name}</td>
                <td className="py-4 px-4 text-[#8a9d94]">{s.category}</td>
                <td className="py-4 px-4 text-slate-300">{s.frequency}</td>
                <td className="py-4 px-4 font-bold text-white">{s.price}</td>
                <td className="py-4 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminConsoleLayout>
  );
}
