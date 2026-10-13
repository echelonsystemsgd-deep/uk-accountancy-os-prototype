"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientRecord, PipelineStage } from "@/lib/types";
import { formatGBP } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";

export default function ClientPipeline() {
  const { clients, moveClientStage, addNotification } = useDemoStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const stages: { key: PipelineStage; label: string; color: string; badge: string }[] = [
    { key: "new_intake", label: "New Intake", color: "border-blue-500/40", badge: "bg-blue-500/15 text-blue-300" },
    { key: "kyc_pending", label: "KYC / AML Pending", color: "border-amber-500/40", badge: "bg-amber-500/15 text-amber-300" },
    { key: "engagement_sent", label: "Engagement Sent", color: "border-purple-500/40", badge: "bg-purple-500/15 text-purple-300" },
    { key: "active_client", label: "Active Practice Client", color: "border-emerald-500/40", badge: "bg-emerald-500/15 text-emerald-300" },
  ];

  const getNextStage = (current: PipelineStage): PipelineStage | null => {
    if (current === "new_intake") return "kyc_pending";
    if (current === "kyc_pending") return "engagement_sent";
    if (current === "engagement_sent") return "active_client";
    return null;
  };

  const getPreviousStage = (current: PipelineStage): PipelineStage | null => {
    if (current === "active_client") return "engagement_sent";
    if (current === "engagement_sent") return "kyc_pending";
    if (current === "kyc_pending") return "new_intake";
    return null;
  };

  const filteredClients = clients.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.directorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.currentSoftware.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Top Header & Search / Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Client Onboarding &amp; Practice Pipeline</span>
            <span className="text-xs font-mono font-normal bg-[#111827] text-gold-300 border border-white/10 px-2.5 py-0.5 rounded-full">
              {filteredClients.length} Files
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Track intake leads from public landing page to active billing clients with 1-click stage progression.
          </p>
        </div>

        {/* Search & Layout Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company or director..."
              className="bg-[#070A0F] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors w-44 sm:w-60"
            />
          </div>

          <div className="flex items-center bg-[#070A0F] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "kanban" ? "bg-[#D4AF37] text-black" : "text-slate-400 hover:text-white"
              }`}
              title="Kanban View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-[#D4AF37] text-black" : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {stages.map((stage) => {
            const stageClients = filteredClients.filter((c) => c.stage === stage.key);
            return (
              <div
                key={stage.key}
                className="bg-[#070A0F] border border-white/5 rounded-xl p-3.5 flex flex-col min-h-[380px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {stage.label}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-current ${stage.badge}`}
                  >
                    {stageClients.length}
                  </span>
                </div>

                {/* Stage Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                  {stageClients.length === 0 ? (
                    <div className="text-center py-10 text-[11px] text-slate-500 border border-dashed border-white/5 rounded-lg">
                      No files in this stage
                    </div>
                  ) : (
                    stageClients.map((client) => {
                      const next = getNextStage(client.stage);
                      const prev = getPreviousStage(client.stage);

                      return (
                        <div
                          key={client.id}
                          className="bg-[#0B0F17] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-3.5 text-xs space-y-2.5 transition-all shadow-sm group"
                        >
                          {/* Card title & turnover */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-gold-200 transition-colors text-xs">
                                {client.companyName}
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                {client.directorName} • {client.currentSoftware}
                              </p>
                            </div>
                            <span className="font-mono text-[10px] text-gold-300 bg-[#111827] px-2 py-0.5 rounded border border-white/5 shrink-0">
                              {formatGBP(client.annualTurnover)}
                            </span>
                          </div>

                          {/* Notes */}
                          {client.notes && (
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed bg-black/30 p-2 rounded-lg border border-white/5">
                              {client.notes}
                            </p>
                          )}

                          {/* Stage Transition 1-Click Buttons */}
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                            {prev ? (
                              <button
                                onClick={() => moveClientStage(client.id, prev)}
                                className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-[#111827] hover:bg-white/10 transition-colors"
                              >
                                ← Prev
                              </button>
                            ) : (
                              <span />
                            )}

                            {next ? (
                              <button
                                onClick={() => moveClientStage(client.id, next)}
                                className="text-[10px] font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#B89628] hover:brightness-110 px-2.5 py-1 rounded shadow-sm flex items-center gap-1 transition-all active:scale-95"
                              >
                                <span>Advance</span>
                                <ArrowRight className="w-3 h-3 text-black" />
                              </button>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Active Billing</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070A0F] text-slate-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Company &amp; Reg No.</th>
                <th className="p-3">Director</th>
                <th className="p-3">Annual Turnover</th>
                <th className="p-3">Software</th>
                <th className="p-3">Pipeline Stage</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((c) => {
                const next = getNextStage(c.stage);
                const currentStageObj = stages.find((s) => s.key === c.stage);
                return (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-white">{c.companyName}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Co. #{c.companyNumber}
                      </div>
                    </td>
                    <td className="p-3">
                      <div>{c.directorName}</div>
                      <div className="text-[10px] text-slate-400">{c.email}</div>
                    </td>
                    <td className="p-3 font-mono font-medium text-gold-300">
                      {formatGBP(c.annualTurnover)}
                    </td>
                    <td className="p-3">{c.currentSoftware}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${currentStageObj?.badge}`}
                      >
                        {currentStageObj?.label}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {next && (
                        <button
                          onClick={() => moveClientStage(c.id, next)}
                          className="inline-flex items-center gap-1 bg-[#111827] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-gold-300 px-2.5 py-1 rounded text-[11px] font-medium transition-all"
                        >
                          <span>Move to {stages.find((s) => s.key === next)?.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
