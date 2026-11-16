"use client";

import React, { useState, useEffect } from "react";
import { Building2, TrendingUp, Maximize2, ShieldCheck, Download, CheckCircle2, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/lib/hooks/useScrollLock";

export default function AllSpvsDashboardSection() {
  const [filter, setFilter] = useState<"all" | "active" | "ready">("all");
  const [isZoomed, setIsZoomed] = useState(false);

  useScrollLock(isZoomed);

  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed]);

  const spvPortfolios = [
    {
      company: "Belgrave Legacy Wealth Ltd",
      crn: "14892011",
      properties: 4,
      rent: "£48,200",
      interest: "£18,240",
      taxRelief: "£4,560",
      dlaBalance: "£72,450",
      mtdStatus: "Q3 Reconciled",
      ready: true,
    },
    {
      company: "Mayfair Prime Residential SPV Ltd",
      crn: "15201994",
      properties: 2,
      rent: "£36,000",
      interest: "£14,800",
      taxRelief: "£3,700",
      dlaBalance: "£45,200",
      mtdStatus: "Q3 Reconciled",
      ready: true,
    },
    {
      company: "Kensington Core Holding Ltd",
      crn: "15984102",
      properties: 6,
      rent: "£78,500",
      interest: "£31,200",
      taxRelief: "£7,800",
      dlaBalance: "£110,000",
      mtdStatus: "Drafting CT600",
      ready: false,
    },
    {
      company: "Reading Commercial & BTL SPV Ltd",
      crn: "16021448",
      properties: 3,
      rent: "£42,000",
      interest: "£16,500",
      taxRelief: "£4,125",
      dlaBalance: "£58,900",
      mtdStatus: "Live Bank Feed",
      ready: true,
    },
  ];

  const filtered = spvPortfolios.filter((p) => {
    if (filter === "ready") return p.ready;
    return true;
  });

  return (
    <section id="all-spvs" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
              <span>Multi-Entity Portfolio Hub</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              All SPVs, managed in one place.
            </h2>
            <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed">
              Your property ledger, on desktop and mobile. Real-time rental collections, Section 24 mortgage relief schedules, and tax-free DLA extraction pools across all limited companies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(true)}
              className="px-4 py-2 rounded-lg bg-[#14241d] border border-[#1e382b] hover:border-[#a4f4cf]/40 text-xs font-mono font-semibold text-[#a4f4cf] flex items-center gap-2 transition-all shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Enlarge Ledger</span>
            </button>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-2xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-2xl">
          {/* Top Bar */}
          <div className="p-4 sm:p-5 bg-[#0c1813] border-b border-[#1e382b] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-900"></div>
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                MERCIAN OS · ACTIVE SPV PORTFOLIO LEDGER
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  filter === "all"
                    ? "bg-[#a4f4cf] text-[#0c1813] font-bold"
                    : "text-[#8a9d94] hover:text-white"
                }`}
              >
                All SPVs (4)
              </button>
              <button
                onClick={() => setFilter("ready")}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  filter === "ready"
                    ? "bg-[#a4f4cf] text-[#0c1813] font-bold"
                    : "text-[#8a9d94] hover:text-white"
                }`}
              >
                Filing Ready (3)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#14241d] border-b border-[#1e382b] text-[10px] uppercase tracking-wider text-[#8a9d94]">
                <tr>
                  <th className="py-3.5 px-5">SPV Limited Company</th>
                  <th className="py-3.5 px-4">Properties</th>
                  <th className="py-3.5 px-4">Annual Rent</th>
                  <th className="py-3.5 px-4">Finance Cost (S24)</th>
                  <th className="py-3.5 px-4">Tax Relief Locked</th>
                  <th className="py-3.5 px-4">DLA Balance</th>
                  <th className="py-3.5 px-4">MTD Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e382b]/60">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#0c1813]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#a4f4cf]" />
                        <span>{item.company}</span>
                      </div>
                      <span className="text-[10px] text-[#8a9d94] block pl-6">
                        CRN: #{item.crn}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-semibold">{item.properties} Units</td>
                    <td className="py-4 px-4 text-white font-bold">{item.rent}</td>
                    <td className="py-4 px-4 text-slate-300">{item.interest}</td>
                    <td className="py-4 px-4 text-[#a4f4cf] font-bold">+{item.taxRelief}</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">{item.dlaBalance}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#a4f4cf]/10 text-[#a4f4cf] border border-[#a4f4cf]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a4f4cf]"></span>
                        {item.mtdStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="text-xs font-semibold text-slate-200 hover:text-[#a4f4cf] cursor-pointer inline-flex items-center gap-1">
                        <span>Ledger</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="p-4 bg-[#0c1813] border-t border-[#1e382b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a9d94] font-mono">
            <span>Portfolio Total: 15 Buy-To-Let Properties Across 4 SPVs</span>
            <span className="text-[#a4f4cf] font-bold">Total Annual Section 24 Savings: £20,185.00</span>
          </div>
        </div>
      </div>

      {/* Enlarge Modal */}
      {isZoomed && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsZoomed(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overscroll-contain"
        >
          <div className="bg-[#14241d] border border-[#1e382b] rounded-2xl max-w-5xl w-full p-6 space-y-6 shadow-2xl modal-scrollable max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1e382b] pb-4 sticky top-0 bg-[#14241d] z-10">
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Executive Property Portfolio Ledger Overview
                </h3>
                <p className="text-xs font-mono text-[#8a9d94]">
                  High-density multi-SPV financial monitoring &amp; Section 24 relief scheduler
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="text-xs font-mono text-[#8a9d94] hover:text-white px-3 py-1.5 rounded bg-[#0c1813] border border-[#1e382b]"
              >
                Close (ESC)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-1">
                <span className="text-[10px] text-[#8a9d94] uppercase">Total Portfolio Turnover</span>
                <div className="text-xl font-bold text-white">£204,700.00</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-1">
                <span className="text-[10px] text-[#8a9d94] uppercase">Section 24 Mortgage Relief</span>
                <div className="text-xl font-bold text-[#a4f4cf]">£80,740.00</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-1">
                <span className="text-[10px] text-[#8a9d94] uppercase">Total Tax-Free DLA Pool</span>
                <div className="text-xl font-bold text-emerald-400">£286,550.00</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsZoomed(false)}
                className="px-5 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold font-mono text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
