import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INFIPLUS — Hospital Management Software | Go Paperless, Go Digital",
  description:
    "INFIPLUS is a next-generation hospital management software that replaces paper files with a seamless digital experience. Manage OPD, IPD, beds, prescriptions, analytics and more — all from one platform.",
  keywords:
    "hospital management software, healthcare software, paperless hospital, digital hospital, OPD management, IPD management, INFIPLUS",
  openGraph: {
    title: "INFIPLUS — Hospital Management Software",
    description:
      "Transform your hospital with INFIPLUS. Go paperless, go digital.",
    type: "website",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
