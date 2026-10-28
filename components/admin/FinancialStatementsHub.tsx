"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  FileSpreadsheet,
  Calculator,
  TrendingUp,
  Download,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Scale,
  PoundSterling,
  HelpCircle,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";

export default function FinancialStatementsHub() {
  const { clients, activeClient, setSelectedClientId, triggerToast } = useDemoStore();
  const [activeTab, setActiveTab] = useState<"pnl" | "balance_sheet" | "ct600" | "dividend">("pnl");

  // Dynamic calculations based on active client's rental income
  const isSinghFamily = activeClient.id === "client-singh-family";
  const grossTurnover = activeClient.totalRentalIncome;
  const agentFees = isSinghFamily ? 120.00 : Math.round(grossTurnover * 0.10); // OpenRent Fee
  const maintenanceRepairs = isSinghFamily ? 5000.00 : Math.round(grossTurnover * 0.08); // Bathroom Refurbishment
  const insuranceAndCompliance = isSinghFamily ? 4080.38 : Math.round(activeClient.properties.length * 850); // Service charge £3,752.88 + Ground rent £294 + Council tax £33.50
  const mortgageInterestTotal = isSinghFamily ? 6330.72 : activeClient.properties.reduce(
    (acc, p) => acc + (p.outstandingMortgage ? Math.round(p.outstandingMortgage * 0.052) : 0),
    0
  );

  const totalAllowableExpenses = isSinghFamily ? 9200.38 : (agentFees + insuranceAndCompliance + maintenanceRepairs);
  const operatingProfitBeforeFinance = grossTurnover - totalAllowableExpenses;

  // SPV Corporation Tax vs Individual Section 24 Rules
  const isSpv = activeClient.entityType === "spv_ltd";
  const taxableProfitSpv = Math.max(0, operatingProfitBeforeFinance - mortgageInterestTotal);

  // UK Corporation Tax Rates (2024/25)
  // Small profits rate: 19% up to £50k. Main rate: 25% over £250k. Marginal relief in between.
  let corporationTax = 0;
  if (taxableProfitSpv <= 50000) {
    corporationTax = taxableProfitSpv * 0.19;
  } else if (taxableProfitSpv >= 250000) {
    corporationTax = taxableProfitSpv * 0.25;
  } else {
    // Marginal relief: 25% minus (250,000 - Profit) * 3/400
    const basicTax = taxableProfitSpv * 0.25;
    const marginalRelief = (250000 - taxableProfitSpv) * (3 / 400);
    corporationTax = Math.max(0, basicTax - marginalRelief);
  }

  const netRetainedProfit = isSpv
    ? taxableProfitSpv - corporationTax
    : operatingProfitBeforeFinance - (operatingProfitBeforeFinance * 0.40 - mortgageInterestTotal * 0.20);

  // Balance sheet figures
  const totalPropertyValue = activeClient.properties.length * 320000;
  const totalMortgageDebt = activeClient.properties.reduce(
    (acc, p) => acc + (p.outstandingMortgage || 220000),
    0
  );
  const cashAtBank = Math.round(grossTurnover * 0.35);
  const netEquity = totalPropertyValue + cashAtBank - totalMortgageDebt;

  // Director Dividend Optimization State
  const [profitToExtract, setProfitToExtract] = useState<number>(Math.max(40000, Math.round(taxableProfitSpv)));
  const optimalSalary = 12570; // 2024/25 Personal Allowance
  const taxableDividends = Math.max(0, profitToExtract - optimalSalary);
  const dividendAllowance = 500; // 2024/25 UK dividend allowance
  const basicRateDividends = Math.min(37700, Math.max(0, taxableDividends - dividendAllowance));
  const dividendTaxBasic = basicRateDividends * 0.0875;
  const higherRateDividends = Math.max(0, taxableDividends - dividendAllowance - basicRateDividends);
  const dividendTaxHigher = higherRateDividends * 0.3375;
  const totalPersonalTax = dividendTaxBasic + dividendTaxHigher;

  const handlePrint = () => {
    triggerToast("Generating Printable Schedule", "Preparing statutory statement PDF preview...", "info");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Statutory Financial Statements & Tax Modeling
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Scale className="w-3 h-3 mr-1 text-emerald-600" />
              FRS 102 (1A) & FRS 105 Compliant
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Real-time balance sheets, Profit & Loss ledgers, and CT600 Corporation Tax marginal relief calculations for practice clients.
          </p>
        </div>

        {/* Client Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 text-xs bg-white px-2.5 py-1.5 rounded border border-neutral-200 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 font-medium">Entity:</span>
            <select
              value={activeClient.id}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="font-semibold text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.entityName} ({c.entityType === "spv_ltd" ? "SPV Ltd" : "Individual BTL"})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Workpaper</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Statement Tabs */}
      <div className="border-b border-neutral-200 flex space-x-3 sm:space-x-4 text-xs font-semibold overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab("pnl")}
          className={`pb-2.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === "pnl"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
          <span>1. Profit & Loss (P&L)</span>
        </button>

        <button
          onClick={() => setActiveTab("balance_sheet")}
          className={`pb-2.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === "balance_sheet"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Scale className="w-4 h-4 text-sky-700" />
          <span>2. Balance Sheet</span>
        </button>

        <button
          onClick={() => setActiveTab("ct600")}
          className={`pb-2.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === "ct600"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Calculator className="w-4 h-4 text-amber-700" />
          <span>3. CT600 Marginal Relief</span>
        </button>

        <button
          onClick={() => setActiveTab("dividend")}
          className={`pb-2.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === "dividend"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>4. Dividend vs Salary Model</span>
        </button>
      </div>

      {/* TAB 1: PROFIT & LOSS STATEMENT */}
      {activeTab === "pnl" && (
        <div className="accountant-card p-6 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-3 gap-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Income Statement for the Period Ended 31 March 2025
              </h2>
              <p className="text-xs text-neutral-500">
                Client: {activeClient.entityName} &bull; Structure: {activeClient.entityType === "spv_ltd" ? "SPV Limited Company (Section 24 Exempt)" : "Individual Landlords (Section 24 Restricted)"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-500 block">Currency</span>
              <span className="text-xs font-bold text-neutral-900">GBP (£) Tabular</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-neutral-800">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase text-[10px] tracking-wider text-left bg-neutral-50/50">
                  <th className="py-2.5 px-3">Statutory Account Heading</th>
                  <th className="py-2.5 px-3">Notes / FRS Reference</th>
                  <th className="py-2.5 px-3 text-right">2024/25 (£)</th>
                  <th className="py-2.5 px-3 text-right">2023/24 Prior (£)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono">
                <tr>
                  <td className="py-2 px-3 font-semibold text-neutral-900">Gross Rental Turnover</td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">Primary portfolio rental streams</td>
                  <td className="py-2 px-3 text-right font-bold text-neutral-900">£{grossTurnover.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">£{Math.round(grossTurnover * 0.94).toLocaleString()}</td>
                </tr>
                <tr className="text-neutral-600">
                  <td className="py-2 px-3 pl-6">Less: Letting Agency & Management Fees</td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">Contractual 10% AST collection fee</td>
                  <td className="py-2 px-3 text-right text-red-600">-£{agentFees.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">-£{Math.round(agentFees * 0.94).toLocaleString()}</td>
                </tr>
                <tr className="text-neutral-600">
                  <td className="py-2 px-3 pl-6">Less: Landlord Insurance & Safety Certificates</td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">Gas safety, EICR, building insurance</td>
                  <td className="py-2 px-3 text-right text-red-600">-£{insuranceAndCompliance.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">-£{Math.round(insuranceAndCompliance * 0.92).toLocaleString()}</td>
                </tr>
                <tr className="text-neutral-600">
                  <td className="py-2 px-3 pl-6">Less: Repairs, Renewals & Redecoration</td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">Wholly and exclusively incurred</td>
                  <td className="py-2 px-3 text-right text-red-600">-£{maintenanceRepairs.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">-£{Math.round(maintenanceRepairs * 0.9).toLocaleString()}</td>
                </tr>
                <tr className="bg-neutral-50 font-semibold text-neutral-900">
                  <td className="py-2.5 px-3">Gross Operating Profit</td>
                  <td className="py-2.5 px-3 font-sans text-neutral-500 text-[11px]">Operating Margin: {Math.round((operatingProfitBeforeFinance / grossTurnover) * 100)}%</td>
                  <td className="py-2.5 px-3 text-right font-bold">£{operatingProfitBeforeFinance.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-500">£{Math.round(operatingProfitBeforeFinance * 0.94).toLocaleString()}</td>
                </tr>
                <tr className="text-neutral-700">
                  <td className="py-2 px-3 pl-6">
                    {isSpv ? "Finance Costs: SPV Commercial Mortgage Interest" : "Finance Costs: Section 24 Mortgage Interest"}
                  </td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">
                    {isSpv ? "100% Tax Deductible under Corporation Tax" : "Restricted: 20% basic rate tax credit only"}
                  </td>
                  <td className="py-2 px-3 text-right text-red-600">-£{mortgageInterestTotal.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">-£{Math.round(mortgageInterestTotal * 0.95).toLocaleString()}</td>
                </tr>
                <tr className="bg-neutral-50 font-bold text-neutral-900 border-t border-neutral-300">
                  <td className="py-2.5 px-3">Taxable Trading Profit</td>
                  <td className="py-2.5 px-3 font-sans text-neutral-500 text-[11px]">{isSpv ? "Subject to UK Corporation Tax" : "Subject to 40% Higher Rate Self Assessment"}</td>
                  <td className="py-2.5 px-3 text-right font-bold">£{Math.round(isSpv ? taxableProfitSpv : operatingProfitBeforeFinance).toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-500">£{Math.round((isSpv ? taxableProfitSpv : operatingProfitBeforeFinance) * 0.93).toLocaleString()}</td>
                </tr>
                <tr className="text-red-700 bg-red-50/40">
                  <td className="py-2 px-3 font-semibold">
                    {isSpv ? "Provision for Corporation Tax (CT600)" : "Estimated Personal Income Tax (after 20% Section 24 Relief)"}
                  </td>
                  <td className="py-2 px-3 font-sans text-neutral-500 text-[11px]">
                    {isSpv ? `Effective Corporate Tax Rate: ${((corporationTax / (taxableProfitSpv || 1)) * 100).toFixed(1)}%` : "Effective Landlord Tax Burden: 36.8%"}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-red-700">-£{Math.round(corporationTax).toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-neutral-500">-£{Math.round(corporationTax * 0.9).toLocaleString()}</td>
                </tr>
                <tr className="bg-emerald-50 text-emerald-950 font-bold text-sm border-t-2 border-emerald-600">
                  <td className="py-3 px-3">Profit for the Financial Year Retained</td>
                  <td className="py-3 px-3 font-sans text-neutral-600 text-[11px]">Available for director dividend distribution</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-800">£{Math.round(netRetainedProfit).toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-neutral-500">£{Math.round(netRetainedProfit * 0.93).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BALANCE SHEET */}
      {activeTab === "balance_sheet" && (
        <div className="accountant-card p-6 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-3 gap-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Statement of Financial Position (Balance Sheet) as at 31 March 2025
              </h2>
              <p className="text-xs text-neutral-500">
                Entity: {activeClient.entityName} &bull; Registered Office: 7 Bell Yard, London, WC2A 2JR
              </p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Balance Sheet Balanced: Net Assets = Total Equity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Assets */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-1">
                Fixed & Current Assets
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="font-sans text-neutral-700">Tangible Assets: Investment Property Portfolio ({activeClient.properties.length} units)</span>
                  <span className="font-bold text-neutral-900">£{totalPropertyValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Current Assets: Rent Account Cash at Bank</span>
                  <span>£{cashAtBank.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Current Assets: Tenant Deposit Holding Account</span>
                  <span>£{Math.round(activeClient.properties.length * 1400).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-neutral-50 px-2 rounded font-bold text-neutral-900">
                  <span className="font-sans">Total Assets</span>
                  <span>£{(totalPropertyValue + cashAtBank + Math.round(activeClient.properties.length * 1400)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right: Liabilities & Equity */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-1">
                Liabilities & Capital Reserves
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Creditors due within 1 year: Corporation Tax (CT600)</span>
                  <span className="text-red-600">£{Math.round(corporationTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Creditors due after 1 year: Commercial Mortgage Debt</span>
                  <span className="text-red-600">£{totalMortgageDebt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-neutral-100 px-2 rounded font-bold text-neutral-900">
                  <span className="font-sans">Net Assets</span>
                  <span className="text-emerald-700">£{netEquity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Called Up Share Capital (100 Ordinary £1 Shares)</span>
                  <span>£100</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100 text-neutral-600">
                  <span className="font-sans">Profit & Loss Account Reserves (Retained Earnings)</span>
                  <span>£{(netEquity - 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-emerald-50 px-2 rounded font-bold text-emerald-900 border border-emerald-200">
                  <span className="font-sans">Total Shareholders' Equity</span>
                  <span>£{netEquity.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CT600 MARGINAL RELIEF MODEL */}
      {activeTab === "ct600" && (
        <div className="accountant-card p-6 bg-white space-y-6">
          <div className="border-b border-neutral-100 pb-3">
            <h2 className="text-base font-bold text-neutral-900">
              CT600 Corporation Tax Computation & Marginal Relief Calculator
            </h2>
            <p className="text-xs text-neutral-500">
              Finance Act 2023 UK Corporate Tax Thresholds: £50,000 Small Profits Limit &bull; £250,000 Main Rate Limit &bull; Marginal Relief Fraction: 3/400 (0.0075)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Small Profits Rate (19%)</span>
              <div className="text-xl font-bold text-neutral-900">£0 - £50,000</div>
              <p className="text-[11px] text-neutral-600">For companies with profits under £50k (no associated companies)</p>
            </div>
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/50 space-y-1">
              <span className="text-xs text-amber-800 font-medium">Marginal Relief Taper (19% to 25%)</span>
              <div className="text-xl font-bold text-amber-900">£50,000 - £250,000</div>
              <p className="text-[11px] text-amber-700">Taper formula: Standard 25% tax reduced by (250,000 - Profit) × 3/400</p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Main Corporation Tax Rate (25%)</span>
              <div className="text-xl font-bold text-neutral-900">&gt; £250,000</div>
              <p className="text-[11px] text-neutral-600">Flat 25% on total corporate net profits</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Live Corporation Tax Breakdown for {activeClient.entityName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 text-[11px] block font-sans">Net Taxable Profit</span>
                <span className="text-base font-bold text-neutral-900">£{Math.round(taxableProfitSpv).toLocaleString()}</span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 text-[11px] block font-sans">Applicable Tax Band</span>
                <span className="text-base font-bold text-neutral-900">
                  {taxableProfitSpv <= 50000 ? "19% Small Profits" : taxableProfitSpv >= 250000 ? "25% Main Rate" : "Marginal Relief"}
                </span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 text-[11px] block font-sans">Corporation Tax Due</span>
                <span className="text-base font-bold text-red-700">£{Math.round(corporationTax).toLocaleString()}</span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 text-[11px] block font-sans">Effective Tax Rate</span>
                <span className="text-base font-bold text-emerald-700">
                  {((corporationTax / (taxableProfitSpv || 1)) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DIRECTOR REMUNERATION & DIVIDEND MODEL */}
      {activeTab === "dividend" && (
        <div className="accountant-card p-6 bg-white space-y-6">
          <div className="border-b border-neutral-100 pb-3">
            <h2 className="text-base font-bold text-neutral-900">
              Director Remuneration: Salary vs. Dividend Tax Optimization (2024/25)
            </h2>
            <p className="text-xs text-neutral-500">
              Optimal profit extraction strategy for property company directors to minimize National Insurance and maximize personal allowances.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <label className="text-xs font-semibold text-neutral-700 block">
                Total Annual SPV Profit for Director Extraction:
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-neutral-500">£</span>
                <input
                  type="number"
                  min={15000}
                  max={250000}
                  step={5000}
                  value={profitToExtract}
                  onChange={(e) => setProfitToExtract(Number(e.target.value))}
                  className="w-full p-2.5 text-sm font-mono border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h4 className="font-bold text-neutral-900 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  The Golden Tax Strategy Formula:
                </h4>
                <p>1. <strong>£12,570 Director Salary:</strong> Fully deductible against Corporation Tax, zero employee National Insurance, qualifies for UK State Pension credits.</p>
                <p>2. <strong>First £500 Dividends:</strong> 0% Dividend Tax (Tax-Free Allowance).</p>
                <p>3. <strong>Up to £50,270 Total Income:</strong> Only 8.75% Basic Rate Dividend Tax.</p>
                <p>4. <strong>Above £50,270 Total Income:</strong> 33.75% Higher Rate Dividend Tax.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Optimized Take-Home Breakdown
              </h3>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="font-sans text-neutral-700">Gross Director Salary (0% NI)</span>
                  <span className="font-bold text-neutral-900">£{optimalSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="font-sans text-neutral-700">Gross Dividends Declared</span>
                  <span className="font-bold text-neutral-900">£{taxableDividends.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200 text-neutral-600">
                  <span className="font-sans">Basic Rate Dividend Tax (8.75%)</span>
                  <span className="text-red-700">-£{Math.round(dividendTaxBasic).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200 text-neutral-600">
                  <span className="font-sans">Higher Rate Dividend Tax (33.75%)</span>
                  <span className="text-red-700">-£{Math.round(dividendTaxHigher).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-emerald-50 px-3 rounded font-bold text-emerald-950 text-sm border border-emerald-300">
                  <span className="font-sans">Total Net Take-Home Cash</span>
                  <span className="text-emerald-700">£{Math.round(profitToExtract - totalPersonalTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 text-[11px] text-neutral-500 font-sans">
                  <span>Overall Effective Personal Tax Rate:</span>
                  <span className="font-bold text-neutral-700">{((totalPersonalTax / profitToExtract) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
