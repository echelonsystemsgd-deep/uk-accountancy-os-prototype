import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoStoreProvider } from "@/lib/store";

export const viewport: Viewport = {
  themeColor: "#070A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://apexandco-advisory.co.uk"),
  title: "Apex & Co. Chartered Accountants | Private Client & Corporate Advisory",
  description:
    "Premier UK chartered accountants and strategic tax advisors for high-growth limited companies and owner-managed businesses.",
  keywords: [
    "UK Chartered Accountants",
    "Corporation Tax Planning",
    "ICAEW Chartered",
    "ACCA Certified",
    "Making Tax Digital",
    "R&D Tax Relief",
    "Mayfair Accountancy",
    "UK Ltd Company Accounting",
  ],
  authors: [{ name: "Mercian Wealth", url: "https://mercianwealth.com" }],
  creator: "Apex & Co. / Engineered by Mercian Wealth",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://apexandco-advisory.co.uk",
    title: "Apex & Co. Chartered Accountants | Private Client & Corporate Advisory",
    description:
      "Premier UK chartered accountants and strategic tax advisors for high-growth limited companies and owner-managed businesses.",
    siteName: "Apex & Co. Chartered Accountants",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex & Co. Chartered Accountants & Tax Advisors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex & Co. Chartered Accountants | Private Client & Corporate Advisory",
    description:
      "Premier UK chartered accountants and strategic tax advisors for high-growth limited companies and owner-managed businesses.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="dark">
      <body className="min-h-screen bg-[#070A0F] text-[#F8FAFC] antialiased selection:bg-gold-500/30 selection:text-white">
        <DemoStoreProvider>
          {children}
        </DemoStoreProvider>
      </body>
    </html>
  );
}
