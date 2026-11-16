/**
 * STATUTORY UK PROPERTY TAX & SECTION 24 COMPUTATION ENGINE
 * Practice Reference: KP Tax Consultants (ICAEW & CIOT Regulated)
 * Legislation: Finance Act 2015 s.24, Corporation Tax Act 2009 Part 5, CTA 2010 s.455
 */

export interface Section24Result {
  grossRent: number;
  mortgageInterest: number;
  allowableRepairs: number;
  
  // Personal Ownership Trap (Section 24 Restriction)
  personal: {
    taxableIncome: number;
    higherRateTax: number;
    basicRateCredit20: number;
    netPersonalTaxDue: number;
    effectiveTaxRateOnProfit: number;
  };

  // SPV Limited Company (Full Corporate Relief)
  spv: {
    deductibleFinanceCosts: number;
    chargeableProfit: number;
    corporationTaxDue: number;
    effectiveCorpTaxRate: number;
  };

  annualTaxSavings: number;
  savingsPercentage: number;
}

export function computeSection24Comparison(
  grossRent: number,
  mortgageInterest: number,
  allowableRepairs: number = 0,
  higherRatePercent: number = 40
): Section24Result {
  // 1. Personal ownership computation (S.24 restricts interest deduction to 20% basic tax credit)
  const personalTaxableTurnover = Math.max(0, grossRent - allowableRepairs);
  const grossTaxAtMarginal = personalTaxableTurnover * (higherRatePercent / 100);
  const basicRateCredit = mortgageInterest * 0.20;
  const netPersonalTaxDue = Math.max(0, grossTaxAtMarginal - basicRateCredit);
  
  const realNetCashProfit = Math.max(0, grossRent - allowableRepairs - mortgageInterest);
  const effectiveTaxRateOnProfit = realNetCashProfit > 0 ? (netPersonalTaxDue / realNetCashProfit) * 100 : 0;

  // 2. SPV Limited Company computation (100% mortgage interest deductible as loan relationships)
  const deductibleFinanceCosts = mortgageInterest;
  const spvChargeableProfit = Math.max(0, grossRent - allowableRepairs - deductibleFinanceCosts);
  
  // UK Corporation Tax rates: 19% small profits rate up to £50,000, 25% main rate above £250,000
  let corpTaxRate = 0.19;
  if (spvChargeableProfit > 50000 && spvChargeableProfit <= 250000) {
    corpTaxRate = 0.25; // with marginal relief
  } else if (spvChargeableProfit > 250000) {
    corpTaxRate = 0.25;
  }
  
  const corporationTaxDue = Math.round(spvChargeableProfit * corpTaxRate);
  const annualTaxSavings = Math.max(0, Math.round(netPersonalTaxDue - corporationTaxDue));
  const savingsPercentage = netPersonalTaxDue > 0 ? Math.round((annualTaxSavings / netPersonalTaxDue) * 100) : 0;

  return {
    grossRent,
    mortgageInterest,
    allowableRepairs,
    personal: {
      taxableIncome: personalTaxableTurnover,
      higherRateTax: Math.round(grossTaxAtMarginal),
      basicRateCredit20: Math.round(basicRateCredit),
      netPersonalTaxDue: Math.round(netPersonalTaxDue),
      effectiveTaxRateOnProfit: Math.round(effectiveTaxRateOnProfit),
    },
    spv: {
      deductibleFinanceCosts,
      chargeableProfit: spvChargeableProfit,
      corporationTaxDue,
      effectiveCorpTaxRate: Math.round(corpTaxRate * 100),
    },
    annualTaxSavings,
    savingsPercentage,
  };
}

export interface DlaSummary {
  totalEquityIntroduced: number;
  totalWithdrawnToDate: number;
  remainingTaxFreePool: number;
  isOverdrawn: boolean;
  section455Exposure: number; // 33.75% tax surcharge if overdrawn past 9 months after year-end
  statusDescription: string;
}

export function computeDlaStatus(
  initialDeposit: number,
  sdlt: number,
  legalFees: number,
  totalRepaidToDirector: number
): DlaSummary {
  const totalEquityIntroduced = initialDeposit + sdlt + legalFees;
  const remainingTaxFreePool = totalEquityIntroduced - totalRepaidToDirector;
  const isOverdrawn = remainingTaxFreePool < 0;
  const section455Exposure = isOverdrawn ? Math.abs(remainingTaxFreePool) * 0.3375 : 0;

  let statusDescription = "Healthy Credit Balance — Withdrawals are 100% Tax-Free";
  if (isOverdrawn) {
    statusDescription = "CRITICAL: Director's Loan is Overdrawn. Subject to 33.75% Section 455 tax surcharge if not rectified within 9 months.";
  } else if (remainingTaxFreePool < 5000) {
    statusDescription = "Caution: Approaching zero balance. Subsequent profit extraction will trigger dividend tax.";
  }

  return {
    totalEquityIntroduced,
    totalWithdrawnToDate: totalRepaidToDirector,
    remainingTaxFreePool: Math.max(0, remainingTaxFreePool),
    isOverdrawn,
    section455Exposure: Math.round(section455Exposure),
    statusDescription,
  };
}
