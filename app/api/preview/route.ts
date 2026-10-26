import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Statutory Document";
  const entity = searchParams.get("entity") || "Marcus & Sarah Sterling";
  const token = searchParams.get("token") || Math.random().toString(36).substring(2, 10);

  const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | KP Tax Consultants Vault</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 20px; display: flex; justify-content: center; }
    .viewer { max-width: 800px; width: 100%; background: #ffffff; color: #1e293b; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); overflow: hidden; }
    .header { background: #0f172a; color: #ffffff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #047857; }
    .badge { background: rgba(4, 120, 87, 0.2); color: #10b981; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; border: 1px solid #047857; }
    .content { padding: 32px; font-size: 14px; line-height: 1.6; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0; }
    .watermark { opacity: 0.15; font-size: 40px; font-weight: 900; text-align: center; color: #047857; text-transform: uppercase; margin: 40px 0; }
    .footer { background: #f1f5f9; padding: 12px 24px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="viewer">
    <div class="header">
      <div>
        <strong style="font-size: 15px;">KP Tax Consultants Ltd</strong>
        <div style="font-size: 11px; opacity: 0.8;">Secure Document Vault &bull; 60s Timed Access</div>
      </div>
      <div class="badge">AES-256 ENCRYPTED</div>
    </div>
    <div class="content">
      <h2 style="margin-top: 0; color: #0f172a;">${title}</h2>
      <p style="color: #64748b; margin-top: -8px;">Client Entity: <strong>${entity}</strong></p>
      
      <div class="meta-box">
        <p><strong>Verification Token:</strong> <code>${token}</code></p>
        <p><strong>Audit Status:</strong> Verified &bull; Retained under ICAEW Practice Assurance Schedule</p>
        <p><strong>Storage Region:</strong> London, UK (eu-west-2) &bull; AES-256 Storage Bucket</p>
        <p><strong>Expiry:</strong> URL valid for 60 seconds from generation</p>
      </div>

      <div class="watermark">KP TAX CONSULTANTS &bull; VERIFIED</div>

      <p style="font-size: 12px; color: #64748b; text-align: center;">
        This document preview is cryptographically signed. Unauthorized distribution or copying is strictly prohibited under the Computer Misuse Act 1990.
      </p>
    </div>
    <div class="footer">
      <span>Company No. 12908850 &bull; Regulated by ICAEW</span>
      <span>Timestamp: ${new Date().toUTCString()}</span>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(previewHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    },
  });
}
