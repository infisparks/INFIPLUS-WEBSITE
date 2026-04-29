import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specialized Healthcare Software Solutions",
  description: "Explore INFIPLUS's range of hospital, lab, and diagnostic software solutions designed for the Indian healthcare market. From HMS to LIS, we have it all.",
  keywords: "best hospital management software, best lab management software, blood test software company, hms software india, pathology lab software",
  alternates: {
    canonical: "/services",
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
