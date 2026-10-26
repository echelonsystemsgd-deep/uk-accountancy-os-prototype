"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { EntityType, OnboardingStage } from "@/lib/types";
import {
  Search,
  Filter,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderOpen,
  Send,
  ArrowRight,
  Download,
} from "lucide-react";

export default function LandlordPipeline() {
  const { clients, setSelectedClientId, setCurrentView, setActiveChaserDocumentId, exportAuditCsv } = useDemoStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<EntityType | "all">("all");
  const [selectedStage, setSelectedStage] = useState<OnboardingStage | "all">("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.primaryContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.properties.some((p) => p.address.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === "all" || client.entityType === selectedType;
    const matchesStage = selectedStage === "all" || client.stage === selectedStage;

    return matchesSearch && matchesType && matchesStage;
  });

  const getStageBadge = (stage: OnboardingStage) => {
    switch (stage) {
      case "intake_submitted":
        return {
          label: "Intake Submitted",
          bg: "bg-neutral-100",
          text: "text-neutral-700",
          icon: <Clock className="w-3 h-3 text-neutral-500" />,
        };
      case "kyc_pending":
        return {
          label: "KYC / AML Pending",
          bg: "bg-amber-50",
          text: "text-amber-800",
          icon: <AlertTriangle className="w-3 h-3 text-amber-600" />,
        };
      case "chasing_docs":
        return {
          label: "Chasing Documents",
          bg: "bg-amber-100",
          text: "text-amber-900",
          icon: <AlertTriangle className="w-3 h-3 text-amber-700" />,
        };
      case "review_ready":
        return {
          label: "Review Ready",
          bg: "bg-blue-50",
          text: "text-blue-800",
          icon: <CheckCircle2 className="w-3 h-3 text-blue-600" />,
        };
      case "computation_complete":
        return {
          label: "Computation Complete",
          bg: "bg-emerald-50",
          text: "text-emerald-800",
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
        };
    }
  };

  const handleOpenWorkspace = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentView("workspace");
  };

  const handleChase = (clientId: string) => {
    setSelectedClientId(clientId);
    const client = clients.find((c) => c.id === clientId);
    const missing = client?.documents.find((d) => d.status === "pending");
    if (missing) setActiveChaserDocumentId(missing.id);
    setCurrentView("chaser");
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Landlord Portfolio Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Track onboarding progression, document checklists, and compliance readiness across all property clients.
          </p>
        </div>
        <button
          onClick={exportAuditCsv}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="accountant-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              id="pipeline-search-input"
              aria-label="Search by entity name, owner, or property address"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by entity name, owner, or property address..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-neutral-50 text-neutral-900"
            />
          </div>

          {/* Entity Type Selector */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            <span className="text-neutral-500 font-medium mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Type:
            </span>
            {[
              { id: "all", label: "All Entities" },
              { id: "spv_ltd", label: "SPV Ltd" },
              { id: "joint", label: "Joint BTL" },
              { id: "individual", label: "Individual" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
                  selectedType === tab.id
                    ? "bg-primary text-white font-semibold"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Filter */}
        <div className="flex items-center space-x-2 pt-2 border-t border-neutral-100 text-xs overflow-x-auto">
          <span className="text-neutral-500 font-medium">Stage:</span>
          {[
            { id: "all", label: "All Stages" },
            { id: "chasing_docs", label: "Chasing Docs" },
            { id: "kyc_pending", label: "KYC Pending" },
            { id: "review_ready", label: "Review Ready" },
            { id: "computation_complete", label: "Complete" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStage(st.id as any)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                selectedStage === st.id
                  ? "bg-neutral-800 text-white font-medium"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client List Cards */}
      <div className="space-y-3">
        {filteredClients.length === 0 ? (
          <div className="accountant-card p-8 text-center text-neutral-500 text-sm">
            No landlord portfolios match your current search or filter criteria.
          </div>
        ) : (
          filteredClients.map((client) => {
            const totalDocs = client.documents.length;
            const verifiedDocs = client.documents.filter((d) => d.status === "verified").length;
            const pendingDocs = client.documents.filter((d) => d.status === "pending");
            const progressPct = totalDocs > 0 ? Math.round((verifiedDocs / totalDocs) * 100) : 100;
            const stageBadge = getStageBadge(client.stage);

            return (
              <div
                key={client.id}
                className="accountant-card p-4 sm:p-5 hover:border-neutral-300 transition shadow-sm space-y-4"
              >
                {/* Top Row: Entity, Structure, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                        {client.entityName}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700">
                        {client.entityType === "spv_ltd"
                          ? `SPV Ltd Co (No. ${client.companyNumber})`
                          : client.entityType === "joint"
                          ? "Joint BTL Portfolio"
                          : "Individual Landlord"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
                      <span>Primary: <strong className="text-neutral-700">{client.primaryContact}</strong></span>
                      <span>Assigned: <strong className="text-neutral-700">{client.assignedAccountant}</strong></span>
                      <span>Annual Rent: <strong className="text-neutral-700 num-tabular">£{client.totalRentalIncome.toLocaleString()}</strong></span>
                      <span>Tax Year: <strong className="text-neutral-700">{client.taxYear}</strong></span>
                    </div>
                  </div>

                  {/* Stage Pill */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium ${stageBadge.bg} ${stageBadge.text}`}
                    >
                      {stageBadge.icon}
                      <span>{stageBadge.label}</span>
                    </span>
                  </div>
                </div>

                {/* Properties & Document Checklist Progress */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-neutral-100 text-xs">
                  {/* Column 1: Properties Covered */}
                  <div>
                    <span className="text-neutral-500 font-medium block mb-1">
                      Properties Tracked ({client.properties.length}):
                    </span>
                    <ul className="space-y-1 text-neutral-700">
                      {client.properties.map((p) => (
                        <li key={p.id} className="truncate flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span className="truncate">{p.address}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Document Verification Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-neutral-500 font-medium">
                        Document Checklist:
                      </span>
                      <span className="font-semibold text-neutral-900 num-tabular">
                        {verifiedDocs} of {totalDocs} ({progressPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-neutral-100 overflow-hidden">
                      <div
                        className={`h-full rounded ${
                          progressPct === 100
                            ? "bg-emerald-600"
                            : progressPct >= 50
                            ? "bg-amber-600"
                            : "bg-red-600"
                        } transition-all duration-300`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    {pendingDocs.length > 0 ? (
                      <p className="mt-1.5 text-[11px] text-amber-800 font-medium">
                        {pendingDocs.length} outstanding ({pendingDocs[0]?.title})
                      </p>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-emerald-700 font-medium">
                        All compliance documents verified for computation
                      </p>
                    )}
                  </div>

                  {/* Column 3: Communication Status & Actions */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-neutral-500 font-medium block">
                        Communication Status:
                      </span>
                      <span className="text-neutral-700">
                        {client.lastChasedAt
                          ? `Last reminded ${client.lastChasedAt} (${client.chaseCount} sent)`
                          : "No reminders sent yet"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenWorkspace(client.id)}
                        className="flex-1 px-3 py-1.5 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center justify-center space-x-1"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Inspect Workspace</span>
                      </button>
                      {pendingDocs.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleChase(client.id)}
                          className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Chase</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
