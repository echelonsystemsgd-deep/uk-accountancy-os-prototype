"use client";

import React from "react";
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
} from "lucide-react";
import BklitFunnelChart from "@/components/charts/BklitFunnelChart";

export default function PartnerRadar() {
  const { metrics, clients, setCurrentView, setSelectedClientId, setActiveChaserDocumentId, exportAuditCsv, triggerToast } =
    useDemoStore();

  const [isSyncing, setIsSyncing] = React.useState(false);

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

  // Find clients with pending/overdue documents
  const clientsWithPending = clients
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
      {/* 1. Header (No Useless Orange Eyebrow Text) */}
      <div className="accountant-card p-5 sm:p-6 bg-[#162032] border border-[#1F293D] rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Partner Practice Radar
            </h1>
            <p className="text-xs text-slate-400">
              Live Practice Telemetry &bull; Client Onboarding Velocity &bull; Statutory CT600 Deadlines
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSyncPracticeStack}
              disabled={isSyncing}
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Reconciling..." : "Sync Practice Stack"}</span>
            </button>
            <button
              onClick={exportAuditCsv}
              className="touch-target-44 inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-[#0077C8] hover:bg-[#0284C7] text-white transition shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Practice Audit (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Rexora-Style 4 Core Metric Cards (with icons in top-right pills, bold numbers, inner shadows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Active Portfolios */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Active Portfolios</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {metrics.activeLandlordsCount}
              </span>
              <span className="text-xs text-slate-400">
                ({metrics.trackedPropertiesCount} property units)
              </span>
            </div>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="text-slate-400 truncate">
                Focus: <strong className="text-white">SUKHPREET KAUR LTD</strong>
              </span>
              <span className="text-emerald-400 font-bold">+100% SPV</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Unbilled WIP Total */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Unbilled WIP Total</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PoundSterling className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums block">
              £{metrics.unbilledWipTotal.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="text-slate-400">Accrued Work-in-Progress</span>
              <span className="text-emerald-400 font-semibold">Ready to Bill</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Filing Deadlines */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Filing Deadlines</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums block">
              3 Approaching
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="text-slate-400">CT600 &amp; Annual Accounts</span>
              <span className="text-amber-400 font-semibold">Q4 Filing</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Missing Evidence */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Missing Evidence</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono tabular-nums block">
              {metrics.missingDocumentsCount} Needed
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="text-slate-400">Awaiting Dropzone Upload</span>
              <button
                type="button"
                onClick={() => setCurrentView("chaser")}
                className="text-sky-400 hover:text-white font-medium"
              >
                Launch Chaser &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bklit-Inspired Funnel Chart (Outreach & Statutory Client Acquisition Funnel) */}
      <BklitFunnelChart
        title="Outreach &amp; Statutory Retention Funnel (bklit.com standard)"
        subtitle="End-to-end conversion stages: Companies House BTL scrape &rarr; Section 24 audit &rarr; AST leases &rarr; CT600 retainer"
      />

      {/* 4. Priority Client Spotlight Card (SUKHPREET KAUR LEGACY WEALTH LTD) */}
      <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                Priority Client Portfolio
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Books 98.4% Reconciled
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">SUKHPREET KAUR LEGACY WEALTH LTD</h3>
            <p className="text-xs text-slate-400">
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
              className="touch-target-44 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-1.5 shadow-sm transition"
            >
              <span>Open Property Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Clients Requiring Immediate Compliance Action */}
      <div className="accountant-card bg-[#162032] border border-[#1F293D] rounded-xl overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Clients Requiring Document Chasing ({clientsWithPending.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">Auto-Chaser Scheduled</span>
        </div>

        <div className="space-y-3">
          {clientsWithPending.map((client) => (
            <div
              key={client.id}
              className="p-4 rounded-lg bg-[#111827] border border-[#1F293D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{client.entityName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
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
                  className="touch-target-44 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Send WhatsApp Chaser</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenClientWorkspace(client.id)}
                  className="touch-target-44 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#0077C8] hover:bg-[#0284C7] text-white transition"
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
