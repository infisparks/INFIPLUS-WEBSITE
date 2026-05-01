import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infiplus.in"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Best Hospital Management Software India | INFIPLUS AI-HMS & EMR",
    template: "%s | INFIPLUS Healthcare"
  },
  description:
    "INFIPLUS is India's leading AI-powered hospital management software (HMS) and EMR system. Automate OPD, IPD, Lab, and Pharmacy operations with our paperless healthcare solutions.",
  keywords: [
    "best hospital management software",
    "hospital management system India",
    "HMS software",
    "EMR system",
    "paperless hospital",
    "healthcare ERP",
    "clinic management software",
    "INFIPLUS healthcare",
    "LIS software India",
    "diagnostic center software"
  ],
  authors: [{ name: "Shaikh Mudassir" }, { name: "Moin Zariwala" }],
  creator: "INFIPLUS Team",
  publisher: "INFIPLUS Healthcare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "INFIPLUS | Best Hospital & Lab Management Software in India",
    description: "Transform your healthcare facility with India's #1 AI-powered HMS. Paperless, efficient, and scalable solutions for modern hospitals and labs.",
    url: "https://infiplus.in",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "https://infiplus.in/whatsap.webp",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Healthcare Software Thumbnail",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INFIPLUS | Leading Hospital Management Software",
    description: "Streamline clinical workflows and go paperless with India's best AI-HMS and EMR system.",
    images: ["https://infiplus.in/whatsap.webp"],
    creator: "@infiplus",
  },
  other: {
    "instagram:card": "summary_large_image",
    "instagram:title": "INFIPLUS | Best Hospital & Lab Management Software in India",
    "instagram:description": "Transform your healthcare facility with India's #1 AI-powered HMS. Paperless, efficient, and scalable solutions for modern hospitals and labs.",
    "instagram:image": "https://infiplus.in/whatsap.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/meta-logo.png",
    shortcut: "/meta-logo.png",
    apple: "/meta-logo.png",
  },
  verification: {
    google: "google-site-verification-id", // User should replace with actual ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
