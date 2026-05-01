import { services } from "@/app/constants/servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
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

  const imageUrl = `https://infiplus.in${service.image}`;

  return {
    title: `${service.title} | Best Healthcare Software India`,
    description: service.description,
    alternates: {
      canonical: `https://infiplus.in/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Best Healthcare Software India`,
      description: service.description,
      url: `https://infiplus.in/services/${slug}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Best Healthcare Software India`,
      description: service.description,
      images: [imageUrl],
    },
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

  // Generate structured data for the service to improve Google Image Search discovery
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "image": `https://infiplus.in${service.image}`,
    "provider": {
      "@type": "Organization",
      "name": "INFIPLUS",
      "url": "https://infiplus.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://infiplus.in/logo.png",
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}

