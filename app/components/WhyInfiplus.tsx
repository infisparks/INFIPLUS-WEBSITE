"use client";

import { motion, Variants } from "framer-motion";
import { Zap, Shield, Heart, Clock, Award, Briefcase, CheckCircle2 } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: <Zap size={28} />,
    title: "Instant Speed",
    description: "Eliminate those long-waiting hours. INFIPLUS automates patient registration and OPD processing for a lightning-fast experience.",
    color: "#EAB308"
  },
  {
    icon: <Shield size={28} />,
    title: "Data Security",
    description: "Your patient records are end-to-end encrypted and stored with bank-level security. Fully HIPAA compliant data management.",
    color: "#3B82F6"
  },
  {
    icon: <Heart size={28} />,
    title: "Patient Focused",
    description: "Built to improve outcomes. Our interface keeps doctors focused on the patient, not the paperwork, enhancing care quality.",
    color: "#EF4444"
  },
  {
    icon: <Clock size={28} />,
    title: "24/7 Availability",
    description: "Access your hospital data from any device, anywhere. Our cloud-native architecture ensures your clinic never stays disconnected.",
    color: "#8B5CF6"
  },
  {
    icon: <Briefcase size={28} />,
    title: "Professional Analytics",
    description: "Real-time revenue tracking, department performance, and consultant leaderboards. Professional data at your fingertips.",
    color: "#10B981"
  },
  {
    icon: <Award size={28} />,
    title: "Quality Certified",
    description: "Standardized workflows that ensure your hospital maintains accreditation standards without extra manual efforts.",
    color: "#F59E0B"
  }
];

export default function WhyInfiplus() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <section id="why-info" style={{ position: "relative", padding: "140px 0", overflow: "hidden" }}>
      {/* Background Decor */}
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(79, 140, 255, 0.08) 0%, transparent 70%)", zIndex: -1 }} />

      <div className="container-main">
        {/* Header */}
        <div style={{ maxWidth: 900, marginBottom: 100, marginInline: "auto", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-badge" 
          >
            WHY CHOOSE INFIPLUS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 24 }}
          >
            The Gold Standard for <br />
            <span className="gradient-text-vivid">Hospital Digitization</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ color: "var(--text-dim)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, maxWidth: 700, marginInline: "auto" }}
          >
            Transform your healthcare facility with an ecosystem that's specifically engineered for speed, security, and superior patient care.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 30 }}>
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                borderColor: `${benefit.color}40`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${benefit.color}10`,
                backgroundColor: "rgba(255, 255, 255, 0.04)"
              }}
              style={{
                position: "relative",
                padding: "48px 40px",
                borderRadius: "32px",
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "default",
                overflow: "hidden"
              }}
            >
              {/* Corner Glow */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: benefit.color, opacity: 0.08, filter: "blur(20px)" }} />
              
              <div style={{ 
                marginBottom: 28, 
                width: 64, 
                height: 64, 
                borderRadius: "18px", 
                background: `${benefit.color}10`, 
                border: `1px solid ${benefit.color}20`, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: benefit.color,
                boxShadow: `0 8px 16px ${benefit.color}05`
              }}>
                {benefit.icon}
              </div>

              <h3 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: 16, color: "#fff", letterSpacing: "-0.01em" }}>
                {benefit.title}
              </h3>

              <p style={{ color: "var(--text-dim)", lineHeight: 1.7, fontSize: "1.05rem", fontWeight: 400 }}>
                {benefit.description}
              </p>

              {/* Checkmark indicator at bottom */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24, fontSize: "0.85rem", fontWeight: 600, color: benefit.color, opacity: 0.8 }}>
                <CheckCircle2 size={16} />
                Verified Feature
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
