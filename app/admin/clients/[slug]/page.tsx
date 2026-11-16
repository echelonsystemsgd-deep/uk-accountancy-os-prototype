"use client";

import React from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import PropertyWorkspace from "@/components/admin/PropertyWorkspace";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminClientDetailPage({ params }: { params: { slug: string } }) {
  const formattedName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <AdminConsoleLayout
      pageTitle={`Client Workspace: ${formattedName}`}
      pageSubtitle="Direct partner ledger access, Section 24 portfolio relief schedules, and DLA balance monitoring"
      actions={
        <Link
          href="/admin/clients"
          className="px-3.5 py-1.5 rounded-lg bg-[#14241d] border border-[#1e382b] text-xs font-mono text-[#8a9d94] hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>
      }
    >
      <PropertyWorkspace />
    </AdminConsoleLayout>
  );
}
