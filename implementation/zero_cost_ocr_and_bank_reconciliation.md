# ZERO-COST OCR & UNIVERSAL UK BANK RECONCILIATION ENGINE
**System Component:** Client Portal & Accountant Console Ingestion Pipelines
**Design Goal:** 100% Free Tier Operation (No Paid Plaid, TrueLayer, or OCR SaaS Subscriptions)

---

## 1. Zero-Cost Bill & Receipt OCR Engine

### High-Cost Problem:
Commercial receipt APIs (Veryfi, Mindee, Sensible) charge £0.10 to £0.50 per scan plus monthly minimums. 

### Zero-Cost Solution:
A client-side + Edge-assisted extraction pipeline combining:
1. **HTML5 Canvas / Web Worker Preprocessing:** Binarization, grayscale normalization, contrast maximization.
2. **Text & Regex Pattern Extraction:** High-speed heuristics scanning for UK financial identifiers:
   - **Dates:** `DD/MM/YYYY`, `DD-MM-YYYY`, `DD Month YYYY`
   - **Amounts:** Currency indicators `£` or `GBP`, matching net, 20% VAT, and gross totals.
   - **UK VAT Numbers:** Regex `GB\s?([0-9]{9}|[0-9]{12})`
   - **Merchant Identification:** Fuzzy matching against common UK property suppliers (e.g., British Gas, Screwfix, Toolstation, B&Q, Howdens, Travis Perkins, OpenRent, local councils).
   - **HMRC Category Classification:** Auto-mapping based on vendor keywords (e.g., "Plumbing" -> `property_repairs`, "Solicitors" -> `legal_professional`, "Insurance" -> `insurance`).

### Audit Hash & Retention:
Each uploaded document receives a SHA-256 cryptographic digest. When exported to the Accountant Pack, files are archived with their exact verification checksum.

---

## 2. Universal UK Bank Statement Parser & Reconciliation

Commercial Open Banking aggregators charge upwards of £50–£100/month in production and require FCA registered account information service provider (AISP) licensing.

### Zero-Cost Multi-Format Importer:
Supports direct drag-and-drop of the three standard UK bank export formats:
1. **CSV (Comma Separated Values):** Standard columns for Date, Description, Amount / Inflow / Outflow, Balance.
2. **OFX (Open Financial Exchange):** XML/SGML standard used by major clearing banks.
3. **QIF (Quicken Interchange Format):** Legacy format supported by all UK corporate banks.

### Supported UK Banks:
- **Barclays Business**
- **NatWest & Royal Bank of Scotland**
- **Lloyds Bank & Bank of Scotland**
- **HSBC UK Business**
- **Starling Bank Business**
- **Monzo Business**
- **Tide Business Banking**

### Auto-Reconciliation Engine Rules:
1. **Tenant Rent Matching:** Scans incoming credits matching property monthly rent amounts (`± £10` or exact match against active lease amounts) and flags as `rental_income` matched to the specific property.
2. **Mortgage Direct Debit Matching:** Detects monthly recurring debits to mortgage providers (e.g., Nationwide, Paragon, BM Solutions, Aldermore, Investec) and automatically categorizes as `mortgage_interest` and capital reduction.
3. **Council Tax & Utilities Matching:** Matches local council standing orders and water rates to known property addresses.
4. **Director Cash Injections / Repayments:** Detects transfers from or to the Director's personal account and automatically routes them to the Director's Loan Account (DLA) ledger.
