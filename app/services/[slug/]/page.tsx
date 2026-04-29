import { services } from "@/app/constants/servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "@/app/services/[slug]/ServiceDetailClient";
import { ReactNode } from "react";

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  features: string[];
  slug: string;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const service = (services as Service[]).find((s: Service) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found | INFIPLUS" };
  }

  return {
    title: `${service.title} | Best Healthcare Software India`,
    description: service.description,
    alternates: {
      canonical: `https://infiplus.in/services/${slug}`,
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const service = (services as Service[]).find((s: Service) => s.slug === slug);

  if (!service) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1>Service Not Found</h1>
      </div>
    );
  }

  return <ServiceDetailClient service={service} />;
}

