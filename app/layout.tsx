import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/store";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kptc.co.uk"),
  title: "Kai Accountants / KP Tax Consultants | UK Property Accountancy Practice OS",
  description:
    "Chartered Tax Advisers and Chartered Accountants specializing in property taxation, Section 24 mortgage interest relief, SPV company purchases, and landlord Self Assessment.",
  keywords: [
    "UK Property Accountant",
    "Section 24 Mortgage Relief",
    "Landlord Tax Return",
    "SPV Limited Company Property",
    "Chartered Tax Adviser CTA",
    "Chartered Accountant FCA",
    "Making Tax Digital ITSA",
    "Buy to Let Accounts",
  ],
  authors: [{ name: "Mercian Wealth Automation", url: "https://kptc.co.uk" }],
  creator: "Kai Accountants / KP Tax Consultants",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kptc.co.uk",
    title: "Kai Accountants / KP Tax Consultants | UK Property Accountancy Practice OS",
    description:
      "Chartered Tax Advisers and Chartered Accountants specializing in property taxation, Section 24 mortgage interest relief, SPV company purchases, and landlord Self Assessment.",
    siteName: "Kai Accountants / KP Tax Consultants",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
