"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { formatGBP } from "@/lib/utils";
import {
  Users,
  Clock,
  AlertCircle,
  FileWarning,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function PartnerMetrics() {
  const {
    activeClientsCount,
    unbilledWipAmount,
    pendingVatCount,
    missingReceiptsCount,
    totalBilledCollected,
  } = useDemoStore();

  const metrics = [
    {
      title: "Active Ltd Clients",
      value: activeClientsCount.toString(),
      subtext: "+14 onboarded this quarter",
      icon: Users,
      trend: "+11% YoY",
      trendPositive: true,
      accent: "text-white",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Unbilled WIP & Hours",
      value: formatGBP(unbilledWipAmount),
      subtext: "Ready for monthly billing run",
      icon: Clock,
      trend: "£2,100 accrued this week",
      trendPositive: true,
      accent: "text-gold-300",
      badgeColor: "bg-[#D4AF37]/20 text-gold-300 border-[#D4AF37]/30",
    },
    {
      title: "Pending VAT Deadlines",
      value: `${pendingVatCount} Due in 7 Days`,
      subtext: "Quarterly MTD submissions",
      icon: AlertCircle,
      trend: "Priority processing",
      trendPositive: false,
      accent: "text-amber-400",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      title: "Unresolved Missing Receipts",
      value: missingReceiptsCount.toString(),
      subtext: "Auto-synced with Client Dropzone",
      icon: FileWarning,
      trend: missingReceiptsCount > 10 ? "Chasers Active" : "Under Control",
      trendPositive: missingReceiptsCount <= 10,
      accent: "text-rose-400",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Live sync banner */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/30 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">
            <strong>Partner Command Center:</strong> Live Practice Radar Active
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>Collected Fees: <strong className="text-emerald-400">{formatGBP(totalBilledCollected)}</strong></span>
          <span className="hidden sm:inline">• 4 Senior Partners Online</span>
        </div>
      </div>

      {/* 4 Live KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`bg-[#0B0F17] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                m.highlight
                  ? "border-rose-500/40 shadow-[0_0_20px_-3px_rgba(244,63,94,0.15)]"
                  : "border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                    {m.title}
                  </span>
                  <div className="p-2 rounded-xl bg-[#111827] border border-white/5 text-gold-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className={`font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight ${m.accent}`}>
                  {m.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {m.subtext}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${m.badgeColor}`}
                >
                  {m.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
