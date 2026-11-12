"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  DlaEntry,
  MileageLog,
  TaxPackage,
} from "./types";

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
  // New SPV, DLA, Mileage & Tax Pack Actions
  addDlaEntry: (clientId: string, entry: Omit<DlaEntry, "id">) => void;
  addMileageLog: (clientId: string, log: Omit<MileageLog, "id" | "totalClaim">) => void;
  verifyBillOrDocument: (clientId: string, itemId: string, itemType: "bill" | "document") => void;
  generateTaxPackage: (clientId: string, taxYear?: string) => void;
  downloadAccountantCsvPack: (clientId: string) => void;
}

const INITIAL_CLIENTS: LandlordClient[] = [
  {
    id: "client-legacy-wealth",
    entityName: "SUKHPREET KAUR LEGACY WEALTH LTD",
    entityType: "spv_ltd",
    companyNumber: "15984210",
    primaryContact: "Sukhpreet Kaur",
    email: "sukhpreet@legacywealth.co.uk",
    phone: "+44 7700 900822",
    taxYear: "2024/25",
    stage: "review_ready",
    assignedAccountant: "Kalpesh Patel FCA & Pritpal Chaggar CTA",
    unbilledWip: 1850,
    totalRentalIncome: 39000,
    chaseCount: 0,
    lastChasedAt: "All 2024/25 SPV records verified",
    dlaBalance: 134625.0,
    parties: [
      {
        id: "p-sukhpreet",
        fullName: "Sukhpreet Kaur",
        role: "Managing Director & 100% Shareholder",
        email: "sukhpreet@legacywealth.co.uk",
        phone: "+44 7700 900822",
        utrNumber: "91823 44102",
        nationalInsurance: "SK 44 91 82 C",
        idVerified: true,
        addressVerified: true,
      },
    ],
    properties: [
      {
        id: "prop-legacy-1",
        address: "14 Belgrave Place, Solihull, West Midlands",
        postcode: "B91 3QE",
        propertyType: "Residential BTL",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 25800,
        mortgageLender: "Paragon Bank (SPV Buy-to-Let)",
        outstandingMortgage: 288750,
        purchaseDate: "2024-04-12",
        purchasePrice: 385000,
        currentValuation: 420000,
        depositPaid: 96250,
        stampDutyPaid: 19250,
        legalFees: 2850,
        monthlyMortgagePayment: 1280,
        monthlyMortgageInterest: 1110,
        tenantName: "Dr. Alistair Vance & Family",
        tenancyStart: "2024-05-01",
        tenancyEnd: "2026-05-01",
        isSpvHeld: true,
        netYield: 6.7,
      },
      {
        id: "prop-legacy-2",
        address: "Flat 4, The Exchange, Harborne, Birmingham",
        postcode: "B17 9ND",
        propertyType: "Residential BTL",
        ownershipSplit: "100% SPV Ltd",
        annualRentalIncome: 13200,
        mortgageLender: "Shawbrook Commercial",
        outstandingMortgage: 146250,
        purchaseDate: "2024-09-18",
        purchasePrice: 195000,
        currentValuation: 215000,
        depositPaid: 48750,
        stampDutyPaid: 7350,
        legalFees: 1950,
        monthlyMortgagePayment: 685,
        monthlyMortgageInterest: 580,
        tenantName: "Sophie Chen",
        tenancyStart: "2024-10-01",
        tenancyEnd: "2025-10-01",
        isSpvHeld: true,
        netYield: 6.77,
      },
    ],
    dlaEntries: [
      {
        id: "dla-1",
        date: "2024-04-10",
        description: "Director Capital Injected: Solihull Purchase Deposit & SDLT",
        credit: 118350,
        debit: 0,
        category: "deposit_equity",
        referencePropertyId: "prop-legacy-1",
      },
      {
        id: "dla-2",
        date: "2024-09-15",
        description: "Director Capital Injected: Harborne Purchase Deposit & Conveyancing",
        credit: 58050,
        debit: 0,
        category: "deposit_equity",
        referencePropertyId: "prop-legacy-2",
      },
      {
        id: "dla-3",
        date: "2024-10-05",
        description: "Director Personal Card: Boiler Replacement & Gas CP12 Certificate",
        credit: 2100,
        debit: 0,
        category: "personal_card_expense",
        referencePropertyId: "prop-legacy-1",
      },
      {
        id: "dla-4",
        date: "2024-11-20",
        description: "Property Inspection Mileage Claim (2,500 miles @ 45p/mile)",
        credit: 1125,
        debit: 0,
        category: "mileage_reimbursement",
      },
      {
        id: "dla-5",
        date: "2024-12-15",
        description: "Tax-Free Capital Extraction: DLA Repayment to Director Personal Account",
        credit: 0,
        debit: 45000,
        category: "cash_withdrawal",
      },
    ],
    mileageLogs: [
      {
        id: "mile-1",
        date: "2024-04-12",
        origin: "Registered Office, Birmingham",
        destination: "14 Belgrave Place, Solihull",
        purpose: "Completion handover, key collection & inventory check",
        miles: 42,
        ratePerMile: 0.45,
        totalClaim: 18.9,
        propertyAddress: "14 Belgrave Place, Solihull",
        isCreditedToDla: true,
      },
      {
        id: "mile-2",
        date: "2024-06-18",
        origin: "Registered Office, Birmingham",
        destination: "14 Belgrave Place, Solihull",
        purpose: "Quarterly landlord maintenance inspection & smoke alarm check",
        miles: 42,
        ratePerMile: 0.45,
        totalClaim: 18.9,
        propertyAddress: "14 Belgrave Place, Solihull",
        isCreditedToDla: true,
      },
      {
        id: "mile-3",
        date: "2024-09-18",
        origin: "Registered Office, Birmingham",
        destination: "Flat 4, The Exchange, Harborne",
        purpose: "Acquisition inspection & tenant onboarding handover",
        miles: 28,
        ratePerMile: 0.45,
        totalClaim: 12.6,
        propertyAddress: "Flat 4, The Exchange, Harborne",
        isCreditedToDla: true,
      },
    ],
    bills: [
      {
        id: "bill-legacy-1",
        title: "Paragon BTL Mortgage Monthly Interest (Section 24 SPV Deductible)",
        category: "mortgage_interest",
        vendorOrRecipient: "Paragon Bank SPV Lending",
        amount: 1110.0,
        frequency: "monthly",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "14 Belgrave Place, Solihull, West Midlands",
        dueDate: "2026-11-01",
        paidDate: "2026-11-01",
        status: "paid",
        receiptAttached: true,
        receiptName: "paragon_facility_interest_schedule.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "100% Allowable Corporate Finance Cost (CT600 Box 155)",
      },
      {
        id: "bill-legacy-2",
        title: "Shawbrook Commercial Mortgage Interest",
        category: "mortgage_interest",
        vendorOrRecipient: "Shawbrook Commercial Bank",
        amount: 580.0,
        frequency: "monthly",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "Flat 4, The Exchange, Harborne, Birmingham",
        dueDate: "2026-11-01",
        paidDate: "2026-11-01",
        status: "paid",
        receiptAttached: true,
        receiptName: "shawbrook_interest_statement.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "100% Allowable Corporate Finance Cost (CT600 Box 155)",
      },
      {
        id: "bill-legacy-3",
        title: "Emergency Worcester Boiler Replacement (Revenue Repair)",
        category: "maintenance_repairs",
        vendorOrRecipient: "Midland Heating & Plumbing Ltd",
        amount: 2100.0,
        frequency: "one_off",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "14 Belgrave Place, Solihull, West Midlands",
        dueDate: "2024-10-05",
        paidDate: "2024-10-05",
        status: "paid",
        receiptAttached: true,
        receiptName: "worcester_boiler_invoice_2100.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Allowable Property Revenue Repair (CT600 Box 155)",
      },
      {
        id: "bill-legacy-4",
        title: "Landlord Buildings & Property Owners Liability Insurance",
        category: "insurance",
        vendorOrRecipient: "Direct Line for Business",
        amount: 685.0,
        frequency: "annual",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "14 Belgrave Place, Solihull, West Midlands",
        dueDate: "2024-04-20",
        paidDate: "2024-04-20",
        status: "paid",
        receiptAttached: true,
        receiptName: "directline_btl_schedule_685.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Property Insurance & Compliance (CT600 Box 155)",
      },
      {
        id: "bill-legacy-5",
        title: "Residential Letting & Tenant Referencing Commission",
        category: "letting_fees",
        vendorOrRecipient: "Knight Frank Residential Lettings",
        amount: 1450.0,
        frequency: "annual",
        isAllowableExpense: true,
        isSection24Restricted: false,
        propertyAddress: "14 Belgrave Place, Solihull, West Midlands",
        dueDate: "2024-05-02",
        paidDate: "2024-05-02",
        status: "paid",
        receiptAttached: true,
        receiptName: "knightfrank_letting_commission.pdf",
        taxYear: "2024/25",
        hmrcBoxNote: "Allowable Letting & Management Agent Fees",
      },
    ],
    documents: [
      {
        id: "doc-leg-1",
        title: "Solicitors Completion Statement - 14 Belgrave Place (£385,000)",
        category: "expense",
        ownerOrProperty: "14 Belgrave Place, Solihull",
        status: "verified",
        isOverdue: false,
        dueDate: "2024-04-12",
        uploadedAt: "2024-04-14",
        fileSize: "1.8 MB PDF",
        notes: "Apportioned SDLT (£19,250) + Conveyancing (£2,850) indexed to capital base cost",
      },
      {
        id: "doc-leg-2",
        title: "Paragon Bank Mortgage Facility Letter & Charge Document",
        category: "mortgage",
        ownerOrProperty: "14 Belgrave Place, Solihull",
        status: "verified",
        isOverdue: false,
        dueDate: "2024-04-10",
        uploadedAt: "2024-04-14",
        fileSize: "2.6 MB PDF",
        notes: "Section 24 SPV Qualifying Corporate Loan",
      },
      {
        id: "doc-leg-3",
        title: "AST Tenancy Agreement - Dr. Alistair Vance (£2,150/mo)",
        category: "tenancy",
        ownerOrProperty: "14 Belgrave Place, Solihull",
        status: "verified",
        isOverdue: false,
        dueDate: "2024-05-01",
        uploadedAt: "2024-05-01",
        fileSize: "3.2 MB PDF",
      },
      {
        id: "doc-leg-4",
        title: "Gas Safety Certificate CP12 & EICR Electrical Report",
        category: "tax_record",
        ownerOrProperty: "14 Belgrave Place, Solihull",
        status: "verified",
        isOverdue: false,
        dueDate: "2024-05-01",
        uploadedAt: "2024-05-02",
        fileSize: "890 KB PDF",
      },
      {
        id: "doc-leg-5",
        title: "Companies House Certificate of Incorporation - CS01 Register",
        category: "tax_record",
        ownerOrProperty: "SUKHPREET KAUR LEGACY WEALTH LTD",
        status: "verified",
        isOverdue: false,
        dueDate: "2024-03-15",
        uploadedAt: "2024-03-20",
        fileSize: "540 KB PDF",
      },
    ],
    taxPackages: [
      {
        id: "tax-pkg-2024",
        taxYear: "2024/25",
        periodStart: "2024-04-06",
        periodEnd: "2025-04-05",
        totalRentalTurnover: 39000,
        totalAllowableExpenses: 6420,
        totalMortgageInterest: 20280,
        operatingProfit: 12300,
        estimatedCorporationTax: 2337,
        netRetainedProfit: 9963,
        dlaClosingBalance: 134625,
        status: "ready_for_accountant",
        createdAt: "2026-11-12",
      },
    ],
  },
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
    documents: [],
    bills: [],
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
    ],
    documents: [],
    bills: [],
  },
];

const INITIAL_INVOICES: PracticeInvoice[] = [
  {
    id: "inv-2024-001",
    invoiceNumber: "INV-2024-001",
    clientId: "client-legacy-wealth",
    entityName: "SUKHPREET KAUR LEGACY WEALTH LTD",
    serviceDescription: "SPV Corporate Tax Return (CT600) & Annual Accounts Preparation",
    netAmount: 1250,
    vatAmount: 250,
    totalAmount: 1500,
    status: "paid",
    issuedDate: "2024-10-01",
    dueDate: "2024-10-31",
    paidAt: "2024-10-15",
  },
  {
    id: "inv-2024-002",
    invoiceNumber: "INV-2024-002",
    clientId: "client-legacy-wealth",
    entityName: "SUKHPREET KAUR LEGACY WEALTH LTD",
    serviceDescription: "Section 24 SPV Acquisition Restructure & Mortgage Interest Indexing",
    netAmount: 600,
    vatAmount: 120,
    totalAmount: 720,
    status: "awaiting_payment",
    issuedDate: "2024-11-01",
    dueDate: "2024-11-30",
  },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<AppMode>("client");
  const [currentView, setCurrentView] = useState<ScreenView>("client_overview");
  const [clients, setClients] = useState<LandlordClient[]>(INITIAL_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string>("client-legacy-wealth");
  const [invoices, setInvoices] = useState<PracticeInvoice[]>(INITIAL_INVOICES);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLogItem[]>([]);
  const [mobileFrameEnabled, setMobileFrameEnabled] = useState<boolean>(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [activeChaserDocumentId, setActiveChaserDocumentId] = useState<string | null>(null);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState<boolean>(false);
  const [intakeDefaultValues, setIntakeDefaultValues] = useState<Partial<IntakeSubmission> | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCreateEntityModalOpen, setIsCreateEntityModalOpen] = useState<boolean>(false);
  const [isCreatePropertyModalOpen, setIsCreatePropertyModalOpen] = useState<boolean>(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Active User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    email: "sukhpreet@legacywealth.co.uk",
    name: "Sukhpreet Kaur",
    role: "client",
    firmName: "SUKHPREET KAUR LEGACY WEALTH LTD",
    isAuthenticated: true,
  });

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const triggerToast = (title: string, message: string, type: "success" | "warning" | "info" = "info") => {
    const id = "toast-" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  // Keyboard Shortcuts Listener (N: new bill, U: upload, P: add property, Esc: close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts inside text inputs or textareas
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName)) {
        return;
      }

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        if (currentMode === "client") {
          setCurrentView("client_bills");
          triggerToast("Keyboard Shortcut 'N'", "Jumped to Bills & Expense Logger", "info");
        }
      } else if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        if (currentMode === "client") {
          setCurrentView("dropzone");
          triggerToast("Keyboard Shortcut 'U'", "Opened Mobile Document Dropzone", "info");
        }
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (currentMode === "client") {
          setCurrentView("client_properties");
          triggerToast("Keyboard Shortcut 'P'", "Opened Property Portfolio Ledger", "info");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentMode]);

  // Mode Navigations
  const enterAccountantPortal = (targetView: ScreenView = "radar") => {
    setCurrentMode("accountant");
    setCurrentView(targetView);
    setCurrentUser({
      email: "mercianwealthgs@gmail.com",
      name: "Practice Administrator",
      role: "accountant",
      firmName: "Mercian Wealth & Advisory",
      isAuthenticated: true,
    });
    setMobileSidebarOpen(false);
  };

  const enterClientPortal = (targetView: ScreenView = "client_overview", clientId?: string) => {
    if (clientId) setSelectedClientId(clientId);
    setCurrentMode("client");
    setCurrentView(targetView);
    setCurrentUser({
      email: "deepgurtej28@gmail.com",
      name: "Sukhpreet Kaur",
      role: "client",
      firmName: "SUKHPREET KAUR LEGACY WEALTH LTD",
      isAuthenticated: true,
    });
    setMobileSidebarOpen(false);
  };

  const exitToLanding = () => {
    setCurrentMode("landing");
    setCurrentView("landing");
    setMobileSidebarOpen(false);
  };

  const loginWithCredentials = async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "mercianwealthgs@gmail.com" || cleanEmail.includes("admin")) {
      enterAccountantPortal("radar");
      triggerToast("Practice Admin Console Active", "Authenticated as Practice Lead for Mercian Wealth & Advisory.", "success");
      return { success: true };
    } else {
      enterClientPortal("client_overview", "client-legacy-wealth");
      triggerToast("Welcome Back, Client", "Authenticated to SUKHPREET KAUR LEGACY WEALTH LTD Portal.", "success");
      return { success: true };
    }
  };

  const loginAsPartnerDemo = () => enterAccountantPortal("radar");
  const loginAsClientDemo = (clientId: string = "client-legacy-wealth") => enterClientPortal("client_overview", clientId);

  const logout = () => {
    setCurrentUser(null);
    exitToLanding();
    triggerToast("Logged Out", "You have securely exited the session.", "info");
  };

  const openIntakeModal = (defaultValues?: Partial<IntakeSubmission>) => {
    setIntakeDefaultValues(defaultValues || null);
    setIsIntakeModalOpen(true);
  };

  const closeIntakeModal = () => setIsIntakeModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openCreateEntityModal = () => setIsCreateEntityModalOpen(true);
  const closeCreateEntityModal = () => setIsCreateEntityModalOpen(false);
  const openCreatePropertyModal = () => setIsCreatePropertyModalOpen(true);
  const closeCreatePropertyModal = () => setIsCreatePropertyModalOpen(false);
  const openCreateInvoiceModal = () => setIsCreateInvoiceModalOpen(true);
  const closeCreateInvoiceModal = () => setIsCreateInvoiceModalOpen(false);

  const addIntakeLead = (submission: IntakeSubmission) => {
    const newId = "client-" + Math.random().toString(36).substring(2, 7);
    const newClient: LandlordClient = {
      id: newId,
      entityName: `${submission.fullName} ${submission.entityType === "spv_ltd" ? "SPV Ltd" : "Property"}`,
      entityType: submission.entityType,
      primaryContact: submission.fullName,
      email: submission.email,
      phone: submission.phone,
      taxYear: "2024/25",
      stage: "intake_submitted",
      assignedAccountant: "Kalpesh Patel FCA",
      unbilledWip: 500,
      totalRentalIncome: submission.annualRent || 24000,
      chaseCount: 0,
      parties: [
        {
          id: "p-" + newId,
          fullName: submission.fullName,
          role: submission.entityType === "spv_ltd" ? "Company Director" : "Primary Landlord",
          email: submission.email,
          phone: submission.phone,
          utrNumber: "Pending HMRC",
          nationalInsurance: "Pending",
          idVerified: false,
          addressVerified: false,
        },
      ],
      properties: [
        {
          id: "prop-" + newId,
          address: "Portfolio Acquisition Property, UK",
          postcode: "B1 1AA",
          propertyType: "Residential BTL",
          ownershipSplit: submission.entityType === "spv_ltd" ? "100% SPV Ltd" : "Individual",
          annualRentalIncome: submission.annualRent || 24000,
        },
      ],
      documents: [],
      bills: [],
    };

    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newId);
    triggerToast("Lead Enrolled", `${submission.fullName} added to practice pipeline.`, "success");
    closeIntakeModal();
  };

  const uploadDocument = (clientId: string, documentId: string, customFileName?: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        return {
          ...c,
          documents: c.documents.map((d) =>
            d.id === documentId
              ? {
                  ...d,
                  status: "verified" as const,
                  isOverdue: false,
                  uploadedAt: new Date().toISOString().split("T")[0],
                  fileSize: "1.2 MB PDF",
                  title: customFileName ? `${d.title} (${customFileName})` : d.title,
                }
              : d
          ),
        };
      })
    );
    triggerToast("Document Secured", "File encrypted & synced to vault.", "success");
  };

  const sendChaser = (clientId: string, channel: "whatsapp" | "sms" | "email", customMessage?: string) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    const newLog: CommunicationLogItem = {
      id: "log-" + Math.random().toString(36).substring(2, 7),
      clientId,
      entityName: target.entityName,
      channel,
      recipient: channel === "email" ? target.email : target.phone,
      messageBody: customMessage || `Action Required: Please submit outstanding compliance documents for ${target.taxYear}.`,
      sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
      triggeredBy: "Mercian Automated Chaser Engine",
    };

    setCommunicationLogs((prev) => [newLog, ...prev]);
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, chaseCount: c.chaseCount + 1, lastChasedAt: `Chased just now via ${channel.toUpperCase()}` } : c
      )
    );
    triggerToast("Chaser Dispatched", `Notification delivered via ${channel.toUpperCase()} to ${target.primaryContact}.`, "success");
  };

  const addNewBill = (clientId: string, input: NewBillInput) => {
    const newBill: PropertyBillItem = {
      id: "bill-" + Math.random().toString(36).substring(2, 8),
      title: input.title,
      category: input.category,
      vendorOrRecipient: input.vendorOrRecipient,
      amount: input.amount,
      frequency: input.frequency,
      isAllowableExpense: true,
      isSection24Restricted: input.isSection24Restricted,
      propertyAddress: input.propertyAddress,
      dueDate: input.dueDate,
      status: input.status,
      receiptAttached: true,
      receiptName: `${input.title.toLowerCase().replace(/\s+/g, "_")}.pdf`,
      taxYear: "2024/25",
      hmrcBoxNote: input.isSection24Restricted
        ? "100% Allowable Corporate Finance Cost (CT600 Box 155)"
        : "Allowable Revenue Expense (CT600 Box 155)",
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        return {
          ...c,
          bills: [newBill, ...(c.bills || [])],
        };
      })
    );
    triggerToast("Bill Logged", `£${input.amount.toFixed(2)} recorded for ${input.title}.`, "success");
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
    triggerToast("Bill Removed", "Expense entry deleted from ledger.", "info");
  };

  const addDlaEntry = (clientId: string, entry: Omit<DlaEntry, "id">) => {
    const newEntry: DlaEntry = {
      id: "dla-" + Math.random().toString(36).substring(2, 8),
      ...entry,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const netChange = entry.credit - entry.debit;
        const currentBalance = c.dlaBalance || 0;
        return {
          ...c,
          dlaBalance: currentBalance + netChange,
          dlaEntries: [newEntry, ...(c.dlaEntries || [])],
        };
      })
    );
    triggerToast("DLA Entry Recorded", `Director Loan Account updated by £${(entry.credit - entry.debit).toLocaleString()}.`, "success");
  };

  const addMileageLog = (clientId: string, log: Omit<MileageLog, "id" | "totalClaim">) => {
    const totalClaim = Math.round(log.miles * log.ratePerMile * 100) / 100;
    const newLog: MileageLog = {
      id: "mile-" + Math.random().toString(36).substring(2, 8),
      ...log,
      totalClaim,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        // Also credit to DLA if enabled
        const newDlaBalance = (c.dlaBalance || 0) + (log.isCreditedToDla ? totalClaim : 0);
        const autoDlaEntry: DlaEntry | null = log.isCreditedToDla
          ? {
              id: "dla-mile-" + Math.random().toString(36).substring(2, 8),
              date: log.date,
              description: `HMRC Mileage Claim (${log.miles} miles @ £${log.ratePerMile}/mile): ${log.purpose}`,
              credit: totalClaim,
              debit: 0,
              category: "mileage_reimbursement",
            }
          : null;

        return {
          ...c,
          dlaBalance: newDlaBalance,
          mileageLogs: [newLog, ...(c.mileageLogs || [])],
          dlaEntries: autoDlaEntry ? [autoDlaEntry, ...(c.dlaEntries || [])] : c.dlaEntries,
        };
      })
    );
    triggerToast("Mileage Logged", `${log.miles} miles logged (£${totalClaim.toFixed(2)} credited to DLA).`, "success");
  };

  const verifyBillOrDocument = (clientId: string, itemId: string, itemType: "bill" | "document") => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        if (itemType === "bill") {
          return {
            ...c,
            bills: (c.bills || []).map((b) => (b.id === itemId ? { ...b, status: "paid" as const } : b)),
          };
        } else {
          return {
            ...c,
            documents: c.documents.map((d) => (d.id === itemId ? { ...d, status: "verified" as const } : d)),
          };
        }
      })
    );
    triggerToast("Accountant Verified", "Entry signed off and marked compliance-ready.", "success");
  };

  const generateTaxPackage = (clientId: string, taxYear: string = "2024/25") => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;

    const bills = client.bills || [];
    const turnover = client.totalRentalIncome;
    const mortgageInterest = bills.filter((b) => b.category === "mortgage_interest").reduce((a, b) => a + b.amount, 0) || 20280;
    const allowableExpenses = bills.filter((b) => b.category !== "mortgage_interest" && b.isAllowableExpense).reduce((a, b) => a + b.amount, 0) || 6420;
    const operatingProfit = turnover - mortgageInterest - allowableExpenses;
    const ctTax = Math.round(operatingProfit * 0.19);

    const newPkg: TaxPackage = {
      id: "pkg-" + Math.random().toString(36).substring(2, 8),
      taxYear,
      periodStart: "2024-04-06",
      periodEnd: "2025-04-05",
      totalRentalTurnover: turnover,
      totalAllowableExpenses: allowableExpenses,
      totalMortgageInterest: mortgageInterest,
      operatingProfit,
      estimatedCorporationTax: ctTax,
      netRetainedProfit: operatingProfit - ctTax,
      dlaClosingBalance: client.dlaBalance || 134625,
      status: "ready_for_accountant",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, taxPackages: [newPkg, ...(c.taxPackages || [])] } : c))
    );
    triggerToast("Tax Pack Compiled", `CT600 & Financial Summary for ${taxYear} generated successfully.`, "success");
  };

  const downloadAccountantCsvPack = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;

    // Build Transactions CSV
    const rows = [
      ["Date", "Description", "Category", "Amount", "Section24 Restrict", "Receipt Attached", "HMRC Note"],
      ...(client.bills || []).map((b) => [
        b.dueDate,
        `"${b.title}"`,
        b.category,
        b.amount,
        b.isSection24Restricted ? "YES" : "NO",
        b.receiptAttached ? "YES" : "NO",
        `"${b.hmrcBoxNote || ""}"`,
      ]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${client.entityName.replace(/\s+/g, "_")}_Transactions_${client.taxYear.replace("/", "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast("Download Started", "Accountant transaction schedule CSV exported.", "success");
  };

  const exportAuditCsv = () => {
    downloadAccountantCsvPack(selectedClientId);
  };

  const addNewClient = (input: NewClientInput) => {
    const newId = "client-" + Math.random().toString(36).substring(2, 7);
    const newClient: LandlordClient = {
      id: newId,
      entityName: input.entityName,
      entityType: input.entityType,
      companyNumber: input.companyNumber,
      primaryContact: input.primaryContact,
      email: input.email,
      phone: input.phone,
      taxYear: "2024/25",
      stage: "intake_submitted",
      assignedAccountant: input.assignedAccountant,
      unbilledWip: 650,
      totalRentalIncome: input.annualRent || 18000,
      chaseCount: 0,
      parties: [],
      properties: [],
      documents: [],
      bills: [],
    };
    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newId);
    triggerToast("Entity Created", `${input.entityName} added to multi-entity directory.`, "success");
  };

  const addNewProperty = (clientId: string, input: NewPropertyInput) => {
    const newProp: PropertyItem = {
      id: "prop-" + Math.random().toString(36).substring(2, 7),
      address: input.address,
      postcode: input.postcode,
      propertyType: input.propertyType,
      ownershipSplit: input.ownershipSplit,
      annualRentalIncome: input.annualRentalIncome,
      mortgageLender: input.mortgageLender,
      outstandingMortgage: input.outstandingMortgage,
      isSpvHeld: true,
      currentValuation: Math.round(input.annualRentalIncome * 16),
      monthlyRent: Math.round(input.annualRentalIncome / 12),
      monthlyMortgagePayment: Math.round((input.outstandingMortgage || 100000) * 0.0055),
      monthlyMortgageInterest: Math.round((input.outstandingMortgage || 100000) * 0.0048),
      netYield: 6.5,
    };

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              properties: [...c.properties, newProp],
              totalRentalIncome: c.totalRentalIncome + input.annualRentalIncome,
            }
          : c
      )
    );
    triggerToast("Property Added", `${input.address} registered into portfolio ledger.`, "success");
  };

  const createPracticeInvoice = (input: NewInvoiceInput) => {
    const target = clients.find((c) => c.id === input.clientId);
    const vat = Math.round(input.netAmount * 0.2 * 100) / 100;
    const newInv: PracticeInvoice = {
      id: "inv-" + Math.random().toString(36).substring(2, 7),
      invoiceNumber: `INV-2024-${invoices.length + 10}`,
      clientId: input.clientId,
      entityName: target?.entityName || "Client Entity",
      serviceDescription: input.serviceDescription,
      netAmount: input.netAmount,
      vatAmount: vat,
      totalAmount: input.netAmount + vat,
      status: "awaiting_payment",
      issuedDate: new Date().toISOString().split("T")[0],
      dueDate: input.dueDate,
    };
    setInvoices((prev) => [newInv, ...prev]);
    triggerToast("Invoice Issued", `Invoice ${newInv.invoiceNumber} created for £${newInv.totalAmount.toFixed(2)}.`, "success");
  };

  const settleInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: "paid" as const, paidAt: new Date().toISOString().split("T")[0] } : i))
    );
    triggerToast("Invoice Settled", "Payment recorded into practice ledger.", "success");
  };

  const resetDemoState = () => {
    setClients(INITIAL_CLIENTS);
    setSelectedClientId("client-legacy-wealth");
    setInvoices(INITIAL_INVOICES);
    triggerToast("State Reset", "All data returned to initial prototype baseline.", "info");
  };

  const metrics: PracticeMetrics = {
    activeLandlordsCount: clients.length,
    trackedPropertiesCount: clients.reduce((acc, c) => acc + c.properties.length, 0),
    missingDocumentsCount: clients.reduce((acc, c) => acc + c.documents.filter((d) => d.status === "pending").length, 0),
    approachingDeadlinesCount: 3,
    unbilledWipTotal: clients.reduce((acc, c) => acc + c.unbilledWip, 0),
    averageCycleDays: 4.8,
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
        addDlaEntry,
        addMileageLog,
        verifyBillOrDocument,
        generateTaxPackage,
        downloadAccountantCsvPack,
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
