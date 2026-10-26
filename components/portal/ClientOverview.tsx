"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  TrendingUp,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function ClientOverview() {
  const { activeClient, setCurrentView } = useDemoStore();

  const pendingDocs = activeClient.documents.filter((d) => d.status === "pending");
  const verifiedDocs = activeClient.documents.filter((d) => d.status === "verified");

  const totalRentalIncome = activeClient.totalRentalIncome;
  // Estimate Section 24 relief
  const estimatedTaxSavings = Math.round(totalRentalIncome * 0.18);

  return (
    <div className="space-y-6 text-left">
      {/* Welcome Banner */}
      <div className="accountant-card p-6 bg-gradient-to-r from-neutral-900 to-slate-800 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Tax Year {activeClient.taxYear}
              </span>
              <span className="text-neutral-400 text-xs">&bull;</span>
              <span className="text-xs text-neutral-300">
                Assigned: <strong className="text-white">{activeClient.assignedAccountant}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Welcome back, {activeClient.primaryContact}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              Portfolio Overview & Statutory Tax Compliance Dashboard for {activeClient.entityName}.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setCurrentView("dropzone")}
              className="touch-target-44 btn-tactile px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition inline-flex items-center space-x-2 shadow-sm"
            >
              <span>Upload Missing Documents ({pendingDocs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Financial & Tax Metric Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-neutral-700/60 text-xs">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-neutral-400 text-[11px] block">Gross Annual Rent</span>
            <span className="text-base sm:text-lg font-bold text-white num-tabular">
              £{totalRentalIncome.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">{activeClient.properties.length} Active Properties</span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-neutral-400 text-[11px] block">Section 24 Relief Claim</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 num-tabular">
              ~£{estimatedTaxSavings.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">Finance Costs Applied</span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-neutral-400 text-[11px] block">Checklist Status</span>
            <div className="flex items-center space-x-1 font-bold">
              {pendingDocs.length > 0 ? (
                <span className="text-amber-400">{pendingDocs.length} Items Required</span>
              ) : (
                <span className="text-emerald-400">100% Ready</span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 block">{verifiedDocs.length} Verified in Vault</span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-neutral-400 text-[11px] block">Statutory Filing Stage</span>
            <span className="text-base sm:text-lg font-bold text-white capitalize">
              {activeClient.stage.replace("_", " ")}
            </span>
            <span className="text-[10px] text-neutral-400 block">31 Jan 2026 HMRC Deadline</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Properties & Tax Computation Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Properties Summary */}
          <div className="accountant-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold text-neutral-900">
                  Registered Portfolio Assets ({activeClient.properties.length})
                </h2>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {activeClient.entityType === "spv_ltd" ? "SPV Limited Company" : "Personal / Joint Ownership"}
              </span>
            </div>

            <div className="space-y-3">
              {activeClient.properties.map((prop, idx) => (
                <div
                  key={prop.id}
                  className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-neutral-900 block">{prop.address}</span>
                    <span className="text-neutral-500 text-[11px]">
                      {prop.propertyType} &bull; Split: {prop.ownershipSplit}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-right">
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Gross Annual Rent</span>
                      <span className="font-bold text-neutral-900 num-tabular">
                        £{prop.annualRentalIncome.toLocaleString()}
                      </span>
                    </div>
                    {prop.outstandingMortgage && (
                      <div>
                        <span className="text-neutral-500 text-[10px] block">Mortgage Balance</span>
                        <span className="font-bold text-neutral-700 num-tabular">
                          £{prop.outstandingMortgage.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Milestone Roadmap */}
          <div className="accountant-card p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-neutral-100 pb-3">
              <Clock className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-neutral-900">
                2024/25 Statutory Filing Roadmap
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              {[
                {
                  step: "1. Intake & Anti-Money Laundering (AML)",
                  status: "Completed",
                  date: "Sep 2026",
                  isDone: true,
                },
                {
                  step: "2. Missing Mortgage & AST Document Gathering",
                  status: pendingDocs.length > 0 ? "In Progress" : "Completed",
                  date: "Oct 2026",
                  isDone: pendingDocs.length === 0,
                  current: pendingDocs.length > 0,
                },
                {
                  step: "3. Section 24 Mortgage Relief & Profit Computation",
                  status: "Queued",
                  date: "Nov 2026",
                  isDone: false,
                },
                {
                  step: "4. Client Approval & Electronic Signature",
                  status: "Scheduled",
                  date: "Dec 2026",
                  isDone: false,
                },
                {
                  step: "5. Direct HMRC Gateway Submission",
                  status: "Scheduled",
                  date: "Jan 2027",
                  isDone: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg border transition ${
                    item.isDone
                      ? "bg-emerald-50/50 border-emerald-200"
                      : item.current
                      ? "bg-amber-50/50 border-amber-200 ring-1 ring-amber-300"
                      : "bg-white border-neutral-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {item.isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                        {i + 1}
                      </div>
                    )}
                    <span className="font-semibold text-neutral-900">{item.step}</span>
                  </div>

                  <div className="text-right">
                    <span className={`font-semibold block ${item.isDone ? "text-emerald-700" : item.current ? "text-amber-800" : "text-neutral-500"}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-neutral-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Missing Documents Checklist & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pending Items Card */}
          <div className="accountant-card p-5 space-y-4 border-2 border-amber-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <h2 className="text-sm font-bold text-neutral-900">
                  Required Documents ({pendingDocs.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView("dropzone")}
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center space-x-1"
              >
                <span>Upload</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {pendingDocs.length === 0 ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-xs font-bold text-neutral-800">No Documents Outstanding</h3>
                <p className="text-[11px] text-neutral-500">
                  All items have been received and verified by your accountant.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{doc.title}</span>
                      <span className="text-[10px] font-semibold text-red-700 bg-red-100 px-1.5 py-0.2 rounded">
                        Action Required
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600">{doc.ownerOrProperty}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500">Target: {doc.dueDate}</span>
                      <button
                        type="button"
                        onClick={() => setCurrentView("dropzone")}
                        className="text-[11px] font-semibold text-primary hover:underline"
                      >
                        Snap / Upload &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct Accountant Communication Card */}
          <div className="accountant-card p-5 space-y-3 bg-neutral-50 border border-neutral-200">
            <div className="flex items-center space-x-3">
              <img
                src="/team/kalpesh-patel.png"
                alt="Kalpesh Patel FCA"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border border-neutral-300 shadow-sm shrink-0"
              />
              <div>
                <span className="font-bold text-xs text-neutral-900 block">
                  {activeClient.assignedAccountant}
                </span>
                <span className="text-[10px] text-neutral-500 block">
                  Lead Property Accountant &bull; KP Accountants
                </span>
                <span className="inline-flex items-center space-x-1 text-[10px] font-semibold text-emerald-700 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Client Queries</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed pt-1">
              "Hi {activeClient.primaryContact.split(" ")[0]}, we are ready to finalize your Section 24 mortgage relief calculations once the pending certificates above are uploaded."
            </p>

            <button
              type="button"
              onClick={() => setCurrentView("client_messages")}
              className="w-full touch-target-44 btn-tactile py-2 rounded-lg text-xs font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-200 transition inline-flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
              <span>Send Message to Kalpesh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
