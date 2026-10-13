"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { notifications, removeNotification } = useDemoStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto bg-[#0B0F17]/95 border border-[#D4AF37]/40 shadow-gold-subtle rounded-xl p-3.5 backdrop-blur-md flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-top-2"
        >
          <div className="mt-0.5 shrink-0">
            {n.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
            {n.type === "warning" && (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            )}
            {n.type === "info" && (
              <Info className="w-5 h-5 text-gold-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white tracking-wide uppercase">
              {n.title}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {n.description}
            </p>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            className="text-slate-400 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
