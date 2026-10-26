import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "csv";

  // Practice Landlord Audit Data
  const practiceData = [
    {
      entityName: "Marcus & Sarah Sterling",
      entityType: "Joint Landlord",
      primaryContact: "Marcus Sterling",
      phone: "+44 7700 900142",
      email: "marcus.sterling@sterlingholdings.co.uk",
      propertiesCount: 4,
      pendingDocs: 2,
      assignedAccountant: "Kalpesh Patel FCA",
      status: "Chasing Documents",
      unbilledWip: 2450,
      missingItems: "NatWest Mortgage Cert (14 High St); Sarah Proof of Address",
    },
    {
      entityName: "Sterling Property Holdings Ltd",
      entityType: "SPV Limited Company",
      primaryContact: "Marcus Sterling",
      phone: "+44 7700 900142",
      email: "accounts@sterlingholdings.co.uk",
      propertiesCount: 2,
      pendingDocs: 0,
      assignedAccountant: "Pritpal Chaggar CTA",
      status: "Review Ready",
      unbilledWip: 1850,
      missingItems: "None - Ready for CT600",
    },
    {
      entityName: "Oakwood Property SPV Ltd",
      entityType: "SPV Limited Company",
      primaryContact: "Pritam Johal",
      phone: "+44 7700 900512",
      email: "p.johal@oakwoodspv.co.uk",
      propertiesCount: 3,
      pendingDocs: 2,
      assignedAccountant: "Pritpal Chaggar CTA",
      status: "Chasing Documents",
      unbilledWip: 3200,
      missingItems: "Shawbrook Commercial Loan Statement; Legal Completion Statement",
    },
    {
      entityName: "Dr. Tariq Rahman",
      entityType: "Individual Landlord",
      primaryContact: "Dr. Tariq Rahman",
      phone: "+44 7700 900881",
      email: "t.rahman@cheltmed.co.uk",
      propertiesCount: 1,
      pendingDocs: 1,
      assignedAccountant: "Kalpesh Patel FCA",
      status: "KYC Pending",
      unbilledWip: 1850,
      missingItems: "Proof of Address",
    },
  ];

  if (type === "json") {
    return NextResponse.json({
      practice: "KP Tax Consultants Ltd / KP Accountants",
      exportedAt: new Date().toISOString(),
      records: practiceData,
    });
  }

  // Generate standard RFC 4180 CSV
  const headers = [
    "Entity Name",
    "Entity Type",
    "Primary Contact",
    "Phone",
    "Email",
    "Properties Count",
    "Pending Documents",
    "Assigned Accountant",
    "Status",
    "Unbilled WIP (GBP)",
    "Missing Items",
  ];

  const csvRows = [
    headers.join(","),
    ...practiceData.map((row) =>
      [
        `"${row.entityName}"`,
        `"${row.entityType}"`,
        `"${row.primaryContact}"`,
        `"${row.phone}"`,
        `"${row.email}"`,
        row.propertiesCount,
        row.pendingDocs,
        `"${row.assignedAccountant}"`,
        `"${row.status}"`,
        row.unbilledWip,
        `"${row.missingItems}"`,
      ].join(",")
    ),
  ];

  const csvContent = csvRows.join("\r\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="KP_Tax_Consultants_Practice_Audit_${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
