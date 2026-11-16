"use client";

import React from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { Activity, ShieldCheck, Lock, User, Clock } from "lucide-react";

export default function AdminAuditLogsPage() {
  const auditLogs = [
    {
      id: "aud-901",
      timestamp: "16 Nov 2026, 11:42 GMT",
      actor: "Pritpal Chaggar CTA",
      actorRole: "admin",
      action: "VIEW_SENSITIVE_IDENTIFIER",
      details: "Decrypted UTR for client Gurtej Singh (Belgrave Legacy Wealth Ltd) via RPC",
      ipAddress: "82.165.197.10 (London)",
    },
    {
      id: "aud-902",
      timestamp: "16 Nov 2026, 10:15 GMT",
      actor: "Kalpesh Patel FCA",
      actorRole: "admin",
      action: "REASSIGN_CLIENT_STAFF",
      details: "Assigned Belgrave Legacy Wealth Ltd to Pritpal Chaggar CTA",
      ipAddress: "82.165.197.10 (London)",
    },
    {
      id: "aud-903",
      timestamp: "15 Nov 2026, 18:30 GMT",
      actor: "System Engine",
      actorRole: "system",
      action: "MALWARE_SCAN_VERIFIED",
      details: "ClamAV scan verified Paragon_Mortgage_Statement.pdf (Clean)",
      ipAddress: "127.0.0.1 (Internal Sandbox)",
    },
    {
      id: "aud-904",
      timestamp: "15 Nov 2026, 14:00 GMT",
      actor: "Gurtej Singh",
      actorRole: "client",
      action: "CONSENT_TERMS_ACCEPTED",
      details: "Client signed Terms of Engagement & Privacy Notice under UK GDPR",
      ipAddress: "86.14.92.112 (Berkshire)",
    },
  ];

  return (
    <AdminConsoleLayout
      pageTitle="Immutable Statutory Audit Trail"
      pageSubtitle="PostgreSQL append-only security log: records all administrative overrides, sensitive data access, and status changes"
    >
      <div className="space-y-6 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#a4f4cf]" />
            <span className="text-white font-bold">
              Append-Only Enforcement: UPDATE &amp; DELETE operations denied by database rules
            </span>
          </div>
          <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            ICAEW Compliant
          </span>
        </div>

        <div className="rounded-xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-[#0c1813] border-b border-[#1e382b] text-[10px] uppercase text-[#8a9d94]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Details &amp; Entity Target</th>
                <th className="py-3 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e382b]/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#0c1813]/60 transition">
                  <td className="py-4 px-4 text-[#8a9d94]">{log.timestamp}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{log.actor}</span>
                    <span className="text-[10px] text-[#a4f4cf] uppercase">{log.actorRole}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-amber-300">{log.action}</td>
                  <td className="py-4 px-4 text-slate-200 font-sans text-xs">{log.details}</td>
                  <td className="py-4 px-4 text-right text-[#8a9d94]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminConsoleLayout>
  );
}
