"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Car,
  Navigation,
  ShieldCheck,
  Plus,
  Coins,
  CheckCircle2,
  Calendar,
  PoundSterling,
  X,
  FileCheck2,
} from "lucide-react";

export default function MileageLogHub() {
  const { activeClient, addMileageLog, triggerToast } = useDemoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [origin, setOrigin] = useState("Registered Office, Birmingham");
  const [destination, setDestination] = useState(
    activeClient.properties[0]?.address || "14 Belgrave Place, Solihull"
  );
  const [purpose, setPurpose] = useState("");
  const [miles, setMiles] = useState<number | "">("");
  const [ratePerMile, setRatePerMile] = useState<number>(0.45);
  const [isCreditedToDla, setIsCreditedToDla] = useState(true);

  const mileageLogs = activeClient.mileageLogs || [];
  const totalMiles = mileageLogs.reduce((acc, m) => acc + m.miles, 0);
  const totalClaimAmount = mileageLogs.reduce((acc, m) => acc + m.totalClaim, 0);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !purpose || !miles || Number(miles) <= 0) {
      triggerToast("Missing Information", "Please enter origin, destination, purpose and miles.", "warning");
      return;
    }

    addMileageLog(activeClient.id, {
      date,
      origin,
      destination,
      purpose,
      miles: Number(miles),
      ratePerMile,
      propertyAddress: destination,
      isCreditedToDla,
    });

    setIsAddModalOpen(false);
    setPurpose("");
    setMiles("");
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Banner */}
      <div className="accountant-card p-6 bg-gradient-to-r from-obsidian-400 via-cardSurface to-obsidian-300 border border-gold/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider">
                HMRC Approved Statutory Mileage
              </span>
              <span className="text-neutral-500 text-xs">&bull;</span>
              <span className="text-xs text-neutral-400">
                Tax Year: <strong className="text-neutral-200">{activeClient.taxYear}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Business Travel & Mileage Log
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              HMRC approved 45p/mile rate for property viewings, inspections, maintenance supervision, and key handovers. Automatically credited to your Director’s Loan Account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="touch-target-44 px-4 py-2.5 rounded-lg text-xs font-bold bg-gold hover:bg-gold-hover text-obsidian transition-all shadow-gold flex items-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Record Business Journey</span>
          </button>
        </div>

        {/* 4 Telemetry Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800 text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Miles Logged</span>
            <span className="text-xl sm:text-2xl font-bold text-white num-tabular">
              {totalMiles.toLocaleString()} mi
            </span>
            <span className="text-[10px] text-emerald-400 block">
              Rolling tax year allowance
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Total Allowable Claim</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 num-tabular">
              £{totalClaimAmount.toFixed(2)}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              100% Tax-deductible expense
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">Credited to Director DLA</span>
            <span className="text-xl sm:text-2xl font-bold text-gold num-tabular">
              £{totalClaimAmount.toFixed(2)}
            </span>
            <span className="text-[10px] text-neutral-400 block">
              Available for tax-free withdrawal
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-500/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 text-[11px] block">HMRC Tier 1 Headroom</span>
            <span className="text-xl sm:text-2xl font-bold text-neutral-200 num-tabular">
              {(10000 - totalMiles).toLocaleString()} mi
            </span>
            <span className="text-[10px] text-neutral-400 block">
              Remaining at £0.45/mile rate
            </span>
          </div>
        </div>
      </div>

      {/* Journeys List */}
      <div className="accountant-card bg-cardSurface border border-neutral-800 rounded-xl overflow-hidden space-y-3 p-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Car className="w-4 h-4 text-gold" />
            <span>HMRC Compliant Journey Ledger ({mileageLogs.length})</span>
          </h2>
          <span className="text-xs text-neutral-400">
            HMRC Rate: <strong className="text-gold">45p / mile</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Route (Origin → Destination)</th>
                <th className="py-2.5 px-3">Business Purpose</th>
                <th className="py-2.5 px-3 text-center">Distance</th>
                <th className="py-2.5 px-3 text-right">Claim (£)</th>
                <th className="py-2.5 px-3 text-center">DLA Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {mileageLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-800/30 transition">
                  <td className="py-3 px-3 text-neutral-400 whitespace-nowrap num-tabular">
                    {log.date}
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {log.origin} → {log.destination}
                  </td>
                  <td className="py-3 px-3 text-neutral-300">
                    {log.purpose}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-neutral-200 num-tabular">
                    {log.miles} mi
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400 num-tabular whitespace-nowrap">
                    £{log.totalClaim.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 text-[10px] text-gold font-bold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                      <Coins className="w-3 h-3 text-gold" />
                      <span>Credited</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Journey Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="accountant-card max-w-md w-full p-6 bg-cardSurface border border-gold/30 rounded-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                  HMRC Mileage Tracker
                </span>
                <h3 className="text-lg font-bold text-white">Record Property Journey</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="touch-target-44 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Origin *</label>
                <input
                  type="text"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Registered Office, Birmingham"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Destination Property *</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. 14 Belgrave Place, Solihull"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Business Purpose *</label>
                <input
                  type="text"
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Tenancy checkout inspection, smoke alarm check, contractor meet"
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Total Roundtrip Miles *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={miles}
                    onChange={(e) => setMiles(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 42"
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-gold font-bold num-tabular"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">HMRC Rate</label>
                  <select
                    value={ratePerMile}
                    onChange={(e) => setRatePerMile(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-400 border border-neutral-700 text-white focus:outline-none focus:border-gold"
                  >
                    <option value={0.45}>£0.45/mi (First 10,000 miles)</option>
                    <option value={0.25}>£0.25/mi (Over 10,000 miles)</option>
                    <option value={0.09}>£0.09/mi (Advisory EV Rate)</option>
                  </select>
                </div>
              </div>

              {miles && Number(miles) > 0 && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>Allowable Claim:</span>
                  <span className="font-extrabold text-sm text-emerald-400 num-tabular">
                    £{(Number(miles) * ratePerMile).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="creditDla"
                  checked={isCreditedToDla}
                  onChange={(e) => setIsCreditedToDla(e.target.checked)}
                  className="rounded border-neutral-700 text-gold focus:ring-gold bg-obsidian-400"
                />
                <label htmlFor="creditDla" className="text-neutral-300 text-[11px]">
                  Automatically credit this claim to Director’s Loan Account (DLA)
                </label>
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
                  Record Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
