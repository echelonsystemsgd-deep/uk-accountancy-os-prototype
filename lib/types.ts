export type AppMode = 'landing' | 'accountant' | 'client';

export type ScreenView =
  | 'landing'
  | 'radar'
  | 'pipeline'
  | 'workspace'
  | 'chaser'
  | 'statements'
  | 'invoicing'
  | 'wealth_advisory'
  | 'open_banking'
  | 'admin_ledger'
  | 'admin_audit_trail'
  | 'client_overview'
  | 'client_properties'
  | 'client_bills'
  | 'client_ocr_scanner'
  | 'client_dla'
  | 'client_mileage'
  | 'client_tax_optimizer'
  | 'client_tax_pack'
  | 'dropzone'
  | 'vault'
  | 'client_messages';

export interface BankTransaction {
  id: string;
  date: string;
  bankName: string;
  accountNumber: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: 'rental_income' | 'mortgage_interest' | 'repairs' | 'insurance' | 'service_charge' | 'other';
  propertyAddress: string;
  status: 'matched' | 'unreconciled' | 'flagged';
  hmrcCategory: string;
}

export interface UserProfile {
  email: string;
  name: string;
  role: 'admin' | 'accountant' | 'client';
  firmName: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
  lastLogin?: string;
}

export type EntityType = 'individual' | 'joint' | 'spv_ltd';

export type OnboardingStage = 'intake_submitted' | 'kyc_pending' | 'chasing_docs' | 'review_ready' | 'computation_complete';

export type DocumentStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';

export type DocumentCategory = 'id_aml' | 'tax_record' | 'mortgage' | 'tenancy' | 'expense';

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  ownerOrProperty: string; // e.g. "Marcus Sterling" or "14 High Street, Cheltenham"
  status: DocumentStatus;
  isOverdue: boolean;
  dueDate: string;
  notes?: string;
  fileStoragePath?: string;
  uploadedAt?: string;
  fileSize?: string;
}

export interface PropertyItem {
  id: string;
  address: string;
  postcode: string;
  propertyType: 'Residential BTL' | 'HMO' | 'Commercial' | 'Multi-unit';
  ownershipSplit: string; // e.g. "50/50 Joint" or "100% SPV Ltd"
  annualRentalIncome: number;
  mortgageLender?: string;
  outstandingMortgage?: number;
  purchaseDate?: string;
  purchasePrice?: number;
  currentValuation?: number;
  stampDutyPaid?: number;
  legalFees?: number;
  depositPaid?: number;
  monthlyMortgagePayment?: number;
  monthlyMortgageInterest?: number;
  tenantName?: string;
  monthlyRent?: number;
  tenancyStart?: string;
  tenancyEnd?: string;
  isSpvHeld?: boolean;
  netYield?: number;
}

export interface DlaEntry {
  id: string;
  date: string;
  description: string;
  credit: number; // Director injected (deposit, SDLT, legal, personal card, mileage)
  debit: number;  // Director took out (tax-free loan repayment)
  referencePropertyId?: string;
  category: 'deposit_equity' | 'sdlt_legal' | 'personal_card_expense' | 'mileage_reimbursement' | 'cash_withdrawal';
  receiptUrl?: string;
}

export interface MileageLog {
  id: string;
  date: string;
  origin: string;
  destination: string;
  purpose: string;
  miles: number;
  ratePerMile: number; // 0.45 or 0.25
  totalClaim: number;
  propertyAddress: string;
  isCreditedToDla: boolean;
}

export interface TaxPackage {
  id: string;
  taxYear: string;
  periodStart: string;
  periodEnd: string;
  totalRentalTurnover: number;
  totalAllowableExpenses: number;
  totalMortgageInterest: number;
  operatingProfit: number;
  estimatedCorporationTax: number;
  netRetainedProfit: number;
  dlaClosingBalance: number;
  status: 'ready_for_accountant' | 'filed_hmrc' | 'under_review';
  createdAt: string;
}

export interface ClientParty {
  id: string;
  fullName: string;
  role: 'Primary Landlord' | 'Joint Owner (Spouse)' | 'Company Director' | 'Managing Director & Principal' | string;
  email: string;
  phone: string;
  utrNumber: string; // 10-digit HMRC UTR
  nationalInsurance: string;
  idVerified: boolean;
  addressVerified: boolean;
}

export interface LandlordClient {
  id: string;
  entityName: string;
  entityType: EntityType;
  companyNumber?: string; // If SPV Ltd Co
  primaryContact: string;
  email: string;
  phone: string;
  taxYear: string; // "2024/25"
  stage: OnboardingStage;
  assignedAccountant: 'Gurtej Singh | Mercian Wealth & Advisory' | 'Kalpesh Patel FCA' | 'Pritpal Chaggar CTA' | string;
  properties: PropertyItem[];
  parties: ClientParty[];
  documents: DocumentItem[];
  bills?: PropertyBillItem[];
  unbilledWip: number;
  lastChasedAt?: string;
  chaseCount: number;
  totalRentalIncome: number;
  dlaBalance?: number;
  dlaEntries?: DlaEntry[];
  mileageLogs?: MileageLog[];
  taxPackages?: TaxPackage[];
}

export type BillCategory =
  | 'mortgage_interest'
  | 'maintenance_repairs'
  | 'letting_fees'
  | 'service_charge'
  | 'ground_rent'
  | 'insurance'
  | 'utilities_council_tax'
  | 'statutory_compliance';

export interface PropertyBillItem {
  id: string;
  title: string;
  category: BillCategory;
  vendorOrRecipient: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual' | 'one_off';
  isAllowableExpense: boolean;
  isSection24Restricted: boolean;
  propertyAddress: string;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'due' | 'scheduled';
  receiptAttached: boolean;
  receiptName?: string;
  taxYear: string;
  hmrcBoxNote?: string;
}

export interface NewBillInput {
  title: string;
  category: BillCategory;
  vendorOrRecipient: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual' | 'one_off';
  isSection24Restricted: boolean;
  propertyAddress: string;
  dueDate: string;
  status: 'paid' | 'due' | 'scheduled';
  notes?: string;
}

export interface CommunicationLogItem {
  id: string;
  clientId: string;
  entityName: string;
  channel: 'whatsapp' | 'sms' | 'email';
  recipient: string;
  messageBody: string;
  sentAt: string;
  status: 'delivered' | 'read' | 'queued';
  triggeredBy: string;
}

export interface PracticeMetrics {
  activeLandlordsCount: number;
  trackedPropertiesCount: number;
  missingDocumentsCount: number;
  approachingDeadlinesCount: number;
  unbilledWipTotal: number;
  averageCycleDays: number;
}

export interface IntakeSubmission {
  fullName: string;
  email: string;
  phone: string;
  portfolioSize: string;
  entityType: EntityType;
  annualRent: number;
  mortgageInterest: number;
  notes: string;
}

export interface PracticeInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  entityName: string;
  serviceDescription: string;
  netAmount: number;
  vatAmount: number;
  totalAmount: number;
  status: 'awaiting_payment' | 'paid';
  issuedDate: string;
  dueDate: string;
  paidAt?: string;
}

export interface ProfitAndLossStatement {
  turnover: number;
  costOfSales: number;
  grossProfit: number;
  lettingFees: number;
  insuranceAndCompliance: number;
  repairsAndMaintenance: number;
  mortgageInterest: number;
  operatingProfit: number;
  corporationTaxEstimated: number;
  netRetainedProfit: number;
}

export interface BalanceSheetStatement {
  tangibleFixedAssets: number;
  cashAtBank: number;
  debtorsAndPrepayments: number;
  totalCurrentAssets: number;
  creditorsDueWithinOneYear: number;
  mortgageLoansLongTerm: number;
  netAssets: number;
  calledUpShareCapital: number;
  profitAndLossReserves: number;
}

export interface NewClientInput {
  entityName: string;
  entityType: EntityType;
  companyNumber?: string;
  primaryContact: string;
  email: string;
  phone: string;
  annualRent: number;
  assignedAccountant: 'Kalpesh Patel FCA' | 'Pritpal Chaggar CTA';
}

export interface NewPropertyInput {
  address: string;
  postcode: string;
  propertyType: 'Residential BTL' | 'HMO' | 'Commercial' | 'Multi-unit';
  ownershipSplit: string;
  annualRentalIncome: number;
  mortgageLender?: string;
  outstandingMortgage?: number;
}

export interface NewInvoiceInput {
  clientId: string;
  serviceDescription: string;
  netAmount: number;
  dueDate: string;
}
