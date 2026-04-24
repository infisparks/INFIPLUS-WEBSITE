import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Hospital Management Software (HMS) in Mumbai, India | Infiplus Brochure",
  description: "Download the Infiplus Hospital Management Software brochure. Explore India's #1 paperless digital hospital ecosystem with OPD, IPD, Lab Management, and AI Prescriptions.",
  keywords: "Best HMS India, Best Hospital Management Software Mumbai, Lab Management Software, Blood Test Management Software, Hospital Billing Software, IPD Management System, AI Prescription System, Digital Health Mumbai",
  openGraph: {
    title: "Infiplus - Complete Hospital Management Software Brochure",
    description: "Transform your hospital with India's most reliable and paperless HMS. View our detailed features and benefits.",
    images: ["/brochure/brochure.png"],
  },
};

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
