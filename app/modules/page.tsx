"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import BookDemoModal from "../components/BookDemoModal";
import GoToTop from "../components/GoToTop";
import { motion } from "framer-motion";
import { 
  LayoutGrid, 
  Stethoscope, 
  ClipboardList, 
  FlaskConical, 
  Pill, 
  Receipt, 
  Users, 
  Calendar,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Bell
} from "lucide-react";

const modules = [
  {
    title: "OPD Management",
    description: "Streamline patient registration, vital recording, and doctor consultations.",
    icon: <Stethoscope className="text-blue-600" />,
    features: ["Queue Management", "Electronic Prescriptions", "History Tracking"]
  },
  {
    title: "IPD Management",
    description: "Manage admissions, ward allocations, and nursing station workflows.",
    icon: <ClipboardList className="text-purple-600" />,
    features: ["Bed Management", "Nursing Notes", "OT Scheduling"]
  },
  {
    title: "Laboratory (LIS)",
    description: "End-to-end lab automation with machine interfacing and smart reporting.",
    icon: <FlaskConical className="text-pink-600" />,
    features: ["Machine Interfacing", "Sample Tracking", "WhatsApp Reports"]
  },
  {
    title: "Pharmacy & Inventory",
    description: "Real-time stock tracking with expiry alerts and integrated billing.",
    icon: <Pill className="text-green-600" />,
    features: ["Batch Management", "Expiry Alerts", "Purchase Orders"]
  },
  {
    title: "Billing & Accounts",
    description: "GST-compliant billing for OPD, IPD, and individual services.",
    icon: <Receipt className="text-amber-600" />,
    features: ["GST Billing", "Insurance/TPA", "Expense Tracking"]
  },
  {
    title: "Doctor's Workbench",
    description: "A specialized dashboard for doctors to manage clinical records.",
    icon: <Users className="text-indigo-600" />,
    features: ["Clinical Notes", "Lab Results View", "Referral Management"]
  },
  {
    title: "Appointment System",
    description: "Online and offline booking with automated SMS/WhatsApp reminders.",
    icon: <Calendar className="text-red-600" />,
    features: ["Online Booking", "Doctor Availability", "Patient Reminders"]
  },
  {
    title: "Patient Mobile App",
    description: "Empower patients with access to their medical records and reports.",
    icon: <Smartphone className="text-cyan-600" />,
    features: ["View Reports", "Book Appointments", "Teleconsultation"]
  }
];

export default function ModulesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main style={{ paddingTop: "100px", background: "var(--bg-surface)" }}>
        {/* Header */}
        <section className="container-main" style={{ textAlign: "center", padding: "60px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Core Capabilities</span>
            <h1 className="gradient-text-vibrant" style={{ marginBottom: "20px" }}>
              Explore INFIPLUS Modules
            </h1>
            <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-dim)" }}>
              A modular healthcare ecosystem designed by Shaikh Mudassir and Moin Zariwala to fit any medical facility's needs.
            </p>
          </motion.div>
        </section>

        {/* Modules Grid */}
        <section className="container-main" style={{ paddingBottom: "100px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "24px" 
          }}>
            {modules.map((mod, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: "white",
                  padding: "32px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px", 
                  background: "rgba(37, 99, 235, 0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  {mod.icon}
                </div>
                <h3>{mod.title}</h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>{mod.description}</p>
                <div style={{ marginTop: "8px" }}>
                  {mod.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <ShieldCheck size={12} className="text-green-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "white", padding: "100px 0" }}>
          <div className="container-main" style={{ textAlign: "center", background: "var(--color-primary)", borderRadius: "var(--radius-xl)", padding: "60px", color: "white" }}>
            <h2 style={{ color: "white", marginBottom: "20px" }}>Need a Custom Module?</h2>
            <p style={{ marginBottom: "32px", color: "rgba(255,255,255,0.8)" }}>Our team of experts can develop custom modules tailored to your specific clinical workflow.</p>
            <button 
              onClick={() => setDemoOpen(true)}
              style={{ background: "white", color: "var(--color-primary)", padding: "14px 40px", borderRadius: "12px", border: "none", fontWeight: 800, cursor: "pointer" }}
            >
              Consult with Moin Zariwala
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
