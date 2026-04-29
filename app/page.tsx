"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import WhyInfiplus from "./components/WhyInfiplus";
import ContactFooter from "./components/ContactFooter";
import BookDemoModal from "./components/BookDemoModal";
import GoToTop from "./components/GoToTop";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        <HeroSection onBookDemo={() => setDemoOpen(true)} />
        <Features />
        <WhyInfiplus />
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
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
