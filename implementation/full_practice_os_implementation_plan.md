# Full Practice OS & Conversion Infrastructure Implementation Plan
### Practice: KP Tax Consultants & Advisory | In Association with Mercian Wealth
### Senior Partners: Kalpesh Patel BSc (Hons), FCA & Pritpal Chaggar BSc (Hons), ATT, CTA
### Reference Visual Benchmark: XLANE (`https://www.xlane.xyz/#main`)
### Reference Content Benchmark: KP Tax Consultants (`https://www.kptc.co.uk/`)

---

## 1. System Identity & Strategic Positioning

This platform replaces generic, low-converting website templates with a high-density, authoritative UK Accountancy Operating System.

### Two-Pillar Synergy:
1. **Visual & Interaction Architecture (`xlane.xyz` standard):**
   - **Unified British Forest Green Palette (`#0c1813`)**: Used across the entire public platform.
   - **Unbleached Alabaster Parchment (`#fbfbf8`)**: Authentic paper material for live financial documents, invoices, and bank statements.
   - **Bricolage Grotesque & Space Grotesk**: Expressive architectural display typography with tight letter spacing.
   - **Interactive 6-Step Ingestion Demonstrator**: Showing real accounting logic rather than generic marketing text.
   - **Sticky Lifecycle Progress Bar**: `01 Ingested` $\rightarrow$ `02 Matched` $\rightarrow$ `03 S24 Checked` $\rightarrow$ `04 DLA Reconciled` $\rightarrow$ `05 CT600 Ready` $\rightarrow$ `06 HMRC Filed`.

2. **Practice Credibility & Authority (`kptc.co.uk` factual foundation):**
   - **Senior Leadership:** Kalpesh Patel FCA (Fellow Chartered Accountant, ICAEW) & Pritpal Chaggar CTA (Chartered Tax Adviser, CIOT).
   - **Specialisms:** UK Property SPV Tax, Section 24 Mortgage Relief Mitigation, Capital Gains Tax, SDLT Structuring, and HMRC Making Tax Digital (MTD ITSA).

---

## 2. Design System Tokens (The Forest Green & Parchment Specification)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COLOR TOKEN SPECIFICATION                             │
├──────────────────┬─────────────────┬────────────────────────────────────────┤
│ Token Role       │ Hex Code        │ Strategic Role & Material              │
├──────────────────┼─────────────────┼────────────────────────────────────────┤
│ Canvas Dark      │ #0c1813         │ Global British Forest Green Canvas     │
│ Elevated Dark    │ #14241d         │ All container panels & feature cards   │
│ Structural Border│ #1e382b         │ 1px crisp hairline dividing lines      │
│ Primary Mint     │ #a4f4cf         │ Action buttons, active badges & pills  │
│ Hover Mint       │ #8ae8bd         │ Interactive button hover state         │
│ Secondary Sage   │ #b8e291         │ Secondary highlights & status tags     │
│ Tactile Paper    │ #fbfbf8         │ Physical document & invoice cards      │
│ Paper Border     │ #e2e0d5         │ 1px subtle tactile card border         │
│ Display Text     │ #ffffff         │ Bricolage Grotesque headings           │
│ Muted Body Text  │ #8a9d94         │ Secondary body text & metadata         │
└──────────────────┴─────────────────┴────────────────────────────────────────┘
```

---

## 3. Dedicated Route Architecture

Every header item possesses a dedicated, fully responsive Next.js App Router route:

- **`/`**: Public Hero, Pinned 6-Step Workflow Demonstrator, Section 24 Calculator, Services Grid, MTD Guidance, Leadership Bios, and FAQ.
- **`/services`**: Exhaustive SPV solutions catalog with direct partner consultation triggers.
- **`/calculator`**: Standalone Section 24 mortgage relief simulator with instant portfolio scoping.
- **`/mtd`**: HMRC Making Tax Digital April 2026/2027 statutory readiness guide.
- **`/about`**: Comprehensive partner profiles for Kalpesh Patel FCA and Pritpal Chaggar CTA.
- **`/faq`**: Comprehensive property tax knowledgebase.
- **`/login`**: Encrypted access gateway for client portal and practice admin.

---

## 4. Landlord Bill Tracker: Vector A4 PDF Statement Generator

To replace paper books and Notion habit trackers, the system includes a dedicated vector PDF engine powered by `jspdf` and `jspdf-autotable`:

- **Document Dimensions:** Standard A4 portrait (210mm × 297mm).
- **Header:** Firm title (`KP Tax Consultants & Advisory`), Landlord company details (`SUKHPREET KAUR LEGACY WEALTH LTD - Co. #14892011`), Director name, Tax Year (`2024/25`), and generation timestamp.
- **Summary KPI Grid:** SPV Mortgage Interest (100% allowable pool), Allowable Expenses, and Total Expenditure.
- **Itemized Ledger Table:** Date, Vendor/Payee, Description, HMRC Category, Property Ref, and Gross Amount.
- **Statutory Sign-Off:** HMRC CT600 declaration block, Director signature line, and Supervising Practice verification stamp.

---

## 5. Security & Verification
- All routes verified with Next.js production builds (`npm run build`).
- Zero type or webpack errors across all 28 production routes.
