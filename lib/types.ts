export type ViewMode = 'prospect' | 'portal' | 'admin';

export type PipelineStage = 'new_intake' | 'kyc_pending' | 'engagement_sent' | 'active_client';

export interface ClientRecord {
  id: string;
  companyName: string;
  companyNumber: string;
  directorName: string;
  email: string;
  phone: string;
  annualTurnover: number;
  stage: PipelineStage;
  currentSoftware: 'Xero' | 'QuickBooks' | 'FreeAgent' | 'Spreadsheets' | 'Sage';
  vatStatus: string;
  missingReceiptsCount: number;
  lastContact: string;
  unbilledWip: number;
  notes: string;
  createdAt: string;
}

export interface MissingDocRadarItem {
  id: string;
  clientId: string;
  companyName: string;
  directorName: string;
  email: string;
  phone: string;
  documentType: string;
  taxPeriod: string;
  daysOverdue: number;
  urgency: 'critical' | 'high' | 'medium';
  chasedCount: number;
  lastChasedAt?: string;
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  description: string;
  issueDate: string;
  dueDate: string;
  amountNet: number;
  vatAmount: number;
  amountTotal: number;
  status: 'paid' | 'awaiting_payment';
  paidAt?: string;
  paymentMethod?: string;
}

export interface ClientDocument {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  category: 'Receipt' | 'Sales Invoice' | 'Bank Statement' | 'HMRC Notice' | 'Payroll Record';
  source: 'web_dropzone' | 'mobile_camera' | 'email_forward';
  ocrData?: {
    merchant: string;
    date: string;
    amountNet: number;
    vatAmount: number;
    amountTotal: number;
    isTaxDeductible: boolean;
    suggestedCategory: string;
    confidence: number;
  };
}

export interface IntakeSubmission {
  companyName: string;
  incorporationYear: string;
  directorName: string;
  email: string;
  phone: string;
  turnoverBracket: string;
  currentSoftware: string;
  bottlenecks: string[];
  preferredConsultationTime: string;
}
