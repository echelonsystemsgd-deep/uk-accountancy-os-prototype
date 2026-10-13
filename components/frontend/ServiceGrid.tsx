"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileText,
  TrendingUp,
  Receipt,
  Lightbulb,
  Briefcase,
  HardHat,
  Coins,
  Check,
  ArrowRight,
} from "lucide-react";

type AudienceSegment = "ltd_directors" | "cis_trades" | "scaleups";

export default function ServiceGrid() {
  const { setIsCalendarOpen } = useDemoStore();
  const [activeSegment, setActiveSegment] = useState<AudienceSegment>("ltd_directors");

  const segments: { id: AudienceSegment; label: string; badge: string; desc: string }[] = [
    {
      id: "ltd_directors",
      label: "Limited Company Directors",
      badge: "Standard Retainer",
      desc: "Tailored compliance, CT600 architecture, and dividend planning for owner-managed UK businesses.",
    },
    {
      id: "cis_trades",
      label: "CIS Contractors & Trades",
      badge: "Construction Industry Scheme",
      desc: "Dedicated subcontractor verifications, monthly CIS statements, and fast-track tax refund offsets.",
    },
    {
      id: "scaleups",
      label: "High-Growth Scaleups (£1M+)",
      badge: "Fractional Advisory",
      desc: "Institutional financial steering, merged R&D tax relief, Patent Box, and board presentation packs.",
    },
  ];

  const packages: Record<AudienceSegment, Array<{
    title: string;
    tagline: string;
    description: string;
    features: string[];
    turnaround: string;
  }>> = {
    ltd_directors: [
      {
        title: "Year-End Statutory Filing & CT600",
        tagline: "Companies House & HMRC Electronic Gateway",
        description: "Full statutory accounts preparation, Corporation Tax returns, director loan account reconciliation, and confirmation statements.",
        features: [
          "Filing completed within 4 weeks of year-end",
          "Director loan account balance structuring",
          "Electronic Companies House filing receipt",
          "Full HMRC audit defense protection",
        ],
        turnaround: "4-Week SLA",
      },
      {
        title: "Director Dividend & Remuneration",
        tagline: "Proactive Wealth & Salary Band Architecture",
        description: "Structured extraction timing between optimal PAYE thresholds, dividends, and company pension contributions to minimize higher-rate tax.",
        features: [
          "Quarterly director extract forecast",
          "Employer pension & SSAS tax planning",
          "Associated company rule assessment",
          "Family investment company advisory",
        ],
        turnaround: "Quarterly Strategy",
      },
      {
        title: "Quarterly VAT & MTD Automated Dropzone",
        tagline: "Making Tax Digital Compliance",
        description: "Zero last-minute document stress. Direct mobile receipt snap ingestion and automatic reconciliation against your bank feed.",
        features: [
          "Direct MTD API linking with HMRC",
          "Quarterly reconciliation in 48 hours",
          "Reverse charge & partial exemption audits",
          "Automated missing receipt reminders",
        ],
        turnaround: "48-Hour Close",
      },
    ],
    cis_trades: [
      {
        title: "Monthly CIS Filing & Subcontractor Verification",
        tagline: "HMRC Construction Industry Scheme",
        description: "Timely monthly CIS300 submissions, automatic subcontractor UTR verifications (20%/30% rates), and payment certificate dispatch.",
        features: [
          "Direct verification via HMRC CIS gateway",
          "Automated monthly payment and deduction statements",
          "Zero late-filing penalty guarantee (£100 HMRC fine avoidance)",
          "Subcontractor status & deemed employment checks",
        ],
        turnaround: "Monthly by 19th",
      },
      {
        title: "CIS Offset & HMRC Tax Repayment Processing",
        tagline: "Fast-Track Cash Flow Recovery",
        description: "Reconcile CIS deductions suffered against PAYE/VAT liabilities and accelerate cash repayments directly from HMRC's specialist unit.",
        features: [
          "Immediate offset against quarterly PAYE liabilities",
          "Fast-track year-end CIS refund submission",
          "Direct correspondence with HMRC CIS processing team",
          "Working capital optimization analysis",
        ],
        turnaround: "Fast-Track Priority",
      },
      {
        title: "Materials, Plant & Mileage Expensing",
        tagline: "100% Capital Allowances & Full Expensing",
        description: "Maximize deductions across commercial vehicles, tools, plant equipment, and business travel with bulletproof digital logs.",
        features: [
          "100% full expensing write-offs on eligible plant & machinery",
          "Commercial van capital allowance optimization",
          "Digital travel & subsistence record logging",
          "VAT flat rate vs. standard scheme comparison",
        ],
        turnaround: "Real-Time Tracking",
      },
    ],
    scaleups: [
      {
        title: "Merged R&D Tax Relief & Patent Box",
        tagline: "Statutory Innovation Incentives",
        description: "Comprehensive technical narratives and financial schedules prepared under the merged RDEC and SME intensive relief rules.",
        features: [
          "Technical narrative prepared by specialist tax team",
          "Advance notification form & additional info form compliance",
          "Patent Box election reducing effective CT to 10%",
          "Substantiated claim defense included",
        ],
        turnaround: "Annual Incentive",
      },
      {
        title: "Fractional CFO & Rolling 13-Week Cash Flow",
        tagline: "Board-Level Financial Steering",
        description: "A senior chartered partner on your advisory board. Monthly financial decks, rolling 13-week liquidity modelling, and unit economics.",
        features: [
          "Monthly board presentation pack & KPI dashboard",
          "Rolling 13-week dynamic cash flow forecasting",
          "M&A, debt facility & equity fundraising readiness",
          "Direct partner Slack & WhatsApp line",
        ],
        turnaround: "Monthly Board Pack",
      },
      {
        title: "Corporate Restructuring & EMI Share Options",
        tagline: "Enterprise Structure & Founder Alignment",
        description: "Implementation of Enterprise Management Incentive (EMI) share schemes, group holding company formation, and BADR planning.",
        features: [
          "HMRC share valuation agreement for EMI schemes",
          "Holding company share-for-share exchange clearance",
          "Business Asset Disposal Relief (10% CGT) planning",
          "Shareholder agreements & commercial tax covenants",
        ],
        turnaround: "Bespoke Project",
      },
    ],
  };

  const currentPackages = packages[activeSegment];
  const activeObj = segments.find((s) => s.id === activeSegment);

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Curated Corporate Accounting Solutions
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
            Select your operating profile below to view a focused 3-tier delivery model without navigating cluttered keyword dumps.
          </p>
        </div>

        {/* Audience Segment Selector (The Anti-Service-Dump) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center bg-[#0B0D13] p-1.5 rounded-xl border border-white/[0.08] gap-1 max-w-full">
            {segments.map((seg) => {
              const isActive = activeSegment === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#161A26] text-[#EDEDED] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/[0.1] font-semibold"
                      : "text-[#94A3B8] hover:text-[#EDEDED] hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <span>{seg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Segment Summary */}
        <div className="max-w-xl mx-auto text-center mb-8">
          <p className="text-xs text-[#64748B] font-mono">
            {activeObj?.desc}
          </p>
        </div>

        {/* Curated 3-Card Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentPackages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl p-6 flex flex-col justify-between hover:border-white/[0.16] transition-all animate-in fade-in duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                    {pkg.turnaround}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#EDEDED] mt-1">
                  {pkg.title}
                </h3>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5 mb-2">
                  {pkg.tagline}
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-2 border-t border-white/[0.06] pt-4 mb-6">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsCalendarOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0E111A] hover:bg-[#131622] border border-white/[0.08] hover:border-white/20 text-[#EDEDED] text-xs font-medium transition-colors"
              >
                <span>Select Package &amp; Book Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
