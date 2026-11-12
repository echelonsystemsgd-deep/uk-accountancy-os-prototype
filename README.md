# Mercian Wealth & Advisory | UK Accountancy OS & Property SPV Platform

Universal commercial operating system for UK chartered accountancy practices, SPV limited property companies, and landlord portfolios. Engineered with institutional high-density FinTech UI, Xero-grade reconciliation, vector A4 PDF monthly statement exports, and automated HMRC Making Tax Digital (MTD) engines.

---

## 1. System Overview

### The Mission
Replaces generic "AI website slop" and disjointed spreadsheets with a unified, high-conversion accountancy operating system built for speed of decision, client trust, and frictionless practice workflows.

- **Practice Administrator Cockpit (`/admin`):** Client reconciliation pipeline, Bklit SVG funnel visualization, live 9-box VAT calculations, automated document and receipt chasers, and Director's Loan Account (DLA) Section 455 monitors.
- **SPV Client Portal (`/portal`):** Rexora high-density financial metrics, Bklit SVG cash flow trajectory area chart, landlord bill tracker with instant **vector A4 PDF export**, two-column bank reconciliation, and private document vault.
- **Conversion Infrastructure (`/`):** Mobile-first conversion layout with 3-Tap Section 24 Mortgage Relief scoper and instant WhatsApp intake.

---

## 2. Authentication & User Credentials

The platform features unified, role-based security gateways configured directly in the environment:

| User Type | Email | Password | Landing Route | Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Practice Admin** | `mercianwealthgs@gmail.com` | `Gurtej@2008#` | `/admin` | Practice Radar, Client Roster, VAT Engine, Bank Feeds |
| **SPV Client** | `deepgurtej28@gmail.com` | `Gurtej@2008#` | `/portal` | Spending Ledger, A4 PDF Statements, S24 Portfolio, Receipts |

---

## 3. Technology Stack

- **Frontend & App Router:** Next.js 14.2 (App Router), TypeScript, Tailwind CSS.
- **Design System:** Origin UI & Shadcn UI tokens (Slate `#0B0F19`, Container `#111827`, Card `#162032`, Border `#1F293D`, Xero Azure `#0077C8`, Emerald `#10B981`).
- **Data Graphics:** Custom Bklit composable SVG charts (`BklitAreaChart.tsx`, `BklitFunnelChart.tsx`).
- **PDF Generation Engine:** `jspdf` + `jspdf-autotable` client-side vector A4 generation.
- **Database & Storage:** Supabase PostgreSQL with encrypted private document vaults (`landlord-private-vault`).
- **Email & Automation:** Resend API & n8n webhook webhooks.

---

## 4. Landlord Bill Tracker & Monthly PDF Statement Export

Designed specifically for landlords replacing physical notebooks and Notion logs with an institutional accounting audit trail:
- **HMRC Allowable Expense Ledger:** Repairs, Paragon mortgage interest (Section 24), insurance, letting fees, service charges.
- **Director's Loan Account (DLA) Integration:** Automatic credit to the Director's Loan balance when expenses are paid from personal cards.
- **1-Click Vector A4 PDF Export:** Generates an official, high-resolution statement with:
  - SPV company number and registered address.
  - Mortgage interest (S24) 100% corporate relief pool.
  - Reconciled transaction table with HMRC categories.
  - Official Director Signature and Supervising Practice declaration blocks.

---

## 5. Environment & Security Configuration

All sensitive keys, database credentials, and personal data are strictly isolated in local environment files (`.env.local` and `.env`) and shielded by `.gitignore`.

To configure locally:
```bash
cp .env.example .env.local
```

### Essential Environment Variables:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_FIRM_NAME="Mercian Wealth & Advisory"

# Supabase Database & Private Vault
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:...@db.your-project.supabase.co:5432/postgres
SUPABASE_STORAGE_BUCKET_DOCS=landlord-private-vault

# Security Credentials
ADMIN_EMAIL=mercianwealthgs@gmail.com
ADMIN_PASSWORD=Gurtej@2008#
CLIENT_EMAIL=deepgurtej28@gmail.com
CLIENT_PASSWORD=Gurtej@2008#
```

---

## 6. Development & Production Build

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
