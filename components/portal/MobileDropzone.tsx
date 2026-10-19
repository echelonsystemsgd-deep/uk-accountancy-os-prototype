"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Building2,
  FileText,
  RotateCcw,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function MobileDropzone() {
  const {
    activeClient,
    uploadDocument,
    mobileFrameEnabled,
    setMobileFrameEnabled,
    setCurrentView,
  } = useDemoStore();

  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [recentlyUploadedId, setRecentlyUploadedId] = useState<string | null>(null);

  const pendingDocs = activeClient.documents.filter((d) => d.status === "pending");
  const verifiedDocs = activeClient.documents.filter((d) => d.status === "verified");

  const handleSimulatedUpload = (docId: string, customTitle: string, isPhoto = false) => {
    if (isPhoto) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 350);
    }

    setUploadingDocId(docId);
    setUploadProgress(20);

    setTimeout(() => {
      setUploadProgress(65);
    }, 350);

    setTimeout(() => {
      setUploadProgress(100);
      setTimeout(() => {
        uploadDocument(activeClient.id, docId, customTitle);
        setUploadingDocId(null);
        setUploadProgress(0);
        setRecentlyUploadedId(docId);
        setTimeout(() => setRecentlyUploadedId(null), 3000);
      }, 400);
    }, 850);
  };

  // The actual mobile dropzone view content
  const DropzoneContent = (
    <div className="bg-white min-h-[640px] flex flex-col justify-between text-neutral-900 text-left relative overflow-hidden">
      {/* Simulated Camera Flash Shutter Overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-shutter" />
      )}

      {/* Client Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
              KP
            </div>
            <div>
              <span className="font-bold text-xs text-neutral-900 block leading-tight">
                Kai Accountants
              </span>
              <span className="text-[10px] text-neutral-500">Secure Client Dropzone</span>
            </div>
          </div>
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Lock className="w-2.5 h-2.5 text-emerald-600" />
            <span>256-Bit Encrypted</span>
          </span>
        </div>

        <div className="mt-2">
          <h1 className="text-base font-bold text-neutral-900 leading-snug">
            {activeClient.entityName}
          </h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Tax Year {activeClient.taxYear} &bull; Assigned: {activeClient.assignedAccountant}
          </p>
        </div>
      </div>

      {/* Main Checklist Body */}
      <div className="p-4 sm:p-5 space-y-5 flex-1">
        {/* Context Alert */}
        {pendingDocs.length > 0 ? (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center space-x-1.5 font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{pendingDocs.length} Document{pendingDocs.length > 1 ? "s" : ""} Needed for Tax Finalization</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed pl-5">
              Kalpesh Patel is finalizing your Section 24 mortgage relief computation. Please upload or photograph the items below.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h2 className="text-sm font-bold text-emerald-900">All Checklists Complete!</h2>
            <p className="text-[11px] text-emerald-800">
              All documents have been verified. Your accountant has been notified to proceed with your filing.
            </p>
          </div>
        )}

        {/* Pending Items List */}
        {pendingDocs.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Outstanding Items ({pendingDocs.length})
            </h2>

            {pendingDocs.map((doc) => {
              const isUploading = uploadingDocId === doc.id;

              return (
                <div
                  key={doc.id}
                  className="accountant-card p-4 border border-amber-200 space-y-3 relative overflow-hidden"
                >
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 space-y-3">
                      <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden border border-neutral-200">
                        <div
                          className="bg-primary h-full transition-all duration-300 relative animate-shimmer"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-neutral-800">
                        <Lock className="w-3 h-3 text-emerald-600 animate-pulse" />
                        <span>256-Bit Encrypting & Uploading... {uploadProgress}%</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-900">{doc.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800">
                        Action Required
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">{doc.ownerOrProperty}</p>
                    {doc.notes && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-100">
                        {doc.notes}
                      </p>
                    )}
                  </div>

                  {/* Dual Mobile Action Buttons: Camera Snap vs File Picker (Min 44px touch targets) */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleSimulatedUpload(
                          doc.id,
                          `photo_${doc.title.toLowerCase().replace(/\s+/g, "_")}.jpg`,
                          true
                        )
                      }
                      className="touch-target-44 btn-tactile flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition shadow-sm"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSimulatedUpload(
                          doc.id,
                          `file_${doc.title.toLowerCase().replace(/\s+/g, "_")}.pdf`,
                          false
                        )
                      }
                      className="touch-target-44 btn-tactile flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition"
                    >
                      <UploadCloud className="w-4 h-4 text-neutral-600" />
                      <span>Choose File</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Completed / Verified Documents */}
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Verified Documents ({verifiedDocs.length})
          </h2>

          <div className="space-y-1.5">
            {verifiedDocs.map((doc) => {
              const isRecent = doc.id === recentlyUploadedId;

              return (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between p-2.5 rounded border text-xs transition-all duration-500 ${
                    isRecent
                      ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400 scale-[1.01]"
                      : "bg-neutral-50 border-neutral-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isRecent ? "text-emerald-700 animate-bounce" : "text-emerald-600"}`} />
                    <div className="truncate">
                      <span className="font-medium text-neutral-800 truncate block">
                        {doc.title}
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {doc.ownerOrProperty} &bull; {doc.fileSize || "Verified PDF"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold shrink-0">
                    {isRecent ? "Just Received" : "Approved"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Institutional Compliance Notice & Footer */}
      <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-[11px] text-neutral-500 space-y-1 text-center">
        <div className="flex items-center justify-center space-x-1 text-neutral-600 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
          <span>ICAEW Practice Assurance Standard</span>
        </div>
        <p>
          Uploaded documents are encrypted and hosted in UK/London private data centers for statutory retention.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Top Banner Context for Demonstrators */}
      <div className="accountant-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold text-neutral-900">
              Screen 4: Mobile-First Landlord Dropzone (Client View)
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800">
              Zero Passwords Required
            </span>
          </div>
          <p className="text-xs text-neutral-600 mt-0.5">
            This is the frictionless link Marcus opens on his iPhone after clicking a WhatsApp reminder. Uploading an item here immediately updates the Partner Radar in real time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
            className="px-3 py-1.5 rounded text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition inline-flex items-center space-x-1"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{mobileFrameEnabled ? "Switch to Responsive View" : "Render in 375px Mobile Frame"}</span>
          </button>
        </div>
      </div>

      {/* Display Mode: Either 375px Smartphone Frame or Full Responsive */}
      {mobileFrameEnabled ? (
        <div className="flex justify-center py-4 bg-neutral-100 rounded-xl border border-neutral-200">
          {/* 375px iPhone Bezel Frame */}
          <div className="w-[375px] rounded-[36px] overflow-hidden border-[8px] border-neutral-800 shadow-2xl bg-white">
            {/* Phone Speaker & Camera Notch */}
            <div className="h-5 bg-neutral-800 flex items-center justify-center">
              <div className="w-16 h-3 bg-neutral-900 rounded-full" />
            </div>
            {DropzoneContent}
            {/* Phone Home Bar */}
            <div className="h-4 bg-white flex items-center justify-center pb-1">
              <div className="w-28 h-1 bg-neutral-300 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
          {DropzoneContent}
        </div>
      )}
    </div>
  );
}
