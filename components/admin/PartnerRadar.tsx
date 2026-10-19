"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  AlertTriangle,
  Clock,
  PoundSterling,
  ArrowDownRight,
  Send,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  Mail,
  Calendar,
} from "lucide-react";

export default function PartnerRadar() {
  const { metrics, clients, setCurrentView, setSelectedClientId, setActiveChaserDocumentId } =
    useDemoStore();

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
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Partner Practice Radar
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Real-time onboarding velocity, missing compliance documents, and tax filing deadlines across active portfolios.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span>Tax Year 2024/25 Active Quarter</span>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Active Landlord Portfolios</span>
            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-neutral-900 num-tabular">
              {metrics.activeLandlordsCount}
            </span>
            <span className="text-xs text-neutral-500">
              ({metrics.trackedPropertiesCount} property units)
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            SPV Ltd Cos, individual BTLs & joint owners
          </p>
        </div>

        {/* Metric 2 */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Missing Documents Pending</span>
            <div className="w-8 h-8 rounded bg-amber-50 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-700 num-tabular">
              {metrics.missingDocumentsCount}
            </span>
            <span className="text-xs text-neutral-500">items awaiting client upload</span>
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            Mortgage certs, proof of address, P60s
          </p>
        </div>

        {/* Metric 3 */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Approaching Deadlines</span>
            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-neutral-900 num-tabular">
              {metrics.approachingDeadlinesCount}
            </span>
            <span className="text-xs text-neutral-500">due within 30 days</span>
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            ITSA Section 24 & SPV corporation tax
          </p>
        </div>

        {/* Metric 4 */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Unbilled WIP Delayed</span>
            <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-800">
              <PoundSterling className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-neutral-900 num-tabular">
              £{metrics.unbilledWipTotal.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            Locked in onboarding document backlog
          </p>
        </div>
      </div>

      {/* Two High-Clarity Operational Charts (Sparing, 2 Maximum) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Onboarding Cycle Time */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Average Onboarding Cycle Time (Days)
              </h2>
              <p className="text-xs text-neutral-500">
                From initial enquiry to tax computation ready
              </p>
            </div>
            <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>83% Faster</span>
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-44 flex items-end justify-between pt-4 pb-2 px-2 border-b border-neutral-100">
            {[
              { label: "Traditional", val: 26, color: "bg-neutral-300" },
              { label: "Manual Chase", val: 19, color: "bg-neutral-400" },
              { label: "Email Nudges", val: 12, color: "bg-neutral-500" },
              { label: "Portal + SMS", val: 6.5, color: "bg-slate-700" },
              { label: "Dropzone OS", val: 4.2, color: "bg-emerald-700" },
            ].map((col) => {
              const heightPct = Math.round((col.val / 28) * 100);
              return (
                <div key={col.label} className="flex flex-col items-center flex-1 max-w-[60px]">
                  <span className="text-[11px] font-semibold text-neutral-700 num-tabular mb-1">
                    {col.val}d
                  </span>
                  <div className="w-8 sm:w-10 bg-neutral-100 rounded-t overflow-hidden flex items-end h-28">
                    <div
                      className={`w-full rounded-t ${col.color} transition-all duration-500`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="mt-2 text-[10px] text-neutral-500 text-center truncate w-full">
                    {col.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">
            Client turnaround reduced from 26 days to 4.2 days via direct mobile photo capture.
          </p>
        </div>

        {/* Chart 2: Document Return Rate by Channel */}
        <div className="accountant-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Document Upload Rate (Within 24 Hours)
              </h2>
              <p className="text-xs text-neutral-500">
                Response velocity by client reminder channel
              </p>
            </div>
            <span className="text-xs font-semibold text-neutral-700 num-tabular">
              88% Top Rate
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                channel: "WhatsApp Business Link",
                pct: 88,
                note: "Fastest: 88% upload certificates on their phone within 24h",
                color: "bg-emerald-700",
                icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />,
              },
              {
                channel: "SMS Text Message",
                pct: 74,
                note: "Strong response: 74% completed within 48h",
                color: "bg-slate-700",
                icon: <Send className="w-3.5 h-3.5 text-slate-700" />,
              },
              {
                channel: "Standard Practice Email",
                pct: 38,
                note: "Traditional chasing: 38% response, buried in inboxes",
                color: "bg-neutral-400",
                icon: <Mail className="w-3.5 h-3.5 text-neutral-500" />,
              },
            ].map((item) => (
              <div key={item.channel} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 font-medium text-neutral-800">
                    {item.icon}
                    <span>{item.channel}</span>
                  </div>
                  <span className="font-semibold text-neutral-900 num-tabular">{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded bg-neutral-100 overflow-hidden">
                  <div
                    className={`h-full rounded ${item.color} transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-500">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgent Action Table: Clients with Pending / Overdue Checklists */}
      <div className="accountant-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              Immediate Practice Attention Needed
            </h2>
            <p className="text-xs text-neutral-600">
              Landlords with overdue compliance documents holding up Section 24 or statutory calculations
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentView("pipeline")}
            className="text-xs font-semibold text-primary hover:text-neutral-700 inline-flex items-center space-x-1 transition"
          >
            <span>View All {clients.length} Landlord Portfolios</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                <th className="py-3 px-4">Landlord / Entity</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Missing Document</th>
                <th className="py-3 px-4">Status & Due Date</th>
                <th className="py-3 px-4">Assigned Partner</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {clientsWithPending.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="font-medium text-neutral-900">Zero Overdue Documents</p>
                    <p className="text-xs text-neutral-500">
                      All client checklists are verified and up to date.
                    </p>
                  </td>
                </tr>
              ) : (
                clientsWithPending.map((client) => {
                  const urgentDoc =
                    client.pendingDocs.find((d) => d.isOverdue) || client.pendingDocs[0];
                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        {client.entityName}
                        <div className="text-[11px] text-neutral-500 font-normal">
                          {client.properties.length} properties ({client.properties[0]?.address || "Multiple"})
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700">
                          {client.entityType === "spv_ltd"
                            ? "SPV Ltd Co"
                            : client.entityType === "joint"
                            ? "Joint BTL"
                            : "Individual BTL"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-neutral-800">
                          {urgentDoc?.title || "Checklist Item"}
                        </span>
                        <div className="text-[10px] text-neutral-500">
                          Target: {urgentDoc?.ownerOrProperty}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {urgentDoc?.isOverdue ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>Overdue ({urgentDoc.dueDate})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pending ({urgentDoc?.dueDate})</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700 font-medium">
                        {client.assignedAccountant}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenClientWorkspace(client.id)}
                          className="px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition"
                        >
                          Workspace
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickChase(client.id, urgentDoc?.id)}
                          className="px-2.5 py-1.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Chase</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
