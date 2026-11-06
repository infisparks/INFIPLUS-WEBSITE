import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import MetaPixel from "./components/MetaPixel";
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
  title: {
    default: "Best Hospital Management Software India | INFIPLUS AI-HMS & EMR",
    template: "%s | INFIPLUS Healthcare"
  },
  description:
    "INFIPLUS is India's leading AI-powered hospital management software (HMS) and EMR system. Automate OPD, IPD, Lab, and Pharmacy operations with our paperless healthcare solutions.",
  keywords: [
    "best hospital management software",
    "hospital management system India",
    "HMS software",
    "EMR system",
    "paperless hospital",
    "healthcare ERP",
    "clinic management software",
    "INFIPLUS healthcare",
    "LIS software India",
    "diagnostic center software"
  ],
  authors: [{ name: "Shaikh Mudassir" }, { name: "Moin Zariwala" }],
  creator: "INFIPLUS Team",
  publisher: "INFIPLUS Healthcare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "INFIPLUS | Best Hospital & Lab Management Software in India",
    description: "Transform your healthcare facility with India's #1 AI-powered HMS. Paperless, efficient, and scalable solutions for modern hospitals and labs.",
    url: "https://infiplus.in",
    siteName: "INFIPLUS Healthcare",
    images: [
      {
        url: "https://infiplus.in/whatsap.webp",
        width: 1200,
        height: 630,
        alt: "INFIPLUS Healthcare Software Thumbnail",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INFIPLUS | Leading Hospital Management Software",
    description: "Streamline clinical workflows and go paperless with India's best AI-HMS and EMR system.",
    images: ["https://infiplus.in/whatsap.webp"],
    creator: "@infiplus",
  },
  other: {
    "instagram:card": "summary_large_image",
    "instagram:title": "INFIPLUS | Best Hospital & Lab Management Software in India",
    "instagram:description": "Transform your healthcare facility with India's #1 AI-powered HMS. Paperless, efficient, and scalable solutions for modern hospitals and labs.",
    "instagram:image": "https://infiplus.in/whatsap.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/meta-logo.png",
    shortcut: "/meta-logo.png",
    apple: "/meta-logo.png",
  },
  verification: {
    google: "google-site-verification-id", // User should replace with actual ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18220446152" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-18220446152');

              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18220446152/Wvi3CPaRibMdEMjjl_BD',
                    'event_callback': callback
                });
                return false;
              }
              window.gtag_report_conversion = gtag_report_conversion;
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2241568519757954');
            fbq('track', 'PageView');

            // Unrestrict Lead and Schedule for B2B Healthcare Software
            if (typeof fbq.registerPlugin === "function") {
              fbq.registerPlugin("lead_enabler", {
                __fbEventsPlugin: 1,
                plugin: function(_f, instance, config) {
                  try {
                    instance.optIn("2241568519757954", "EventValidation", false);
                    config.set("2241568519757954", "eventValidation", {
                      unverifiedEventNames: [],
                      restrictedEventNames: []
                    });
                  } catch(e){}
                }
              });
              fbq.loadPlugin("lead_enabler");
            }
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2241568519757954&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
