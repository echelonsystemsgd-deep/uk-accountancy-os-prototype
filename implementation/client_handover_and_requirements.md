# CLIENT HANDOVER & INFORMATION REQUIREMENTS SPECIFICATION
**Operating Entity:** SUKHPREET KAUR LEGACY WEALTH LTD
**Target Recipient:** Appointed Chartered Accountant / HMRC / Companies House
**System:** Mercian Wealth Tax & Ledger Suite

---

## 1. What Has Been Engineered

Your complete in-house accounting platform and property wealth operating system has been constructed with:
1. **100% SPV Corporation Tax Engine:** Automated differentiation between personal Section 24 mortgage restrictions and SPV 100% allowable corporate finance deductions.
2. **Director's Loan Account (DLA) Architecture:** Direct credit tracking of your property deposit, stamp duty (SDLT), and legal costs, allowing tax-free profit withdrawals before dividend tax triggers.
3. **Zero-Cost OCR Bill & Receipt Scanner:** Heuristic scanning for vendor, invoice date, net amount, 20% VAT, gross total, and auto-mapping to HMRC CT600 boxes.
4. **Universal UK Bank Statement Importer & Auto-Reconciler:** One-click CSV, OFX, and QIF ingestion matching tenant rent and mortgage direct debits.
5. **1-Click HMRC & Accountant Pack Generator:** Instant creation of a print-ready PDF Executive Financial Summary and 3 CSV schedules ready for your accountant's tax software (`Taxcalc`, `Xero`, `Iris`).
6. **Mobile Ergonomic Architecture:** 44px+ touch targets, zero horizontal scroll, mobile bottom navigation dock, and rapid keyboard shortcuts.

---

## 2. Checklist of Items Needed From You (The User)

To configure the live production environment and synchronize with your physical accounts, please provide the following details when convenient:

### A. Corporate & Statutory Entity Information
- [ ] **Companies House Registered Office Address:** (e.g. Registered office address in England & Wales)
- [ ] **Company Registration Number (CRN):** (Defaulted to `15984210` in prototype; confirm exact 8-digit number if different)
- [ ] **Company Year-End Accounting Reference Date (ARD):** (e.g., 31st March or 30th April)
- [ ] **HMRC 10-Digit Company Unique Taxpayer Reference (UTR):** (Issued on Form CT41G by HMRC upon incorporation)
- [ ] **VAT Registration Status:** (Confirm whether the company is VAT registered or exempt)

### B. Current Property Acquisition Documents
- [ ] **Solicitor's Completion Statement:** The official financial statement from your conveyancing solicitor showing:
  - Exact Purchase Price
  - Stamp Duty Land Tax (SDLT) paid
  - Land Registry & Search Fees
  - Solicitor Legal & Professional Fees
  - Apportioned Ground Rent / Service Charge credits
- [ ] **Mortgage Offer & Monthly Repayment Schedule:**
  - Lender Name (e.g., Paragon, BM Solutions, Aldermore, Shawbrook)
  - Loan Facility Amount & Interest Rate (%)
  - Monthly Direct Debit Amount (split into Interest vs Capital repayment)
- [ ] **Tenancy Agreement (AST) or Projected Rent:**
  - Tenant Name & Monthly Rent Amount (£)
  - Deposit Protection Scheme (DPS / TDS / MyDeposits) Certificate Number
  - Tenancy Start & End Dates

### C. Bank Accounts & Accounting Software
- [ ] **Company Business Bank Statement:** (Starling, Tide, Monzo, Barclays, NatWest, etc.) in CSV or OFX format.
- [ ] **Initial Director Funds Source Confirmation:** Total personal cash transferred into the company account for the property deposit and solicitor disbursement (for exact DLA balance initialization).
- [ ] **Appointed Chartered Accountant Contact:**
  - Firm Name, Appointed Partner Name, and Email (to grant read-only partner access or direct automated tax pack dispatch).

---

## 3. How to Present This to Your Accountant

When your accountant gets in touch, avoid saying:
> *"I built a prototype website for you to look at."*

Instead, send them this exact message:
> *"Hi [Accountant Name],*
>
> *I have compiled our internal property SPV accounting schedule for SUKHPREET KAUR LEGACY WEALTH LTD.*
>
> *Our full acquisition ledger is ready for your review: purchase completion breakdown (indexed into capital base cost), mortgage interest Section 24 corporate deduction schedule, receipt vault with VAT audit hashes, and Director's Loan Account reconciliations.*
>
> *I have generated an HMRC CT600-ready Year-End Pack with executive P&L, Balance Sheet, and pre-categorized CSV schedules. You can log into our client console or I can email you the export package directly.*
>
> *Let me know when you'd like to sign off."*
