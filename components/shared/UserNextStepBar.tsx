"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, Sparkles, HelpCircle } from "lucide-react";
import { ScreenView } from "@/lib/types";
import { useDemoStore } from "@/lib/store";

interface UserNextStepBarProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  actionLabel: string;
  targetView?: ScreenView;
  onAction?: () => void;
  statusBadge?: string;
  variant?: "amber" | "emerald" | "slate";
}

export default function UserNextStepBar({
  stepNumber,
  totalSteps,
  title,
  description,
  actionLabel,
  targetView,
  onAction,
  statusBadge = "Action Required",
  variant = "emerald",
}: UserNextStepBarProps) {
  const { setCurrentView } = useDemoStore();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (targetView) {
      setCurrentView(targetView);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "amber":
        return {
          wrapper: "bg-amber-50/90 border-amber-200 text-amber-950",
          badge: "bg-amber-200 text-amber-900 border-amber-300",
          button: "bg-amber-800 hover:bg-amber-900 text-white shadow-xs",
          icon: <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />,
        };
      case "slate":
        return {
          wrapper: "bg-slate-900 text-white border-slate-800",
          badge: "bg-slate-800 text-slate-300 border-slate-700",
          button: "bg-primary hover:bg-slate-800 text-white border border-slate-700 shadow-xs",
          icon: <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />,
        };
      case "emerald":
      default:
        return {
          wrapper: "bg-emerald-50/90 border-emerald-200 text-emerald-950",
          badge: "bg-emerald-200 text-emerald-900 border-emerald-300",
          button: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={`rounded-xl border p-3.5 sm:p-4 shadow-xs transition-all duration-150 ${styles.wrapper}`}
      role="region"
      aria-label="Recommended Next Action"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Step Information & Clear Intent */}
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{styles.icon}</div>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border font-mono">
                Step {stepNumber} of {totalSteps}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${styles.badge}`}>
                {statusBadge}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight">
              Next Step: {title}
            </h2>
            <p className="text-[11px] sm:text-xs opacity-90 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Explicit Tactical Action Button */}
        <div className="flex items-center space-x-2 shrink-0 pt-1 md:pt-0">
          <button
            type="button"
            onClick={handleAction}
            className={`touch-target-44 btn-tactile w-full md:w-auto px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center justify-center space-x-2 transition ${styles.button}`}
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
