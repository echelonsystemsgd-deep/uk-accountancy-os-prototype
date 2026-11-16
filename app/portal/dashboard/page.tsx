"use client";

import React from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import ClientOverview from "@/components/portal/ClientOverview";

export default function ClientDashboardPage() {
  return (
    <ClientPortalLayout
      pageTitle="Client Property &amp; Tax Dashboard"
      pageSubtitle="Real-time multi-SPV financial monitoring, Section 24 mortgage relief tracking, and DLA capital ledger"
    >
      <ClientOverview />
    </ClientPortalLayout>
  );
}
