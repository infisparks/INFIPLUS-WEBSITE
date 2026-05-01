import { Activity, FlaskConical, Droplet } from "lucide-react";
import React from "react";

export const services = [
  {
    title: "Hospital Management Software (HMS)",
    description: "The most comprehensive HMS software in India. Automate OPD, IPD, Pharmacy, and Billing with ease.",
    icon: React.createElement(Activity, { className: "text-blue-600", size: 32 }),
    image: "/service/hospital-management-software.webp",
    features: ["OPD/IPD Management", "Integrated Billing & Accounting", "Doctor's Workbench", "Pharmacy & Inventory"],
    slug: "hospital-management-software"
  },
  {
    title: "Lab Management Software (LIS)",
    description: "Best lab management software for modern diagnostic centers. Features bi-directional machine interfacing.",
    icon: React.createElement(FlaskConical, { className: "text-purple-600", size: 32 }),
    image: "/service/lab-management-software.webp",
    features: ["Machine Interfacing", "QR-Code Sample Tracking", "Smart Reports", "Financial Analytics"],
    slug: "lab-management-software"
  },
  {
    title: "Blood Test & Diagnostics Software",
    description: "Specialized software for blood test centers and pathology labs. Manage tests with zero errors.",
    icon: React.createElement(Droplet, { className: "text-red-600", size: 32 }),
    image: "/service/blood-test-and-diagnostics-software.webp",
    features: ["Instant WhatsApp Reports", "Patient Portal", "Home Collection App", "Accuracy Control"],
    slug: "blood-test-software"
  }
];
