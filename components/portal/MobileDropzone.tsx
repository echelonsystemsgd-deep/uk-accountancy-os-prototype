"use client";

import React, { useState, useRef } from "react";
import { useDemoStore } from "@/lib/store";
import { ClientDocument } from "@/lib/types";
import { formatGBPExact } from "@/lib/utils";
import {
  UploadCloud,
  Camera,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function MobileDropzone() {
  const { documents, uploadDocument, missingReceiptsCount } = useDemoStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [lastUploadedDoc, setLastUploadedDoc] = useState<ClientDocument | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated preset receipt items for instant high-ticket demonstration
  const sampleReceiptPresets = [
    {
      fileName: "Virgin_Trains_London_Manchester_OffPeak.pdf",
      fileSize: "284 KB",
      category: "Receipt" as const,
      source: "web_dropzone" as const,
      ocrData: {
        merchant: "Virgin Trains / Avanti West Coast",
        date: "12 Oct 2026",
        amountNet: 148.5,
        vatAmount: 0.0, // Zero-rated public transport
        amountTotal: 148.5,
        isTaxDeductible: true,
        suggestedCategory: "Travel & Client Subsistence",
        confidence: 99.8,
      },
    },
    {
      fileName: "Apple_Store_Regent_St_MacBook_Pro.pdf",
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
        suggestedCategory: "Capital Asset (100% Full Expensing)",
        confidence: 99.2,
      },
    },
    {
      fileName: "Fortnum_Mason_Corporate_Gift_Box.pdf",
      fileSize: "512 KB",
      category: "Receipt" as const,
      source: "web_dropzone" as const,
      ocrData: {
        merchant: "Fortnum & Mason Piccadilly",
        date: "09 Oct 2026",
        amountNet: 320.0,
        vatAmount: 64.0,
        amountTotal: 384.0,
        isTaxDeductible: false, // Client entertaining rule
        suggestedCategory: "Business Entertaining (Non-Deductible)",
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
          ? `Camera_Snap_${Date.now().toString().slice(-4)}.jpg`
          : preset.fileName,
    };

    setTimeout(() => {
      uploadDocument(docPayload);
      setIsProcessing(false);
      setCameraActive(false);
      setLastUploadedDoc({
        id: "doc-sample-" + Date.now(),
        fileName: docPayload.fileName,
        fileSize: docPayload.fileSize,
        uploadedAt: "Just now",
        category: docPayload.category,
        source: docPayload.source,
        ocrData: docPayload.ocrData,
      });
    }, 900);
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
            merchant: "UK Registered Supplier",
            date: "Today",
            amountNet: 420.0,
            vatAmount: 84.0,
            amountTotal: 504.0,
            isTaxDeductible: true,
            suggestedCategory: "Operational Expenses",
            confidence: 98.4,
          },
        });
        setIsProcessing(false);
      }, 900);
    }
  };

  return (
    <div className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-[#111827] px-2.5 py-0.5 rounded-full border border-white/5">
              PracticeOS Dropzone
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-slate-300">Client Document Gateway</span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
            Mobile-First Document &amp; Receipt Dropzone
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag files from desktop or snap photos on mobile. OCR instantly extracts amounts, calculates UK VAT, and syncs with the Partner Radar.
          </p>
        </div>

        {/* Live sync badge */}
        <div className="flex items-center gap-2 bg-[#070A0F] border border-[#D4AF37]/30 px-3 py-1.5 rounded-xl text-xs">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="text-slate-300">
            Partner Missing Counter:{" "}
            <strong className="text-rose-400 font-mono">{missingReceiptsCount}</strong>
          </span>
        </div>
      </div>

      {/* Upload Zone & Simulated Camera Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Drag and Drop Zone */}
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
          className={`md:col-span-8 border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden ${
            isDragging
              ? "border-[#D4AF37] bg-[#D4AF37]/10"
              : "border-white/15 hover:border-[#D4AF37]/50 bg-[#070A0F]"
          }`}
          onClick={() => handleSimulatedUpload("web_dropzone")}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf"
          />

          {isProcessing ? (
            <div className="space-y-3 py-4 animate-in fade-in">
              <RefreshCw className="w-10 h-10 text-gold-400 animate-spin mx-auto" />
              <div className="font-serif-luxury text-base font-semibold text-white">
                AI OCR Analyzing Tax Deductibility...
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Extracting Merchant • Calculating 20% VAT • Decrementing Missing Counter
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#111827] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-gold-400 shadow-gold-subtle">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-base sm:text-lg font-semibold text-white">
                  Drop Receipts or Statutory Invoices Here
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Click to simulate 1-click test receipt ingestion or drag PDF / JPG / PNG files.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gold-300 bg-[#111827] px-3 py-1 rounded-full border border-white/5">
                <span>PDF, JPG, PNG up to 25MB • 256-bit Encrypted</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Camera Simulator Box */}
        <div className="md:col-span-4 bg-[#070A0F] border border-[#D4AF37]/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                Mobile Camera Capture
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Touch Ready
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed for directors on the go. Snap receipts at restaurant tables or fuel stations directly into PracticeOS.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSimulatedUpload("mobile_camera")}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-semibold text-xs py-3.5 px-4 rounded-xl shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all touch-target-48 disabled:opacity-50"
            >
              <Camera className="w-4 h-4 text-black" />
              <span>Snap Mobile Photo (Simulate)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 bg-[#111827] hover:bg-white/5 border border-white/10 text-slate-300 text-xs py-2.5 px-4 rounded-xl transition-all touch-target-48 sm:touch-target-auto active:scale-95"
            >
              <span>Browse Device Files</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 border-t border-white/5 pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Automatic HMRC audit preservation (6-year retention)</span>
          </div>
        </div>
      </div>

      {/* OCR Result Spotlight (if recently uploaded) */}
      {lastUploadedDoc?.ocrData && (
        <div className="bg-[#101623] border border-[#D4AF37]/40 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white">
                Live OCR Intelligence Extraction: {lastUploadedDoc.fileName}
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {lastUploadedDoc.ocrData.confidence}% Confidence
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Merchant:</span>
              <strong className="text-white">{lastUploadedDoc.ocrData.merchant}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Net / 20% VAT:</span>
              <strong className="text-slate-200 font-mono">
                {formatGBPExact(lastUploadedDoc.ocrData.amountNet)} + {formatGBPExact(lastUploadedDoc.ocrData.vatAmount)}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Total Amount:</span>
              <strong className="text-gold-300 font-mono text-sm">
                {formatGBPExact(lastUploadedDoc.ocrData.amountTotal)}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Tax Deductible:</span>
              <span
                className={`font-semibold ${
                  lastUploadedDoc.ocrData.isTaxDeductible ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {lastUploadedDoc.ocrData.isTaxDeductible
                  ? "✓ 100% Corporation Tax Deductible"
                  : "✕ Non-Deductible Entertaining"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Document Vault List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif-luxury text-base font-semibold text-white">
            Client Vault Files ({documents.length} Items)
          </h4>
          <span className="text-xs text-slate-400 font-mono">
            Encrypted AWS London S3 Bucket
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070A0F] text-slate-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">File Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Ingestion Source</th>
                <th className="p-3">OCR Extracted Merchant</th>
                <th className="p-3">Amount</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-white flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gold-400" />
                      <span>{doc.fileName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {doc.fileSize} • {doc.uploadedAt}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-[#111827] px-2 py-0.5 rounded text-[11px] text-slate-300 border border-white/5">
                      {doc.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-slate-400">
                      {doc.source === "mobile_camera" ? "Mobile Camera Snap" : "Web Dropzone"}
                    </span>
                  </td>
                  <td className="p-3">
                    {doc.ocrData ? (
                      <span className="text-slate-200">{doc.ocrData.merchant}</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-medium text-gold-300">
                    {doc.ocrData ? formatGBPExact(doc.ocrData.amountTotal) : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified for CT600</span>
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
