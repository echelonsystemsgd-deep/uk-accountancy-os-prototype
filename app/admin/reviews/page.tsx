"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { FileCheck2, Check, X, ShieldCheck, Download, AlertTriangle } from "lucide-react";

export default function AdminReviewQueuePage() {
  const { triggerToast } = useDemo();
  const [documents, setDocuments] = useState([
    {
      id: "doc-rev-1",
      client: "Belgrave Legacy Wealth Ltd",
      fileName: "Paragon_Mortgage_Statement_2026.pdf",
      category: "Mortgage Statement",
      fileSize: "2.4 MB",
      scannedStatus: "Clean (ClamAV)",
      ocrExtracted: "£1,420.00/mo · Code 7100 Finance Cost",
      status: "pending",
    },
    {
      id: "doc-rev-2",
      client: "Mayfair Prime Residential SPV Ltd",
      fileName: "Apex_Boiler_Replacement_Receipt.pdf",
      category: "Contractor Invoice",
      fileSize: "1.1 MB",
      scannedStatus: "Clean (ClamAV)",
      ocrExtracted: "£1,200.00 Gross · 20% VAT · Code 7200 Repairs",
      status: "pending",
    },
  ]);

  const handleAction = (id: string, action: "accept" | "reject") => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (action === "accept") {
      triggerToast("Document Accepted", "Transaction mapped to client nominal ledger.", "success");
    } else {
      triggerToast("Document Rejected", "Rejection notice & upload request emailed to client.", "warning");
    }
  };

  return (
    <AdminConsoleLayout
      pageTitle="Document Review &amp; Statutory Acceptance Queue"
      pageSubtitle="Audit client uploaded mortgage statements, contractor receipts, and completion statements before ledger inclusion"
    >
      <div className="space-y-6 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] flex items-center justify-between">
          <span className="text-white font-bold">
            Pending Queue: {documents.length} Documents Awaiting Partner Sign-Off
          </span>
          <span className="text-[#a4f4cf] text-[10px]">Private Vault &bull; Signed URLs Enforced</span>
        </div>

        {documents.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#a4f4cf] mx-auto" />
            <h3 className="text-base font-bold text-white font-sans">Queue Clear</h3>
            <p className="text-[#8a9d94]">All client documents have been reviewed and accepted.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-xl bg-[#14241d] border border-[#1e382b] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm font-sans">{doc.fileName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      {doc.scannedStatus}
                    </span>
                  </div>
                  <div className="text-[#8a9d94] flex items-center gap-2 text-[11px]">
                    <span className="text-[#a4f4cf]">{doc.client}</span>
                    <span>&bull;</span>
                    <span>{doc.category}</span>
                    <span>&bull;</span>
                    <span>{doc.fileSize}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans pt-1">
                    AI Heuristic OCR: <strong className="text-white font-mono">{doc.ocrExtracted}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(doc.id, "accept")}
                    className="px-4 py-2 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold text-xs flex items-center gap-1.5 hover:bg-[#8ae8bd] transition"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept Document</span>
                  </button>
                  <button
                    onClick={() => handleAction(doc.id, "reject")}
                    className="px-4 py-2 rounded-lg bg-[#0c1813] border border-red-500/40 text-red-300 hover:bg-red-500/10 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminConsoleLayout>
  );
}
