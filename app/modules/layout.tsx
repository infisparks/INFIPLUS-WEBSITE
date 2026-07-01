import { Metadata } from "next";

export const metadata: Metadata = {
  title: "INFIPLUS Modules | Comprehensive Healthcare Software Suite",
  description: "Explore core healthcare modules like OPD, IPD, Laboratory (LIS), Pharmacy, and Billing. Modular software designed by Shaikh Mudassir and Moin Zariwala.",
  keywords: "hms modules, healthcare software features, opd software, ipd software, pharmacy inventory india",
  alternates: {
    canonical: "https://infiplus.in/modules",
  },
  openGraph: {
    title: "INFIPLUS Modules | Comprehensive Healthcare Software Suite",
    description: "Explore core healthcare modules like OPD, IPD, Laboratory (LIS), Pharmacy, and Billing.",
    url: "https://infiplus.in/modules",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "https://infiplus.in/whatsap.webp",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Healthcare Software Modules",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  other: {
    "instagram:card": "summary_large_image",
    "instagram:title": "INFIPLUS Modules | Comprehensive Healthcare Software Suite",
    "instagram:description": "Explore core healthcare modules like OPD, IPD, Laboratory (LIS), Pharmacy, and Billing.",
    "instagram:image": "https://infiplus.in/whatsap.webp",
  },
};

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
