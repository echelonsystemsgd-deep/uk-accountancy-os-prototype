# MERCIAN WEALTH TAX & LEDGER: PRACTICE OS & CONVERSION INFRASTRUCTURE MASTER PLAN

**Target Entity:** SUKHPREET KAUR LEGACY WEALTH LTD (Co. Reg #14892011) & Mercian Wealth Chartered Practice  
**Supervising Partner:** Kalpesh Patel BSc(Hons), FCA & Pritpal Chaggar BSc(Hons), ATT, CTA  
**Status:** Full Production Architecture & Implementation Blueprint  
**Design Standard:** Origin UI + Shadcn UI (Slate FinTech) & Bklit Graphic Telemetry  

---

## 1. Executive Strategy: Conversion Infrastructure Over "AI Slop"

In the modern AI-assisted search and discovery landscape:
> *"AI search is compressing attention. Fewer casual clicks, more decision-ready visitors. When they land, your site must convert or you lose them... Trust requirements are rising. If your site looks outdated, slow, unclear, or generic, you get filtered out instantly... The demand is conversion infrastructure: built for speed of decision, trust, and action."*

### Why Generic AI Websites Fail in Accounting & FinTech
- **Over-Decoration:** Tacky glowing gold borders, neon gradients, and slow decorative animations make financial software look like student mockups or crypto pump-and-dump landing pages.
- **Low Information Density:** Huge, empty padding forces accountants and property directors to scroll endlessly to find basic trial balances or mortgage figures.
- **Missing Software Controls:** Clunky "prototype switcher" bars instead of authentic software top bars with entity selectors, accounting periods, and reconciliation status pills.

### The Mercian Solution: Authentic Xero-Grade Cloud Accounting
Mercian Wealth Tax & Ledger is architected to deliver the density, precision, and visual credibility of **Xero, FreeAgent, and Ramp**:
1. **Instant Proof (Speed of Decision):** Legal company number, property title deeds, live net rental yield (`6.8%`), and verified Section 24 corporate tax shield calculation within 3 seconds of viewing.
2. **Instant Action (Speed of Execution):** Zero-friction receipt dropzone with heuristic OCR, 1-click bank statement reconciliation, and 1-click HMRC CT600 statutory year-end compilation.
3. **End-of-Month Record Keeping:** Printable spending statement for landlords tired of paper books, ready for binder filing or PDF export.

---

## 2. Production Technology Stack & Integrations

| Layer | Technology | Strategic Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14+ (App Router)** | High-velocity server/client rendering, instant route transitions, zero CLS. |
| **Language & Typings** | **TypeScript 5.6+** | Strict compile-time safety across double-entry ledgers, DLA balances, and VAT calculations. |
| **Styling & Design Tokens** | **Tailwind CSS 3.4+** | High-density utility styling, custom tabular numbers, card inner shadows, and `@media print` rules. |
| **UI Component System** | **Origin UI + Shadcn UI** | Accessible Radix primitives with Origin UI micro-interaction controls and compact data tables. |
| **Data Graphics Engine** | **Bklit.com Custom SVG** | Composable Area Charts and Funnel Charts (pure lightweight SVG, zero external chart bloat). |
| **Database & Auth** | **Supabase (PostgreSQL)** | Row-Level Security (RLS), multi-tenant SPV client isolation, real-time sync, and document storage. |
| **Email Infrastructure** | **Resend** | Transactional delivery of automated WhatsApp/Email chaser logs, receipt confirmations, and CT600 packs. |
| **Hosting & Infrastructure**| **Vercel / Dedicated VPS** | Edge-accelerated global distribution on Vercel; VPS containerization for self-hosted instances. |
| **Automations & Pipelines**| **n8n** | Webhook orchestration connecting Open Banking feeds, Companies House scrape queues, and accounting sync. |
| **Coding & Agent Workflow**| **Codex / Antigravity** | High-precision agentic workflow adhering strictly to UI/UX Pro Max guidelines and enterprise specs. |

---

## 3. Design System Intelligence: UI-UX-Pro-Max & Community Guidelines

Adhering to the design rules in `public/ui-ux-pro-max/references/pro-rules.md` and community feedback:

### 1. Card Shadows & Inner Shadows (Rexora Standard)
- **Outer Elevation:** `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35);`
- **Subtle Inner Shadow / Highlight:** `inset 0 1px 0 0 rgba(255, 255, 255, 0.05);` (on dark card surfaces)
- **Scoped Rule:** Applied strictly to `.accountant-card` and `.accountant-card-interactive`; never applied to arbitrary text or containers.

### 2. Rexora-Style Metric Cards
Every telemetry card on the dashboard features:
- **Top-Left Title:** Small, clear, semi-bold metric label (`Total Gross Rent`, `Director DLA Buffer`, `Annual Tax Shield`, `Corp Tax Provision`).
- **Top-Right Icon Pill:** Dedicated vector SVG icon in a subtle colored circle or pill (`Building2`, `Coins`, `ShieldCheck`, `Scale`).
- **Centered / Lower Hero Value:** Large, bold numeric value using tabular monospace font (`tabular-nums font-mono text-2xl sm:text-3xl font-extrabold`).
- **Trend Badge & Action Link:** Subtitle status pill (`+6.8% Yield`, `0% Tax Extraction`) alongside a right-aligned drilldown link (`Properties ↗`, `DLA Ledger ↗`).

### 3. Removal of Eyebrow Text
- Completely removed all unnecessary orange/amber eyebrow text badges at the top of headers and cards to eliminate visual clutter and ensure clean enterprise focus.

### 4. Bklit-Inspired Graphic Telemetry (`https://bklit.com/`)
- **Composable Area Chart (`BklitAreaChart.tsx`):** Smooth dual-curve area chart showing Gross Rental Revenue vs Allowable Costs over the financial year, with gradient fills and an interactive hover tooltip.
- **Composable Funnel Chart (`BklitFunnelChart.tsx`):** Multi-stage conversion pipeline tracker illustrating outreach progress:
  - Stage 1: Target Landlords (100% - 2,450 records)
  - Stage 2: Outreach & Audited (55% - 1,350 records)
  - Stage 3: KYC & Identity Verified (26% - 640 records)
  - Stage 4: SPV Portfolios Active (12% - 295 records)
  - Stage 5: CT600 Filed & Retained (5% - 125 records)

### 5. Color Palette Tokens (Institutional FinTech Slate)
- **Canvas Background:** `#0B0F19` (Deep slate navy)
- **Panel / Surface:** `#111827` (Container surface)
- **Card Surface:** `#162032` (High-contrast card elevation)
- **Borders & Dividers:** `#1F293D` (Crisp 1px structural border)
- **Primary Action (Xero Azure):** `#0077C8` (Hover: `#0284C7`)
- **HMRC Verified (Emerald):** `#10B981` (Reconciled balances, allowable tax deductions)
- **Finance Notice (Amber):** `#F59E0B` (Section 24 restrictions, pending filings)
- **Typography:** `Plus Jakarta Sans` / `Inter` for UI; `JetBrains Mono` for all currency amounts and tabular figures.

---

## 4. End-of-Month Printable Bill Tracker (Notion Replacement)

Addressing the personal bill tracker requirement (*"got tired of my book one. Each end of the month also Ill print just to keep records of my spendings and all"*):
1. **Interactive Monthly Ingest:** Record recurring mortgage interest, repairs, insurance, gas CP12 safety inspections, and letting fees.
2. **DLA Personal Card Credit:** Checkbox to immediately credit expenses paid out of the director's personal pocket to their Director’s Loan Account (DLA).
3. **Monthly Period Selector:** Filter outgoings by specific calendar month (`October 2024`, `November 2024`, etc.).
4. **Dedicated A4 Printable View (`window.print()`):**
   - Formatted for clean white-paper printing with `@media print` CSS.
   - Legal company header: `SUKHPREET KAUR LEGACY WEALTH LTD (Co. #14892011)`.
   - Summary telemetry: Total Mortgage Finance, Total Allowable Expenses, Total Outgoings.
   - Comprehensive line-item ledger with date, vendor, description, HMRC category, and net amount.
   - Statutory certification signature block for the physical binder.

---

## 5. Mobile & Viewport Optimization Standards

In compliance with UI-UX-Pro-Max Priority 2 & 5:
- **Minimum Touch Targets:** Every interactive button and selector enforces `touch-target-44` (min 44×44px interactive bounds).
- **Responsive Navigation:** Desktop displays full horizontal sub-tabs; mobile devices collapse smoothly into an accessible side drawer without horizontal scroll jitter.
- **Adaptive Grid Layouts:** 4-column metric grids on desktop collapse into 2-column grids on tablets and 1-column cards on small mobile screens (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- **Safe Area Insets:** Margins and sticky headers respect mobile notch safe areas (`pb-16` on mobile screens to ensure fixed docks do not obscure data tables).

---

## 6. Implementation Verification Checklist

- [x] Removed all prototype switcher bars (`EnvironmentSwitcherBar`) across the codebase.
- [x] Swapped tacky gold/neon colors for institutional slate navy, Xero azure (`#0077C8`), and verified emerald (`#10B981`).
- [x] Added card outer shadow + inner subtle border highlight (`.accountant-card`).
- [x] Built Rexora-style metric cards with top-right icons in pills, bold monospace figures, and drilldown links.
- [x] Built and integrated `BklitAreaChart.tsx` with smooth gradient fills and hover tooltip.
- [x] Built and integrated `BklitFunnelChart.tsx` for client acquisition and statutory retention.
- [x] Implemented printable monthly statement mode in `LandlordBillTrackerHub.tsx`.
- [x] Configured clean default route landing into client portal for `SUKHPREET KAUR LEGACY WEALTH LTD`.
- [x] Validated zero-error build with `npm run build`.
