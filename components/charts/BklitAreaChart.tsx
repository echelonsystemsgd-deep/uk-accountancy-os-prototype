"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface DataPoint {
  date: string;
  shortDate: string;
  revenue: number;
  costs: number;
  profit: number;
}

const DEFAULT_DATA: DataPoint[] = [
  { date: "May 2024", shortDate: "May", revenue: 3250, costs: 1420, profit: 1830 },
  { date: "Jun 2024", shortDate: "Jun", revenue: 3250, costs: 1380, profit: 1870 },
  { date: "Jul 2024", shortDate: "Jul", revenue: 3500, costs: 1850, profit: 1650 },
  { date: "Aug 2024", shortDate: "Aug", revenue: 3250, costs: 1400, profit: 1850 },
  { date: "Sep 2024", shortDate: "Sep", revenue: 3750, costs: 1620, profit: 2130 },
  { date: "Oct 2024", shortDate: "Oct", revenue: 3250, costs: 2100, profit: 1150 }, // Boiler repair
  { date: "Nov 2024", shortDate: "Nov", revenue: 3250, costs: 1420, profit: 1830 },
  { date: "Dec 2024", shortDate: "Dec", revenue: 3250, costs: 1450, profit: 1800 },
];

export default function BklitAreaChart({
  title = "Net Rental Revenue & Operating Cost Horizon",
  subtitle = "Section 24 allowable expenses & mortgage interest indexing over FY 2024/25",
  data = DEFAULT_DATA,
}: {
  title?: string;
  subtitle?: string;
  data?: DataPoint[];
}) {
  const [hoverIndex, setHoverIndex] = useState<number>(data.length - 2); // Default to recent month (Oct)

  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.costs))) * 1.15;
  const minVal = 0;

  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 24;

  const getX = (idx: number) => paddingX + (idx / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Generate smooth SVG curve path
  const createSmoothPath = (values: number[]) => {
    const points = values.map((val, idx) => ({ x: getX(idx), y: getY(val) }));
    if (points.length < 2) return "";

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const revenuePath = createSmoothPath(data.map((d) => d.revenue));
  const costsPath = createSmoothPath(data.map((d) => d.costs));

  const revenueAreaPath = `${revenuePath} L ${getX(data.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;
  const costsAreaPath = `${costsPath} L ${getX(data.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  const activePoint = data[hoverIndex] || data[data.length - 1];
  const activeX = getX(hoverIndex);
  const activeRevY = getY(activePoint.revenue);
  const activeCostY = getY(activePoint.costs);

  return (
    <div className="accountant-card p-5 sm:p-6 bg-[#162032] border border-[#1F293D] rounded-xl text-left space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1F293D] pb-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <span>{title}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Feed
            </span>
          </h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0077C8]" />
            <span className="text-slate-300">Gross Rent</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span className="text-slate-300">Allowable Costs</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area Chart */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * width;
            let closestIdx = 0;
            let minDiff = 99999;
            data.forEach((_, idx) => {
              const diff = Math.abs(getX(idx) - relX);
              if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
              }
            });
            setHoverIndex(closestIdx);
          }}
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0077C8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0077C8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="costsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#1F293D" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#1F293D" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#1F293D" />

          {/* Filled Areas */}
          <path d={revenueAreaPath} fill="url(#revenueGrad)" />
          <path d={costsAreaPath} fill="url(#costsGrad)" />

          {/* Stroke Lines */}
          <path d={revenuePath} fill="none" stroke="#0077C8" strokeWidth="2.5" strokeLinecap="round" />
          <path d={costsPath} fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />

          {/* Vertical Crosshair Line on Hover */}
          <line
            x1={activeX}
            y1={paddingY}
            x2={activeX}
            y2={height - paddingY}
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Active Data Points */}
          <circle cx={activeX} cy={activeRevY} r="4.5" fill="#0077C8" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx={activeX} cy={activeCostY} r="4" fill="#94A3B8" stroke="#162032" strokeWidth="2" />
        </svg>

        {/* Floating Tooltip (Bklit style) */}
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 transition-all duration-75"
          style={{
            left: `${(activeX / width) * 100}%`,
            top: "8px",
          }}
        >
          <div className="bg-[#0B0F19]/95 backdrop-blur-md border border-[#2D3B55] px-3 py-2 rounded-lg shadow-xl text-left text-xs space-y-1 min-w-[130px]">
            <span className="text-[11px] font-semibold text-slate-400 block border-b border-slate-800 pb-1">
              {activePoint.date}
            </span>
            <div className="flex items-center justify-between text-white space-x-2">
              <span className="flex items-center space-x-1 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#0077C8]" />
                <span>Revenue</span>
              </span>
              <strong className="font-mono tabular-nums">£{activePoint.revenue.toLocaleString()}</strong>
            </div>
            <div className="flex items-center justify-between text-white space-x-2">
              <span className="flex items-center space-x-1 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Costs</span>
              </span>
              <strong className="font-mono tabular-nums text-slate-300">£{activePoint.costs.toLocaleString()}</strong>
            </div>
            <div className="flex items-center justify-between text-emerald-400 pt-1 border-t border-slate-800 font-bold">
              <span>Net Cash</span>
              <span className="font-mono tabular-nums">+£{activePoint.profit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Axis Badges (Bklit pill style) */}
      <div className="flex items-center justify-between px-6 pt-1 text-[11px]">
        {data.map((d, idx) => {
          const isActive = idx === hoverIndex;
          return (
            <button
              key={d.date}
              type="button"
              onClick={() => setHoverIndex(idx)}
              className={`px-2 py-0.5 rounded transition-all font-medium ${
                isActive
                  ? "bg-[#0077C8] text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {d.shortDate}
            </button>
          );
        })}
      </div>
    </div>
  );
}
