"use client";

import React, { createContext, useContext, useState } from "react";
import {
  AppMode,
  ScreenView,
  LandlordClient,
  CommunicationLogItem,
  PracticeMetrics,
  IntakeSubmission,
  PracticeInvoice,
  PropertyItem,
  NewClientInput,
  NewPropertyInput,
  NewInvoiceInput,
  UserProfile,
  PropertyBillItem,
  NewBillInput,
} from "./types";
import { supabase } from "./supabase";

interface ToastNotification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
}

interface DemoContextType {
  currentMode: AppMode;
  currentView: ScreenView;
  setCurrentView: (view: ScreenView) => void;
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  clients: LandlordClient[];
  activeClient: LandlordClient;
  communicationLogs: CommunicationLogItem[];
  metrics: PracticeMetrics;
  mobileFrameEnabled: boolean;
  setMobileFrameEnabled: (enabled: boolean) => void;
  activeChaserDocumentId: string | null;
  setActiveChaserDocumentId: (docId: string | null) => void;
  isIntakeModalOpen: boolean;
  intakeDefaultValues: Partial<IntakeSubmission> | null;
  openIntakeModal: (defaultValues?: Partial<IntakeSubmission>) => void;
  closeIntakeModal: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  enterAccountantPortal: (targetView?: ScreenView) => void;
  enterClientPortal: (targetView?: ScreenView, clientId?: string) => void;
  exitToLanding: () => void;
  addIntakeLead: (submission: IntakeSubmission) => void;
  uploadDocument: (clientId: string, documentId: string, customFileName?: string) => void;
  sendChaser: (clientId: string, channel: "whatsapp" | "sms" | "email", customMessage?: string) => void;
  exportAuditCsv: () => void;
  isCloudSyncActive: boolean;
  invoices: PracticeInvoice[];
  addNewClient: (input: NewClientInput) => void;
  addNewProperty: (clientId: string, input: NewPropertyInput) => void;
  createPracticeInvoice: (input: NewInvoiceInput) => void;
  settleInvoice: (invoiceId: string) => void;
  addNewBill: (clientId: string, input: NewBillInput) => void;
  deleteBill: (clientId: string, billId: string) => void;
  isCreateEntityModalOpen: boolean;
  openCreateEntityModal: () => void;
  closeCreateEntityModal: () => void;
  isCreatePropertyModalOpen: boolean;
  openCreatePropertyModal: () => void;
  closeCreatePropertyModal: () => void;
  isCreateInvoiceModalOpen: boolean;
  openCreateInvoiceModal: () => void;
  closeCreateInvoiceModal: () => void;
  resetDemoState: () => void;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  triggerToast: (title: string, message: string, type?: "success" | "warning" | "info") => void;
  currentUser: UserProfile | null;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsPartnerDemo: () => void;
  loginAsClientDemo: (clientId?: string) => void;
  logout: () => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

const INITIAL_CLIENTS: LandlordClient[] = [
  {
    id: "client-singh-family",
    entityName: "Singh Family Residential BTL (Parents)",
    entityType: "joint",
    primaryContact: "Gurtej Singh (on behalf of Parents)",
    email: "deepgurtej28@gmail.com",
    phone: "+44 7700 900822",
    taxYear: "2024/25",
    stage: "review_ready",
    assignedAccountant: "Pritpal Chaggar CTA",
    unbilledWip: 850,
    totalRentalIncome: 16800,
    chaseCount: 0,
    lastChasedAt: "All 2024/25 records provided",
    parties: [
      {
        id: "p-singh-father",
        fullName: "Mr Singh (Father)",
        role: "Joint Landlord (50%)",
        email: "deepgurtej28@gmail.com",
        phone: "+44 7700 900822",
        utrNumber: "77201 88412",
        nationalInsurance: "JS 65 43 21 A",
        idVerified: true,
        addressVerified: true,
      },
      {
        id: "p-singh-mother",
        fullName: "Mrs Singh (Mother)",
        role: "Joint Landlord (50%)",
        email: "deepgurtej28@gmail.com",
        phone: "+44 7700 900822",
        utrNumber: "88419 22301",
        nationalInsurance: "KS 12 34 56 B",
        idVerified: true,
        addressVerified: true,
      },
    ],
    properties: [
      {
        id: "prop-singh-1",
        address: "Residential Buy-to-Let Property, UK",
        postcode: "B13 9PR",
        propertyType: "Residential BTL",
        ownershipSplit: "50% Father / 50% Mother",
        annualRentalIncome: 16800,
        mortgageLender: "Buy-to-Let Mortgage Provider",
        outstandingMortgage: 121744,
      },
    ],
    documents: [
      {
        id: "doc-singh-openrent",
        title: "OpenRent Tenancy & Management Fee Statement (£120.00)",
        category: "expense",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-25",
        uploadedAt: "2026-10-27",
        fileSize: "240 KB PDF",
        notes: "Allowable property expense - letting management fees",
      },
      {
        id: "doc-singh-bathroom",
        title: "Bathroom Refurbishment Contractor Invoice (£5,000.00)",
        category: "expense",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-27",
        uploadedAt: "2026-10-27",
        fileSize: "1.1 MB PDF",
        notes: "Allowable revenue repairs & maintenance (like-for-like replacement)",
      },
      {
        id: "doc-singh-servicecharge",
        title: "Block Managing Agent Service Charge Annual Schedule (£3,752.88)",
        category: "expense",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-25",
        uploadedAt: "2026-10-27",
        fileSize: "1.4 MB PDF",
        notes: "Allowable service charge & communal maintenance expenditure",
      },
      {
        id: "doc-singh-groundrent",
        title: "Freeholder Ground Rent Receipt 2024/25 (£294.00)",
        category: "expense",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-25",
        uploadedAt: "2026-10-27",
        fileSize: "320 KB PDF",
        notes: "Allowable statutory property expense",
      },
      {
        id: "doc-singh-counciltax",
        title: "Local Authority Council Tax Notice - April Void Period (£33.50)",
        category: "expense",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-25",
        uploadedAt: "2026-10-27",
        fileSize: "180 KB PDF",
        notes: "Allowable void period rate expense",
      },
      {
        id: "doc-singh-mortgage",
        title: "Annual Mortgage Statement - Section 24 Finance Costs (£6,330.72)",
        category: "mortgage",
        ownerOrProperty: "Residential Buy-to-Let Property",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-25",
        uploadedAt: "2026-10-27",
        fileSize: "850 KB PDF",
        notes: "Section 24 restricted finance cost (20% basic rate tax reducer applies)",
      },
    ],
    bills: [
      {
        id: "bill-singh-1",
        title: "OpenRent Tenancy Fee",
        category: "letting_fees",
        vendorOrRecipient: "OpenRent Ltd",
        amount: 120.00,
        frequency: "annual",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-05-15",
        paidDate: "2026-05-15",
        status: "paid",
        receiptAttached: true,
        receiptName: "openrent_tenancy_statement_120.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Allowable Letting Fees & Commissions (SA105 Box 24)",
      },
      {
        id: "bill-singh-2",
        title: "Bathroom Refurbishment Contractor Invoice",
        category: "maintenance_repairs",
        vendorOrRecipient: "Prime Property Renovations Ltd",
        amount: 5000.00,
        frequency: "one_off",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-07-20",
        paidDate: "2026-07-22",
        status: "paid",
        receiptAttached: true,
        receiptName: "bathroom_refurb_invoice_5000.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Repairs, Maintenance & Like-for-Like Replacements (SA105 Box 25)",
      },
      {
        id: "bill-singh-3",
        title: "Freeholder Annual Ground Rent",
        category: "ground_rent",
        vendorOrRecipient: "Metropolitan Freeholds Ltd",
        amount: 294.00,
        frequency: "annual",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-06-01",
        paidDate: "2026-06-01",
        status: "paid",
        receiptAttached: true,
        receiptName: "ground_rent_receipt_294.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Rents, Rates, Insurance & Ground Charges (SA105 Box 26)",
      },
      {
        id: "bill-singh-4",
        title: "Block Managing Agent Service Charge",
        category: "service_charge",
        vendorOrRecipient: "FirstPort Property Services",
        amount: 3752.88,
        frequency: "annual",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-04-10",
        paidDate: "2026-04-12",
        status: "paid",
        receiptAttached: true,
        receiptName: "service_charge_annual_schedule_3752.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Communal Maintenance & Block Management (SA105 Box 26)",
      },
      {
        id: "bill-singh-5",
        title: "Local Authority Council Tax (April Void Period)",
        category: "utilities_council_tax",
        vendorOrRecipient: "City Council Revenues Dept",
        amount: 33.50,
        frequency: "one_off",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-04-28",
        paidDate: "2026-04-28",
        status: "paid",
        receiptAttached: true,
        receiptName: "council_tax_void_notice_33.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Void Period Rates & Water Charges (SA105 Box 26)",
      },
      {
        id: "bill-singh-6",
        title: "Residential Mortgage Finance Costs (Section 24)",
        category: "mortgage_interest",
        vendorOrRecipient: "BTL Mortgage Lender",
        amount: 6330.72,
        frequency: "monthly",
        isAllowableExpense: false,
        isSection24Restricted: true,
        propertyAddress: "Residential Buy-to-Let Property, UK",
        dueDate: "2026-10-01",
        paidDate: "2026-10-01",
        status: "paid",
        receiptAttached: true,
        receiptName: "annual_mortgage_certificate_6330.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Section 24 Residential Finance Costs (SA105 Box 44 - 20% Tax Reducer = £1,266.14)",
      },
    ],
  },
  {
    id: "client-sovereign",
    entityName: "Sovereign Estate Holdings Ltd",
    entityType: "spv_ltd",
    companyNumber: "15984210",
    primaryContact: "Gurtej Singh",
    email: "deepgurtej28@gmail.com",
    phone: "+44 7700 900822",
    taxYear: "2024/25",
    stage: "review_ready",
    assignedAccountant: "Kalpesh Patel FCA",
    unbilledWip: 4800,
    totalRentalIncome: 248000,
    chaseCount: 0,
    lastChasedAt: "All records synced",
    parties: [
      {
        id: "p-gurtej",
        fullName: "Gurtej Singh",
        role: "Managing Director & Principal",
        email: "deepgurtej28@gmail.com",
        phone: "+44 7700 900822",
        utrNumber: "88204 99182",
        nationalInsurance: "GS 20 08 24 M",
        idVerified: true,
        addressVerified: true,
      },
    ],
    properties: [
      {
        id: "prop-mercian-1",
        address: "10 Colmore Row, Birmingham Financial District",
        postcode: "B3 2QD",
        propertyType: "Commercial",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 120000,
        mortgageLender: "Investec Private Bank",
        outstandingMortgage: 850000,
      },
      {
        id: "prop-mercian-2",
        address: "Mercian Manor, Edgbaston Park",
        postcode: "B15 2TY",
        propertyType: "Residential BTL",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 72000,
        mortgageLender: "Coutts & Co",
        outstandingMortgage: 540000,
      },
      {
        id: "prop-mercian-3",
        address: "45 Solihull Parkway, Birmingham Business Park",
        postcode: "B37 7YN",
        propertyType: "Multi-unit",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 56000,
        mortgageLender: "Barclays Corporate",
        outstandingMortgage: 390000,
      },
    ],
    documents: [
      {
        id: "doc-merc-1",
        title: "Investec Commercial Facility Agreement & Interest Schedule",
        category: "mortgage",
        ownerOrProperty: "10 Colmore Row, Birmingham",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-15",
        uploadedAt: "2026-10-18",
        fileSize: "2.4 MB PDF",
      },
      {
        id: "doc-merc-2",
        title: "Mercian Sovereign Estate Holdings - Confirmation Statement CS01",
        category: "tax_record",
        ownerOrProperty: "Mercian Sovereign Estate Holdings Ltd",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-02",
        fileSize: "850 KB PDF",
      },
    ],
  },
  {
    id: "client-sterling",
    entityName: "Marcus & Sarah Sterling",
    entityType: "joint",
    primaryContact: "Marcus Sterling",
    email: "marcus.sterling@sterlingholdings.co.uk",
    phone: "+44 7700 900142",
    taxYear: "2024/25",
    stage: "chasing_docs",
    assignedAccountant: "Kalpesh Patel FCA",
    unbilledWip: 2450,
    totalRentalIncome: 86400,
    chaseCount: 2,
    lastChasedAt: "2 days ago",
    parties: [
      {
        id: "p-marcus",
        fullName: "Marcus Sterling",
        role: "Primary Landlord",
        email: "marcus.sterling@sterlingholdings.co.uk",
        phone: "+44 7700 900142",
        utrNumber: "78219 40215",
        nationalInsurance: "QQ 12 34 56 A",
        idVerified: true,
        addressVerified: true,
      },
      {
        id: "p-sarah",
        fullName: "Sarah Sterling",
        role: "Joint Owner (Spouse)",
        email: "sarah.sterling@sterlingholdings.co.uk",
        phone: "+44 7700 900143",
        utrNumber: "91482 66301",
        nationalInsurance: "WW 98 76 54 B",
        idVerified: true,
        addressVerified: false,
      },
    ],
    properties: [
      {
        id: "prop-14-highst",
        address: "14 High Street, Cheltenham",
        postcode: "GL50 1DZ",
        propertyType: "Residential BTL",
        ownershipSplit: "50/50 Joint",
        annualRentalIncome: 24000,
        mortgageLender: "NatWest",
        outstandingMortgage: 285000,
      },
      {
        id: "prop-22-parkrd",
        address: "22 Park Road, Gloucester",
        postcode: "GL1 2TW",
        propertyType: "Residential BTL",
        ownershipSplit: "50/50 Joint",
        annualRentalIncome: 19800,
        mortgageLender: "Barclays",
        outstandingMortgage: 195000,
      },
      {
        id: "prop-9-albany",
        address: "9 Albany Court, Bristol",
        postcode: "BS8 2UQ",
        propertyType: "Residential BTL",
        ownershipSplit: "50/50 Joint",
        annualRentalIncome: 21600,
        mortgageLender: "Nationwide",
        outstandingMortgage: 240000,
      },
      {
        id: "prop-4-commercial",
        address: "Unit 4 Stroud Enterprise Centre",
        postcode: "GL5 3RQ",
        propertyType: "Commercial",
        ownershipSplit: "100% Marcus Sterling",
        annualRentalIncome: 21000,
      },
    ],
    documents: [
      {
        id: "doc-1",
        title: "NatWest Annual Mortgage Interest Certificate",
        category: "mortgage",
        ownerOrProperty: "14 High Street, Cheltenham",
        status: "pending",
        isOverdue: true,
        dueDate: "2026-10-12",
        notes: "Crucial Section 24 basic rate tax credit deduction (£5,700 interest claimed)",
      },
      {
        id: "doc-2",
        title: "Sarah Sterling - Proof of Address",
        category: "id_aml",
        ownerOrProperty: "Sarah Sterling",
        status: "pending",
        isOverdue: true,
        dueDate: "2026-10-15",
        notes: "Recent council tax bill or utility bill dated within 3 months for HMRC AML compliance",
      },
      {
        id: "doc-3",
        title: "Marcus Sterling Passport Scan",
        category: "id_aml",
        ownerOrProperty: "Marcus Sterling",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-02",
        fileSize: "2.4 MB PDF",
      },
      {
        id: "doc-4",
        title: "Marcus P60 Employment Certificate (2024/25)",
        category: "tax_record",
        ownerOrProperty: "Marcus Sterling",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-02",
        fileSize: "1.1 MB PDF",
      },
      {
        id: "doc-5",
        title: "14 High St - Assured Shorthold Tenancy (AST)",
        category: "tenancy",
        ownerOrProperty: "14 High Street, Cheltenham",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-03",
        fileSize: "3.8 MB PDF",
      },
      {
        id: "doc-6",
        title: "Barclays Mortgage Certificate (22 Park Rd)",
        category: "mortgage",
        ownerOrProperty: "22 Park Road, Gloucester",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-04",
        fileSize: "1.4 MB PDF",
      },
      {
        id: "doc-7",
        title: "Nationwide Annual Loan Certificate (9 Albany)",
        category: "mortgage",
        ownerOrProperty: "9 Albany Court, Bristol",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-05",
        fileSize: "840 KB PDF",
      },
      {
        id: "doc-8",
        title: "Letting Agent Year-End Statement (Bristol & West)",
        category: "expense",
        ownerOrProperty: "9 Albany Court, Bristol",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-05",
        fileSize: "1.9 MB PDF",
      },
    ],
  },
  {
    id: "client-oakwood",
    entityName: "Oakwood Property SPV Ltd",
    entityType: "spv_ltd",
    companyNumber: "14285721",
    primaryContact: "Pritam Johal",
    email: "p.johal@oakwoodspv.co.uk",
    phone: "+44 7700 900512",
    taxYear: "2024/25",
    stage: "chasing_docs",
    assignedAccountant: "Pritpal Chaggar CTA",
    unbilledWip: 3200,
    totalRentalIncome: 142000,
    chaseCount: 3,
    lastChasedAt: "1 day ago",
    parties: [
      {
        id: "p-pritam",
        fullName: "Pritam Johal",
        role: "Company Director",
        email: "p.johal@oakwoodspv.co.uk",
        phone: "+44 7700 900512",
        utrNumber: "62104 88391",
        nationalInsurance: "AB 55 66 77 C",
        idVerified: true,
        addressVerified: true,
      },
    ],
    properties: [
      {
        id: "prop-oak-1",
        address: "7-11 Station Parade, Swindon",
        postcode: "SN1 1EA",
        propertyType: "HMO",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 52000,
        mortgageLender: "Shawbrook Bank",
        outstandingMortgage: 420000,
      },
      {
        id: "prop-oak-2",
        address: "44 Victoria Road, Oxford",
        postcode: "OX2 7QE",
        propertyType: "Residential BTL",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 48000,
        mortgageLender: "Paragon Bank",
        outstandingMortgage: 380000,
      },
      {
        id: "prop-oak-3",
        address: "18 Queensway, Reading",
        postcode: "RG1 4QA",
        propertyType: "Residential BTL",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 42000,
        mortgageLender: "Aldermore",
        outstandingMortgage: 310000,
      },
    ],
    documents: [
      {
        id: "doc-oak-1",
        title: "Shawbrook Commercial Loan Statement (Station Parade)",
        category: "mortgage",
        ownerOrProperty: "7-11 Station Parade, Swindon",
        status: "pending",
        isOverdue: true,
        dueDate: "2026-10-10",
        notes: "Needed to reconcile corporation tax deductible interest",
      },
      {
        id: "doc-oak-2",
        title: "Legal Completion Statement (Reading Purchase)",
        category: "tax_record",
        ownerOrProperty: "18 Queensway, Reading",
        status: "pending",
        isOverdue: false,
        dueDate: "2026-10-25",
        notes: "Solicitor completion breakdown for SDLT and legal fees capitalisation",
      },
      {
        id: "doc-oak-3",
        title: "Company Formation Certificate & Articles",
        category: "id_aml",
        ownerOrProperty: "Oakwood Property SPV Ltd",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-02",
        fileSize: "1.2 MB PDF",
      },
    ],
  },
  {
    id: "client-rahman",
    entityName: "Dr. Tariq Rahman",
    entityType: "individual",
    primaryContact: "Dr. Tariq Rahman",
    email: "t.rahman@cheltmed.co.uk",
    phone: "+44 7700 900881",
    taxYear: "2024/25",
    stage: "kyc_pending",
    assignedAccountant: "Kalpesh Patel FCA",
    unbilledWip: 1850,
    totalRentalIncome: 58000,
    chaseCount: 1,
    lastChasedAt: "3 days ago",
    parties: [
      {
        id: "p-tariq",
        fullName: "Dr. Tariq Rahman",
        role: "Primary Landlord",
        email: "t.rahman@cheltmed.co.uk",
        phone: "+44 7700 900881",
        utrNumber: "34901 22819",
        nationalInsurance: "CD 33 44 55 D",
        idVerified: true,
        addressVerified: false,
      },
    ],
    properties: [
      {
        id: "prop-rahman-1",
        address: "32 Lansdown Crescent, Cheltenham",
        postcode: "GL50 2JX",
        propertyType: "Residential BTL",
        ownershipSplit: "100% Individual",
        annualRentalIncome: 32000,
      },
      {
        id: "prop-rahman-2",
        address: "15 Bath Road, Worcester",
        postcode: "WR5 3AB",
        propertyType: "Residential BTL",
        ownershipSplit: "100% Individual",
        annualRentalIncome: 26000,
      },
    ],
    documents: [
      {
        id: "doc-rah-1",
        title: "Proof of Address (Utility Bill dated within 3 months)",
        category: "id_aml",
        ownerOrProperty: "Dr. Tariq Rahman",
        status: "pending",
        isOverdue: true,
        dueDate: "2026-10-14",
      },
      {
        id: "doc-rah-2",
        title: "NHS Consultant P60 (2024/25)",
        category: "tax_record",
        ownerOrProperty: "Dr. Tariq Rahman",
        status: "pending",
        isOverdue: false,
        dueDate: "2026-10-28",
        notes: "Required to evaluate higher/additional rate tax bracket for Section 24 tapering",
      },
    ],
  },
  {
    id: "client-kensington",
    entityName: "Kensington Mews Holdings LLP",
    entityType: "joint",
    primaryContact: "Rupert Sterling-Smith",
    email: "rupert@kensingtonholdings.co.uk",
    phone: "+44 7700 900332",
    taxYear: "2024/25",
    stage: "review_ready",
    assignedAccountant: "Pritpal Chaggar CTA",
    unbilledWip: 4100,
    totalRentalIncome: 185000,
    chaseCount: 0,
    lastChasedAt: "5 days ago",
    parties: [
      {
        id: "p-rupert",
        fullName: "Rupert Sterling-Smith",
        role: "Primary Landlord",
        email: "rupert@kensingtonholdings.co.uk",
        phone: "+44 7700 900332",
        utrNumber: "84729 11940",
        nationalInsurance: "EF 11 22 33 E",
        idVerified: true,
        addressVerified: true,
      },
    ],
    properties: [
      {
        id: "prop-ken-1",
        address: "1-4 Kensington Court Mews, London",
        postcode: "W8 5DL",
        propertyType: "Multi-unit",
        ownershipSplit: "LLP Partnership",
        annualRentalIncome: 185000,
      },
    ],
    documents: [
      {
        id: "doc-ken-1",
        title: "Partnership Tax Return (SA800) Draft",
        category: "tax_record",
        ownerOrProperty: "Kensington Mews Holdings LLP",
        status: "verified",
        isOverdue: false,
        dueDate: "2026-10-01",
        uploadedAt: "2026-10-08",
        fileSize: "4.2 MB PDF",
      },
    ],
  },
  {
    id: "client-vance",
    entityName: "Elena & David Vance",
    entityType: "joint",
    primaryContact: "Elena Vance",
    email: "elena.vance@vanceproperties.co.uk",
    phone: "+44 7700 900664",
    taxYear: "2024/25",
    stage: "computation_complete",
    assignedAccountant: "Kalpesh Patel FCA",
    unbilledWip: 850,
    totalRentalIncome: 44000,
    chaseCount: 0,
    parties: [],
    properties: [],
    documents: [],
  },
];

const INITIAL_LOGS: CommunicationLogItem[] = [
  {
    id: "log-1",
    clientId: "client-sterling",
    entityName: "Marcus & Sarah Sterling",
    channel: "whatsapp",
    recipient: "+44 7700 900142 (Marcus)",
    messageBody:
      "Hi Marcus, Kalpesh here from KP Accountants. We are finalizing your 2024/25 property tax return. We still need your NatWest mortgage certificate for 14 High Street. You can snap a photo directly using your secure link: https://kptc-portal.uk/d/ms-7281",
    sentAt: "Yesterday at 14:32",
    status: "read",
    triggeredBy: "Kalpesh Patel FCA",
  },
  {
    id: "log-2",
    clientId: "client-oakwood",
    entityName: "Oakwood Property SPV Ltd",
    channel: "email",
    recipient: "p.johal@oakwoodspv.co.uk",
    messageBody:
      "Dear Pritam, please upload the Shawbrook commercial mortgage certificate for 7-11 Station Parade to reconcile your SPV company deductible expenses.",
    sentAt: "18 Oct 2026 at 09:15",
    status: "delivered",
    triggeredBy: "Pritpal Chaggar CTA",
  },
];

const INITIAL_INVOICES: PracticeInvoice[] = [
  {
    id: "inv-101",
    invoiceNumber: "KP-2024-089",
    clientId: "client-sterling",
    entityName: "Marcus & Sarah Sterling",
    serviceDescription: "Section 24 Portfolio Restructuring & 2024/25 Self Assessment Computations",
    netAmount: 1850,
    vatAmount: 370,
    totalAmount: 2220,
    status: "awaiting_payment",
    issuedDate: "12 Oct 2026",
    dueDate: "26 Oct 2026",
  },
  {
    id: "inv-102",
    invoiceNumber: "KP-2024-090",
    clientId: "client-oakwood",
    entityName: "Oakwood Property SPV Ltd",
    serviceDescription: "Statutory Financial Statements (FRS 105), CT600 Corporation Tax & Confirmation Statement",
    netAmount: 2400,
    vatAmount: 480,
    totalAmount: 2880,
    status: "awaiting_payment",
    issuedDate: "15 Oct 2026",
    dueDate: "29 Oct 2026",
  },
  {
    id: "inv-103",
    invoiceNumber: "KP-2024-085",
    clientId: "client-kensington",
    entityName: "Kensington Mews Holdings LLP",
    serviceDescription: "Partnership Tax Return (SA800) & Annual Bookkeeping Reconciliation",
    netAmount: 3100,
    vatAmount: 620,
    totalAmount: 3720,
    status: "paid",
    issuedDate: "01 Oct 2026",
    dueDate: "15 Oct 2026",
    paidAt: "10 Oct 2026 via BACS",
  },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentViewInternal] = useState<ScreenView>("landing");
  const [selectedClientId, setSelectedClientIdInternal] = useState<string>("client-singh-family");
  const [clients, setClients] = useState<LandlordClient[]>(INITIAL_CLIENTS);
  const [invoices, setInvoices] = useState<PracticeInvoice[]>(INITIAL_INVOICES);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLogItem[]>(INITIAL_LOGS);
  const [mobileFrameEnabled, setMobileFrameEnabled] = useState<boolean>(false);
  const [activeChaserDocumentId, setActiveChaserDocumentId] = useState<string | null>("doc-1");
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState<boolean>(false);
  const [intakeDefaultValues, setIntakeDefaultValues] = useState<Partial<IntakeSubmission> | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isCreateEntityModalOpen, setIsCreateEntityModalOpen] = useState<boolean>(false);
  const [isCreatePropertyModalOpen, setIsCreatePropertyModalOpen] = useState<boolean>(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("kptc_auth_user") || sessionStorage.getItem("mercian_auth_user");
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    // Default partner demo profile in prototype mode
    return {
      email: "kalpesh@kptc.co.uk",
      name: "Kalpesh Patel FCA",
      role: "accountant",
      firmName: "KP Tax Consultants Ltd",
      isAuthenticated: true,
      lastLogin: "Active Session",
    };
  });

  // Derive active application mode
  const currentMode: AppMode =
    currentView === "landing"
      ? "landing"
      : ["radar", "pipeline", "workspace", "chaser", "statements", "invoicing", "wealth_advisory", "open_banking"].includes(currentView)
      ? "accountant"
      : "client";

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const missingDocumentsCount = clients.reduce(
    (acc, client) => acc + client.documents.filter((d) => d.status === "pending").length,
    0
  );

  const trackedPropertiesCount = clients.reduce(
    (acc, client) => acc + (client.properties?.length || 0),
    0
  );

  const unbilledWipTotal = clients.reduce((acc, client) => acc + client.unbilledWip, 0);

  const metrics: PracticeMetrics = {
    activeLandlordsCount: 42,
    trackedPropertiesCount: 118,
    missingDocumentsCount: missingDocumentsCount,
    approachingDeadlinesCount: 7,
    unbilledWipTotal: unbilledWipTotal,
    averageCycleDays: 4.2,
  };

  const triggerToast = (title: string, message: string, type: "success" | "warning" | "info" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrentView = (view: ScreenView) => {
    setCurrentViewInternal(view);
    // Scroll smoothly to top on view changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const setSelectedClientId = (id: string) => {
    setSelectedClientIdInternal(id);
    const target = clients.find((c) => c.id === id);
    if (target) {
      if (currentMode === "client" || currentUser?.role === "client") {
        const clientProfile: UserProfile = {
          email: target.email,
          name: target.primaryContact,
          role: "client",
          firmName: target.entityName,
          isAuthenticated: true,
          lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        };
        setCurrentUser(clientProfile);
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
            localStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
          } catch (e) {}
        }
      }
      triggerToast(
        "Active Portfolio Loaded",
        `Switched to ${target.entityName} (${target.primaryContact}). Assigned to ${target.assignedAccountant}.`,
        "info"
      );
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginWithCredentials = async (
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // 1. Admin Login for Practice Lead (Gurtej Singh)
    if (
      cleanEmail === "mercianwealthgs@gmail.com" &&
      cleanPass === "Gurtej@2008#"
    ) {
      const adminProfile: UserProfile = {
        email: "mercianwealthgs@gmail.com",
        name: "Gurtej Singh",
        role: "admin",
        firmName: "KP Tax Consultants Ltd",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
      setCurrentUser(adminProfile);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("kptc_auth_user", JSON.stringify(adminProfile));
          localStorage.setItem("kptc_auth_user", JSON.stringify(adminProfile));
        } catch (e) {}
      }
      closeLoginModal();
      setCurrentView("radar");
      triggerToast(
        "Practice Admin Authenticated",
        "Welcome Gurtej Singh. Full KP Accountants practice radar and tools unlocked.",
        "success"
      );
      return { success: true };
    }

    // 2. Staff / Partner Login (Kalpesh Patel FCA)
    if (
      (cleanEmail === "kalpesh@kptc.co.uk" || cleanEmail === "admin@kptc.co.uk") &&
      (cleanPass === "Gurtej@2008#" || cleanPass === "admin123")
    ) {
      const staffProfile: UserProfile = {
        email: cleanEmail,
        name: "Kalpesh Patel FCA",
        role: "accountant",
        firmName: "KP Tax Consultants Ltd",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
      setCurrentUser(staffProfile);
      closeLoginModal();
      setCurrentView("radar");
      triggerToast("Partner Portal Active", "Welcome back, Kalpesh Patel FCA.", "success");
      return { success: true };
    }

    // 3. Client Portal Login (deepgurtej28@gmail.com with Gurtej@2008# or Marcus Sterling)
    if (
      (cleanEmail === "deepgurtej28@gmail.com" && cleanPass === "Gurtej@2008#") ||
      (cleanEmail === "marcus.sterling@sterlingholdings.co.uk" && (cleanPass === "Gurtej@2008#" || cleanPass === "123456")) ||
      (cleanEmail === "client@kptc.co.uk" && cleanPass === "Gurtej@2008#")
    ) {
      const isGurtejClient = cleanEmail === "deepgurtej28@gmail.com";
      const clientProfile: UserProfile = {
        email: cleanEmail,
        name: isGurtejClient ? "Gurtej Singh (Portfolio Client)" : "Marcus & Sarah Sterling",
        role: "client",
        firmName: isGurtejClient ? "Sovereign Property Portfolio" : "Sterling Property Holdings",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
      setCurrentUser(clientProfile);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
          localStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
        } catch (e) {}
      }
      closeLoginModal();
      setCurrentView("dropzone");
      triggerToast(
        "Client Dropzone Active",
        `Welcome ${clientProfile.name}. 2024/25 tax year dropzone ready.`,
        "info"
      );
      return { success: true };
    }

    triggerToast(
      "Authentication Failed",
      "Invalid credentials. Please verify your email and password.",
      "warning"
    );
    return { success: false, error: "Invalid email or password. Please verify your credentials." };
  };

  const loginAsPartnerDemo = () => {
    const partnerProfile: UserProfile = {
      email: "kalpesh@kptc.co.uk",
      name: "Kalpesh Patel FCA",
      role: "accountant",
      firmName: "KP Tax Consultants Ltd",
      isAuthenticated: true,
      lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    setCurrentUser(partnerProfile);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("kptc_auth_user", JSON.stringify(partnerProfile));
        localStorage.setItem("kptc_auth_user", JSON.stringify(partnerProfile));
      } catch (e) {}
    }
    closeLoginModal();
    setCurrentView("radar");
    triggerToast(
      "Partner Prototype Active",
      "Welcome Kalpesh Patel FCA. Full Practice OS radar, P&L, CT600 & WIP unlocked.",
      "success"
    );
  };

  const loginAsClientDemo = (clientId: string = "client-singh-family") => {
    const target = clients.find((c) => c.id === clientId) || clients[0];
    const clientProfile: UserProfile = {
      email: target.email,
      name: target.primaryContact,
      role: "client",
      firmName: target.entityName,
      isAuthenticated: true,
      lastLogin: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    setSelectedClientIdInternal(target.id);
    setCurrentUser(clientProfile);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
        localStorage.setItem("kptc_auth_user", JSON.stringify(clientProfile));
      } catch (e) {}
    }
    closeLoginModal();
    setCurrentView("client_overview");
    triggerToast(
      "Landlord Prototype Active",
      `Welcome ${target.primaryContact}. 2024/25 tax records ready for ${target.entityName}.`,
      "info"
    );
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("kptc_auth_user");
        localStorage.removeItem("kptc_auth_user");
        sessionStorage.removeItem("mercian_auth_user");
        localStorage.removeItem("mercian_auth_user");
      } catch (e) {}
    }
    exitToLanding();
    triggerToast("Signed Out", "Prototype mode reset to public practice portal.", "info");
  };

  const enterAccountantPortal = (targetView: ScreenView = "radar") => {
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "accountant")) {
      loginAsPartnerDemo();
    }
    closeLoginModal();
    setCurrentView(targetView);
  };

  const enterClientPortal = (targetView: ScreenView = "client_overview", clientId?: string) => {
    const targetId = clientId || selectedClientId;
    const target = clients.find((c) => c.id === targetId) || clients[0];
    if (!currentUser || currentUser.role !== "client") {
      loginAsClientDemo(targetId);
    } else if (clientId && clientId !== selectedClientId) {
      setSelectedClientId(clientId);
    }
    closeLoginModal();
    setCurrentView(targetView);
  };

  const exitToLanding = () => {
    setCurrentView("landing");
  };

  const openIntakeModal = (defaultValues?: Partial<IntakeSubmission>) => {
    if (defaultValues) setIntakeDefaultValues(defaultValues);
    setIsIntakeModalOpen(true);
  };

  const closeIntakeModal = () => {
    setIsIntakeModalOpen(false);
    setIntakeDefaultValues(null);
  };

  const addIntakeLead = async (submission: IntakeSubmission) => {
    // Live synchronization with Supabase
    try {
      await supabase.from("clients").insert([
        {
          entity_name: submission.fullName,
          entity_type: submission.entityType,
          primary_email: submission.email,
          primary_phone: submission.phone || "+44 7700 900812",
          assigned_accountant: "Kalpesh Patel FCA",
          status: "onboarding",
        },
      ]);
    } catch (err) {
      console.warn("Supabase client sync:", err);
    }

    const newId = `client-${Date.now()}`;
    const newClient: LandlordClient = {
      id: newId,
      entityName: submission.fullName,
      entityType: submission.entityType,
      primaryContact: submission.fullName,
      email: submission.email,
      phone: submission.phone,
      taxYear: "2024/25",
      stage: "intake_submitted",
      assignedAccountant: "Kalpesh Patel FCA",
      unbilledWip: 1450,
      totalRentalIncome: submission.annualRent || 36000,
      chaseCount: 0,
      parties: [
        {
          id: `party-${Date.now()}`,
          fullName: submission.fullName,
          role: "Primary Landlord",
          email: submission.email,
          phone: submission.phone,
          utrNumber: "Pending Registration",
          nationalInsurance: "Pending Verification",
          idVerified: false,
          addressVerified: false,
        },
      ],
      properties: [
        {
          id: `prop-${Date.now()}`,
          address: "1st Portfolio Asset (To be added)",
          postcode: "Pending",
          propertyType: "Residential BTL",
          ownershipSplit: submission.entityType === "spv_ltd" ? "100% SPV Ltd" : "Individual",
          annualRentalIncome: submission.annualRent || 36000,
          outstandingMortgage: submission.mortgageInterest * 20 || 150000,
        },
      ],
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          title: "Proof of Identification (Passport / Driving Licence)",
          category: "id_aml",
          ownerOrProperty: submission.fullName,
          status: "pending",
          isOverdue: false,
          dueDate: "2026-11-01",
          notes: "Required for ICAEW statutory Anti-Money Laundering verification",
        },
        {
          id: `doc-${Date.now()}-2`,
          title: "Mortgage Interest Annual Statement",
          category: "mortgage",
          ownerOrProperty: "Primary Rental Property",
          status: "pending",
          isOverdue: false,
          dueDate: "2026-11-05",
          notes: "Needed to calculate Section 24 deduction",
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newId);
    closeIntakeModal();

    // Switch to accountant pipeline so user sees the new lead instantly
    setCurrentView("pipeline");

    triggerToast(
      "New Landlord Enquiry Captured",
      `${submission.fullName} has been added to the Accountant Pipeline under 'Intake Submitted'. Document checklist generated automatically.`
    );
  };

  const uploadDocument = async (clientId: string, documentId: string, customFileName?: string) => {
    // Live synchronization with Supabase
    try {
      await supabase
        .from("document_requests")
        .update({
          status: "verified",
          is_overdue: false,
          file_name: customFileName || "uploaded_cert.pdf",
          uploaded_at: new Date().toISOString(),
        })
        .eq("id", documentId);
    } catch (err) {
      console.warn("Supabase document sync:", err);
    }

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const updatedDocs = c.documents.map((d) => {
          if (d.id !== documentId) return d;
          return {
            ...d,
            status: "verified" as const,
            isOverdue: false,
            uploadedAt: "Just now (Mobile Upload)",
            fileSize: "2.1 MB JPG",
            fileStoragePath: customFileName || "natwest_cert_2024_25_signed.pdf",
          };
        });

        const pendingCount = updatedDocs.filter((d) => d.status === "pending").length;
        const updatedStage = pendingCount === 0 ? ("review_ready" as const) : c.stage;

        return {
          ...c,
          documents: updatedDocs,
          stage: updatedStage,
        };
      })
    );

    triggerToast(
      "Document Uploaded & Verified",
      "The missing certificate has been uploaded to the encrypted storage vault. The Partner Radar has updated in real time."
    );
  };

  const sendChaser = async (clientId: string, channel: "whatsapp" | "sms" | "email", customMessage?: string) => {
    const targetClient = clients.find((c) => c.id === clientId) || activeClient;
    const recipient =
      channel === "whatsapp" || channel === "sms" ? targetClient.phone : targetClient.email;

    // Live synchronization with Supabase
    try {
      await supabase.from("communication_logs").insert([
        {
          client_id: targetClient.id.startsWith("client-") ? undefined : targetClient.id,
          channel,
          recipient,
          message_body:
            customMessage ||
            `Hi ${targetClient.primaryContact.split(" ")[0]}, Kalpesh here from KP Accountants. We are finalizing your ${targetClient.taxYear} property tax return. Please upload your missing documents via your secure portal.`,
          triggered_by: targetClient.assignedAccountant,
          status: "sent",
        },
      ]);
    } catch (err) {
      console.warn("Supabase communication log sync:", err);
    }

    const newLog: CommunicationLogItem = {
      id: `log-${Date.now()}`,
      clientId: targetClient.id,
      entityName: targetClient.entityName,
      channel,
      recipient,
      messageBody:
        customMessage ||
        `Hi ${targetClient.primaryContact.split(" ")[0]}, Kalpesh here from KP Accountants. We are finalizing your 2024/25 property tax return. Please upload your missing documents via your secure portal.`,
      sentAt: "Just now",
      status: "delivered",
      triggeredBy: targetClient.assignedAccountant,
    };

    setCommunicationLogs((prev) => [newLog, ...prev]);

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== targetClient.id) return c;
        return {
          ...c,
          chaseCount: c.chaseCount + 1,
          lastChasedAt: "Just now",
        };
      })
    );

    triggerToast(
      `Reminder Sent via ${channel.toUpperCase()}`,
      `Sent to ${targetClient.primaryContact} (${recipient}). Activity trail updated.`
    );
  };

  const openCreateEntityModal = () => setIsCreateEntityModalOpen(true);
  const closeCreateEntityModal = () => setIsCreateEntityModalOpen(false);
  const openCreatePropertyModal = () => setIsCreatePropertyModalOpen(true);
  const closeCreatePropertyModal = () => setIsCreatePropertyModalOpen(false);
  const openCreateInvoiceModal = () => setIsCreateInvoiceModalOpen(true);
  const closeCreateInvoiceModal = () => setIsCreateInvoiceModalOpen(false);

  const addNewClient = async (input: NewClientInput) => {
    const newId = `client-${Date.now()}`;
    const newClient: LandlordClient = {
      id: newId,
      entityName: input.entityName,
      entityType: input.entityType,
      companyNumber: input.companyNumber,
      primaryContact: input.primaryContact,
      email: input.email,
      phone: input.phone,
      taxYear: "2024/25",
      stage: "chasing_docs",
      assignedAccountant: input.assignedAccountant,
      unbilledWip: 1850,
      totalRentalIncome: input.annualRent,
      chaseCount: 0,
      parties: [
        {
          id: `party-${Date.now()}`,
          fullName: input.primaryContact,
          role: input.entityType === "spv_ltd" ? "Company Director" : "Primary Landlord",
          email: input.email,
          phone: input.phone,
          utrNumber: `${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}`,
          nationalInsurance: "AB 12 34 56 C",
          idVerified: true,
          addressVerified: false,
        },
      ],
      properties: [
        {
          id: `prop-${Date.now()}`,
          address: "Primary Registered Asset, London",
          postcode: "WC2A 2JR",
          propertyType: "Residential BTL",
          ownershipSplit: input.entityType === "spv_ltd" ? "100% SPV Ltd" : "Individual",
          annualRentalIncome: input.annualRent,
          outstandingMortgage: Math.round(input.annualRent * 6),
        },
      ],
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          title: "Proof of Address (Utility Bill / Council Tax)",
          category: "id_aml",
          ownerOrProperty: input.primaryContact,
          status: "pending",
          isOverdue: false,
          dueDate: "2026-11-15",
          notes: "ICAEW statutory AML verification requirement",
        },
        {
          id: `doc-${Date.now()}-2`,
          title: "Mortgage Interest Annual Statement",
          category: "mortgage",
          ownerOrProperty: "Primary Registered Asset",
          status: "pending",
          isOverdue: false,
          dueDate: "2026-11-20",
          notes: "Required for Section 24 mortgage interest relief claim",
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newId);
    closeCreateEntityModal();

    // Live sync to Supabase
    try {
      await supabase.from("clients").insert([
        {
          entity_name: input.entityName,
          entity_type: input.entityType,
          company_number: input.companyNumber,
          primary_email: input.email,
          primary_phone: input.phone,
          assigned_accountant: input.assignedAccountant,
          status: "chasing_docs",
        },
      ]);
    } catch (err) {
      console.warn("Supabase client creation:", err);
    }

    triggerToast(
      "New Client Entity Created",
      `${input.entityName} successfully added to Practice Registry. Compliance checklist initialized.`,
      "success"
    );
  };

  const addNewProperty = (clientId: string, input: NewPropertyInput) => {
    const newProp: PropertyItem = {
      id: `prop-${Date.now()}`,
      address: input.address,
      postcode: input.postcode,
      propertyType: input.propertyType,
      ownershipSplit: input.ownershipSplit,
      annualRentalIncome: input.annualRentalIncome,
      mortgageLender: input.mortgageLender || "Barclays Commercial",
      outstandingMortgage: input.outstandingMortgage || 200000,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        return {
          ...c,
          properties: [...c.properties, newProp],
          totalRentalIncome: c.totalRentalIncome + input.annualRentalIncome,
        };
      })
    );
    closeCreatePropertyModal();

    triggerToast(
      "Property Asset Added",
      `${input.address} registered to portfolio schedule. Rental yield recalculated.`,
      "success"
    );
  };

  const createPracticeInvoice = (input: NewInvoiceInput) => {
    const targetClient = clients.find((c) => c.id === input.clientId) || activeClient;
    const vat = Math.round(input.netAmount * 0.2);
    const newInv: PracticeInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `KP-2024-${Math.floor(100 + Math.random() * 900)}`,
      clientId: targetClient.id,
      entityName: targetClient.entityName,
      serviceDescription: input.serviceDescription,
      netAmount: input.netAmount,
      vatAmount: vat,
      totalAmount: input.netAmount + vat,
      status: "awaiting_payment",
      issuedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      dueDate: input.dueDate,
    };

    setInvoices((prev) => [newInv, ...prev]);
    closeCreateInvoiceModal();

    triggerToast(
      "VAT Fee Note Issued",
      `Invoice ${newInv.invoiceNumber} for £${newInv.totalAmount.toLocaleString()} generated for ${targetClient.entityName}.`,
      "success"
    );
  };

  const settleInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== invoiceId) return inv;
        return {
          ...inv,
          status: "paid" as const,
          paidAt: `Today at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} via BACS`,
        };
      })
    );

    triggerToast(
      "Fee Note Settled",
      "Payment reconciled. Practice Collected Revenue increased and WIP ledger updated.",
      "success"
    );
  };

  const addNewBill = (clientId: string, input: NewBillInput) => {
    const newBill: PropertyBillItem = {
      id: `bill-${Date.now()}`,
      title: input.title,
      category: input.category,
      vendorOrRecipient: input.vendorOrRecipient,
      amount: input.amount,
      frequency: input.frequency,
      isAllowableExpense: !input.isSection24Restricted,
      isSection24Restricted: input.isSection24Restricted,
      propertyAddress: input.propertyAddress,
      dueDate: input.dueDate,
      paidDate: input.status === "paid" ? new Date().toISOString().split("T")[0] : undefined,
      status: input.status,
      receiptAttached: true,
      receiptName: `${input.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_voucher.pdf`,
      taxYear: "2024/25",
      hmrcBoxNote: input.isSection24Restricted
        ? "Section 24 Residential Finance Costs (Box 44)"
        : "Allowable Property Expenses (Box 24-29)",
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const currentBills = c.bills || [];
        return {
          ...c,
          bills: [newBill, ...currentBills],
        };
      })
    );

    triggerToast(
      "Bill & Expense Logged",
      `Added £${input.amount.toFixed(2)} for ${input.title}. Categorized for HMRC Self-Assessment.`,
      "success"
    );
  };

  const deleteBill = (clientId: string, billId: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        return {
          ...c,
          bills: (c.bills || []).filter((b) => b.id !== billId),
        };
      })
    );
    triggerToast("Bill Removed", "Expense item deleted from portfolio ledger.", "info");
  };

  const exportAuditCsv = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/api/export?type=csv";
    }
    triggerToast(
      "Practice Audit CSV Exported",
      "Downloaded full portfolio breakdown, missing compliance items, and WIP totals for Karbon/Xero integration.",
      "success"
    );
  };

  const resetDemoState = () => {
    setClients(INITIAL_CLIENTS);
    setCommunicationLogs(INITIAL_LOGS);
    setSelectedClientId("client-sterling");
    setActiveChaserDocumentId("doc-1");
    triggerToast(
      "Practice Data Refreshed",
      "All active landlord accounts, property schedules, and document checklists have been re-synchronized.",
      "info"
    );
  };

  return (
    <DemoContext.Provider
      value={{
        currentMode,
        currentView,
        setCurrentView,
        selectedClientId,
        setSelectedClientId,
        clients,
        activeClient,
        communicationLogs,
        metrics,
        mobileFrameEnabled,
        setMobileFrameEnabled,
        activeChaserDocumentId,
        setActiveChaserDocumentId,
        isIntakeModalOpen,
        intakeDefaultValues,
        openIntakeModal,
        closeIntakeModal,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        enterAccountantPortal,
        enterClientPortal,
        exitToLanding,
        addIntakeLead,
        uploadDocument,
        sendChaser,
        exportAuditCsv,
        isCloudSyncActive: true,
        invoices,
        addNewClient,
        addNewProperty,
        createPracticeInvoice,
        settleInvoice,
        addNewBill,
        deleteBill,
        isCreateEntityModalOpen,
        openCreateEntityModal,
        closeCreateEntityModal,
        isCreatePropertyModalOpen,
        openCreatePropertyModal,
        closeCreatePropertyModal,
        isCreateInvoiceModalOpen,
        openCreateInvoiceModal,
        closeCreateInvoiceModal,
        resetDemoState,
        toasts,
        removeToast,
        triggerToast,
        currentUser,
        loginWithCredentials,
        loginAsPartnerDemo,
        loginAsClientDemo,
        logout,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoStore() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoStore must be used within a DemoProvider");
  }
  return context;
}
