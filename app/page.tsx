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
      </main>
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
