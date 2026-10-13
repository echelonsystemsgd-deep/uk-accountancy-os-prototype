"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { notifications, removeNotification } = useDemoStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto bg-[#0E111A] border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_0_rgba(0,0,0,0.5)] rounded-xl p-3.5 flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="mt-0.5 shrink-0">
            {n.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            {n.type === "warning" && (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            {n.type === "info" && (
              <Info className="w-4 h-4 text-slate-300" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#EDEDED] tracking-tight">
              {n.title}
            </h4>
            <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
              {n.description}
            </p>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            className="text-[#64748B] hover:text-[#EDEDED] transition-colors p-1 -mr-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
