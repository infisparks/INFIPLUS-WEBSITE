"use client";

import { useState, ReactNode } from "react";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import BookDemoModal from "@/app/components/BookDemoModal";
import GoToTop from "@/app/components/GoToTop";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ArrowLeft, Zap, BarChart, Globe } from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  features: string[];
  slug: string;
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main style={{ paddingTop: "100px", background: "white" }}>
        {/* Service Hero */}
        <section style={{ background: "var(--bg-surface)", padding: "80px 0" }}>
          <div className="container-main" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link 
                href="/services" 
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", textDecoration: "none", marginBottom: "24px", fontSize: "0.9rem", fontWeight: 600 }}
              >
                <ArrowLeft size={16} /> Back to Services
              </Link>
              <h1 style={{ marginBottom: "20px" }}>{service.title}</h1>
              <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", marginBottom: "32px" }}>{service.description} specifically tailored for the Indian healthcare market.</p>
              <button 
                onClick={() => setDemoOpen(true)}
                className="glow-btn-primary"
                style={{ padding: "14px 32px", borderRadius: "12px", border: "none", color: "white", cursor: "pointer", fontWeight: 700 }}
              >
                Book a Free Demo
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ position: "relative", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}
            >
              <Image src={service.image} alt={service.title} fill style={{ objectFit: "cover" }} priority />
            </motion.div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="container-main" style={{ padding: "100px 0" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="section-badge">Deep Dive</span>
            <h2>Advanced Modules & Capabilities</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            <div style={{ padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "white" }}>
              <Zap className="text-blue-600" style={{ marginBottom: "16px" }} />
              <h4>Instant Automation</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>Automate repetitive tasks like billing, report generation, and patient notifications instantly.</p>
            </div>
            <div style={{ padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "white" }}>
              <BarChart className="text-purple-600" style={{ marginBottom: "16px" }} />
              <h4>Real-time Analytics</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>Get live dashboards for patient flow, financial health, and inventory status with one click.</p>
            </div>
            <div style={{ padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "white" }}>
              <Globe className="text-green-600" style={{ marginBottom: "16px" }} />
              <h4>Cloud Accessibility</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>Access your medical facility data from anywhere in the world with secure, encrypted cloud storage.</p>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}>
            <h3 style={{ marginBottom: "32px", textAlign: "center" }}>Standard Features Included</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              {service.features.map((feat: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "var(--bg-surface)", borderRadius: "12px" }}>
                  <CheckCircle2 size={18} className="text-blue-600" />
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Infiplus Context */}
        <section style={{ background: "#0F172A", color: "white", padding: "100px 0" }}>
          <div className="container-main" style={{ textAlign: "center" }}>
            <h2 style={{ color: "white", marginBottom: "24px" }}>Ready to Transform Your {service.title.split(' ')[0]}?</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "rgba(255,255,255,0.7)" }}>
              Under the vision of Shaikh Mudassir and Moin Zariwala, INFIPLUS is helping 500+ clinics and hospitals in India go digital. Join the movement today.
            </p>
            <button 
              onClick={() => setDemoOpen(true)}
              style={{ background: "white", color: "#0F172A", padding: "16px 40px", borderRadius: "12px", border: "none", fontWeight: 800, cursor: "pointer" }}
            >
              Contact Sales Team
            </button>
          </div>
        </section>

        <ContactFooter />
      </main>

      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
