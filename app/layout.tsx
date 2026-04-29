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
  title: "Best Hospital Management Software India | INFIPLUS AI-HMS & EMR",
  description:
    "INFIPLUS is India's best hospital management software (HMS) for clinics and hospitals. Go paperless with AI-powered EMR, OPD/IPD management, Lab, and Pharmacy automation.",
  keywords:
    "best hospital management software, hospital management system India, HMS software, EMR system, paperless hospital, healthcare ERP, clinic management software, INFIPLUS healthcare",
  authors: [{ name: "Infisparks Healthcare" }],
  openGraph: {
    title: "Best Hospital Management Software | INFIPLUS AI-HMS",
    description: "The #1 choice for paperless healthcare in India. Streamline operations and scale your facility with INFIPLUS.",
    url: "https://infiplus.in",
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
