"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileText,
  Building2,
  CheckCircle2,
  Lock,
  Download,
  Calendar,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";

export default function ClientDocumentVault() {
  const { activeClient, triggerToast } = useDemoStore();
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const verifiedDocs = activeClient.documents.filter((d) => d.status === "verified");

  const filtered = verifiedDocs.filter((doc) => {
    const matchesFilter = filterType === "all" || doc.category === filterType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.ownerOrProperty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownloadSimulation = (title: string) => {
    triggerToast(
      "Secure Document Download",
      `Generating one-time 60-second signed URL for: ${title}`,
      "info"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="accountant-card p-5 sm:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Encrypted Property Document Vault
              </h1>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>UK Private Storage</span>
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Client Account: <strong>{activeClient.entityName}</strong> &bull; Retained under ICAEW 6-Year Statutory Schedule
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>London Data Residency (`eu-west-2`)</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search verified certificates, ASTs, or properties..."
              className="w-full pl-8 pr-3 py-1.5 border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-neutral-50"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Records" },
              { id: "mortgage", label: "Mortgage Certs" },
              { id: "tenancy", label: "Tenancy (AST)" },
              { id: "id_aml", label: "KYC / ID" },
              { id: "tax_record", label: "Tax Slips" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition ${
                  filterType === tab.id
                    ? "bg-primary text-white font-semibold"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="accountant-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Property / Party</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Verification Date</th>
                <th className="py-3 px-4">Storage Footprint</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No verified documents match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 font-medium">
                      {doc.ownerOrProperty}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700">
                        {doc.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{doc.uploadedAt || "Verified"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 num-tabular">
                      {doc.fileSize || "1.8 MB PDF"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadSimulation(doc.title)}
                        className="px-2.5 py-1 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3 text-neutral-500" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
