"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { Building2, User, ChevronRight, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminClientsPage() {
  const { clients } = useDemo();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter((c) =>
    c.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.primaryContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminConsoleLayout
      pageTitle="Master Client Directory"
      pageSubtitle="Practice-wide client roster with SPV property entities, assigned accountant, and filing status"
      actions={
        <div className="relative font-mono text-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client or email..."
            className="px-3.5 py-1.5 rounded-lg bg-[#14241d] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] w-64 text-xs"
          />
        </div>
      }
    >
      <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl font-mono text-xs">
        <table className="w-full text-left">
          <thead className="bg-[#0c1813] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
            <tr>
              <th className="py-3 px-4">Client Entity &amp; Contact</th>
              <th className="py-3 px-4">Account Type</th>
              <th className="py-3 px-4">Active SPVs</th>
              <th className="py-3 px-4">Assigned Accountant</th>
              <th className="py-3 px-4">Onboarding Stage</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e382b]/60">
            {filteredClients.map((client) => {
              const slug = client.entityName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <tr key={client.id} className="hover:bg-[#0c1813]/60 transition">
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{client.entityName}</span>
                    <span className="text-[10px] text-[#8a9d94]">{client.primaryContact} &bull; {client.email}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-200">
                    {client.entityType === "spv_ltd" ? "SPV Limited Company" : "Individual Landlord"}
                  </td>
                  <td className="py-4 px-4 text-[#a4f4cf] font-bold">
                    {client.properties.length} Properties
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-semibold">Pritpal Chaggar CTA</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20">
                      Active Engagement
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/admin/clients/${slug}`}
                      className="px-3 py-1 rounded bg-[#0c1813] border border-[#1e382b] hover:border-[#a4f4cf] text-[#a4f4cf] inline-flex items-center gap-1 font-bold"
                    >
                      <span>Manage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminConsoleLayout>
  );
}
