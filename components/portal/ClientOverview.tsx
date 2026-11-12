"use client";

import React from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  TrendingUp,
  FileCheck2,
  Receipt,
  Coins,
  ShieldCheck,
  Calendar,
  Lock,
  Car,
  ChevronRight,
  ArrowRight,
  Scale,
  Sparkles,
} from "lucide-react";
import UserNextStepBar from "@/components/shared/UserNextStepBar";
import BklitAreaChart from "@/components/charts/BklitAreaChart";

export default function ClientOverview() {
  const { activeClient, setCurrentView } = useDemoStore();

  const verifiedDocs = activeClient.documents.filter((d) => d.status === "verified");
  const bills = activeClient.bills || [];

  const totalRentalIncome = activeClient.totalRentalIncome || 39000;
  const mortgageInterest = bills.filter((b) => b.category === "mortgage_interest").reduce((a, b) => a + b.amount, 0) || 20280;
  const allowableExpenses = bills.filter((b) => b.category !== "mortgage_interest" && b.isAllowableExpense).reduce((a, b) => a + b.amount, 0) || 6420;
  const netTaxableProfit = Math.max(0, totalRentalIncome - mortgageInterest - allowableExpenses);
  const estimatedCt = Math.round(netTaxableProfit * 0.19);

  // Section 24 Tax Saved: Personal 40% higher rate tax without interest deduction vs 19% corporate rate
  const personalEquivalentTax = Math.round((totalRentalIncome - allowableExpenses) * 0.40 - (mortgageInterest * 0.20));
  const estimatedTaxSaved = Math.max(0, personalEquivalentTax - estimatedCt);
  const dlaBalance = activeClient.dlaBalance || 134625;

  return (
    <div className="space-y-6 text-left pb-16">
      {/* 1. Executive Software Cockpit Header (No Useless Orange Eyebrow Text) */}
      <div className="accountant-card p-5 sm:p-6 bg-[#162032] border border-[#1F293D] rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeClient.entityName}
            </h1>
            <p className="text-xs text-slate-400">
              Special Purpose Vehicle (SPV) Property Ledger &bull; Director: <strong className="text-slate-200">{activeClient.primaryContact}</strong> &bull; Supervised by <strong className="text-slate-200">{activeClient.assignedAccountant}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCurrentView("client_tax_pack")}
              className="touch-target-44 px-3.5 py-2 rounded-lg font-semibold text-xs bg-[#0077C8] hover:bg-[#0284C7] text-white flex items-center space-x-2 shadow-sm transition active:scale-95"
            >
              <FileCheck2 className="w-4 h-4 text-white" />
              <span>CT600 Tax Pack</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("client_bills")}
              className="touch-target-44 px-3.5 py-2 rounded-lg font-medium text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-2 transition active:scale-95"
            >
              <Receipt className="w-4 h-4 text-slate-300" />
              <span>Log Receipt / Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Rexora-Style Metric Cards (Icons on top right, bold figure, percentage badge, view details link) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Gross Rental Turnover */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Gross Rent</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono block">
              £{totalRentalIncome.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 font-bold flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>+6.8% Yield</span>
              </span>
              <button
                type="button"
                onClick={() => setCurrentView("client_properties")}
                className="text-slate-400 hover:text-white flex items-center space-x-0.5 font-medium transition"
              >
                <span>Properties</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Metric 2: Director DLA Balance */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Director DLA Buffer</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] tabular-nums font-mono block">
              £{dlaBalance.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 font-bold">
                0% Tax Extraction
              </span>
              <button
                type="button"
                onClick={() => setCurrentView("client_dla")}
                className="text-slate-400 hover:text-white flex items-center space-x-0.5 font-medium transition"
              >
                <span>DLA Ledger</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Metric 3: Section 24 Tax Shield */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Annual Tax Shield</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums font-mono block">
              +£{estimatedTaxSaved.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 font-bold">
                Saved vs Personal
              </span>
              <button
                type="button"
                onClick={() => setCurrentView("client_tax_optimizer")}
                className="text-slate-400 hover:text-white flex items-center space-x-0.5 font-medium transition"
              >
                <span>Shield Model</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Metric 4: Estimated Corporation Tax */}
        <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Corp Tax Provision</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono block">
              £{estimatedCt.toLocaleString()}
            </span>
            <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#1F293D] text-[11px]">
              <span className="px-1.5 py-0.5 rounded text-slate-400 bg-slate-800 font-medium">
                19% Small Profits
              </span>
              <button
                type="button"
                onClick={() => setCurrentView("client_tax_pack")}
                className="text-slate-400 hover:text-white flex items-center space-x-0.5 font-medium transition"
              >
                <span>View CT600</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bklit-Inspired Area Chart: Revenue vs Allowable Costs */}
      <BklitAreaChart
        title="SPV Rental Revenue & Operating Cost Horizon"
        subtitle="Live reconciliation of gross tenant payments vs Section 24 mortgage interest and maintenance"
      />

      {/* 4. Action Guidance Bar */}
      <UserNextStepBar
        stepNumber={verifiedDocs.length > 2 ? 4 : 2}
        totalSteps={4}
        title={verifiedDocs.length > 2 ? "Year-End Pack Compilation Ready" : "Document & Completion Statements Upload"}
        description={
          verifiedDocs.length > 2
            ? "All SPV acquisition records, SDLT, and mortgage interest have been verified. You can now compile the HMRC CT600 pack."
            : "Ensure your conveyancing completion statements and AST tenancy agreements are uploaded to the encrypted vault."
        }
        actionLabel={verifiedDocs.length > 2 ? "Generate Year-End Tax Pack" : "Open Dropzone"}
        targetView={verifiedDocs.length > 2 ? "client_tax_pack" : "dropzone"}
        variant="emerald"
        statusBadge="Statutory Step"
      />

      {/* 5. 2-Column Core Sections: Compliance Milestones & Quick Hub Navigators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Statutory Deadlines (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Companies House &amp; HMRC Statutory Milestones</span>
              </h2>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                100% Up to Date
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Milestone 1: Annual Accounts */}
              <div className="flex items-start justify-between p-3 rounded-lg bg-[#111827] border border-[#1F293D]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">Companies House Annual Accounts</span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      Due: 31 Dec 2025
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Micro-Entity Accounts balance sheet submission for {activeClient.entityName}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView("client_tax_pack")}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center space-x-1 shrink-0 font-semibold"
                >
                  <span>Review Pack</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Milestone 2: Confirmation Statement */}
              <div className="flex items-start justify-between p-3 rounded-lg bg-[#111827] border border-[#1F293D]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">Confirmation Statement CS01</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Filing Up to Date
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    PSC (Persons with Significant Control) register confirmed for Sukhpreet Kaur.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView("vault")}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 shrink-0"
                >
                  <span>View CS01</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Milestone 3: CT600 Corporation Tax */}
              <div className="flex items-start justify-between p-3 rounded-lg bg-[#111827] border border-[#1F293D]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">HMRC Corporation Tax Return (CT600)</span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      Payment Due: 01 Jan 2026
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Estimated Corporation Tax liability of £{estimatedCt.toLocaleString()} ready for sign-off.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView("client_tax_optimizer")}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center space-x-1 shrink-0 font-semibold"
                >
                  <span>View CT600</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Enrolled Properties Summary */}
          <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Enrolled Property Assets</span>
              </h2>
              <button
                type="button"
                onClick={() => setCurrentView("client_properties")}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1"
              >
                <span>View Full Portfolio ({activeClient.properties.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeClient.properties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => setCurrentView("client_properties")}
                  className="p-3.5 rounded-lg bg-[#111827] border border-[#1F293D] hover:border-slate-700 transition cursor-pointer space-y-1.5"
                >
                  <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">
                    {prop.propertyType}
                  </span>
                  <h3 className="font-bold text-white truncate">{prop.address}</h3>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1.5 border-t border-[#1F293D]">
                    <span>Rent: £{Math.round(prop.annualRentalIncome / 12)}/mo</span>
                    <span className="text-emerald-400 font-semibold">Yield {prop.netYield || 6.7}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Wealth Navigation & DLA Buffer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* DLA Safe Guard Widget */}
          <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-[#38BDF8]" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  DLA Tax-Free Extraction Buffer
                </h2>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                Live Balance
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#111827] border border-[#1F293D] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400">Company Owes Director:</span>
                <span className="text-2xl font-bold text-[#38BDF8] tabular-nums font-mono">
                  £{dlaBalance.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                You can withdraw rental profits tax-free into your personal account up to this amount without triggering dividend tax or Section 455 penalties.
              </p>
              <button
                type="button"
                onClick={() => setCurrentView("client_dla")}
                className="w-full mt-2 py-2 rounded-lg text-xs font-bold bg-[#0077C8] hover:bg-[#0284C7] text-white transition flex items-center justify-center space-x-1"
              >
                <span>Open DLA Ledger &amp; Record Repayment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="accountant-card p-5 bg-[#162032] border border-[#1F293D] rounded-xl space-y-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#1F293D] pb-2">
              <span>Quick Wealth Hub Actions</span>
            </h2>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setCurrentView("client_bills")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-[#1F293D] hover:border-slate-700 text-left transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">Smart Bill &amp; Receipt Scanner</span>
                    <span className="text-[10px] text-slate-400">OCR drag-and-drop &amp; HMRC CT600 category tagging</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentView("client_mileage")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-[#1F293D] hover:border-slate-700 text-left transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <Car className="w-4 h-4 text-[#38BDF8]" />
                  <div>
                    <span className="font-bold text-white block">HMRC Travel &amp; Mileage Log</span>
                    <span className="text-[10px] text-slate-400">45p/mile business vehicle inspection tracker</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentView("client_tax_optimizer")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-[#1F293D] hover:border-slate-700 text-left transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">Tax Shield &amp; Remuneration Matrix</span>
                    <span className="text-[10px] text-slate-400">Optimal £12,570 salary + dividend extraction modeler</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentView("vault")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-[#1F293D] hover:border-slate-700 text-left transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <Lock className="w-4 h-4 text-slate-300" />
                  <div>
                    <span className="font-bold text-white block">Secure Document Vault</span>
                    <span className="text-[10px] text-slate-400">Conveyancing completion docs, title deeds &amp; leases</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
