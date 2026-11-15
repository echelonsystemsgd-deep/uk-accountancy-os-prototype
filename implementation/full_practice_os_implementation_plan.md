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

## 3. Dedicated Route & Narrative Architecture (1:1 XLANE Benchmark)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 XLANE 1:1 LANDING PAGE NARRATIVE ARCHITECTURE               │
├────────────────────┬────────────────────────────────────────────────────────┤
│ Section Component  │ Functional & Statutory Purpose                         │
├────────────────────┼────────────────────────────────────────────────────────┤
│ LandingHero        │ Value headline, dual CTAs, live Open Banking ingest    │
│ LossesSection      │ 01-04 Costs of manual accounting & Section 24 traps    │
│ JourneySection     │ Pinned 6-step lifecycle (Ingest → Match → S24 → DLA →   │
│                    │ CT600 Pack → HMRC Filed) with 2-column tactile cards   │
│ AllSpvsDashboard   │ Multi-entity high-density portfolio ledger & filters   │
│ RepeatCompliance   │ 3-pillar recurring MTD ITSA quarterly filing engine    │
│ VideoWalkthrough   │ Interactive product tour player with chapter jumps     │
│ OutcomesRoiSection │ 01-04 Tangible ROI: £4,850 avg annual tax saved/SPV    │
│ TaxCalculator      │ Dynamic Section 24 vs SPV Corporation Tax slider       │
│ AboutPractice      │ Verified KPTC partners (Kalpesh Patel FCA & Chaggar CTA)│
│ PropertyFaq        │ Accordion FAQ covering S24, DLA, MTD, and SPVs         │
│ CloseCtaSection    │ Final high-converting conversion card + WhatsApp direct│
│ Footer             │ ICAEW/CIOT statutory disclaimers & dual office addrs   │
└────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 4. API & MCP Integration Architecture

To transition the prototype into live production, the following API and MCP server connections are designated:

1. **HMRC Making Tax Digital (MTD) Developer Hub API:**
   - **Endpoints:** `MTD ITSA (Income Tax Self Assessment)` & `Corporation Tax CT600 Gateway API v2`.
   - **Auth:** OAuth 2.0 Government Gateway tokens with delegated agent permissions.
   - **Capability:** Automated quarterly landlord ledger submissions and statutory CT600 filing receipts.

2. **Open Banking Aggregation (Truelayer / Yapily / Plaid UK):**
   - **Lenders:** Direct feeds from specialist buy-to-let lenders (Paragon Bank PLC, Aldermore, Shawbrook, Barclays BTL).
   - **Capability:** Read-only transaction stream sync for real-time mortgage interest extraction and DLA tracking.

3. **Autonomous OCR & Document Parsing:**
   - **Provider:** Serverless Heuristic OCR (AWS Textract / Mindee / Document AI).
   - **Capability:** Parses contractor invoices, extracts supplier CRN, VAT split, and maps directly to HMRC Chart of Accounts (Codes 7100 vs 7200).

4. **Twilio / WhatsApp Cloud API:**
   - **Capability:** Direct client onboarding dispatch, 14-day quarterly MTD filing reminder pings, and client document upload channel.

5. **Production Database & Storage (Supabase):**
   - **Tables:** `spv_entities`, `properties`, `bank_transactions`, `dla_ledger`, `tax_packs`.
   - **Storage:** Private S3-compatible encrypted vault for tenant tenancy agreements and statutory CT600 vector A4 PDFs.

---

## 5. Automated Video Asset Generation Strategy

To ensure a continuous high-fidelity video asset on the landing page:
1. **Automated Remotion / Playwright Script:**
   - A headless script programmatically records high-DPI (60fps) browser interactions through each step of the journey:
     - *Scene 1 (0:00 - 0:15):* Open Banking mortgage interest line ingested from Paragon Bank.
     - *Scene 2 (0:15 - 0:35):* 1-click classification into HMRC Code 7100 (Section 24 100% relief).
     - *Scene 3 (0:35 - 0:50):* DLA indexing and £1,850 tax-free monthly withdrawal calculation.
     - *Scene 4 (0:50 - 1:15):* CT600 vector A4 tax pack generation with ICAEW partner stamp.
2. **Interactive Video Walkthrough Component:**
   - Active on `app/page.tsx` (`VideoWalkthroughSection.tsx`) with chapter markers, live UI highlights, and play/pause controls.

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
