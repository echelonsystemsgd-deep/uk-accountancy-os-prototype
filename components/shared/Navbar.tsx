"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import {
  Globe,
  LayoutDashboard,
  Users,
  FolderKanban,
  Smartphone,
  Send,
  RotateCcw,
  AlertCircle,
  Building2,
  FileCheck2,
  FolderLock,
  Lock,
} from "lucide-react";

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    metrics,
    resetDemoState,
    mobileFrameEnabled,
    setMobileFrameEnabled,
    openIntakeModal,
  } = useDemoStore();

  const isLanding = currentView === "landing";
  const isAccountant = ["radar", "pipeline", "workspace", "chaser"].includes(currentView);
  const isClient = ["dropzone", "vault"].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Practice Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Practice Branding */}
          <div
            onClick={() => setCurrentView("landing")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-white font-bold text-sm tracking-wide group-hover:bg-neutral-800 transition">
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

          {/* Quick Demo Mode Badges & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {metrics.missingDocumentsCount > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentView("dropzone")}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium hover:bg-amber-100 transition"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  <strong className="num-tabular">{metrics.missingDocumentsCount}</strong> Missing Items
                </span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All Checked</span>
              </div>
            )}

            {currentView === "dropzone" && (
              <button
                type="button"
                onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
                className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
                <span>{mobileFrameEnabled ? "Full Screen" : "375px Mobile Frame"}</span>
              </button>
            )}

            {/* Quick Demo Reset */}
            <button
              type="button"
              onClick={resetDemoState}
              title="Reset all demo data back to baseline for repeat customer walkthroughs"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 transition shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs across 3 Pillars: Landing, Accountant OS, Client Portal */}
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-t border-neutral-100 pt-1 text-xs">
          {/* Main Tier Links */}
          <div className="flex space-x-1">
            {/* 1. Public Landing Page */}
            <button
              type="button"
              onClick={() => setCurrentView("landing")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                isLanding
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Public Landing Page</span>
            </button>

            {/* 2. Accountant Hub Dropdown / Direct View */}
            <button
              type="button"
              onClick={() => setCurrentView("radar")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "radar"
                  ? "border-primary text-primary font-bold"
                  : isAccountant
                  ? "border-neutral-300 text-neutral-900 font-semibold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Accountant Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("pipeline")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "pipeline"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Pipeline</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("workspace")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "workspace"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Workspace</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("chaser")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "chaser"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Chaser Trail</span>
            </button>

            <div className="w-px h-5 bg-neutral-200 my-auto mx-1" />

            {/* 3. Client Portal */}
            <button
              type="button"
              onClick={() => setCurrentView("dropzone")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "dropzone"
                  ? "border-primary text-primary font-bold"
                  : isClient
                  ? "border-neutral-300 text-neutral-900 font-semibold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Client Dropzone</span>
              {metrics.missingDocumentsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                  {metrics.missingDocumentsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("vault")}
              className={`touch-target-44 flex items-center space-x-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
                currentView === "vault"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FolderLock className="w-4 h-4" />
              <span>Document Vault</span>
            </button>
          </div>

          {/* Consultation CTA button on navbar */}
          <div className="hidden lg:flex items-center pl-2">
            <button
              type="button"
              onClick={() => openIntakeModal()}
              className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
