import { Metadata } from "next";

export const metadata: Metadata = {
  title: "INFIPLUS Blog | Healthcare Technology Insights India",
  description: "Read the latest about HMS, LIS, and diagnostic software innovations in India. Expert insights by Shaikh Mudassir and Moin Zariwala.",
  keywords: "healthcare blog india, hms insights, lab automation blog, infiplus news",
  alternates: {
    canonical: "https://infiplus.in/blog",
  },
  openGraph: {
    title: "INFIPLUS Blog | Healthcare Technology Insights India",
    description: "Read the latest about HMS, LIS, and diagnostic software innovations in India. Expert insights by Shaikh Mudassir and Moin Zariwala.",
    url: "https://infiplus.in/blog",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "https://infiplus.in/whatsap.webp",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Healthcare Blog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  other: {
    "instagram:card": "summary_large_image",
    "instagram:title": "INFIPLUS Blog | Healthcare Technology Insights India",
    "instagram:description": "Read the latest about HMS, LIS, and diagnostic software innovations in India.",
    "instagram:image": "https://infiplus.in/whatsap.webp",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
