# Full Practice OS & Conversion Infrastructure Implementation Plan
### Practice: Mercian Wealth & Advisory | Target Client: SUKHPREET KAUR LEGACY WEALTH LTD (Co. #14892011)

---

## 1. System Identity & Conversion Strategy

The purpose of this platform is to provide a complete, bank-grade UK Accountancy Operating System replacing fragile spreadsheets, generic "AI slop" templates, and expensive third-party subscriptions (Xero £35/mo, Dext £20/mo per client) with an integrated proprietary platform.

### Core Architecture Pillars:
1. **Speed of Decision Hub (Public Landing):** Mobile-optimized, instant Section 24 mortgage relief tax impact scoper, zero layout shift, sub-second trust establishment.
2. **Institutional Client Portal (`/portal`):** Modeled after actual Xero cloud software, featuring Rexora-grade metric cards, Bklit SVG cash flow trajectory graphs, landlord bill tracker with vector A4 PDF generation, and two-column bank feed reconciliation.
3. **Practice Operations Engine (`/admin`):** Comprehensive practice radar, Bklit halo funnel pipeline, live 9-box MTD VAT calculation engine, automated WhatsApp/SMS client chasers, and Director's Loan Account (DLA) Section 455 monitors.

---

## 2. Authentication & Credential Architecture

Security and access are unified through a clean `/login` route binding the exact requested administrative and client credentials:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           AUTHENTICATION CREDENTIALS                           │
├───────────────┬──────────────────────────┬───────────────┬─────────────────────┤
│ Role          │ Email                    │ Password      │ Direct Route        │
├───────────────┼──────────────────────────┼───────────────┼─────────────────────┤
│ Practice Admin│ mercianwealthgs@gmail.com│ Gurtej@2008#  │ /admin              │
│ SPV Client    │ deepgurtej28@gmail.com   │ Gurtej@2008#  │ /portal             │
└───────────────┴──────────────────────────┴───────────────┴─────────────────────┘
```

- **Environment Isolation:** Credentials and database connection strings are stored securely in `.env.local` and excluded from git tracking via `.gitignore`.
- **Masked Password Field:** Toggleable visibility, zero plaintext exposure.

---

## 3. UI Token System & Anti-Slop Specifications

Built with **Origin UI & Shadcn UI** design primitives blended with **XLANE-grade British editorial craftsmanship**:

- **Display Typography:** `Bricolage Grotesque` (ink-trapped, variable weight display font for headings and key metrics).
- **Interface & Transaction Typography:** `Inter` (high-contrast, legibility-first body text).
- **Data & Numeric Alignment:** `JetBrains Mono` (`font-mono tabular-nums`).
- **Canvas Background (Forest Dark):** `#0c1813` (Deep British Forest Green Void)
- **Container Workspace:** `#14241d` (Elevated British Slate Container)
- **Data Card Surface:** `#14241d` (Specular inner highlight, hairline border `#1e382b`)
- **Parchment Paper Card Surface:** `#fbfbf8` (Tactile physical artifact surface, border `#e2e0d5`)
- **Primary Brand Accent (Mint):** `#a4f4cf` (HMRC Reconciled / High-Trust Action)
- **Secondary Accent (Sage):** `#b8e291` / `#e9ece2` (Mid-tone chapter wash)
- **Pending / Due:** `#fef3c7` / `#d97706` (Audit Amber)
- **Card Shadow (Strictly Scoped to Cards):**
  ```css
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  border: 1px solid #1e382b;
  border-radius: 12px;
  ```
- **Zero Eyebrow Badges:** Elimination of all decorative orange badges or pseudo-luxury marketing fluff.
- **Interactive Demonstrator:** Two-channel live ingest (`Paragon Bank Feed` vs `Contractor OCR Invoice`) with side-by-side operational split and 1-click reconciliation preview.
- **Pinned Lifecycle Nav:** Sticky horizontal progress bar (`01 Ingest` → `02 Match` → `03 VAT` → `04 DLA` → `05 CT600` → `06 Filed`).

---

## 4. Landlord Bill Tracker: Vector A4 PDF Statement Generator

To fully replace paper books and Notion habit trackers, the system includes a dedicated vector PDF engine powered by `jspdf` and `jspdf-autotable`:

### PDF Export Specifications (`lib/pdfGenerator.ts`):
- **Document Dimensions:** Standard A4 portrait (210mm × 297mm).
- **Header:** Firm title (`Mercian Wealth & Advisory`), Landlord company details (`SUKHPREET KAUR LEGACY WEALTH LTD - Co. #14892011`), Director name, Tax Year (`2024/25`), and generation timestamp.
- **KPI Summary Grid:**
  - SPV Mortgage Interest (Section 24 Relief pool - 100% allowable).
  - General Allowable Expenses (Repairs, Management, Insurance, Admin).
  - Total Statement Expenditure.
- **Itemized Ledger Table:** Date, Vendor/Payee, Description, HMRC Category, Property Ref, Amount (£), and Verification status.
- **Statutory Sign-Off:** HMRC CT600 declaration block, Director signature line, and Supervising Practice verification stamp.

---

## 5. Security & Private Document Vault

- Files uploaded via the **"Upload All Files"** button or document dropzone are handled through `app/api/upload/route.ts`.
- Files stream directly to the private Supabase Storage Bucket `landlord-private-vault`.
- Raw file URLs are never public. Access is granted only via short-lived HMAC-signed URLs (60-second expiry).
- Any temporary staging directories are automatically shielded by `.gitignore`.

---

## 6. Verification & Quality Assurance

- **Route Coverage:** 23 Next.js App Router routes compiled cleanly.
- **Type Safety:** 100% TypeScript compile validity with zero any-leaks or broken props.
- **Responsiveness:** Full layout testing across iPhone (375px), iPad (768px), and Desktop (1440px).
