"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Clients from "./components/Clients";
import Features from "./components/Features";
import WhyInfiplus from "./components/WhyInfiplus";
import Founders from "./components/Founders";
import ContactFooter from "./components/ContactFooter";
import BookDemoModal from "./components/BookDemoModal";
import GoToTop from "./components/GoToTop";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoData, setDemoData] = useState<{
    name?: string;
    hospitalName?: string;
    phone?: string;
    step?: 1 | 2;
    submissionId?: string;
  } | undefined>(undefined);

  const handleOpenDemo = (data?: {
    name?: string;
    hospitalName?: string;
    phone?: string;
    step?: 1 | 2;
    submissionId?: string;
  }) => {
    setDemoData(data);
    setDemoOpen(true);
  };

  return (
    <>
      <Navbar onBookDemo={() => handleOpenDemo()} />
      <main>
        <HeroSection onBookDemo={handleOpenDemo} />
        <Clients />
        <Features />
        <WhyInfiplus />
        <Founders />
        <ContactFooter />
        
        {/* Semantic SEO Section */}
        <section style={{ display: "none" }}>
          <h2>Best Hospital Management Software in India</h2>
          <p>INFIPLUS provides the best hospital management system (HMS) and EMR software for hospitals and clinics in India. Our paperless clinical platform automates OPD, IPD, Lab, and Pharmacy workflows, making us the top choice for healthcare facilities looking for reliable HMS software.</p>
          <ul>
            <li>Top Rated Hospital Management System</li>
            <li>Best EMR Software India</li>
            <li>Paperless Hospital Management Platform</li>
            <li>Healthcare Automation Software</li>
          </ul>
        </section>
      </main>
      <BookDemoModal
        isOpen={demoOpen}
        onClose={() => {
          setDemoOpen(false);
          setDemoData(undefined);
        }}
        initialData={demoData}
      />
      <GoToTop />
    </>
  );
}
