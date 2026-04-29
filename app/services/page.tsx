"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import BookDemoModal from "../components/BookDemoModal";
import GoToTop from "../components/GoToTop";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "../constants/servicesData";

export default function ServicesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main style={{ paddingTop: "100px", background: "var(--bg-surface)" }}>
        {/* Hero Section */}
        <section className="container-main" style={{ textAlign: "center", padding: "60px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Our Services</span>
            <h1 className="gradient-text-vibrant" style={{ marginBottom: "20px" }}>
              Best Hospital & Lab Management Solutions
            </h1>
            <p style={{ maxWidth: "700px", margin: "0 auto", color: "var(--text-dim)", fontSize: "1.1rem" }}>
              INFIPLUS, founded by Shaikh Mudassir and Moin Zariwala, is leading the digital healthcare revolution in India with state-of-the-art HMS and LIS software.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="container-main" style={{ paddingBottom: "100px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "32px" 
          }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "white",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden"
                }}
              >
                <div style={{ position: "relative", height: "220px", width: "100%" }}>
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ 
                    position: "absolute", 
                    bottom: "-20px", 
                    left: "24px",
                    width: "56px", 
                    height: "56px", 
                    borderRadius: "16px", 
                    background: "white", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                  }}>
                    {service.icon}
                  </div>
                </div>

                <div style={{ padding: "40px 24px 24px" }}>
                  <h3 style={{ marginBottom: "12px" }}>{service.title}</h3>
                  <p style={{ color: "var(--text-dim)", marginBottom: "20px", fontSize: "0.9rem" }}>{service.description}</p>
                  
                  <ul style={{ 
                    listStyle: "none", 
                    padding: 0, 
                    display: "grid", 
                    gridTemplateColumns: "1fr", 
                    gap: "8px",
                    marginBottom: "24px"
                  }}>
                    {service.features.map((feat, i) => (
                      <li key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        fontSize: "0.82rem", 
                        fontWeight: 600,
                        color: "var(--text-main)"
                      }}>
                        <ShieldCheck size={14} className="text-green-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <Link 
                      href={`/services/${service.slug}`}
                      style={{ 
                        flex: 1,
                        padding: "12px", 
                        borderRadius: "12px", 
                        border: "1px solid var(--border-subtle)", 
                        color: "var(--text-main)", 
                        cursor: "pointer",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                    <button 
                      onClick={() => setDemoOpen(true)}
                      className="glow-btn-primary"
                      style={{ 
                        flex: 1,
                        padding: "12px", 
                        borderRadius: "12px", 
                        border: "none", 
                        color: "white", 
                        cursor: "pointer",
                        fontSize: "0.85rem"
                      }}
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section style={{ background: "white", padding: "100px 0" }}>
          <div className="container-main" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "60px", 
            alignItems: "center" 
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-badge">Founder's Vision</span>
              <h2 style={{ marginBottom: "24px" }}>Driving Innovation in Indian Healthcare</h2>
              <p style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
                Under the leadership of <strong>Shaikh Mudassir</strong> and <strong>Moin Zariwala</strong>, INFIPLUS has grown into a trusted partner for hospitals and labs across India. Our goal is to provide affordable yet high-performance software that empowers healthcare professionals.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ padding: "20px", background: "var(--bg-surface)", borderRadius: "var(--radius-md)" }}>
                  <BarChart3 className="text-blue-600" style={{ marginBottom: "10px" }} />
                  <h4 style={{ fontSize: "1.1rem" }}>Scalable</h4>
                  <p style={{ fontSize: "0.75rem" }}>Grows with your medical facility.</p>
                </div>
                <div style={{ padding: "20px", background: "var(--bg-surface)", borderRadius: "var(--radius-md)" }}>
                  <Users className="text-purple-600" style={{ marginBottom: "10px" }} />
                  <h4 style={{ fontSize: "1.1rem" }}>User Friendly</h4>
                  <p style={{ fontSize: "0.75rem" }}>Minimum training required for staff.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: "relative", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden" }}
            >
               <Image 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Hospital Office" 
                fill 
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </section>

        <ContactFooter />
      </main>

      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
