"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientRecord, PipelineStage } from "@/lib/types";
import { formatGBP } from "@/lib/utils";
import { Search, ArrowRight, Check, LayoutGrid, List } from "lucide-react";

export default function ClientPipeline() {
  const { clients, moveClientStage } = useDemoStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  const stages: { key: PipelineStage; label: string; badge: string }[] = [
    { key: "new_intake", label: "New Intake", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { key: "kyc_pending", label: "KYC / AML Pending", badge: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
    { key: "engagement_sent", label: "Engagement Sent", badge: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
    { key: "active_client", label: "Active Client", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
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
    <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 sm:p-6 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
            Client Pipeline
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Stage progression and onboarding status across active engagements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company or director..."
              className="bg-[#08090E] border border-white/[0.08] focus:border-white/20 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#EDEDED] placeholder-[#64748B] focus:outline-none transition-colors w-44 sm:w-56"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-[#08090E] border border-white/[0.08] rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "table" ? "bg-[#161A26] text-[#EDEDED]" : "text-[#64748B] hover:text-[#EDEDED]"
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "kanban" ? "bg-[#161A26] text-[#EDEDED]" : "text-[#64748B] hover:text-[#EDEDED]"
              }`}
              title="Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE VIEW (Standard shadcn/ui table style) */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#0A0C13] text-[#64748B] font-semibold border-b border-white/[0.08] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Company &amp; Reg No.</th>
                <th className="p-3">Director</th>
                <th className="p-3">Annual Turnover</th>
                <th className="p-3">Software</th>
                <th className="p-3">Pipeline Stage</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredClients.map((c) => {
                const next = getNextStage(c.stage);
                const currentStageObj = stages.find((s) => s.key === c.stage);
                return (
                  <tr key={c.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-3">
                      <div className="font-medium text-[#EDEDED]">{c.companyName}</div>
                      <div className="text-[10px] font-mono text-[#64748B]">#{c.companyNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-[#EDEDED]">{c.directorName}</div>
                      <div className="text-[10px] text-[#64748B]">{c.email}</div>
                    </td>
                    <td className="p-3 font-mono font-medium text-[#EDEDED]">
                      {formatGBP(c.annualTurnover)}
                    </td>
                    <td className="p-3">{c.currentSoftware}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${currentStageObj?.badge}`}
                      >
                        {currentStageObj?.label}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {next ? (
                        <button
                          onClick={() => moveClientStage(c.id, next)}
                          className="inline-flex items-center gap-1 bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] hover:border-white/20 text-[#EDEDED] px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
                        >
                          <span>Move to {stages.find((s) => s.key === next)?.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <Check className="w-3 h-3" />
                          <span>Active Client</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
          {stages.map((stage) => {
            const stageClients = filteredClients.filter((c) => c.stage === stage.key);
            return (
              <div
                key={stage.key}
                className="bg-[#08090E] border border-white/[0.06] rounded-lg p-3 flex flex-col min-h-[320px]"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.04]">
                  <span className="text-xs font-semibold text-[#EDEDED]">
                    {stage.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${stage.badge}`}
                  >
                    {stageClients.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto max-h-[460px]">
                  {stageClients.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-[#64748B] border border-dashed border-white/[0.04] rounded">
                      No files
                    </div>
                  ) : (
                    stageClients.map((client) => {
                      const next = getNextStage(client.stage);
                      const prev = getPreviousStage(client.stage);

                      return (
                        <div
                          key={client.id}
                          className="bg-[#0D0F17] border border-white/[0.08] rounded-lg p-3 text-xs space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-semibold text-[#EDEDED] text-xs">
                                {client.companyName}
                              </div>
                              <div className="text-[11px] text-[#64748B]">
                                {client.directorName} • {client.currentSoftware}
                              </div>
                            </div>
                            <span className="font-mono text-[10px] text-[#94A3B8]">
                              {formatGBP(client.annualTurnover)}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between gap-1 text-[10px]">
                            {prev ? (
                              <button
                                onClick={() => moveClientStage(client.id, prev)}
                                className="text-[#64748B] hover:text-[#EDEDED] px-1.5 py-0.5 rounded transition-colors"
                              >
                                ← Prev
                              </button>
                            ) : (
                              <span />
                            )}

                            {next ? (
                              <button
                                onClick={() => moveClientStage(client.id, next)}
                                className="text-[#EDEDED] hover:text-white bg-[#131622] hover:bg-[#1A1F2D] border border-white/[0.08] px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                              >
                                <span>Advance</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            ) : (
                              <span className="text-emerald-400 font-medium">Active</span>
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
      )}
    </div>
  );
}
