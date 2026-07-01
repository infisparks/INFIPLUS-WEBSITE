"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Hospital, Activity, Database, FileText, MapPin, Search } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ViewBrochurePage() {
  return (
    <main style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)", minHeight: "100vh" }}>
      {/* Header / Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ 
          padding: "16px clamp(20px, 5vw, 40px)", 
          background: "rgba(255, 255, 255, 0.8)", 
          borderBottom: "1px solid rgba(229, 231, 235, 0.5)", 
          position: "sticky", 
          top: 0, 
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)"
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/brochure/brochure.png" 
          download="Infiplus-Brochure.png"
          style={{ 
            background: "#2563EB", 
            color: "#FFFFFF", 
            padding: "10px 24px", 
            borderRadius: "12px", 
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.3)"
          }}
        >
          <Download size={18} />
          Download Brochure
        </motion.a>
      </motion.nav>

      <div className="container-main" style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" }}>
        {/* SEO Focused Content Block */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8, 
              padding: "6px 16px", 
              background: "rgba(37, 99, 235, 0.08)", 
              borderRadius: "999px", 
              color: "#2563EB", 
              fontSize: "12px", 
              fontWeight: 800, 
              letterSpacing: "0.05em",
              marginBottom: "24px",
              textTransform: "uppercase"
            }}
          >
            <Hospital size={14} />
            Digital Infrastructure for Modern Healthcare
          </motion.div>

          <h1 style={{ 
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)", 
            fontWeight: 900, 
            color: "#0F172A", 
            marginBottom: "24px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em"
          }}>
            India&apos;s Best <span style={{ 
              background: "linear-gradient(135deg, #2563EB, #7C3AED)", 
              color: "white",
              padding: "4px 14px",
              borderRadius: "12px",
              display: "inline-block"
            }}>Hospital Software</span>
          </h1>

          <p style={{ 
            fontSize: "clamp(1rem, 2vw, 1.25rem)", 
            color: "#475569", 
            maxWidth: "800px", 
            margin: "0 auto 40px",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Infiplus is a leading <strong>hospital management system (HMS) in Mumbai</strong>, meticulously engineered to solve the complexity of large scale multi-specialty hospitals and clinics.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            {["Lab Management Software", "Pharmacy Management", "OPD & IPD", "AI Prescriptions", "Hospital Billing"].map((tag, i) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                style={{ background: "#FFFFFF", color: "#64748B", padding: "8px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Brochure Image Display with Glassmorphism frame */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{ 
            background: "rgba(255, 255, 255, 0.4)", 
            borderRadius: "32px", 
            padding: "clamp(12px, 3vw, 32px)", 
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
            border: "1px solid rgba(229, 231, 235, 0.4)",
            marginBottom: "80px",
            backdropFilter: "blur(20px)"
          }}
        >
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "auto", 
            borderRadius: "20px", 
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <Image 
              src="/brochure/brochure.png" 
              alt="Infiplus Hospital Management Software Brochure - Comprehensive Features OPD IPD Lab Pharmacy" 
              width={1000}
              height={1400}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </motion.div>

        {/* Semantic Content Grid for SEO */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "80px" }}>
          <DetailCard 
            icon={<Activity size={24} />}
            title="Complete Lab Management"
            content="Digitize your pathology and radiology labs with our advanced lab management software. Automate result entry, patient reports, and revenue tracking in Mumbai and across India."
          />
          <DetailCard 
            icon={<FileText size={24} />}
            title="AI Prescription Workflow"
            content="Eliminate paper prescriptions. Our AI-driven system helps doctors in India write fast, accurate medical notes and digital prescriptions, syncing directly with the pharmacy."
          />
          <DetailCard 
            icon={<Database size={24} />}
            title="Scalable IPD & Billing"
            content="Manage patient admissions, bed tracking, and complex billing with ease. Infiplus is the top-rated hospital management software for multi-specialty facilities."
          />
        </div>

        {/* SEO Locations Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", padding: "60px 40px", background: "white", borderRadius: "32px", border: "1px solid #E5E7EB" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#64748B", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>
            <MapPin size={16} />
            Trusted across Mumbai Suburban, Navi Mumbai, and Pan-India
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", marginBottom: "20px", letterSpacing: "-0.03em" }}>
            Powering the Future of Indian Healthcare
          </h2>
          <p style={{ color: "#64748B", maxWidth: "700px", margin: "0 auto 40px", fontSize: "16px", lineHeight: 1.7 }}>
            Whether you are searching for <strong>blood test management software</strong> or a full-scale <strong>hospital digital platform</strong>, Infiplus provides a secure, efficient, and reliable solution tailored for the Indian healthcare market.
          </p>
          <Link href="/#contact" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "#2563EB",
                color: "white",
                padding: "16px 40px",
                borderRadius: "999px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 20px 40px -10px rgba(37,99,235,0.4)"
              }}
            >
              Get a Free Demo Today
              <Search size={20} />
            </motion.div>
          </Link>
        </motion.section>
      </div>

      <footer style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
        &copy; 2026 Infiplus - India&apos;s Leading Hospital Management Solution
      </footer>
    </main>
  );
}

function DetailCard({ icon, title, content }: { icon: any, title: string, content: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      style={{ 
        background: "white", 
        padding: "32px", 
        borderRadius: "24px", 
        border: "1px solid #F1F5F9", 
        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.03)" 
      }}
    >
      <div style={{ color: "#2563EB", marginBottom: "20px" }}>{icon}</div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>{title}</h3>
      <p style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.6 }}>{content}</p>
    </motion.div>
  );
}

