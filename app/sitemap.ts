import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mercianwealth.com";
  const currentDate = new Date().toISOString();

  const publicRoutes = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "weekly" as const },
    { path: "/calculator", priority: 0.9, freq: "weekly" as const },
    { path: "/mtd", priority: 0.85, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/faq", priority: 0.8, freq: "monthly" as const },
    { path: "/enquiry", priority: 0.8, freq: "monthly" as const },
    { path: "/qualify", priority: 0.8, freq: "monthly" as const },
    { path: "/login", priority: 0.7, freq: "monthly" as const },
    { path: "/signup", priority: 0.7, freq: "monthly" as const },
    { path: "/privacy", priority: 0.5, freq: "yearly" as const },
    { path: "/terms", priority: 0.5, freq: "yearly" as const },
    { path: "/dpa", priority: 0.5, freq: "yearly" as const },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
