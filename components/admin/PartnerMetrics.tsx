"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { formatGBP } from "@/lib/utils";
import {
  Users,
  Clock,
  AlertCircle,
  FileWarning,
  PoundSterling,
} from "lucide-react";

export default function PartnerMetrics() {
  const {
    activeClientsCount,
    unbilledWipAmount,
    pendingVatCount,
    missingReceiptsCount,
  } = useDemoStore();

  const metrics = [
    {
      title: "Active Ltd Clients",
      value: activeClientsCount.toString(),
      icon: Users,
      trend: "+12% this quarter",
      trendType: "positive",
    },
    {
      title: "Unbilled WIP & Hours",
      value: formatGBP(unbilledWipAmount),
      icon: PoundSterling,
      trend: "£2,100 accrued this week",
      trendType: "positive",
    },
    {
      title: "Pending VAT Submissions",
      value: `${pendingVatCount} Due in 7 Days`,
      icon: Clock,
      trend: "MTD window open",
      trendType: "neutral",
    },
    {
      title: "Outstanding Receipts",
      value: missingReceiptsCount.toString(),
      icon: FileWarning,
      trend: missingReceiptsCount > 10 ? "Chasers active" : "Normal volume",
      trendType: missingReceiptsCount > 10 ? "warning" : "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={i}
            className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#94A3B8]">
                {m.title}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#0E111A] border border-white/[0.08] flex items-center justify-center text-[#94A3B8]">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 mb-2">
              <div className="text-2xl font-bold font-mono text-[#EDEDED] tracking-tight">
                {m.value}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
              <span
                className={`text-[11px] font-medium ${
                  m.trendType === "positive"
                    ? "text-emerald-400"
                    : m.trendType === "warning"
                    ? "text-rose-400"
                    : "text-[#64748B]"
                }`}
              >
                {m.trend}
              </span>
              <span className="text-[10px] text-[#64748B] font-mono">Live Sync</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
