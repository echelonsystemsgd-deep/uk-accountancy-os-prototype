"use client";

import React from "react";
import ClientPortalLayout from "@/components/shared/ClientPortalLayout";
import ClientMessages from "@/components/portal/ClientMessages";

export default function ClientMessagesPage() {
  return (
    <ClientPortalLayout
      pageTitle="Accountant Messages"
      pageSubtitle="Direct encrypted communication thread with your assigned Chartered Tax Adviser"
    >
      <ClientMessages />
    </ClientPortalLayout>
  );
}
