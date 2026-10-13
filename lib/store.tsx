"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  ViewMode,
  PipelineStage,
  ClientRecord,
  MissingDocRadarItem,
  ClientInvoice,
  ClientDocument,
  IntakeSubmission,
} from "./types";

export interface ToastNotification {
  id: string;
  title: string;
  description: string;
  type: "success" | "info" | "warning";
  timestamp: string;
}

interface DemoStoreContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  isIntakeOpen: boolean;
  setIsIntakeOpen: (open: boolean) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
  calculatorTurnover: number;
  setCalculatorTurnover: (val: number) => void;
  calculatorMargin: number;
  setCalculatorMargin: (val: number) => void;
  clients: ClientRecord[];
  missingDocs: MissingDocRadarItem[];
  invoices: ClientInvoice[];
  documents: ClientDocument[];
  activeClientsCount: number;
  unbilledWipAmount: number;
  pendingVatCount: number;
  missingReceiptsCount: number;
  totalBilledCollected: number;
  notifications: ToastNotification[];
  removeNotification: (id: string) => void;
  addNotification: (title: string, description: string, type?: "success" | "info" | "warning") => void;
  addIntakeClient: (submission: IntakeSubmission) => void;
  bookCalendarMeeting: (details: { name: string; email: string; company: string; slot: string; note?: string }) => void;
  moveClientStage: (clientId: string, newStage: PipelineStage) => void;
  chaseDocument: (docId: string, channel: "whatsapp" | "email") => void;
  uploadDocument: (doc: {
    fileName: string;
    fileSize: string;
    category: ClientDocument["category"];
    source: ClientDocument["source"];
    ocrData?: ClientDocument["ocrData"];
  }) => void;
  payInvoice: (invoiceId: string) => void;
  resetDemoState: () => void;
  demoStateMutationsCount: number;
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: "cl-001",
    companyName: "Kensington BioTech Ltd",
    companyNumber: "12849021",
    directorName: "Dr. Alistair Vance",
    email: "a.vance@kensingtonbiotech.co.uk",
    phone: "+44 7700 900142",
    annualTurnover: 1850000,
    stage: "active_client",
    currentSoftware: "Xero",
    vatStatus: "Quarterly MTD (Due 7 Nov)",
    missingReceiptsCount: 0,
    lastContact: "Today at 09:15",
    unbilledWip: 2400,
    notes: "Patent Box election in progress; annual R&D claim prepared for HMRC submission.",
    createdAt: "2024-02-10",
  },
  {
    id: "cl-002",
    companyName: "Mayfair Private Capital Ltd",
    companyNumber: "13904218",
    directorName: "Sebastian Croft",
    email: "scroft@mayfaircapital.co.uk",
    phone: "+44 7700 900891",
    annualTurnover: 3400000,
    stage: "active_client",
    currentSoftware: "Xero",
    vatStatus: "Exempt / Partial Exemption",
    missingReceiptsCount: 3,
    lastContact: "Yesterday",
    unbilledWip: 3850,
    notes: "Q3 advisory retainer approved. Director loan account restructuring required before year end.",
    createdAt: "2024-01-14",
  },
  {
    id: "cl-003",
    companyName: "Vanguard Architecture Studio Ltd",
    companyNumber: "11782034",
    directorName: "Elena Rostova",
    email: "elena@vanguardstudio.co.uk",
    phone: "+44 7700 900552",
    annualTurnover: 920000,
    stage: "engagement_sent",
    currentSoftware: "QuickBooks",
    vatStatus: "Standard 20% Quarterly",
    missingReceiptsCount: 0,
    lastContact: "2 days ago",
    unbilledWip: 850,
    notes: "Engagement letter sent via DocuSign (£950/mo full compliance + board pack).",
    createdAt: "2024-03-01",
  },
  {
    id: "cl-004",
    companyName: "Helios Clean Energy Ltd",
    companyNumber: "14892019",
    directorName: "Marcus Thorne",
    email: "m.thorne@helioscleanenergy.co.uk",
    phone: "+44 7700 900331",
    annualTurnover: 1450000,
    stage: "kyc_pending",
    currentSoftware: "FreeAgent",
    vatStatus: "Pending MTD Linking",
    missingReceiptsCount: 0,
    lastContact: "3 days ago",
    unbilledWip: 650,
    notes: "Awaiting Director ID verification & proof of address for AML clearance.",
    createdAt: "2024-03-08",
  },
  {
    id: "cl-005",
    companyName: "Cobalt FinTech Solutions Ltd",
    companyNumber: "15102944",
    directorName: "Siddharth Nair",
    email: "sid@cobaltfintech.io",
    phone: "+44 7700 900718",
    annualTurnover: 650000,
    stage: "new_intake",
    currentSoftware: "Xero",
    vatStatus: "Registered MTD",
    missingReceiptsCount: 0,
    lastContact: "Just now",
    unbilledWip: 0,
    notes: "Inquired via Acquisition front-end seeking Corporation Tax planning & R&D relief.",
    createdAt: "2024-03-12",
  },
  {
    id: "cl-006",
    companyName: "St. James Luxury Hospitality Ltd",
    companyNumber: "10984712",
    directorName: "Julian Beaumont",
    email: "j.beaumont@stjamesgroup.co.uk",
    phone: "+44 7700 900445",
    annualTurnover: 2800000,
    stage: "active_client",
    currentSoftware: "Xero",
    vatStatus: "Quarterly MTD (Due 7 Nov)",
    missingReceiptsCount: 4,
    lastContact: "1 day ago",
    unbilledWip: 700,
    notes: "Pending 4 month-end supplier VAT receipts from Harrods & Fortnum accounts.",
    createdAt: "2023-11-20",
  },
];

const INITIAL_MISSING_DOCS: MissingDocRadarItem[] = [
  {
    id: "md-101",
    clientId: "cl-006",
    companyName: "St. James Luxury Hospitality Ltd",
    directorName: "Julian Beaumont",
    email: "j.beaumont@stjamesgroup.co.uk",
    phone: "+44 7700 900445",
    documentType: "Amex Statement & 4 Missing Receipts",
    taxPeriod: "September 2026 VAT Quarter",
    daysOverdue: 6,
    urgency: "critical",
    chasedCount: 2,
    lastChasedAt: "11 Oct 2026",
  },
  {
    id: "md-102",
    clientId: "cl-002",
    companyName: "Mayfair Private Capital Ltd",
    directorName: "Sebastian Croft",
    email: "scroft@mayfaircapital.co.uk",
    phone: "+44 7700 900891",
    documentType: "Director Loan Repayment Proof & Barclays Statement",
    taxPeriod: "Q3 Statutory Review",
    daysOverdue: 4,
    urgency: "high",
    chasedCount: 1,
    lastChasedAt: "12 Oct 2026",
  },
  {
    id: "md-103",
    clientId: "cl-007",
    companyName: "Brompton Robotics Ltd",
    directorName: "Clara Hughes",
    email: "clara@bromptonrobotics.com",
    phone: "+44 7700 900662",
    documentType: "Overseas AWS Cloud Services VAT Receipt (£3,420)",
    taxPeriod: "August-September MTD",
    daysOverdue: 3,
    urgency: "high",
    chasedCount: 1,
    lastChasedAt: "10 Oct 2026",
  },
  {
    id: "md-104",
    clientId: "cl-008",
    companyName: "Belgravia Medical Aesthetics Ltd",
    directorName: "Dr. Camilla Sterling",
    email: "c.sterling@belgravia-aesthetics.co.uk",
    phone: "+44 7700 900384",
    documentType: "Equipment Lease Schedule & Capital Allowance Receipt",
    taxPeriod: "CT600 Year-End 2026",
    daysOverdue: 1,
    urgency: "medium",
    chasedCount: 0,
  },
];

const INITIAL_INVOICES: ClientInvoice[] = [
  {
    id: "inv-2026-089",
    invoiceNumber: "INV-2026-089",
    clientName: "Kensington BioTech Ltd",
    description: "Q3 Strategic Retainer & R&D Tax Relief HMRC Preparation",
    issueDate: "01 Oct 2026",
    dueDate: "15 Oct 2026",
    amountNet: 1850.0,
    vatAmount: 370.0,
    amountTotal: 2220.0,
    status: "awaiting_payment",
  },
  {
    id: "inv-2026-088",
    invoiceNumber: "INV-2026-088",
    clientName: "Mayfair Private Capital Ltd",
    description: "Corporation Tax Architecture & Executive Dividend Restructuring",
    issueDate: "25 Sep 2026",
    dueDate: "09 Oct 2026",
    amountNet: 2450.0,
    vatAmount: 490.0,
    amountTotal: 2940.0,
    status: "paid",
    paidAt: "08 Oct 2026 via Stripe Corporate Card",
    paymentMethod: "Stripe UK •••• 4242",
  },
  {
    id: "inv-2026-087",
    invoiceNumber: "INV-2026-087",
    clientName: "Kensington BioTech Ltd",
    description: "Year-End Statutory Filing & Confirmation Statement Submission",
    issueDate: "15 Sep 2026",
    dueDate: "30 Sep 2026",
    amountNet: 1200.0,
    vatAmount: 240.0,
    amountTotal: 1440.0,
    status: "paid",
    paidAt: "28 Sep 2026 via BACS Transfer",
    paymentMethod: "BACS Faster Payments",
  },
];

const INITIAL_DOCUMENTS: ClientDocument[] = [
  {
    id: "doc-501",
    fileName: "AWS_Cloud_Infrastructure_Sept26.pdf",
    fileSize: "412 KB",
    uploadedAt: "12 Oct 2026, 14:22",
    category: "Receipt",
    source: "web_dropzone",
    ocrData: {
      merchant: "Amazon Web Services EMEA SARL",
      date: "28 Sep 2026",
      amountNet: 1450.0,
      vatAmount: 290.0,
      amountTotal: 1740.0,
      isTaxDeductible: true,
      suggestedCategory: "Software & Cloud Services",
      confidence: 99.4,
    },
  },
  {
    id: "doc-502",
    fileName: "Laboratory_Reagents_Batch44.pdf",
    fileSize: "1.2 MB",
    uploadedAt: "08 Oct 2026, 11:05",
    category: "Receipt",
    source: "mobile_camera",
    ocrData: {
      merchant: "Sigma-Aldrich Chemical UK Ltd",
      date: "04 Oct 2026",
      amountNet: 3120.0,
      vatAmount: 624.0,
      amountTotal: 3744.0,
      isTaxDeductible: true,
      suggestedCategory: "R&D Consumables (100% Tax Relief)",
      confidence: 98.7,
    },
  },
  {
    id: "doc-503",
    fileName: "Barclays_Corporate_Statement_Sept26.pdf",
    fileSize: "680 KB",
    uploadedAt: "01 Oct 2026, 09:30",
    category: "Bank Statement",
    source: "web_dropzone",
  },
];

const DemoStoreContext = createContext<DemoStoreContextType | undefined>(undefined);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewMode>("prospect");
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [calculatorTurnover, setCalculatorTurnover] = useState<number>(750000);
  const [calculatorMargin, setCalculatorMargin] = useState<number>(25);

  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [missingDocs, setMissingDocs] = useState<MissingDocRadarItem[]>(INITIAL_MISSING_DOCS);
  const [invoices, setInvoices] = useState<ClientInvoice[]>(INITIAL_INVOICES);
  const [documents, setDocuments] = useState<ClientDocument[]>(INITIAL_DOCUMENTS);

  const [activeClientsCount, setActiveClientsCount] = useState<number>(142);
  const [unbilledWipAmount, setUnbilledWipAmount] = useState<number>(8450);
  const [pendingVatCount, setPendingVatCount] = useState<number>(6);
  const [missingReceiptsCount, setMissingReceiptsCount] = useState<number>(14);
  const [totalBilledCollected, setTotalBilledCollected] = useState<number>(4380);

  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [demoStateMutationsCount, setDemoStateMutationsCount] = useState<number>(0);

  const addNotification = (
    title: string,
    description: string,
    type: "success" | "info" | "warning" = "info"
  ) => {
    const id = "notif-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
    setNotifications((prev) => [{ id, title, description, type, timestamp: "Just now" }, ...prev]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addIntakeClient = (submission: IntakeSubmission) => {
    const newClient: ClientRecord = {
      id: "cl-" + (Date.now() % 10000),
      companyName: submission.companyName,
      companyNumber: (15000000 + Math.floor(Math.random() * 999999)).toString(),
      directorName: submission.directorName,
      email: submission.email,
      phone: submission.phone,
      annualTurnover:
        submission.turnoverBracket.includes("5M")
          ? 3500000
          : submission.turnoverBracket.includes("1M")
          ? 1250000
          : submission.turnoverBracket.includes("500k")
          ? 650000
          : 280000,
      stage: "new_intake",
      currentSoftware: (submission.currentSoftware as any) || "Xero",
      vatStatus: "Assessment Scheduled",
      missingReceiptsCount: 0,
      lastContact: "Just now (Intake Drawer)",
      unbilledWip: 0,
      notes: `Bottlenecks identified: ${submission.bottlenecks.join(", ")}. Preferred consultation: ${submission.preferredConsultationTime}.`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClients((prev) => [newClient, ...prev]);
    setActiveClientsCount((prev) => prev + 1);
    setDemoStateMutationsCount((prev) => prev + 1);

    addNotification(
      "New Intake Registered in Practice Hub",
      `${submission.companyName} was added to the Partner Pipeline under 'New Intake'.`,
      "success"
    );
  };

  const bookCalendarMeeting = (details: {
    name: string;
    email: string;
    company: string;
    slot: string;
    note?: string;
  }) => {
    const newClient: ClientRecord = {
      id: "cl-" + (Date.now() % 10000),
      companyName: details.company,
      companyNumber: (15000000 + Math.floor(Math.random() * 999999)).toString(),
      directorName: details.name,
      email: details.email,
      phone: "+44 7700 " + Math.floor(100000 + Math.random() * 900000),
      annualTurnover: 850000,
      stage: "new_intake",
      currentSoftware: "Xero",
      vatStatus: "Calendar Consultation Confirmed",
      missingReceiptsCount: 0,
      lastContact: `Meeting Booked: ${details.slot}`,
      unbilledWip: 0,
      notes: `Direct Calendar Slot: ${details.slot}. Primary note: ${details.note || "Strategic tax & Corporation Tax review requested."}`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClients((prev) => [newClient, ...prev]);
    setActiveClientsCount((prev) => prev + 1);
    setDemoStateMutationsCount((prev) => prev + 1);

    addNotification(
      "Direct Meeting Confirmed",
      `15-min Strategic Consultation locked for ${details.slot} with ${details.name} (${details.company}). Synced to Practice Pipeline!`,
      "success"
    );
  };

  const moveClientStage = (clientId: string, newStage: PipelineStage) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, stage: newStage } : c))
    );
    setDemoStateMutationsCount((prev) => prev + 1);

    const client = clients.find((c) => c.id === clientId);
    if (client) {
      const stageLabels: Record<PipelineStage, string> = {
        new_intake: "New Intake",
        kyc_pending: "KYC / AML Pending",
        engagement_sent: "Engagement Sent",
        active_client: "Active Practice Client",
      };
      addNotification(
        "Client Pipeline Updated",
        `${client.companyName} transitioned to '${stageLabels[newStage]}'.`,
        "info"
      );
    }
  };

  const chaseDocument = (docId: string, channel: "whatsapp" | "email") => {
    const item = missingDocs.find((d) => d.id === docId);
    if (!item) return;

    setMissingDocs((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              chasedCount: d.chasedCount + 1,
              lastChasedAt: "Just now (" + (channel === "whatsapp" ? "WhatsApp API" : "Email") + ")",
            }
          : d
      )
    );
    setDemoStateMutationsCount((prev) => prev + 1);

    addNotification(
      `Automated Chaser Dispatched via ${channel.toUpperCase()}`,
      `High-priority request sent to ${item.directorName} (${item.companyName}) with magic document upload link.`,
      "success"
    );
  };

  const uploadDocument = (doc: {
    fileName: string;
    fileSize: string;
    category: ClientDocument["category"];
    source: ClientDocument["source"];
    ocrData?: ClientDocument["ocrData"];
  }) => {
    const newDoc: ClientDocument = {
      id: "doc-" + Date.now(),
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      uploadedAt: "Just now",
      category: doc.category,
      source: doc.source,
      ocrData: doc.ocrData,
    };

    setDocuments((prev) => [newDoc, ...prev]);

    // Instantly decrease missing receipts in Partner Radar & KPIs!
    setMissingReceiptsCount((prev) => Math.max(0, prev - 1));

    // Resolve or update first missing doc in radar
    if (missingDocs.length > 0) {
      const resolved = missingDocs[0];
      setMissingDocs((prev) => prev.slice(1));
      addNotification(
        "Missing Receipt Resolved & Synced!",
        `OCR processed '${doc.fileName}'. Missing Receipts counter decremented in Partner Hub from ${missingReceiptsCount} to ${Math.max(0, missingReceiptsCount - 1)}.`,
        "success"
      );
    } else {
      addNotification(
        "Document Categorized by OCR",
        `'${doc.fileName}' uploaded and verified for UK Corporation Tax deduction.`,
        "success"
      );
    }

    setDemoStateMutationsCount((prev) => prev + 1);
  };

  const payInvoice = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (!invoice || invoice.status === "paid") return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "paid",
              paidAt: "Just now via Stripe Corporate Checkout",
              paymentMethod: "Stripe UK •••• 4242 (Instant Settlement)",
            }
          : inv
      )
    );

    // Update practice finances
    setUnbilledWipAmount((prev) => Math.max(0, prev - invoice.amountNet));
    setTotalBilledCollected((prev) => prev + invoice.amountTotal);
    setDemoStateMutationsCount((prev) => prev + 1);

    addNotification(
      "Payment Confirmed via Stripe UK",
      `Invoice ${invoice.invoiceNumber} (£${invoice.amountTotal.toLocaleString("en-GB")}) marked as Paid. Practice WIP updated.`,
      "success"
    );
  };

  const resetDemoState = () => {
    setClients(INITIAL_CLIENTS);
    setMissingDocs(INITIAL_MISSING_DOCS);
    setInvoices(INITIAL_INVOICES);
    setDocuments(INITIAL_DOCUMENTS);
    setActiveClientsCount(142);
    setUnbilledWipAmount(8450);
    setPendingVatCount(6);
    setMissingReceiptsCount(14);
    setTotalBilledCollected(4380);
    setCalculatorTurnover(750000);
    setCalculatorMargin(25);
    setDemoStateMutationsCount(0);

    addNotification(
      "Demo State Pristinely Reset",
      "All metrics, client pipelines, invoices, and dropzone files have been restored to initial demo benchmark.",
      "info"
    );
  };

  return (
    <DemoStoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        isIntakeOpen,
        setIsIntakeOpen,
        isCalendarOpen,
        setIsCalendarOpen,
        isWhatsAppOpen,
        setIsWhatsAppOpen,
        calculatorTurnover,
        setCalculatorTurnover,
        calculatorMargin,
        setCalculatorMargin,
        clients,
        missingDocs,
        invoices,
        documents,
        activeClientsCount,
        unbilledWipAmount,
        pendingVatCount,
        missingReceiptsCount,
        totalBilledCollected,
        notifications,
        removeNotification,
        addNotification,
        addIntakeClient,
        bookCalendarMeeting,
        moveClientStage,
        chaseDocument,
        uploadDocument,
        payInvoice,
        resetDemoState,
        demoStateMutationsCount,
      }}
    >
      {children}
    </DemoStoreContext.Provider>
  );
}

export function useDemoStore() {
  const context = useContext(DemoStoreContext);
  if (!context) {
    throw new Error("useDemoStore must be used within a DemoStoreProvider");
  }
  return context;
}
