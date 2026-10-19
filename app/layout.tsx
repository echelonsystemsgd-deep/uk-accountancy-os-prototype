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
  title: "Kai Accountants / KP Tax Consultants | UK Property Tax Specialists",
  description:
    "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising portfolio landlords, SPV limited companies, and buy-to-let investors on Section 24 mortgage relief and Making Tax Digital.",
  keywords: [
    "KP Tax Consultants",
    "Kai Accountants",
    "UK Property Accountant",
    "Section 24 Mortgage Relief",
    "Buy to Let Accounts",
    "SPV Limited Company Property",
    "Chartered Tax Adviser CTA",
    "Pritpal Chaggar CTA",
    "Kalpesh Patel FCA",
    "Landlord Self Assessment",
    "Making Tax Digital ITSA 2026",
    "7 Bell Yard London Accountants",
  ],
  authors: [{ name: "KP Tax Consultants Ltd", url: "https://kptc.co.uk" }],
  creator: "Kai Accountants / KP Tax Consultants Ltd",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kptc.co.uk",
    title: "Kai Accountants / KP Tax Consultants | UK Property Tax Specialists",
    description:
      "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising portfolio landlords, SPV limited companies, and buy-to-let investors on Section 24 mortgage relief and Making Tax Digital.",
    siteName: "KP Tax Consultants Ltd / Kai Accountants",
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
    title: "Kai Accountants / KP Tax Consultants | UK Property Tax Specialists",
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
    name: "KP Tax Consultants Ltd / Kai Accountants",
    image: "https://kptc.co.uk/logo.png",
    "@id": "https://kptc.co.uk",
    url: "https://kptc.co.uk",
    telephone: "07432 660478",
    email: "info@kptc.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 Bell Yard",
      addressLocality: "London",
      postalCode: "WC2A 2JR",
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
