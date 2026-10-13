"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { MissingDocRadarItem } from "@/lib/types";
import { Send, CheckCircle2 } from "lucide-react";
import ChaserModal from "./ChaserModal";

export default function MissingDocRadar() {
  const { missingDocs, missingReceiptsCount } = useDemoStore();
  const [selectedItem, setSelectedItem] = useState<MissingDocRadarItem | null>(null);

  return (
    <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
              Document Ingestion &amp; Compliance
            </h3>
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2 py-0.5 rounded-full font-mono">
              {missingReceiptsCount} Outstanding
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Automated tracking of month-end receipts and statements across active client files.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B]">
          Sync: <span className="text-emerald-400">Portal Ingestion Active</span>
        </div>
      </div>

      {/* Items Table */}
      {missingDocs.length === 0 ? (
        <div className="text-center py-10 bg-[#0B0D13] rounded-lg border border-white/[0.06] space-y-1">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-semibold text-[#EDEDED]">
            All Client Files Reconciled
          </h4>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Zero outstanding documents detected. All active files are ready for VAT and statutory closing.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#0A0C13] text-[#64748B] font-semibold border-b border-white/[0.08] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Company &amp; Director</th>
                <th className="p-3">Required Document</th>
                <th className="p-3">Tax Period</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {missingDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-[#EDEDED]">{doc.companyName}</div>
                    <div className="text-[11px] text-[#64748B]">{doc.directorName}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-[#EDEDED] font-medium">{doc.documentType}</span>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {doc.taxPeriod}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        doc.urgency === "critical"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : doc.urgency === "high"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-300 border-blue-500/20"
                      }`}
                    >
                      {doc.daysOverdue}d overdue
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedItem(doc)}
                      className="inline-flex items-center gap-1.5 bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] hover:border-white/20 text-[#EDEDED] text-xs font-medium py-1.5 px-3 rounded-lg transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Chaser</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chaser Dialog */}
      {selectedItem && (
        <ChaserModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
