"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Building2,
  KeyRound,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Calendar,
  AlertCircle,
  Plus,
  PoundSterling,
  CheckCircle2,
  Receipt,
  ArrowUpRight,
  ChevronRight,
  X,
} from "lucide-react";
import { NewPropertyInput } from "@/lib/types";

export default function PropertyPortfolioHub() {
  const { activeClient, addNewProperty, setCurrentView, triggerToast } = useDemoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [propertyType, setPropertyType] = useState<"Residential BTL" | "HMO" | "Commercial" | "Multi-unit">("Residential BTL");
  const [annualRentalIncome, setAnnualRentalIncome] = useState<number | "">("");
  const [mortgageLender, setMortgageLender] = useState("");
  const [outstandingMortgage, setOutstandingMortgage] = useState<number | "">("");

  const properties = activeClient.properties || [];
  const totalRent = properties.reduce((acc, p) => acc + p.annualRentalIncome, 0);
  const totalValuation = properties.reduce((acc, p) => acc + (p.currentValuation || p.purchasePrice || 0), 0);
  const totalDebt = properties.reduce((acc, p) => acc + (p.outstandingMortgage || 0), 0);
  const averageYield = properties.length > 0
    ? (properties.reduce((acc, p) => acc + (p.netYield || 6.5), 0) / properties.length).toFixed(2)
    : "0.00";

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !postcode || !annualRentalIncome) {
      triggerToast("Missing Information", "Please enter address, postcode and annual rental income.", "warning");
      return;
    }

    const input: NewPropertyInput = {
      address,
      postcode,
      propertyType,
      ownershipSplit: "100% SPV Ltd",
      annualRentalIncome: Number(annualRentalIncome),
      mortgageLender: mortgageLender || "Specialist SPV Lender",
      outstandingMortgage: Number(outstandingMortgage) || 0,
    };

    addNewProperty(activeClient.id, input);
    setIsAddModalOpen(false);
    setAddress("");
    setPostcode("");
    setAnnualRentalIncome("");
    setMortgageLender("");
    setOutstandingMortgage("");
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Header Banner */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                SPV Corporate Asset Register
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Entity: <strong className="text-neutral-200">{activeClient.entityName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Property Portfolio & Leases
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Granular acquisition records, capital cost indexing (SDLT + conveyancing), Section 24 corporate mortgage relief, and tenant rent roll.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="touch-target-44 px-4 py-2.5 rounded-lg text-xs font-bold bg-gold hover:bg-gold-hover text-obsidian transition-all shadow-gold flex items-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property Asset</span>
          </button>
        </div>

        {/* 4 Summary Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Asset Valuation</span>
            <span className="text-lg sm:text-xl font-bold text-white num-tabular">
              £{totalValuation.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{properties.length} Portfolios Enrolled</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Annual Rental Turnover</span>
            <span className="text-lg sm:text-xl font-bold text-gold num-tabular">
              £{totalRent.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              £{(totalRent / 12).toFixed(0)}/month gross roll
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total SPV Loan Facility</span>
            <span className="text-lg sm:text-xl font-bold text-neutral-200 num-tabular">
              £{totalDebt.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block">
              100% Section 24 Deductible
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Portfolio Net Yield</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 num-tabular">
              {averageYield}%
            </span>
            <span className="text-[10px] text-neutral-400 block">
              Post-financing net return
            </span>
          </div>
        </div>
      </div>

      {/* Property Cards List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-gold" />
          <span>Active Asset Records ({properties.length})</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {properties.map((prop) => {
            const monthlyRent = Math.round(prop.annualRentalIncome / 12);
            const totalCapitalBasis = (prop.purchasePrice || 0) + (prop.stampDutyPaid || 0) + (prop.legalFees || 0);

            return (
              <div
                key={prop.id}
                className="accountant-card p-5 bg-cardSurface border border-neutral-800 hover:border-gold/40 rounded-xl space-y-4 transition-all"
              >
                {/* Card Title & Type */}
                <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                      {prop.propertyType} &bull; {prop.ownershipSplit}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {prop.address}
                    </h3>
                    <p className="text-xs text-neutral-400">{prop.postcode} &bull; Acquired {prop.purchaseDate || "2024"}</p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Yield {prop.netYield || 6.7}%
                  </span>
                </div>

                {/* Capital & Purchase Breakdown */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-obsidian-400/90 border border-neutral-800/80 text-xs">
                  <div>
                    <span className="text-neutral-400 text-[10px] block">Purchase Price</span>
                    <span className="font-bold text-white num-tabular">
                      £{(prop.purchasePrice || 350000).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">SDLT (Stamp Duty)</span>
                    <span className="font-bold text-neutral-300 num-tabular">
                      £{(prop.stampDutyPaid || 15000).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">Capital Cost Basis</span>
                    <span className="font-bold text-emerald-400 num-tabular">
                      £{totalCapitalBasis.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Tenancy & Rent Roll */}
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="flex items-center space-x-2">
                    <KeyRound className="w-4 h-4 text-gold" />
                    <div>
                      <span className="text-[10px] text-neutral-400 block">Current Tenant</span>
                      <span className="font-semibold text-white">{prop.tenantName || "Private Assured Tenancy"}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block">Monthly Rent</span>
                    <span className="font-bold text-gold num-tabular text-sm">
                      £{monthlyRent.toLocaleString()}/mo
                    </span>
                  </div>
                </div>

                {/* Mortgage & Section 24 SPV Relief */}
                <div className="space-y-1.5 text-xs bg-obsidian-500/60 p-3 rounded-lg border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center space-x-1.5">
                      <Landmark className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{prop.mortgageLender || "Paragon Bank (SPV)"}</span>
                    </span>
                    <span className="text-neutral-200 num-tabular font-medium">
                      £{(prop.outstandingMortgage || 250000).toLocaleString()} loan
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60">
                    <span className="text-[11px] text-neutral-400">Monthly Mortgage Interest:</span>
                    <span className="text-xs font-bold text-emerald-400 num-tabular">
                      £{(prop.monthlyMortgageInterest || 1110).toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>100% allowable corporate deduction against Corporation Tax</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentView("client_bills")}
                    className="text-xs text-neutral-400 hover:text-gold flex items-center space-x-1 transition"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View Property Invoices</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView("vault")}
                    className="text-xs text-gold hover:text-gold-light flex items-center space-x-1 font-semibold transition"
                  >
                    <span>Completion Statement</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="accountant-card max-w-lg w-full p-6 bg-cardSurface border border-gold/30 rounded-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                  New Portfolio Acquisition
                </span>
                <h3 className="text-lg font-bold text-white">Enroll Property Asset</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="touch-target-44 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Property Address Line 1 *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 14 Belgrave Place, Solihull"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Postcode *</label>
                  <input
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. B91 3QE"
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Asset Class</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Residential BTL">Residential BTL</option>
                    <option value="HMO">HMO (Multi-let)</option>
                    <option value="Commercial">Commercial Property</option>
                    <option value="Multi-unit">Multi-Unit Freehold Block</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Annual Gross Rent (£) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={annualRentalIncome}
                    onChange={(e) => setAnnualRentalIncome(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 25800"
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Outstanding Mortgage (£)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={outstandingMortgage}
                    onChange={(e) => setOutstandingMortgage(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 288750"
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Mortgage Lender Name
                </label>
                <input
                  type="text"
                  value={mortgageLender}
                  onChange={(e) => setMortgageLender(e.target.value)}
                  placeholder="e.g. Paragon Bank / Shawbrook / Aldermore"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="p-3 rounded-lg bg-gold/10 border border-gold/30 text-[11px] text-neutral-300 space-y-1">
                <span className="font-bold text-gold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Automatic Section 24 SPV Classification</span>
                </span>
                <p>
                  Mortgage interest will automatically be classified as 100% deductible corporate finance cost in CT600 Box 155.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="touch-target-44 px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="touch-target-44 px-5 py-2.5 rounded-lg font-bold bg-gold hover:bg-gold-hover text-obsidian transition shadow-gold"
                >
                  Confirm Asset Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
