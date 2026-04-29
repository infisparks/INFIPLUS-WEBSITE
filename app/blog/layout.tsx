import { Metadata } from "next";

export const metadata: Metadata = {
  title: "INFIPLUS Blog | Healthcare Technology Insights India",
  description: "Read the latest about HMS, LIS, and diagnostic software innovations in India. Expert insights by Shaikh Mudassir and Moin Zariwala.",
  keywords: "healthcare blog india, hms insights, lab automation blog, infiplus news",
  alternates: {
    canonical: "https://infiplus.in/blog",
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
