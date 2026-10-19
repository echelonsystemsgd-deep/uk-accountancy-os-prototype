"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Smartphone,
  Send,
  RotateCcw,
  AlertCircle,
  Building2,
  FileCheck2,
} from "lucide-react";

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    metrics,
    resetDemoState,
    mobileFrameEnabled,
    setMobileFrameEnabled,
  } = useDemoStore();

  const navItems: { id: ScreenView; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: "radar",
      label: "1. Partner Radar",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "pipeline",
      label: "2. Landlord Pipeline",
      icon: <Users className="w-4 h-4" />,
      badge: 6,
    },
    {
      id: "workspace",
      label: "3. Property Workspace",
      icon: <FolderKanban className="w-4 h-4" />,
    },
    {
      id: "dropzone",
      label: "4. Landlord Dropzone",
      icon: <Smartphone className="w-4 h-4" />,
      badge: metrics.missingDocumentsCount > 0 ? metrics.missingDocumentsCount : undefined,
    },
    {
      id: "chaser",
      label: "5. Chaser & Activity Trail",
      icon: <Send className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Practice Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Practice Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-white font-bold text-sm tracking-wide">
              KP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-neutral-900 text-base tracking-tight">
                  Kai Accountants
                </span>
                <span className="text-neutral-400 text-xs">/</span>
                <span className="text-neutral-600 text-xs font-medium">KP Tax Consultants</span>
              </div>
              <p className="text-xs text-neutral-500 font-normal">
                Property Tax & Landlord Practice OS
              </p>
            </div>
          </div>

          {/* Quick Metrics & Demo Controls */}
          <div className="flex items-center space-x-3">
            {metrics.missingDocumentsCount > 0 ? (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  <strong className="num-tabular">{metrics.missingDocumentsCount}</strong> Missing Items Pending
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All Client Checklists Verified</span>
              </div>
            )}

            {currentView === "dropzone" && (
              <button
                type="button"
                onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
                className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
                <span>{mobileFrameEnabled ? "Full View" : "375px Mobile Frame"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={resetDemoState}
              title="Reset all demo data back to baseline for repeat customer walkthroughs"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 transition shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* 5-Screen Demonstration Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`touch-target-44 flex items-center space-x-2 px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                      item.id === "dropzone"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
