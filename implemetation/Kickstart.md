# UK Accountancy OS Prototype (`uk-accountancy-os-prototype`)
## Executive Architecture & Implementation Plan: "Kickstart"

### 1. Vision & Commercial Purpose
The **UK Accountancy OS Prototype** is a commercial demonstration platform engineered specifically to sell £495–£7,500+ web and practice software solutions to independent UK accountancy firms (2 to 10 staff: partners, senior accountants, practice managers).

### 2. Brand Identity & Ultra-Luxury Aesthetic System
- **Theme:** Ultra-luxury British private banking and Mayfair wealth advisory aesthetic (Coutts, Rothschild & Co, Hoare & Co).
- **Color System:**
  - Backgrounds: Obsidian Deep (`#070A0F`), Midnight Slate (`#0B0F17`), Elevated Charcoal (`#111827`)
  - Accent / Metallic: Champagne Gold (`#D4AF37`), Warm Brass (`#E5C158`), Pale Gold Silk (`#F3E5AB`), Muted Gold Glow (`rgba(212, 175, 55, 0.15)`)
  - Typography: Pure White (`#FFFFFF`), Crisp Slate (`#F8FAFC`), Muted Platinum (`#94A3B8`)
  - Borders: Thin brass borders (`border-[#D4AF37]/20`, `border-amber-500/20`, subtle backdrops)
- **Typography:**
  - Modern UI & Data: `Inter` / system-ui sans font with tabular figures.
  - Editorial Accents & Headlines: Classic luxury serif styling (`Playfair Display`, `Cormorant Garamond`, Georgia).
- **Trust Accreditations:**
  - ICAEW Chartered Accountants Emblem
  - ACCA Practice Assurance Crest
  - HMRC Making Tax Digital (MTD) Compliant Badge
  - Cyber Essentials Plus & ISO 27001 Certified

---

### 3. Reactive State Architecture (Single Source of Truth)
A reactive, unified in-memory store connecting all three modules seamlessly in real time:
1. **Intake Flow (Module 1 -> Module 2):**
   - When a prospect completes the 3-step intake drawer on the public landing page, they are immediately added into the Admin Pipeline under "New Intake".
   - The Partner KPI for Active Inquiries updates, and a notification toast alerts the user.
2. **Missing Document Radar & Dropzone (Module 2 <-> Module 3):**
   - Admin radar tracks missing receipts/statements across clients (initial count: 14).
   - When a user uploads a receipt or takes a camera snapshot in the Client Dropzone (Module 3), it OCR-categorizes the receipt, marks the receipt resolved, appends to the client's file vault, and **instantly decreases the missing receipt count on the Partner Dashboard in Module 2**.
3. **Invoicing & Stripe Settlement (Module 3 -> Module 2):**
   - Client portal features live advisory invoices (e.g. £1,850 + VAT for Corporation Tax Planning & R&D Filing).
   - Paying via the luxury Stripe-styled modal changes status to "Paid", decreases Unbilled WIP, increases Practice Collected Revenue, and generates an official UK tax invoice.
4. **Interactive Demo Controller:**
   - Floating control pill in bottom right: switch views between **[Prospect View]**, **[Client Portal View]**, **[Partner Admin View]**.
   - Includes 1-click **Reset Demo State** button to refresh data back to pristine baseline for customer demonstrations.

---

### 4. Detailed Module Specifications

#### Module 1: Public Acquisition Front-End (Landing Page)
- **Hero Section:**
  - Headline: *"Modern Tax Architecture & Strategic Accounting for UK Limited Companies"*
  - Subhead: High-conviction proposition for fast-growing companies and directors seeking legitimate tax efficiency and strategic fractional advisory.
  - British chartered trust badges (ICAEW, ACCA, HMRC MTD).
  - Primary CTA: *"Book Strategic Consultation"* (triggers bottom sheet drawer).
- **Interactive Corporation Tax & Fee Estimator:**
  - Dynamic sliders: Annual Turnover (£150k - £5,000,000) & Estimated Profit Margin (10% - 60%).
  - Real-time UK Corporation Tax calculation with accurate small profits rate (19% on first £50k), marginal relief taper, and main rate (25% above £250k).
  - Estimated potential tax savings via Capital Allowances / R&D / Pension optimization.
  - Recommended Monthly Retainer Quote (£350 - £1,850/mo).
- **Frictionless Multi-Step Intake Drawer (Mobile Bottom Sheet / Desktop Modal):**
  - Step 1: Company Name & Incorporation Year.
  - Step 2: Turnover Bracket & Current Software (Xero, QuickBooks, FreeAgent, Spreadsheets).
  - Step 3: Core Bottlenecks (Receipt chasing, Late filings, High fees, Director dividend planning) + Preferred Consultation Slot.
- **Service Offering Grid (5 Core Pillars):**
  - Year-End Compliance (Statutory Accounts & CT600)
  - Corporation Tax Planning & Director Wealth Structuring
  - Quarterly VAT Submissions & Making Tax Digital
  - R&D Tax Relief & Capital Allowances
  - Fractional CFO & Strategic Board Advisory
- **Client Case Studies & Quantitative ROI Stories.**
- **Social Proof, FAQ, and Mercian Wealth Agency Attribution Footer.**

#### Module 2: Practice Management Hub (Admin Command Center)
- **Partner Dashboard Metrics (Live Reactive KPIs):**
  - Active Ltd Clients (e.g. 142)
  - Unbilled Work in Progress / Hours (£8,450)
  - Pending VAT Deadlines (6 due within 7 days)
  - Unresolved Missing Receipts (14 live count)
- **Client Pipeline Kanban & List:**
  - 4 Stages: *New Intake* -> *KYC / AML Pending* -> *Engagement Sent* -> *Active Practice Client*
  - 1-Click stage progression and drag/move capability.
  - Client detail drawer showing company number, annual turnover, assigned manager, and risk status.
- **Missing Document Radar:**
  - Real-time radar identifying clients with outstanding receipts/statements.
  - Interactive *"1-Click Automated Chaser"* with simulated WhatsApp & Email reminder modal with ready-to-send personalized message and instant confirmation toast.

#### Module 3: Dedicated Client Software Portal ("PracticeOS Dropzone")
- **Mobile-First Client Dropzone:**
  - Drag-and-drop receipt/invoice uploader.
  - Simulated Mobile Camera Snap feature (photo upload simulation).
  - Instant AI OCR simulation displaying Extracted Merchant, Date, Net, VAT, Total, and Corporation Tax deduction flag.
  - Live sync back to Admin Radar.
- **Invoicing & Stripe Payment Hub:**
  - Tabular list of issued practice fee invoices with real-time badges (*Paid*, *Awaiting Payment*).
  - Luxury Stripe payment modal with one-click test card filler, Apple Pay option, and UK billing details.
  - Instant receipt generation upon successful payment.
- **Commercial White-Label Monetization Callout:**
  - Commercial banner for the accountancy practice:
    *"Turn Practice Overhead Into Recurring Profit: White-label this self-serve portal for your 150 business clients at £10/month = £1,500/month recurring revenue (£18,000 ARR)."*
  - Interactive white-label ROI calculator.

---

### 5. Mobile & Viewport Standards (Zero Defects)
- Strictly tested at 375px, 390px, and 414px mobile widths with 0 horizontal overflow.
- Minimum 48px touch targets, `active:scale-95` tap feedback.
- Fixed bottom mobile action bar with quick access to quote estimator and portal.
- Complete metadata, OpenGraph, custom gold SVG monogram favicon, and Mercian Wealth agency attribution.
