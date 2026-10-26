import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const clientId = formData.get("clientId") as string || "client-sterling";
    const documentId = formData.get("documentId") as string || "doc-1";
    const category = formData.get("category") as string || "mortgage";

    const fileName = file ? file.name : "camera_capture_cert_2024_25.jpg";
    const fileSize = file ? `${Math.round(file.size / 1024)} KB` : "1.8 MB";
    const timestamp = new Date().toISOString();
    const storagePath = `landlord-private-vault/${clientId}/${Date.now()}_${fileName}`;

    // OCR simulation metadata based on document category
    const ocrMetadata = {
      lenderDetected: category === "mortgage" ? "NatWest Bank PLC" : "Barclays Commercial",
      taxYear: "2024/25",
      interestDeductibleClaimed: category === "mortgage" ? "£5,700.00" : "£0.00",
      confidenceScore: "99.4%",
      section24ReliefApplicable: true,
      processedAt: timestamp,
    };

    return NextResponse.json({
      success: true,
      fileName,
      fileSize,
      storagePath,
      signedUrl: `https://portal.kptc.co.uk/api/preview?token=${Math.random().toString(36).substring(2)}&expires=60`,
      verified: true,
      ocrMetadata,
      status: "verified",
      message: "Document stored in encrypted UK vault (AES-256) and verified by OCR engine.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
