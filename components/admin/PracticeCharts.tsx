"use client";

import React, { useState } from "react";

export default function PracticeCharts() {
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);

  // Chart 1: Monthly Fee Inflow Data
  const monthlyData = [
    { month: "May", amount: 32400, label: "£32.4k" },
    { month: "Jun", amount: 35800, label: "£35.8k" },
    { month: "Jul", amount: 38200, label: "£38.2k" },
    { month: "Aug", amount: 41500, label: "£41.5k" },
    { month: "Sep", amount: 44900, label: "£44.9k" },
    { month: "Oct", amount: 48600, label: "£48.6k" },
  ];

  const maxAmount = 55000;

  // Chart 2: VAT Collection Velocity Data
  const velocityData = [
    { day: "Day 1", pct: 24, count: "34/142 Files" },
    { day: "Day 2", pct: 42, count: "60/142 Files" },
    { day: "Day 3", pct: 61, count: "87/142 Files" },
    { day: "Day 4", pct: 78, count: "111/142 Files" },
    { day: "Day 5", pct: 89, count: "126/142 Files" },
    { day: "Day 6", pct: 96, count: "136/142 Files" },
    { day: "Day 7", pct: 99, count: "141/142 Files" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Chart 1: Monthly Client Fee Inflow */}
      <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#EDEDED] tracking-tight">
              Monthly Fee Inflow
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Statutory retainers &amp; advisory billings (Last 6 Months)
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-base font-semibold text-[#EDEDED]">
              £48,600
            </span>
            <span className="text-[11px] text-emerald-400 block">+14.2% QoQ</span>
          </div>
        </div>

        {/* Minimal Bar Chart with Tremor/Linear Aesthetic */}
        <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-white/[0.06] relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-x-0 top-6 border-b border-white/[0.04]" />
          <div className="absolute inset-x-0 top-1/2 border-b border-white/[0.04]" />

          {monthlyData.map((d, idx) => {
            const heightPercent = (d.amount / maxAmount) * 100;
            const isHovered = hoveredMonthIndex === idx;

            return (
              <div
                key={d.month}
                className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                onMouseEnter={() => setHoveredMonthIndex(idx)}
                onMouseLeave={() => setHoveredMonthIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-7 bg-[#161A26] border border-white/[0.12] shadow-md px-2 py-1 rounded text-[11px] font-mono text-[#EDEDED] whitespace-nowrap z-10 animate-in fade-in zoom-in-95">
                    {d.label}
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t transition-all duration-150 ${
                    idx === monthlyData.length - 1
                      ? "bg-[#D4AF37]"
                      : isHovered
                      ? "bg-white/30"
                      : "bg-white/[0.12]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between px-2 pt-2 text-[11px] font-mono text-[#64748B]">
          {monthlyData.map((d) => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </div>

      {/* Chart 2: VAT Document Collection Velocity */}
      <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#EDEDED] tracking-tight">
              VAT Document Collection Velocity
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Client receipt compliance curve prior to month-end deadline
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-base font-semibold text-[#EDEDED]">
              96%
            </span>
            <span className="text-[11px] text-[#94A3B8] block">By Day 6</span>
          </div>
        </div>

        {/* Velocity Progress Columns */}
        <div className="h-44 w-full flex items-end gap-2 pt-6 pb-2 px-2 border-b border-white/[0.06] relative">
          <div className="absolute inset-x-0 top-6 border-b border-white/[0.04]" />
          <div className="absolute inset-x-0 top-1/2 border-b border-white/[0.04]" />

          {velocityData.map((d, idx) => {
            const isHovered = hoveredDayIndex === idx;

            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                onMouseEnter={() => setHoveredDayIndex(idx)}
                onMouseLeave={() => setHoveredDayIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-7 bg-[#161A26] border border-white/[0.12] shadow-md px-2 py-1 rounded text-[11px] font-mono text-[#EDEDED] whitespace-nowrap z-10 animate-in fade-in zoom-in-95">
                    {d.pct}% ({d.count})
                  </div>
                )}

                {/* Step Column */}
                <div
                  style={{ height: `${d.pct}%` }}
                  className={`w-full rounded-t transition-all duration-150 ${
                    d.pct >= 90
                      ? "bg-emerald-500/50"
                      : isHovered
                      ? "bg-white/30"
                      : "bg-white/[0.12]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between px-2 pt-2 text-[11px] font-mono text-[#64748B]">
          {velocityData.map((d) => (
            <span key={d.day}>{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
