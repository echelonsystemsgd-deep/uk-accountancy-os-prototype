export type AppMode = 'landing' | 'accountant' | 'client';

export type ScreenView =
  | 'landing'
  | 'radar'
  | 'pipeline'
  | 'workspace'
  | 'chaser'
  | 'client_overview'
  | 'dropzone'
  | 'vault'
  | 'client_messages';

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
}

export interface ClientParty {
  id: string;
  fullName: string;
  role: 'Primary Landlord' | 'Joint Owner (Spouse)' | 'Company Director';
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
  assignedAccountant: 'Kalpesh Patel FCA' | 'Pritpal Chaggar CTA';
  properties: PropertyItem[];
  parties: ClientParty[];
  documents: DocumentItem[];
  unbilledWip: number;
  lastChasedAt?: string;
  chaseCount: number;
  totalRentalIncome: number;
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
