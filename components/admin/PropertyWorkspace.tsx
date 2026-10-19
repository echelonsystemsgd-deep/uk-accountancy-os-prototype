"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  User,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Upload,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

export default function PropertyWorkspace() {
  const {
    activeClient,
    clients,
    setSelectedClientId,
    setCurrentView,
    setActiveChaserDocumentId,
    uploadDocument,
  } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"properties" | "parties">("properties");

  const pendingDocs = activeClient.documents.filter((d) => d.status === "pending");
  const verifiedDocs = activeClient.documents.filter((d) => d.status === "verified");

  const handleChaseDocument = (docId: string) => {
    setActiveChaserDocumentId(docId);
    setCurrentView("chaser");
  };

  const handleSimulateQuickVerify = (docId: string, docTitle: string) => {
    uploadDocument(activeClient.id, docId, `${docTitle.toLowerCase().replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <button
            type="button"
            onClick={() => setCurrentView("pipeline")}
            className="hover:text-neutral-900 inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landlord Pipeline</span>
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{activeClient.entityName}</span>
        </div>

        {/* Switch Client Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-neutral-500 font-medium">Switch Account:</span>
          <select
            value={activeClient.id}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="border border-neutral-200 rounded px-2.5 py-1 text-xs bg-white text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.entityName} ({c.properties.length} props)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Client Overview Card */}
      <div className="accountant-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                {activeClient.entityName}
              </h1>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-100 text-neutral-800">
                {activeClient.entityType === "spv_ltd"
                  ? `SPV Ltd Co (No. ${activeClient.companyNumber})`
                  : activeClient.entityType === "joint"
                  ? "Joint BTL Portfolio"
                  : "Individual Landlord"}
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Primary: {activeClient.primaryContact} ({activeClient.email}) &bull; Assigned:{" "}
              <strong>{activeClient.assignedAccountant}</strong> &bull; Tax Year: {activeClient.taxYear}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentView("dropzone")}
              className="touch-target-44 px-3.5 py-2 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1.5"
            >
              <Smartphone className="w-4 h-4 text-neutral-600" />
              <span>Preview Client Dropzone</span>
            </button>

            {pendingDocs.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setActiveChaserDocumentId(pendingDocs[0]?.id || null);
                  setCurrentView("chaser");
                }}
                className="touch-target-44 px-3.5 py-2 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Multi-Channel Chaser</span>
              </button>
            )}
          </div>
        </div>

        {/* Financial & Status KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-100 text-xs">
          <div>
            <span className="text-neutral-500 font-medium block">Annual Rental Income</span>
            <span className="text-base font-bold text-neutral-900 num-tabular">
              £{activeClient.totalRentalIncome.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block">Properties Tracked</span>
            <span className="text-base font-bold text-neutral-900 num-tabular">
              {activeClient.properties.length} units
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block">Checklist Completion</span>
            <span className="text-base font-bold text-neutral-900 num-tabular">
              {verifiedDocs.length} / {activeClient.documents.length} verified
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block">Unbilled Practice WIP</span>
            <span className="text-base font-bold text-emerald-700 num-tabular">
              £{activeClient.unbilledWip.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Property Asset Schedule vs Owner KYC/AML */}
      <div className="accountant-card overflow-hidden">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 sm:px-6">
          <nav className="flex space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab("properties")}
              className={`py-3 text-xs font-semibold border-b-2 transition-colors inline-flex items-center space-x-1.5 ${
                activeTab === "properties"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Property Asset Schedule & Deductions ({activeClient.properties.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("parties")}
              className={`py-3 text-xs font-semibold border-b-2 transition-colors inline-flex items-center space-x-1.5 ${
                activeTab === "parties"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Owner KYC/AML & Personal Records ({activeClient.parties.length})</span>
            </button>
          </nav>
        </div>

        {/* Tab 1: Property Asset Schedule */}
        {activeTab === "properties" && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Per-Property Compliance & Loan Verification
                </h3>
                <p className="text-xs text-neutral-500">
                  Annual mortgage interest certificates, tenancy agreements, and expense schedules per unit
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeClient.properties.map((prop) => {
                // Find documents belonging to this property
                const propDocs = activeClient.documents.filter(
                  (d) =>
                    d.ownerOrProperty.toLowerCase().includes(prop.address.toLowerCase().split(",")[0]) ||
                    d.ownerOrProperty.toLowerCase().includes(prop.postcode.toLowerCase())
                );

                return (
                  <div
                    key={prop.id}
                    className="border border-neutral-200 rounded-lg p-4 bg-white space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-neutral-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-neutral-700" />
                        <h4 className="text-sm font-bold text-neutral-900">{prop.address}</h4>
                        <span className="text-xs text-neutral-500">({prop.postcode})</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-neutral-600">
                        <span>Type: <strong>{prop.propertyType}</strong></span>
                        <span>Rent: <strong className="num-tabular">£{prop.annualRentalIncome.toLocaleString()}/yr</strong></span>
                        {prop.mortgageLender && (
                          <span>Lender: <strong>{prop.mortgageLender}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* Associated Documents */}
                    <div className="space-y-2 pt-1">
                      {propDocs.length === 0 ? (
                        <p className="text-xs text-neutral-500 italic">
                          Standard rental schedule applies. No pending certificates for this unit.
                        </p>
                      ) : (
                        propDocs.map((doc) => (
                          <div
                            key={doc.id}
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded border text-xs gap-2 ${
                              doc.status === "verified"
                                ? "bg-emerald-50/50 border-emerald-200"
                                : doc.isOverdue
                                ? "bg-red-50/50 border-red-200"
                                : "bg-amber-50/50 border-amber-200"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-neutral-900">{doc.title}</span>
                                {doc.status === "verified" ? (
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>Verified</span>
                                  </span>
                                ) : doc.isOverdue ? (
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-red-800 bg-red-100 px-2 py-0.2 rounded">
                                    <AlertTriangle className="w-3 h-3 text-red-600" />
                                    <span>Overdue ({doc.dueDate})</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.2 rounded">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    <span>Pending</span>
                                  </span>
                                )}
                              </div>
                              {doc.notes && (
                                <p className="text-neutral-600 text-[11px]">{doc.notes}</p>
                              )}
                              {doc.fileSize && (
                                <p className="text-neutral-400 text-[10px]">
                                  Stored in London Private Vault: {doc.fileSize}
                                </p>
                              )}
                            </div>

                            {/* Actions for this document */}
                            <div className="flex items-center space-x-2 shrink-0">
                              {doc.status === "pending" ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleChaseDocument(doc.id)}
                                    className="px-2.5 py-1 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1"
                                  >
                                    <Send className="w-3 h-3" />
                                    <span>Send Chaser</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSimulateQuickVerify(doc.id, doc.title)}
                                    title="Simulate client or staff verification"
                                    className="px-2.5 py-1 rounded text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 transition"
                                  >
                                    Verify
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-neutral-500 font-medium">
                                  {doc.uploadedAt}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Owner KYC/AML & Personal Records */}
        {activeTab === "parties" && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Individual Landlords & Directors
                </h3>
                <p className="text-xs text-neutral-500">
                  Identity verification, UTR records, and employment income slips for Self Assessment
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeClient.parties.map((party) => {
                // Find personal documents for this party
                const partyDocs = activeClient.documents.filter((d) =>
                  d.ownerOrProperty.toLowerCase().includes(party.fullName.toLowerCase())
                );

                return (
                  <div
                    key={party.id}
                    className="border border-neutral-200 rounded-lg p-4 bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-neutral-700" />
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">{party.fullName}</h4>
                          <span className="text-xs text-neutral-500">{party.role}</span>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <span className="text-neutral-500 block">Unique Taxpayer Ref (UTR):</span>
                        <span className="font-mono font-semibold text-neutral-900">
                          {party.utrNumber}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {partyDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className={`flex items-center justify-between p-2.5 rounded border text-xs ${
                            doc.status === "verified"
                              ? "bg-emerald-50/50 border-emerald-200"
                              : "bg-red-50/50 border-red-200"
                          }`}
                        >
                          <div>
                            <span className="font-medium text-neutral-900">{doc.title}</span>
                            <div className="text-[10px] text-neutral-500">
                              {doc.status === "verified"
                                ? `Verified on ${doc.uploadedAt}`
                                : `Missing - Due ${doc.dueDate}`}
                            </div>
                          </div>
                          {doc.status === "pending" ? (
                            <button
                              type="button"
                              onClick={() => handleChaseDocument(doc.id)}
                              className="px-2 py-1 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Chase</span>
                            </button>
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
