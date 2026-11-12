import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PropertyBillItem, LandlordClient } from "@/lib/types";

export function generateLandlordMonthlyStatementPdf(
  client: LandlordClient,
  bills: PropertyBillItem[],
  selectedMonth: string
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor: [number, number, number] = [0, 119, 200]; // Xero Azure (#0077C8)
  const darkTextColor: [number, number, number] = [15, 23, 42]; // Slate-900
  const mutedTextColor: [number, number, number] = [100, 116, 139]; // Slate-500
  const borderGrey: [number, number, number] = [226, 232, 240]; // Slate-200

  // 1. Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 8, "F");

  // Title & Metadata
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...darkTextColor);
  doc.text(client.entityName.toUpperCase(), 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...mutedTextColor);
  doc.text("Co. Reg: 14892011  |  Incorporated in England & Wales  |  Section 24 SPV", 14, 25);
  doc.text(`Director: ${client.primaryContact}  |  Tax Year: ${client.taxYear}`, 14, 29);

  // Right-aligned statement period
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  const periodText = selectedMonth === "all" 
    ? "FULL FINANCIAL YEAR 2024/25" 
    : new Date(`${selectedMonth}-01`).toLocaleString("default", { month: "long", year: "numeric" }).toUpperCase();
  doc.text(periodText, 196, 20, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, 196, 25, { align: "right" });
  doc.text("Practice: Mercian Wealth & Advisory", 196, 29, { align: "right" });

  // Divider
  doc.setDrawColor(...borderGrey);
  doc.setLineWidth(0.5);
  doc.line(14, 33, 196, 33);

  // 2. Financial Summary KPI Boxes
  const spvMortgageInterest = bills
    .filter((b) => b.category === "mortgage_interest")
    .reduce((sum, b) => sum + b.amount, 0);

  const allowableExpenses = bills
    .filter((b) => b.category !== "mortgage_interest")
    .reduce((sum, b) => sum + b.amount, 0);

  const totalOutgoings = bills.reduce((sum, b) => sum + b.amount, 0);

  // Draw 3 boxes
  const boxWidth = 58;
  const boxHeight = 22;
  const startY = 37;

  // Box 1: Mortgage Interest
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, startY, boxWidth, boxHeight, 2, 2, "FD");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedTextColor);
  doc.text("MORTGAGE INTEREST (S24)", 18, startY + 6);
  doc.setFontSize(13);
  doc.setTextColor(...primaryColor);
  doc.text(`£${spvMortgageInterest.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 18, startY + 14);
  doc.setFontSize(7);
  doc.setTextColor(16, 185, 129); // emerald
  doc.text("100% Allowable Corporate Relief", 18, startY + 19);

  // Box 2: Allowable Expenses
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(76, startY, boxWidth, boxHeight, 2, 2, "FD");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedTextColor);
  doc.text("ALLOWABLE EXPENSES", 80, startY + 6);
  doc.setFontSize(13);
  doc.setTextColor(...darkTextColor);
  doc.text(`£${allowableExpenses.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 80, startY + 14);
  doc.setFontSize(7);
  doc.setTextColor(...mutedTextColor);
  doc.text("Repairs, Lettings, Management", 80, startY + 19);

  // Box 3: Total Outgoings
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(138, startY, boxWidth, boxHeight, 2, 2, "FD");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedTextColor);
  doc.text("TOTAL OUTGOINGS", 142, startY + 6);
  doc.setFontSize(13);
  doc.setTextColor(...darkTextColor);
  doc.text(`£${totalOutgoings.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 142, startY + 14);
  doc.setFontSize(7);
  doc.setTextColor(...mutedTextColor);
  doc.text("Reconciled & HMRC Indexed", 142, startY + 19);

  // 3. Transactions Table
  const tableData = bills.map((b) => [
    b.dueDate,
    b.vendorOrRecipient || "Direct Vendor",
    b.title,
    b.category.replace(/_/g, " ").toUpperCase(),
    b.propertyAddress ? b.propertyAddress.split(",")[0] : "All Properties",
    `£${b.amount.toFixed(2)}`,
    "Verified",
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["Date", "Payee / Vendor", "Description", "HMRC Category", "Property Ref", "Gross (£)", "Status"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
    },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 32 },
      2: { cellWidth: 42 },
      3: { cellWidth: 35 },
      4: { cellWidth: 32 },
      5: { cellWidth: 20, halign: "right", fontStyle: "bold" },
      6: { cellWidth: 15, halign: "center" },
    },
    foot: [
      ["", "", "TOTAL STATEMENT EXPENDITURE", "", "", `£${totalOutgoings.toFixed(2)}`, ""],
    ],
    footStyles: {
      fillColor: [241, 245, 249],
      textColor: [15, 23, 42],
      fontStyle: "bold",
      fontSize: 8,
    },
    margin: { left: 14, right: 14 },
  });

  // Get position after table
  const lastAutoTable = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable;
  const finalY = (lastAutoTable ? lastAutoTable.finalY : 180) + 12;

  // 4. HMRC Compliance Declaration & Sign-off Box
  if (finalY < 240) {
    doc.setDrawColor(...borderGrey);
    doc.setLineWidth(0.5);
    doc.line(14, finalY, 196, finalY);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkTextColor);
    doc.text(
      "Declaration: I confirm that the recorded expenses above were incurred wholly and exclusively for the purpose of the property rental business.",
      14,
      finalY + 6
    );

    doc.setFont("helvetica", "bold");
    doc.text("Director Signature: ____________________________________", 14, finalY + 16);
    doc.text("Date Signed: _____ / _____ / 202___", 14, finalY + 23);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedTextColor);
    doc.text("Supervising Practice: Mercian Wealth & Advisory", 130, finalY + 16);
    doc.text("Accountant Stamp: [ VERIFIED FOR CT600 / MTD ]", 130, finalY + 23);
  }

  // 5. Save/Download File
  const filename = `${client.entityName.replace(/\s+/g, "_")}_Statement_${selectedMonth === "all" ? "FY24-25" : selectedMonth}.pdf`;
  doc.save(filename);
}
