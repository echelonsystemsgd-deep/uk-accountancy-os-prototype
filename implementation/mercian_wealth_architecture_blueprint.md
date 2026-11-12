# MERCIAN WEALTH TAX & LEDGER SUITE: ARCHITECTURAL BLUEPRINT
## Dedicated UK Property Investment Accountancy & Wealth Operating System
**Primary Operating Entity:** SUKHPREET KAUR LEGACY WEALTH LTD (UK Private Limited Company / Property Investment SPV)
**Secondary Supported Entities:** Singh Family Residential BTL (Joint Personal Ownership), Sovereign Estate Holdings Ltd

---

## 1. Executive Summary & Psychological Positioning

When presenting an accountancy or wealth platform to an appointed Chartered Accountant or institutional partner, conventional pitch decks and unprompted software demos trigger skepticism or cognitive fatigue. 

By contrast, **Mercian Wealth Tax & Ledger** positions the client not as a consumer seeking help, but as the **most organized, high-margin, compliance-ready client in the practice's portfolio**. 

### The Dual-Benefit Proposition:
1. **For the Director (Sukhpreet Kaur):**
   - Real-time net rental yield and cash flow telemetry.
   - Elimination of Section 24 mortgage restrictions through SPV corporate tax relief (100% deductible finance costs).
   - Frictionless receipt capture with automated HMRC CT600 expense categorization.
   - Active Director's Loan Account (DLA) tracking to extract capital repayments tax-free before triggering dividend tax.
   - One-click generation of the HMRC-compliant Year-End Accountant Pack (Executive PDF + 3 pre-formatted CSV schedules).

2. **For the Appointed Chartered Accountant (e.g. Kalpesh Patel FCA / Pritpal Chaggar CTA):**
   - Zero receipt chasing: all documents arrive OCR-extracted, audit-hashed, and categorized.
   - Clean double-entry trial balance, balance sheet, and CT600-ready figures.
   - Full compliance with Section 455 overdrawn loan prevention.
   - Immediate export to Taxcalc, Xero, Iris, or FreeAgent format.

---

## 2. The 6 Core System Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 MERCIAN WEALTH TAX & LEDGER SUITE ARCHITECTURE              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
[Pillar 1: Public Gateway]   [Pillar 2: Client Portal]    [Pillar 3: Partner Console]
• Luxury Brand Face          • Executive KPI Dashboard    • Multi-Entity Switcher
• 60s Intake Tax Scoper      • Property Portfolio Ledger  • General Ledger & Trial Bal
• Unified Auth Gateway       • OCR Bill & Receipt Scanner • CT600 Prep & Verification
• Booking & Consultation     • DLA Section 455 Monitor    • Zero-Cost Bank Reconciler
                             • HMRC 45p Mileage Engine    • Audit Trail & Milestones
                             • 1-Click Tax Pack Generator
```

### Pillar 1: Public Gateway & Marketing Frontend (`/`, `/qualify`, `/login`)
- **Luxury Theme:** Deep Obsidian (`#09090B`), Elevated Card (`#141417`), Burnished Gold (`#DCAE53`), Emerald Tax Shield (`#10B981`).
- **60-Second Property Tax Scoper:** Interactive calculator modeling Section 24 impact on personal vs SPV corporate tax rates.
- **Unified Auth Gateway:** Role-based authentication routing between Director/Investor mode and Appointed Accountant review mode.

### Pillar 2: Client Portal (`/portal`)
- **Executive Property Dashboard:** Gross rental turnover, allowable operating expenses, mortgage interest deductible under SPV, estimated Corporation Tax shield, live DLA balance, and upcoming statutory deadlines.
- **Property Portfolio Ledger:** Granular cards tracking purchase date, purchase price, current valuation, SDLT and legal fees capitalized into base cost, tenant tenancy dates, arrears alerts, and net rental yield.
- **OCR Bill & Receipt Ingestion:** Drag-and-drop dropzone supporting PDF/image files with heuristic OCR parsing (vendor, date, gross, VAT, net) and HMRC CT600 category suggestions.
- **Director's Loan Account (DLA) Tracker:** Complete credit/debit register separating initial property equity injections from revenue drawings to safeguard against HMRC Section 455 penalties (33.75%).
- **HMRC Compliant Mileage Log:** Automated calculation of 45p/mile (first 10,000 miles) and 25p/mile thereafter, auto-credited to the DLA balance.
- **Tax Shield & Extraction Optimizer:** Real-time calculation of Corporation Tax (19% small profits rate, 25% main rate, and marginal relief taper) alongside optimal director remuneration (£12,570 salary + dividend allowance).
- **1-Click HMRC & Accountant Tax Pack Generator:** Instant production of a professional PDF summary and 3 CSV schedules (`Transactions.csv`, `Rental_Schedule.csv`, `Capital_Expenses.csv`).

### Pillar 3: Accountant / Admin Console (`/admin`)
- **Multi-Entity Switcher:** Rapid toggling between SPV Ltd companies and personal self-assessment records.
- **General Ledger & Double-Entry Trial Balance:** Full ledger view with debit/credit balance verification.
- **One-Click Transaction Verification:** Accountant can mark client-uploaded bills as verified (`is_verified = true`).
- **Zero-Cost Bank Statement Parser:** CSV, OFX, and QIF ingestion supporting all major UK business banks (Starling, Monzo, Tide, NatWest, Barclays, HSBC, Lloyds) with automated rent and mortgage reconciliation.

---

## 3. Technology Stack & Design System

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | High-speed server rendering, zero-lag client routing |
| **Language** | TypeScript 5+ (Strict) | Compile-time safety across all financial computations |
| **Styling** | Tailwind CSS + CSS Variables | Obsidian luxury design, touch-target ergonomics |
| **Icons** | Lucide React | High-clarity micro-icons for all financial entities |
| **State Management** | React Context (`useDemoStore`) | Instant reactive updates, persistent demo states |
| **Database** | PostgreSQL via Supabase | Row Level Security (RLS), foreign key integrity |
| **File Storage** | Supabase Storage / Edge Ingestion | Audit-hashed document retention |
| **Export Formats** | CSV + Print-Ready PDF | Universal compatibility with UK accountancy software |

---

## 4. Mobile Ergonomics & Responsive Architecture

To guarantee flawless mobile operation:
1. **Ergonomic Touch Targets:** All buttons, filters, tabs, and toggles have a minimum target height/width of 44px (`touch-target-44`).
2. **Zero Horizontal Overflow:** Body and container elements enforce strict bounds (`overflow-x-hidden`, `w-full max-w-full`).
3. **Mobile Bottom Navigation Dock:** Smartphone viewports (`< 768px`) feature a fixed tactile bottom dock for instantaneous thumb-driven switching between Dashboard, Bills, Properties, Tax Pack, and Profile.
4. **Adaptive Data Visualizations:** Tables automatically wrap into scrollable containers or convert into stacked financial cards on smaller screens.
5. **Keyboard Shortcuts:** Rapid power-user shortcuts (`N` for new bill, `U` for upload, `P` for add property).
