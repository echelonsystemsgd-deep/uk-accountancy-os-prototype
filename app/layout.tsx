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
  metadataBase: new URL("https://mercianwealth.com"),
  title: "Mercian Wealth | UK Accountancy OS & Property SPV Tax Suite",
  description:
    "High-converting digital infrastructure and autonomous accounting OS for UK property portfolio landlords and chartered accountancy practices.",
  alternates: {
    canonical: "https://mercianwealth.com",
  },
  keywords: [
    "Mercian Wealth",
    "Mercian Tax & Ledger",
    "UK Property Accountant OS",
    "Section 24 Mortgage Relief",
    "SPV Limited Company Property",
    "Making Tax Digital ITSA",
    "Autonomous Accountancy Infrastructure",
  ],
  authors: [{ name: "Mercian Wealth", url: "https://mercianwealth.com" }],
  creator: "Mercian Wealth",
  icons: {
    icon: [
      { url: "/icon.svg?v=kptc", type: "image/svg+xml" },
      { url: "/favicon.ico?v=kptc", sizes: "any" },
      { url: "/logo.png?v=kptc", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icon.svg?v=kptc",
    apple: [
      { url: "/apple-touch-icon.png?v=kptc", sizes: "180x180", type: "image/png" },
      { url: "/logo.png?v=kptc", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kptc.co.uk",
    title: "KP Tax Consultants | UK Property Tax Specialists",
    description:
      "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising portfolio landlords, SPV limited companies, and buy-to-let investors on Section 24 mortgage relief and Making Tax Digital.",
    siteName: "KP Tax Consultants Ltd / KP Accountants",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 480,
        alt: "KP Tax Consultants Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "KP Accountants / KP Tax Consultants | UK Property Tax Specialists",
    description:
      "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising UK property portfolio landlords on Section 24 mortgage relief and SPV structures.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "KP Tax Consultants Ltd / KP Accountants",
    image: "https://kptc.co.uk/logo.png",
    "@id": "https://kptc.co.uk",
    url: "https://kptc.co.uk",
    telephone: "+44 7861 690954",
    email: "kpatel@kptc.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "167-169 Great Portland Street, 5th Floor",
      addressLocality: "London",
      postalCode: "W1W 5PF",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5138,
      longitude: -0.1119,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    priceRange: "££",
    founder: [
      {
        "@type": "Person",
        name: "Pritpal Chaggar",
        jobTitle: "Chartered Tax Advisor (CTA)",
      },
      {
        "@type": "Person",
        name: "Kalpesh Patel",
        jobTitle: "Fellow Chartered Accountant (FCA)",
      },
    ],
  };

  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/icon.svg?v=kptc" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico?v=kptc" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png?v=kptc" sizes="192x192" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
