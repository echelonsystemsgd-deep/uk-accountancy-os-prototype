"use client";

import React, { useState } from "react";
import { Users, TrendingUp, CheckCircle2, ShieldCheck, FileCheck2 } from "lucide-react";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  percentage: number;
  detail: string;
  icon: React.ReactNode;
}

const DEFAULT_STAGES: FunnelStage[] = [
  {
    id: "leads",
    name: "Target Landlords",
    count: 2450,
    percentage: 100,
    detail: "High-value UK Property SPVs identified via Companies House",
    icon: <Users className="w-3.5 h-3.5 text-slate-400" />,
  },
  {
    id: "contacted",
    name: "Outreach & Audited",
    count: 1350,
    percentage: 55,
    detail: "Section 24 Tax Leakage Audits generated & delivered",
    icon: <TrendingUp className="w-3.5 h-3.5 text-sky-400" />,
  },
  {
    id: "verified",
    name: "KYC & Identity",
    count: 640,
    percentage: 26,
    detail: "Director AML / KYC verified with Land Registry checks",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />,
  },
  {
    id: "onboarded",
    name: "SPV Portfolios Active",
    count: 295,
    percentage: 12,
    detail: "Tenancy ASTs & Bank Feeds connected to Mercian OS",
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
  },
  {
    id: "retained",
    name: "CT600 Filed & Retained",
    count: 125,
    percentage: 5,
    detail: "Statutory year-end corporate tax packs signed & submitted",
    icon: <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />,
  },
];

export default function BklitFunnelChart({
  title = "Client Acquisition & Statutory Retention Funnel",
  subtitle = "End-to-end outreach conversion from Companies House scrape to active annual tax retainer",
  stages = DEFAULT_STAGES,
}: {
  title?: string;
  subtitle?: string;
  stages?: FunnelStage[];
}) {
  const [activeStageId, setActiveStageId] = useState<string>(stages[3].id); // Default to SPV Portfolios Active

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <div className="accountant-card p-5 sm:p-6 bg-[#162032] border border-[#1F293D] rounded-xl text-left space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1F293D] pb-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Active Conversion:</span>
          <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {stages[stages.length - 1].percentage}% Retainer Yield
          </span>
        </div>
      </div>

      {/* Funnel Visual Bars (Bklit multi-layer flow) */}
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {stages.map((stage, idx) => {
            const isSelected = stage.id === activeStageId;
            // Heights simulate the narrowing funnel taper
            const heights = ["h-24", "h-20", "h-16", "h-14", "h-12"];
            const opacities = ["bg-[#0077C8]", "bg-[#0284C7]", "bg-[#0369A1]", "bg-[#075985]", "bg-[#0c4a6e]"];

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`relative flex flex-col justify-between p-2 sm:p-2.5 rounded-lg border transition-all text-left group ${
                  isSelected
                    ? "border-sky-400 bg-sky-950/40 shadow-md ring-1 ring-sky-400/30"
                    : "border-[#1F293D] bg-[#111827]/70 hover:border-slate-700 hover:bg-[#162032]"
                }`}
              >
                {/* Metric pill */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm font-bold text-white tabular-nums">
                    {stage.count.toLocaleString()}
                  </span>
                  <div className="hidden sm:block">{stage.icon}</div>
                </div>

                {/* Funnel visual bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden my-2">
                  <div
                    className="h-full bg-[#0077C8] rounded-full transition-all duration-300"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>

                {/* Percentage & Label */}
                <div>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-sky-400 block">
                    {stage.percentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate block">
                    {stage.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="p-3.5 rounded-lg bg-[#0E1526] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
            {activeStage.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm">{activeStage.name}</span>
              <span className="font-mono font-semibold text-sky-400">
                ({activeStage.count.toLocaleString()} records &bull; {activeStage.percentage}% of funnel)
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">{activeStage.detail}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="touch-target-44 px-3 py-1.5 rounded-md font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shrink-0"
        >
          View Stage Records &rarr;
        </button>
      </div>
    </div>
  );
}
