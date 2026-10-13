"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { MissingDocRadarItem } from "@/lib/types";
import {
  FileWarning,
  Send,
  AlertTriangle,
  Clock,
  CheckCircle,
  Building,
  RefreshCw,
} from "lucide-react";
import ChaserModal from "./ChaserModal";

export default function MissingDocRadar() {
  const { missingDocs, missingReceiptsCount } = useDemoStore();
  const [selectedItem, setSelectedItem] = useState<MissingDocRadarItem | null>(null);

  return (
    <div className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
              Missing Document Radar
            </h3>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
              {missingReceiptsCount} Pending
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated tracker identifying unsubmitted receipts, statements, and invoices across active client files.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Auto-Sync: <span className="text-emerald-400">Client Dropzone Active</span>
        </div>
      </div>

      {/* Radar Items Table / Cards */}
      {missingDocs.length === 0 ? (
        <div className="text-center py-12 bg-[#070A0F] rounded-xl border border-white/5 space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
          <h4 className="font-serif-luxury text-base font-semibold text-white">
            All Practice Documents Clear
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Zero outstanding missing receipts detected. All client files are ready for VAT and CT600 reconciliation.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {missingDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#070A0F] border border-white/5 hover:border-[#D4AF37]/40 rounded-xl p-4 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              {/* Left details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-white group-hover:text-gold-200 transition-colors">
                    {doc.companyName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      doc.urgency === "critical"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : doc.urgency === "high"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                    }`}
                  >
                    {doc.urgency.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Dir: {doc.directorName}
                  </span>
                </div>

                <div className="text-xs text-gold-300/90 font-medium">
                  {doc.documentType}
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span>Period: <strong className="text-slate-300">{doc.taxPeriod}</strong></span>
                  <span>Overdue: <strong className="text-rose-400">{doc.daysOverdue} days</strong></span>
                  {doc.lastChasedAt && (
                    <span className="text-emerald-400">Chased: {doc.lastChasedAt}</span>
                  )}
                </div>
              </div>

              {/* Right action button */}
              <div className="w-full md:w-auto shrink-0">
                <button
                  onClick={() => setSelectedItem(doc)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/40 hover:border-[#D4AF37] text-gold-300 text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all touch-target-48 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>1-Click Automated Chaser</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chaser Modal */}
      {selectedItem && (
        <ChaserModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
