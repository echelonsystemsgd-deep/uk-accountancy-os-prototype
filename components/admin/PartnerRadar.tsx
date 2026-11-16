"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  AlertTriangle,
  Clock,
  PoundSterling,
  Send,
  ExternalLink,
  CheckCircle2,
  Download,
  ShieldCheck,
  RefreshCw,
  Crown,
  ChevronRight,
  TrendingUp,
  Percent,
  Wallet,
  Coins,
} from "lucide-react";
import BklitFunnelChart from "@/components/charts/BklitFunnelChart";

export default function PartnerRadar() {
  const {
    metrics,
    clients,
    currentStaffPerspective,
    setCurrentView,
    setSelectedClientId,
    setActiveChaserDocumentId,
    exportAuditCsv,
    triggerToast,
  } = useDemoStore();

  const [isSyncing, setIsSyncing] = useState(false);
  const [activeMode, setActiveMode] = useState<"live" | "audit">("live");

  const displayClients = currentStaffPerspective
    ? clients.filter((c) => c.assignedAccountant?.includes(currentStaffPerspective) || c.assignedAccountant === currentStaffPerspective)
    : clients;

  const handleSyncPracticeStack = async () => {
    setIsSyncing(true);
    triggerToast("Reconciling Practice Stack", "Polling Xero Practice Manager and Karbon webhooks...", "info");
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast(
        "Practice Stack Reconciled",
        "Active landlord schedules and unbilled WIP successfully synced.",
        "success"
      );
    }, 700);
  };

  const handleModeSwitch = (mode: "live" | "audit") => {
    setActiveMode(mode);
    if (mode === "audit") {
      triggerToast("Audit Simulation Active", "Viewing historical Q4 HMRC submission snapshots.", "info");
    } else {
      triggerToast("Live Practice Mode", "Connected to real-time SPV Open Banking feeds.", "success");
    }
  };

  // Find clients with pending/overdue documents (filtered by staff perspective if active)
  const clientsWithPending = displayClients
    .filter((c) => c.documents.some((d) => d.status === "pending"))
    .map((c) => {
      const pendingDocs = c.documents.filter((d) => d.status === "pending");
      const hasOverdue = pendingDocs.some((d) => d.isOverdue);
      return {
        ...c,
        pendingDocs,
        hasOverdue,
      };
    });

  const handleOpenClientWorkspace = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentView("workspace");
  };

  const handleQuickChase = (clientId: string, docId?: string) => {
    setSelectedClientId(clientId);
    if (docId) setActiveChaserDocumentId(docId);
    setCurrentView("chaser");
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* 1. Command Center Header with Mode Switches */}
      <div className="p-5 sm:p-6 bg-[#111726] border border-[#1F293D] rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Command Center
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#a4f4cf]/10 border border-[#a4f4cf]/30 text-[#a4f4cf] font-semibold">
                Partner Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Senior partner oversight across active SPV clients, fee pipeline, and Making Tax Digital readiness
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Toggle Switch */}
            <div className="flex items-center p-1 rounded-xl bg-[#0B0F19] border border-[#1F293D] font-mono text-xs">
              <button
                type="button"
                onClick={() => handleModeSwitch("live")}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  activeMode === "live"
                    ? "bg-[#a4f4cf] text-[#080B11] font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Live Practice
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("audit")}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  activeMode === "audit"
                    ? "bg-[#162032] text-amber-400 font-bold border border-[#1F293D]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Audit Mode
              </button>
            </div>

            <button
              onClick={handleSyncPracticeStack}
              disabled={isSyncing}
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-mono font-semibold rounded-xl bg-[#162032] text-slate-200 hover:text-white hover:bg-[#1f2c42] border border-[#1F293D] transition shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#a4f4cf] ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Reconciling..." : "Sync Practice"}</span>
            </button>
            <button
              onClick={exportAuditCsv}
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-mono font-bold rounded-xl bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] transition shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 6 Core Key Performance Indicator (KPI) Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric 1: Active SPV Portfolios */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Active SPV Portfolios
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {currentStaffPerspective ? displayClients.length : (metrics.activeLandlordsCount || 14)}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({currentStaffPerspective ? displayClients.reduce((acc, c) => acc + (c.properties?.length || 1), 0) : (metrics.trackedPropertiesCount || 48)} property units)
              </span>
            </div>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400 truncate">
                Focus: <strong className="text-white">SUKHPREET KAUR LTD</strong>
              </span>
              <span className="text-[#a4f4cf] font-bold">+100% SPV</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Unbilled WIP Total */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Unbilled WIP Retainers
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PoundSterling className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#a4f4cf] font-mono tabular-nums block">
              £{metrics.unbilledWipTotal ? metrics.unbilledWipTotal.toLocaleString() : "18,450.00"}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400">Accrued Work-in-Progress</span>
              <span className="text-emerald-400 font-semibold">Ready to Bill</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Filing Deadlines */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Statutory Deadlines
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums block">
              3 Approaching
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400">CT600 &amp; Annual Accounts</span>
              <span className="text-amber-400 font-semibold">Q4 Filing</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Missing Evidence / KYC */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Pending Evidence / KYC
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono tabular-nums block">
              {metrics.missingDocumentsCount || 2} Needed
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400">Awaiting Dropzone Upload</span>
              <button
                type="button"
                onClick={() => setCurrentView("chaser")}
                className="text-[#a4f4cf] hover:text-white font-medium"
              >
                Launch Chaser &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Metric 5: Section 24 Relief Sheltered */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Section 24 Relief Sheltered
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#a4f4cf]/10 border border-[#a4f4cf]/20 flex items-center justify-center text-[#a4f4cf]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#a4f4cf] font-mono tabular-nums block">
              £142,800.00
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400">Mortgage Relief Indexed</span>
              <span className="text-[#a4f4cf] font-semibold">100% Corp Relieved</span>
            </div>
          </div>
        </div>

        {/* Metric 6: Total Tax-Free DLA Pool */}
        <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:border-[#a4f4cf]/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Total Tax-Free DLA Pool
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums block">
              £385,200.00
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1F293D] text-[11px] font-mono">
              <span className="text-slate-400">Available Extraction Pool</span>
              <span className="text-amber-400 font-semibold">0% Income Tax</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bklit Funnel Chart (Outreach & Statutory Client Acquisition Funnel) */}
      <BklitFunnelChart
        title="Outreach &amp; Statutory Retention Funnel (bklit.com standard)"
        subtitle="End-to-end conversion stages: Companies House BTL scrape &rarr; Section 24 audit &rarr; AST leases &rarr; CT600 retainer"
      />

      {/* 4. Priority Client Spotlight Card (SUKHPREET KAUR LEGACY WEALTH LTD) */}
      <div className="p-5 bg-[#111726] border border-[#1F293D] rounded-2xl space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold font-mono text-[#a4f4cf] uppercase tracking-wider block">
                Priority Client Portfolio
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Books 98.4% Reconciled
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">SUKHPREET KAUR LEGACY WEALTH LTD</h3>
            <p className="text-xs text-slate-400 font-mono">
              Company No: 14892011 &bull; SPV Buy-to-Let &bull; £134,625 DLA Credit &bull; £39,000 Gross Turnover
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                setSelectedClientId("client-legacy-wealth");
                setCurrentView("workspace");
              }}
              className="touch-target-44 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] flex items-center space-x-1.5 shadow-sm transition active:scale-95"
            >
              <span>Open Property Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Clients Requiring Immediate Compliance Action */}
      <div className="bg-[#111726] border border-[#1F293D] rounded-2xl overflow-hidden p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Clients Requiring Document Chasing ({clientsWithPending.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Auto-Chaser Scheduled</span>
        </div>

        <div className="space-y-3">
          {clientsWithPending.map((client) => (
            <div
              key={client.id}
              className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{client.entityName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#162032] text-slate-300 font-mono border border-[#1F293D]">
                    {client.properties.length} Properties
                  </span>
                </div>
                <p className="text-slate-400 text-xs">
                  Director: <strong className="text-slate-200">{client.primaryContact}</strong> &bull; {client.pendingDocs.length} outstanding documents needed for year-end pack.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleQuickChase(client.id)}
                  className="touch-target-44 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#162032] hover:bg-[#1f2c42] text-slate-200 border border-[#1F293D] flex items-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Send WhatsApp Chaser</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenClientWorkspace(client.id)}
                  className="touch-target-44 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#080B11] transition"
                >
                  <span>Review File</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
