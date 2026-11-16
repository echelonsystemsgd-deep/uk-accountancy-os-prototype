"use client";

import React from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import PartnerRadar from "@/components/admin/PartnerRadar";

export default function AdminDashboardPage() {
  return (
    <AdminConsoleLayout
      pageTitle="Practice Operations &amp; Partner Radar"
      pageSubtitle="Senior partner oversight across active SPV clients, fee pipeline, and Making Tax Digital readiness"
    >
      <PartnerRadar />
    </AdminConsoleLayout>
  );
}
