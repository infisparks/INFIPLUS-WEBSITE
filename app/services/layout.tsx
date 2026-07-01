import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specialized Healthcare Software Solutions",
  description: "Explore INFIPLUS's range of hospital, lab, and diagnostic software solutions designed for the Indian healthcare market. From HMS to LIS, we have it all.",
  keywords: "best hospital management software, best lab management software, blood test software company, hms software india, pathology lab software",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Specialized Healthcare Software Solutions | INFIPLUS",
    description: "Explore INFIPLUS's range of hospital, lab, and diagnostic software solutions designed for the Indian healthcare market. From HMS to LIS, we have it all.",
    url: "https://infiplus.in/services",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "https://infiplus.in/whatsap.webp",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Healthcare Software",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  other: {
    "instagram:card": "summary_large_image",
    "instagram:title": "Specialized Healthcare Software Solutions | INFIPLUS",
    "instagram:description": "Explore INFIPLUS's range of hospital, lab, and diagnostic software solutions designed for the Indian healthcare market.",
    "instagram:image": "https://infiplus.in/whatsap.webp",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
