import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/store";

export const viewport: Viewport = {
  themeColor: "#080B11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mercianwealth.com"),
  title: {
    default: "KP Tax Consultants & Mercian Wealth | UK Property SPV Accountancy OS",
    template: "%s | Mercian & KP Tax Consultants",
  },
  description:
    "Institutional chartered accountancy operating system for UK property SPVs and portfolio landlords. 100% Section 24 mortgage interest relief, live Open Banking feeds, DLA indexing, and HMRC CT600 filing readiness.",
  alternates: {
    canonical: "https://mercianwealth.com",
    languages: {
      "en-GB": "https://mercianwealth.com",
    },
  },
  keywords: [
    "Mercian Wealth",
    "KP Tax Consultants",
    "Kalpesh Patel FCA",
    "Pritpal Chaggar CTA",
    "UK Property Accountant",
    "Section 24 Mortgage Relief",
    "SPV Limited Company Property",
    "Making Tax Digital ITSA",
    "Director Loan Account DLA",
    "HMRC CT600 Tax Pack",
    "Buy to Let SPV Accounting",
    "Chartered Tax Advisers London",
    "ICAEW Chartered Accountants",
    "Property Portfolio Tax Structuring",
    "Confirmation Statement Filing",
    "PAYE and Payroll for SPVs",
  ],
  authors: [
    { name: "KP Tax Consultants Ltd", url: "https://kptc.co.uk" },
    { name: "Mercian Wealth", url: "https://mercianwealth.com" },
  ],
  creator: "Mercian Wealth & KP Tax Consultants",
  publisher: "KP Tax Consultants Ltd",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    url: "https://mercianwealth.com",
    title: "Mercian Wealth & KP Tax Consultants | UK Property Accountancy OS",
    description:
      "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising portfolio landlords on Section 24 mortgage relief, SPV corporate structures, and Making Tax Digital.",
    siteName: "KP Tax Consultants & Mercian Wealth",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 480,
        alt: "KP Tax Consultants Official Seal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercian Wealth & KP Tax Consultants | UK Property Tax Specialists",
    description:
      "Chartered Tax Advisers (CTA) and Chartered Accountants (FCA) advising UK property portfolio landlords on Section 24 mortgage relief and SPV structures.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "GB-LND",
    "geo.placename": "London, City of London",
    "geo.position": "51.5138;-0.1119",
    "ICBM": "51.5138, -0.1119",
    "aeo:intent": "UK property SPV tax compliance, Section 24 relief, corporate accounting, HMRC filing",
    "aeo:entity": "KP Tax Consultants Ltd & Mercian Wealth",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": "https://kptc.co.uk/#organization",
        name: "KP Tax Consultants Ltd / KP Accountants",
        alternateName: "Mercian Wealth & KP Tax Consultants",
        image: "https://kptc.co.uk/logo.png",
        url: "https://kptc.co.uk",
        telephone: "+44 7861 690954",
        email: "kpatel@kptc.co.uk",
        priceRange: "££",
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
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        founder: [
          {
            "@type": "Person",
            name: "Pritpal Chaggar",
            jobTitle: "Chartered Tax Adviser (CTA)",
            worksFor: { "@id": "https://kptc.co.uk/#organization" },
          },
          {
            "@type": "Person",
            name: "Kalpesh Patel",
            jobTitle: "Fellow Chartered Accountant (FCA)",
            worksFor: { "@id": "https://kptc.co.uk/#organization" },
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "UK Property Accountancy Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Section 24 Mortgage Relief & SPV Incorporation",
                description: "Corporate restructuring and full 100% mortgage interest deductibility for BTL landlords.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "HMRC CT600 & Annual Micro-Entity Statutory Accounts",
                description: "Full statutory year-end filing with HMRC and Companies House under FRS 105.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Director Loan Account (DLA) Architecture",
                description: "Tax-free extraction scheduling, dividend vouchers, and section 455 anti-avoidance defense.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Making Tax Digital (MTD ITSA) Quarterly Preparation",
                description: "HMRC MTD compatible digital record-keeping and quarterly summary submissions.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SPV Bookkeeping, PAYE & Confirmation Statements",
                description: "Complete bookkeeping reconciliation, director payroll management, and Companies House annual confirmation statements.",
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.98",
          reviewCount: "142",
          bestRating: "5",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:30",
        },
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
      <body className="min-h-screen bg-[#080B11] text-[#F8FAFC] antialiased selection:bg-[#a4f4cf] selection:text-[#0c1813]">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
