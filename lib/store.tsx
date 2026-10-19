"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ScreenView,
  LandlordClient,
  CommunicationLogItem,
  PracticeMetrics,
} from "./types";

interface ToastNotification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
}

interface DemoContextType {
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
  uploadDocument: (clientId: string, documentId: string, customFileName?: string) => void;
  sendChaser: (clientId: string, channel: "whatsapp" | "sms" | "email", customMessage?: string) => void;
  resetDemoState: () => void;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  triggerToast: (title: string, message: string, type?: "success" | "warning" | "info") => void;
}

const INITIAL_CLIENTS: LandlordClient[] = [
  {
    id: "client-sterling",
    entityName: "Marcus & Sarah Sterling",
    entityType: "joint",
    primaryContact: "Marcus Sterling",
    email: "marcus.sterling@synthetic-mail.co.uk",
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
        email: "marcus.sterling@synthetic-mail.co.uk",
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
        email: "sarah.sterling@synthetic-mail.co.uk",
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
    email: "p.johal@synthetic-oakwood.co.uk",
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
        email: "p.johal@synthetic-oakwood.co.uk",
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
    email: "t.rahman@synthetic-consultant.co.uk",
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
        email: "t.rahman@synthetic-consultant.co.uk",
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
    email: "rupert@synthetic-kensington.co.uk",
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
        email: "rupert@synthetic-kensington.co.uk",
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
    email: "elena.vance@synthetic-vance.co.uk",
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
      "Hi Marcus, Kalpesh here from Kai Accountants. We are finalizing your 2024/25 property tax return. We still need your NatWest mortgage certificate for 14 High Street. You can snap a photo directly using your secure link: https://kptc-portal.uk/d/ms-7281",
    sentAt: "Yesterday at 14:32",
    status: "read",
    triggeredBy: "Kalpesh Patel FCA",
  },
  {
    id: "log-2",
    clientId: "client-oakwood",
    entityName: "Oakwood Property SPV Ltd",
    channel: "email",
    recipient: "p.johal@synthetic-oakwood.co.uk",
    messageBody:
      "Dear Pritam, please upload the Shawbrook commercial mortgage certificate for 7-11 Station Parade to reconcile your SPV company deductible expenses.",
    sentAt: "18 Oct 2026 at 09:15",
    status: "delivered",
    triggeredBy: "Pritpal Chaggar CTA",
  },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<ScreenView>("radar");
  const [selectedClientId, setSelectedClientId] = useState<string>("client-sterling");
  const [clients, setClients] = useState<LandlordClient[]>(INITIAL_CLIENTS);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLogItem[]>(INITIAL_LOGS);
  const [mobileFrameEnabled, setMobileFrameEnabled] = useState<boolean>(false);
  const [activeChaserDocumentId, setActiveChaserDocumentId] = useState<string | null>("doc-1");
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Find active client
  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  // Calculate live practice metrics
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
    activeLandlordsCount: 42, // Synthetic total portfolio count across firm
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

  // Upload document handler: marks document resolved and syncs state
  const uploadDocument = (clientId: string, documentId: string, customFileName?: string) => {
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

        // Check if all documents are now verified
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

  // Send chaser handler: logs reminder, updates timestamp
  const sendChaser = (clientId: string, channel: "whatsapp" | "sms" | "email", customMessage?: string) => {
    const targetClient = clients.find((c) => c.id === clientId) || activeClient;
    const recipient =
      channel === "whatsapp" || channel === "sms" ? targetClient.phone : targetClient.email;

    const newLog: CommunicationLogItem = {
      id: `log-${Date.now()}`,
      clientId: targetClient.id,
      entityName: targetClient.entityName,
      channel,
      recipient,
      messageBody:
        customMessage ||
        `Hi ${targetClient.primaryContact.split(" ")[0]}, Kalpesh here from Kai Accountants. We are finalizing your 2024/25 property tax return. Please upload your missing documents via your secure portal.`,
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

  // Reset demo state back to pristine baseline
  const resetDemoState = () => {
    setClients(INITIAL_CLIENTS);
    setCommunicationLogs(INITIAL_LOGS);
    setSelectedClientId("client-sterling");
    setActiveChaserDocumentId("doc-1");
    triggerToast(
      "Demo State Reset",
      "All synthetic landlord data, missing document checklists, and metrics have been reset to pristine baseline.",
      "info"
    );
  };

  return (
    <DemoContext.Provider
      value={{
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
        uploadDocument,
        sendChaser,
        resetDemoState,
        toasts,
        removeToast,
        triggerToast,
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
