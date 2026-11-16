"use client";

import React from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import ClientDocumentVault from "@/components/portal/ClientDocumentVault";

export default function ClientDocumentsPage() {
  return (
    <ClientPortalLayout
      pageTitle="Document Requests &amp; Private Vault"
      pageSubtitle="Encrypted UK private storage (AES-256) with automated OCR heuristic parsing and malware verification"
    >
      <ClientDocumentVault />
    </ClientPortalLayout>
  );
}
