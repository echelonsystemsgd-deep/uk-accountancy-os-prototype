"use client";

import React from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import LandlordPipeline from "@/components/admin/LandlordPipeline";

export default function AdminPipelinePage() {
  return (
    <AdminConsoleLayout
      pageTitle="Enquiries Pipeline &amp; Conversion Funnel"
      pageSubtitle="Track prospective property landlord leads from website intake through consultation to signed engagement"
    >
      <LandlordPipeline />
    </AdminConsoleLayout>
  );
}
