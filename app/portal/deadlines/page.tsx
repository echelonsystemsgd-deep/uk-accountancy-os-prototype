"use client";

import React, { useState } from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import { useDemo } from "@/lib/store";
import { Calendar, Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ClientDeadlinesPage() {
  const { triggerToast } = useDemo();
  const [filter, setFilter] = useState<"all" | "pending" | "statutory">("all");

  const tasks = [
    {
      id: "tsk-1",
      title: "Upload Q3 Paragon Bank Interest Statement",
      statutoryRef: "HMRC MTD ITSA Quarterly Period 3",
      dueDate: "05 Jan 2026",
      status: "pending_docs",
      priority: "high",
      checklist: ["Download PDF from Paragon Portal", "Upload to Document Vault", "Confirm interest split (£1,420/mo)"],
    },
    {
      id: "tsk-2",
      title: "Solicitor Completion Statement (£210k Purchase)",
      statutoryRef: "Belgrave SPV Property Addition",
      dueDate: "15 Jan 2026",
      status: "pending_docs",
      priority: "urgent",
      checklist: ["Request completion statement from conveyancer", "Confirm £28,000 DLA deposit allocation"],
    },
    {
      id: "tsk-3",
      title: "Annual Confirmation Statement (CS01)",
      statutoryRef: "Companies House Statutory Filing",
      dueDate: "28 Feb 2026",
      status: "prepared",
      priority: "medium",
      checklist: ["Review shareholder register", "Chartered accountant sign-off"],
    },
    {
      id: "tsk-4",
      title: "CT600 Corporation Tax Return Sign-Off",
      statutoryRef: "HMRC Corporation Tax Year-End 2025/26",
      dueDate: "31 Dec 2026",
      status: "drafting",
      priority: "medium",
      checklist: ["P&L review", "Section 24 loan relationships schedule", "FRS 105 balance sheet"],
    },
  ];

  return (
    <ClientPortalLayout
      pageTitle="Deadlines &amp; Statutory Tasks"
      pageSubtitle="Configurable filing calendar, document checklist requirements, and HMRC guidance dates"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              filter === "all"
                ? "bg-[#a4f4cf] text-[#0c1813] font-bold border-[#a4f4cf]"
                : "bg-[#14241d] text-[#8a9d94] border-[#1e382b] hover:text-white"
            }`}
          >
            All Action Items ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              filter === "pending"
                ? "bg-[#a4f4cf] text-[#0c1813] font-bold border-[#a4f4cf]"
                : "bg-[#14241d] text-[#8a9d94] border-[#1e382b] hover:text-white"
            }`}
          >
            Awaiting Your Documents (2)
          </button>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-6 rounded-xl bg-[#14241d] border border-[#1e382b] hover:border-[#a4f4cf]/40 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {task.priority === "urgent" ? "Urgent Action" : "Target: " + task.dueDate}
                  </span>
                  <span className="text-[10px] text-[#8a9d94]">Due: {task.dueDate}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-display font-bold text-white font-sans">
                    {task.title}
                  </h3>
                  <p className="text-xs text-[#a4f4cf]">
                    {task.statutoryRef}
                  </p>
                </div>

                {/* Checklist */}
                <div className="pt-2 border-t border-[#1e382b] space-y-1.5 text-xs text-slate-300">
                  <span className="text-[10px] uppercase text-[#8a9d94] block font-bold font-sans">Checklist items:</span>
                  {task.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#a4f4cf]"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e382b] flex items-center justify-between">
                <span className="text-[11px] text-[#8a9d94] font-sans">
                  Assigned Accountant: <strong className="text-white">Pritpal Chaggar CTA</strong>
                </span>
                <Link
                  href="/portal/documents"
                  className="px-3 py-1.5 rounded-lg bg-[#0c1813] border border-[#1e382b] hover:border-[#a4f4cf] text-xs text-[#a4f4cf] font-bold flex items-center gap-1.5 transition"
                >
                  <span>Upload Doc</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ClientPortalLayout>
  );
}
