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
  metadataBase: new URL("https://www.infiplus.in"),
  alternates: {
    canonical: "/",
  },
  title: "INFIPLUS | AI-Powered Paperless Hospital Management System & EMR",
  description:
    "Transform your facility with INFIPLUS, the #1 AI-powered hospital management software. Replace paper files with secure digital records, manage OPD/IPD, and scale hospital revenue with real-time analytics.",
  keywords:
    "hospital management system, EMR software India, healthcare automation, paperless hospital software, AI medical scribe, OPD management, IPD management, medical analytics, INFIPLUS healthcare",
  authors: [{ name: "Infisparks Healthcare" }],
  openGraph: {
    title: "INFIPLUS | AI-Powered Hospital Management System",
    description: "The next generation of paperless healthcare. Streamline operations and improve patient care with INFIPLUS.",
    url: "https://www.infiplus.in",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Hospital Management Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INFIPLUS | AI-Powered Hospital Management",
    description: "Go paperless and automate your clinical workflows with INFIPLUS.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/meta-logo.png",
    shortcut: "/meta-logo.png",
    apple: "/meta-logo.png",
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
