"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useDemoStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-neutral-200 shadow-lg rounded-lg p-3.5 flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
            {toast.type === "info" && (
              <Info className="w-4 h-4 text-slate-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-neutral-900 tracking-tight">
              {toast.title}
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 -mr-1"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
