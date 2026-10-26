import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, entityType, portfolioSize, annualRent, mortgageInterest, notes } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing fullName or email" }, { status: 400 });
    }

    const leadId = `lead-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Log the lead capture for practice notifications
    console.log(`[Practice Intake Lead Captured]: ${fullName} (${email}, ${phone}) - ${entityType}`);

    return NextResponse.json({
      success: true,
      leadId,
      fullName,
      email,
      phone: phone || "+44 7700 900812",
      entityType,
      portfolioSize,
      annualRent,
      mortgageInterest,
      notes,
      assignedAccountant: "Kalpesh Patel FCA",
      capturedAt: timestamp,
      status: "intake_submitted",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process intake lead", details: String(error) }, { status: 500 });
  }
}
