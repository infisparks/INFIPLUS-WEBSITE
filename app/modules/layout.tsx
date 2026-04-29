import { Metadata } from "next";

export const metadata: Metadata = {
  title: "INFIPLUS Modules | Comprehensive Healthcare Software Suite",
  description: "Explore core healthcare modules like OPD, IPD, Laboratory (LIS), Pharmacy, and Billing. Modular software designed by Shaikh Mudassir and Moin Zariwala.",
  keywords: "hms modules, healthcare software features, opd software, ipd software, pharmacy inventory india",
  alternates: {
    canonical: "https://infiplus.in/modules",
  }
};

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
