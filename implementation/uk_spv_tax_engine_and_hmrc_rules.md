# UK SPV TAX ENGINE & HMRC STATUTORY RULES SPECIFICATION
**Operating Entity Focus:** SUKHPREET KAUR LEGACY WEALTH LTD (Private Limited Company SPV)
**Statutory Framework:** HMRC Corporation Tax Act 2010, Finance (No. 2) Act 2015 (Section 24), Companies Act 2006

---

## 1. UK Corporation Tax Calculation Engine

UK Limited Companies pay Corporation Tax on net taxable trading and property rental profits.

### Rate Brackets (FY 2024 - 2026):
1. **Small Profits Rate (19%):** Applies when taxable profits are **≤ £50,000**.
2. **Main Rate (25%):** Applies when taxable profits are **> £250,000**.
3. **Marginal Relief Taper (Effective 19% to 25%):** Applies when taxable profits fall **between £50,000 and £250,000**.

### Marginal Relief Formula:
$$\text{Marginal Relief} = (\text{Upper Limit} - \text{Augmented Profits}) \times \text{Standard Fraction}$$

Where:
- $\text{Upper Limit} = £250,000$ (divided by number of associated companies, $1$ in standard SPV setup).
- $\text{Standard Fraction} = \frac{3}{200} = 0.015$.
- $\text{Gross Tax at 25\%} = \text{Profits} \times 0.25$.
- $\text{Net Corporation Tax Payable} = (\text{Profits} \times 0.25) - [ (£250,000 - \text{Profits}) \times \frac{3}{200} ]$.

### Example Calculation:
For an SPV generating £85,000 net profit:
- Gross Tax at 25%: $£85,000 \times 0.25 = £21,250$
- Marginal Relief: $(£250,000 - £85,000) \times 0.015 = £165,000 \times 0.015 = £2,475$
- Net Corporation Tax: $£21,250 - £2,475 = £18,775$ (Effective rate: 22.09%)

---

## 2. Section 24 Finance Costs: Individual vs SPV Ltd Company

| Tax Dimension | Personal Individual Landlord (Section 24) | SPV Limited Company (`SUKHPREET KAUR LEGACY WEALTH LTD`) |
|---|---|---|
| **Mortgage Interest Deduction** | **NOT ALLOWED** as an operating expense against gross turnover. | **100% ALLOWED** as a business finance expense prior to Corporation Tax. |
| **Tax Mechanism** | Taxed on gross rent minus non-finance costs; receives 20% basic rate tax reducer. | Mortgage interest directly reduces taxable corporate profits. |
| **High Earner / Higher Rate Impact** | Can push landlord into higher (40%) or additional (45%) rate tax bands, triggering effective tax rates of 50%–100%+. | Profits taxed at stable corporate rates (19%–25%). |
| **Cash Flow Protection** | High risk of paying tax on paper profits even when cash flow is negative. | Tax is paid strictly on real net cash profit retained by the company. |

---

## 3. Director's Loan Account (DLA) & Section 455 Protection

### The Capital Inflow Engine:
When the Director injects personal funds into the SPV:
1. **Property Purchase Deposit** (e.g. £110,000)
2. **Stamp Duty Land Tax (SDLT)** (e.g. £18,500)
3. **Conveyancing & Survey Fees** (e.g. £3,500)
4. **Initial Refurbishment Funds** (e.g. £18,000)

**Total Director Loan Credited:** £150,000.

### The Tax-Free Extraction Strategy:
- The SPV earns rental profit.
- Rather than distributing profits as taxable dividends (subject to 8.75% or 33.75% dividend tax), the SPV pays the Director **DLA loan repayments**.
- **Tax Consequence:** **0% Income Tax and 0% National Insurance** on DLA repayments until the entire £150,000 capital credit is fully repaid.

### Section 455 Tax Penalty Avoidance:
- If a Director takes more money out of the company than they put in, the DLA becomes **overdrawn**.
- Under HMRC Section 455, if an overdrawn loan is not repaid within **9 months and 1 day** after the accounting period end, the company must pay a **33.75% Section 455 tax charge** to HMRC.
- **System Safeguard:** Mercian Wealth Tax & Ledger displays a live DLA gauge that triggers immediate alerts if a proposed withdrawal would create an overdrawn balance.

---

## 4. Capital vs Revenue Expenditure Classification

HMRC maintains strict segregation between deductible revenue expenses and capitalized property additions:

### A. Revenue Expenses (Deductible in Current Tax Year):
- Like-for-like repairs (repairing damaged roof tiles, servicing boilers, repainting).
- Gas Safety Certificates (CP12) & Electrical Condition Reports (EICR).
- Buildings and contents insurance.
- Letting agency fees and tenancy referencing.
- Mortgage interest and loan facility finance fees.
- Accountancy, legal retainer, and compliance fees.

### B. Capital Expenses (Indexed into Capital Gains Tax / Asset Base Cost):
- Stamp Duty Land Tax (SDLT) paid on acquisition.
- Legal conveyancing fees incurred during property purchase.
- Structural extensions, loft conversions, or architectural additions.
- Initial works that bring an uninhabitable property into habitable condition.
- **Tax Benefit:** Capital expenses increase the asset base cost, significantly reducing Corporation Tax on chargeable gains upon future sale.

---

## 5. HMRC Travel & Mileage Allowances (Approved Rates)

For directors travelling between properties for inspections, tenant handovers, and contractor management:

- **First 10,000 business miles:** **£0.45 per mile**
- **Miles over 10,000 in a single tax year:** **£0.25 per mile**
- **Company Car Pure Electric:** **£0.09 per mile** (Advisory Fuel Rate)
- **Use of Home as Office:** **£6.00 per week (£312/year)** allowable without receipts under HMRC concession.
- **Workflow:** Claimed mileage is credited automatically to the Director's Loan Account, ready for tax-free extraction.

---

## 6. Optimal Remuneration Matrix (FY 2024/25 - 2025/26)

1. **Director Salary:** £12,570 per annum (£1,047.50/month)
   - Zero Income Tax (covered by £12,570 Personal Allowance).
   - Zero Employee National Insurance (aligned with Primary Threshold).
   - Qualifies for State Pension qualifying year credit.
   - 100% allowable corporate deduction against Corporation Tax.
2. **Dividend Extraction:**
   - First £500: 0% tax (Dividend Allowance).
   - Basic Rate band (up to £50,270): 8.75% tax.
   - Higher Rate band (£50,271 to £125,140): 33.75% tax.
   - Additional Rate band (> £125,140): 39.35% tax.
