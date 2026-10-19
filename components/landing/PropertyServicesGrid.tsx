"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  TrendingUp,
  Building2,
  CalendarCheck,
  FileCheck2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function PropertyServicesGrid() {
  const { openIntakeModal } = useDemoStore();

  const services = [
    {
      title: "Section 24 Mortgage Relief Planning",
      icon: <TrendingUp className="w-5 h-5 text-emerald-700" />,
      tag: "Income Tax Mitigation",
      description:
        "Higher-rate landlords lose significant profits when mortgage finance costs are restricted to a 20% tax credit. We model your exact threshold exposure and design restructuring strategies to protect rental yields.",
      outcome: "Preserves allowable finance deductions & prevents unexpected higher-rate tax brackets.",
    },
    {
      title: "SPV Company Incorporations & Section 162",
      icon: <Building2 className="w-5 h-5 text-slate-700" />,
      tag: "Corporate Structuring",
      description:
        "Purchasing through an SPV Limited Company allows 100% mortgage interest deductibility at 19%–25% Corporation Tax. For established portfolios, we advise on Section 162 incorporation relief to defer Capital Gains Tax.",
      outcome: "Full interest deduction against profits + access to commercial mortgage terms.",
    },
    {
      title: "Landlord Self Assessment & MTD for ITSA",
      icon: <CalendarCheck className="w-5 h-5 text-emerald-700" />,
      tag: "Statutory Compliance",
      description:
        "Starting April 2026, landlords earning gross property income over £50,000 must submit quarterly digital updates to HMRC. We set up your digital records now so your filings are automated rather than a January panic.",
      outcome: "Zero HMRC late penalties + smooth quarterly compliance spread throughout the year.",
    },
    {
      title: "60-Day CGT Property Disposal Filings",
      icon: <FileCheck2 className="w-5 h-5 text-slate-700" />,
      tag: "Capital Gains Relief",
      description:
        "Selling a residential buy-to-let requires calculating Capital Gains Tax and filing a dedicated UK Property Return within 60 days of completion. We claim all allowable enhancement expenses and private residence relief.",
      outcome: "Accurate computation of acquisition costs, legal fees, and full statutory clearance within 60 days.",
    },
  ];

  return (
    <section id="specialisms" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Practice Specialisms
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            How We Protect Your Property Returns
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Unlike general high-street practices that treat rental income as a secondary task, our team specializes in UK property statutes, corporate property SPVs, and HMRC land taxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="accountant-card p-5 sm:p-6 space-y-4 hover:border-neutral-300 transition shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded bg-neutral-100 flex items-center justify-center">
                    {svc.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700">
                    {svc.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 space-y-3">
                <div className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded font-medium">
                  <strong>Outcome:</strong> {svc.outcome}
                </div>
                <button
                  type="button"
                  onClick={() => openIntakeModal({ notes: `Interested in: ${svc.title}` })}
                  className="text-xs font-semibold text-primary hover:text-neutral-700 inline-flex items-center space-x-1 transition"
                >
                  <span>Request Specific Advisory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
