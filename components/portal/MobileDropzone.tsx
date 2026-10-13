"use client";

import React, { useState, useRef } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientDocument } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import {
  UploadCloud,
  Camera,
  FileText,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function MobileDropzone() {
  const { documents, uploadDocument, missingReceiptsCount } = useDemoStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUploadedDoc, setLastUploadedDoc] = useState<ClientDocument | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleReceiptPresets = [
    {
      fileName: "Virgin_Trains_London_OffPeak.pdf",
      fileSize: "284 KB",
      category: "Receipt" as const,
      source: "web_dropzone" as const,
      ocrData: {
        merchant: "Avanti West Coast",
        date: "12 Oct 2026",
        amountNet: 148.5,
        vatAmount: 0.0,
        amountTotal: 148.5,
        isTaxDeductible: true,
        suggestedCategory: "Travel & Subsistence",
        confidence: 99.8,
      },
    },
    {
      fileName: "Apple_Store_MacBook_Pro.pdf",
      fileSize: "1.4 MB",
      category: "Receipt" as const,
      source: "mobile_camera" as const,
      ocrData: {
        merchant: "Apple Retail UK Limited",
        date: "11 Oct 2026",
        amountNet: 2165.83,
        vatAmount: 433.17,
        amountTotal: 2599.0,
        isTaxDeductible: true,
        suggestedCategory: "Capital Asset (Full Expensing)",
        confidence: 99.2,
      },
    },
    {
      fileName: "Fortnum_Mason_Corporate_Box.pdf",
      fileSize: "512 KB",
      category: "Receipt" as const,
      source: "web_dropzone" as const,
      ocrData: {
        merchant: "Fortnum & Mason Piccadilly",
        date: "09 Oct 2026",
        amountNet: 320.0,
        vatAmount: 64.0,
        amountTotal: 384.0,
        isTaxDeductible: false,
        suggestedCategory: "Business Entertaining",
        confidence: 97.5,
      },
    },
  ];

  const handleSimulatedUpload = (sourceType: "web_dropzone" | "mobile_camera") => {
    setIsProcessing(true);
    const preset =
      sampleReceiptPresets[Math.floor(Math.random() * sampleReceiptPresets.length)];
    const docPayload = {
      ...preset,
      source: sourceType,
      fileName:
        sourceType === "mobile_camera"
          ? `Receipt_Scan_${Date.now().toString().slice(-4)}.jpg`
          : preset.fileName,
    };

    setTimeout(() => {
      uploadDocument(docPayload);
      setIsProcessing(false);
      setLastUploadedDoc({
        id: "doc-sample-" + Date.now(),
        fileName: docPayload.fileName,
        fileSize: docPayload.fileSize,
        uploadedAt: "Just now",
        category: docPayload.category,
        source: docPayload.source,
        ocrData: docPayload.ocrData,
      });
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsProcessing(true);
      setTimeout(() => {
        uploadDocument({
          fileName: file.name,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          category: "Receipt",
          source: "web_dropzone",
          ocrData: {
            merchant: "UK Commercial Supplier",
            date: "Today",
            amountNet: 420.0,
            vatAmount: 84.0,
            amountTotal: 504.0,
            isTaxDeductible: true,
            suggestedCategory: "Operating Expenses",
            confidence: 98.4,
          },
        });
        setIsProcessing(false);
      }, 500);
    }
  };

  return (
    <div className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
            Document Ingestion &amp; Receipts
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Drop statutory invoices or photograph month-end receipts. Automated OCR extracts VAT and syncs to Practice Hub.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B]">
          Missing counter: <span className="text-[#EDEDED]">{missingReceiptsCount}</span>
        </div>
      </div>

      {/* Upload Zone & Mobile Camera Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Drag and Drop Zone with standard dashed border */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleSimulatedUpload("web_dropzone");
          }}
          onClick={() => handleSimulatedUpload("web_dropzone")}
          className={`md:col-span-8 border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-white/30 bg-white/[0.03]"
              : "border-white/15 hover:border-white/25 bg-[#08090E]"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf"
          />

          {isProcessing ? (
            <div className="space-y-2 py-4">
              <RefreshCw className="w-6 h-6 text-[#94A3B8] animate-spin mx-auto" />
              <div className="text-xs font-medium text-[#EDEDED]">
                Processing Document OCR...
              </div>
              <p className="text-[11px] text-[#64748B] font-mono">
                Extracting Merchant &amp; VAT Breakdown
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#0E111A] border border-white/10 flex items-center justify-center mx-auto text-[#94A3B8]">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#EDEDED]">
                  Click or Drag Receipts Here
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Simulate instant receipt upload (PDF, JPG, PNG)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Camera Option */}
        <div className="md:col-span-4 bg-[#08090E] border border-white/[0.08] rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-medium text-[#EDEDED]">
              Mobile Capture
            </div>
            <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
              Designed for directors capturing fuel, travel, and subsistence receipts on mobile.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSimulatedUpload("mobile_camera")}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-[#161A26] hover:bg-[#1E2435] border border-white/[0.1] text-[#EDEDED] font-medium text-xs py-2 px-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Simulate Mobile Scan</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-center text-[11px] text-[#64748B] hover:text-[#EDEDED] py-1 transition-colors"
            >
              Browse Local Files
            </button>
          </div>
        </div>
      </div>

      {/* OCR Result Spotlight */}
      {lastUploadedDoc?.ocrData && (
        <div className="bg-[#08090E] border border-white/[0.08] rounded-lg p-3.5 space-y-2">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#EDEDED]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Extracted: {lastUploadedDoc.fileName}</span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">
              {lastUploadedDoc.ocrData.confidence}% Confidence
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-[#64748B] block">Merchant:</span>
              <span className="text-[#EDEDED] font-medium">{lastUploadedDoc.ocrData.merchant}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block">Net + VAT:</span>
              <span className="font-mono text-[#94A3B8]">
                {formatGBPExact(lastUploadedDoc.ocrData.amountNet)} + {formatGBPExact(lastUploadedDoc.ocrData.vatAmount)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block">Total:</span>
              <span className="font-mono font-semibold text-[#EDEDED]">
                {formatGBPExact(lastUploadedDoc.ocrData.amountTotal)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block">Deductibility:</span>
              <span
                className={`font-medium ${
                  lastUploadedDoc.ocrData.isTaxDeductible ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {lastUploadedDoc.ocrData.isTaxDeductible ? "Tax Deductible" : "Non-Deductible"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Document History Table */}
      <div>
        <div className="text-xs font-semibold text-[#EDEDED] mb-2">
          Uploaded Document Vault ({documents.length} Files)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#0A0C13] text-[#64748B] font-semibold border-b border-white/[0.08] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">File Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Source</th>
                <th className="p-3">Merchant</th>
                <th className="p-3">Total</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-[#EDEDED] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>{doc.fileName}</span>
                    </div>
                    <div className="text-[10px] text-[#64748B] font-mono">
                      {doc.fileSize} • {doc.uploadedAt}
                    </div>
                  </td>
                  <td className="p-3">{doc.category}</td>
                  <td className="p-3 font-mono text-[11px] text-[#64748B]">
                    {doc.source === "mobile_camera" ? "Mobile Scan" : "Dropzone"}
                  </td>
                  <td className="p-3 text-[#EDEDED]">
                    {doc.ocrData ? doc.ocrData.merchant : "—"}
                  </td>
                  <td className="p-3 font-mono text-[#EDEDED]">
                    {doc.ocrData ? formatGBPExact(doc.ocrData.amountTotal) : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
