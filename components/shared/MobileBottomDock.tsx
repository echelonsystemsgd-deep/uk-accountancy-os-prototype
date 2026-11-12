"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import { ScreenView } from "@/lib/types";
import {
  LayoutDashboard,
  Building2,
  Receipt,
  Coins,
  FileCheck2,
  Sparkles,
} from "lucide-react";

export default function MobileBottomDock() {
  const { currentMode, currentView, setCurrentView } = useDemoStore();

  if (currentMode !== "client") return null;

  const navItems: { id: ScreenView; label: string; icon: React.ReactNode }[] = [
    {
      id: "client_overview",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "client_properties",
      label: "Properties",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: "client_bills",
      label: "Bills & OCR",
      icon: <Receipt className="w-5 h-5" />,
    },
    {
      id: "client_dla",
      label: "DLA Ledger",
      icon: <Coins className="w-5 h-5" />,
    },
    {
      id: "client_tax_pack",
      label: "Tax Pack",
      icon: <FileCheck2 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 mobile-bottom-dock px-2 py-2">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentView(item.id)}
              className={`touch-target-44 flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
                isActive
                  ? "text-gold bg-gold/10 font-bold border border-gold/30"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === "client_tax_pack" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
