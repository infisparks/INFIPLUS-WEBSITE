import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Hospital Management Software in India | INFIPLUS Brochure",
  description: "Download the official brochure for INFIPLUS, India's best hospital management software. Learn about our paperless HMS, EMR, and AI-powered clinical workflows.",
  keywords: "best hospital management software, hospital management system India, HMS brochure, paperless hospital software, EMR system India, healthcare automation",
  openGraph: {
    title: "Infiplus - Complete Hospital Management Software Brochure",
    description: "Transform your hospital with India's most reliable and paperless HMS. View our detailed features and benefits.",
    images: ["/brochure/brochure.png"],
  },
  alternates: {
    canonical: "/view-brochure",
  },
};

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
