# KP Tax Consultants & Advisory | UK Property Accountancy OS

High-density, conversion-engineered accountancy operating system for UK chartered accountancy practices, SPV limited property companies, and landlord portfolios. 

- **Visual Architecture:** Inspired by **XLANE (`xlane.xyz`)** — British Forest Green (`#0c1813`), unbleached tactile parchment cards (`#fbfbf8`), Mint (`#a4f4cf`) accents, and **Bricolage Grotesque** typography.
- **Content Foundation:** Derived from **KP Tax Consultants (`kptc.co.uk`)** — Led by **Kalpesh Patel FCA** and **Pritpal Chaggar CTA**.

---

## 1. System Overview

### Core Modules
- **Interactive Multi-Channel Demonstrator:** Toggle between `Paragon Bank Feed` and `Contractor OCR Invoice` with live nominal code auto-classification and Section 24 corporate tax relief indexing.
- **Pinned 6-Step Lifecycle Header:** `01 Ingested` $\rightarrow$ `02 Matched` $\rightarrow$ `03 S24 Checked` $\rightarrow$ `04 DLA Reconciled` $\rightarrow$ `05 CT600 Ready` $\rightarrow$ `06 HMRC Filed`.
- **Landlord Bill Tracker & A4 PDF Engine:** Client-side vector A4 statement export (`jspdf` + `jspdf-autotable`) replacing physical paper logs and Notion trackers with statutory audit trails.
- **Dedicated Sub-Pages:** Dedicated routes for `/services`, `/calculator`, `/mtd`, `/about`, and `/faq`.
- **Authentication Gateway (`/login`):** Role-based access for SPV clients and practice administrators.

---

## 2. Authentication & Test Accounts

| Role | Email | Password | Direct Route |
| :--- | :--- | :--- | :--- |
| **Practice Admin** | `mercianwealthgs@gmail.com` | `Gurtej@2008#` | `/admin` |
| **SPV Client** | `deepgurtej28@gmail.com` | `Gurtej@2008#` | `/portal` |

---

## 3. Technology Stack

- **Framework:** Next.js 14.2 (App Router), TypeScript, Tailwind CSS.
- **Typography:** `Bricolage Grotesque` (display), `Inter` (body), `JetBrains Mono` (tabular numbers).
- **PDF Engine:** `jspdf` & `jspdf-autotable`.
- **Database & Storage:** Supabase PostgreSQL with private document vaults.

---

## 4. Run Locally

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build and verify type validity
npm run build

# Start production server
npm start
```
