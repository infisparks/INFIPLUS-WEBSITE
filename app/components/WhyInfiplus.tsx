"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Zap, Shield, Heart, Clock, Award, Briefcase, CheckCircle2 } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Zap size={26} />,
    title: "Instant Digitization",
    description: "Eliminate long patient wait times with automated registration and OPD workflows designed for maximum clinical speed.",
  },
  {
    icon: <Shield size={26} />,
    title: "HIPAA Security",
    description: "Your health records are encrypted and stored with bank-level security. Fully compliant, ultra-safe data protocols.",
  },
  {
    icon: <Heart size={26} />,
    title: "Patient Outcomes",
    description: "Engineered to keep clinicians focused on the patient. Improve the quality of care by eliminating tedious administrative overhead.",
  },
  {
    icon: <Clock size={26} />,
    title: "Cloud-Native Power",
    description: "Access your clinic data from any device, anywhere. Our architecture ensures your medical facility never experiences downtime.",
  },
  {
    icon: <Briefcase size={26} />,
    title: "Revenue Analytics",
    description: "Track performance, department revenue, and consultant stats in real-time. Make data-driven decisions to grow your practice.",
  },
  {
    icon: <Award size={26} />,
    title: "Certified Excellence",
    description: "Standardize your medical workflows. Ensure your hospital meets the highest quality accreditation standards automatically.",
  }
];

const ANIM = {
  duration: 0.5,
  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
  viewport: { once: true, margin: "-100px" },
};

export default function WhyInfiplus() {
  return (
    <section
      id="why-info"
      style={{
        position: "relative",
        padding: "120px 0",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #F8FAFC, #EEF2FF)",
        borderTop: "1px solid rgba(226, 232, 240, 0.5)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.5)"
      }}
    >
      {/* Background Decor - Subtle blue glow */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "30%", background: "radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="container-main">
        {/* Header */}
        <div style={{ maxWidth: 880, marginBottom: 80, marginInline: "auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-badge"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderColor: "#BFDBFE", color: "#2563EB" }}
          >
            THE INFIPLUS ADVANTAGE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, marginBottom: 24, color: '#0F172A' }}
          >
            Built for the New Era of <br />
            <span style={{ color: "#2563EB" }}>Modern Healthcare</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ color: "#475569", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: 660, marginInline: "auto", fontWeight: 500 }}
          >
            Transform your healthcare facility with an ecosystem specifically engineered for speed, secure data, and superior patient care quality.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, position: "relative", zIndex: 1 }}>
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: { backgroundColor: "#FFFFFF", y: 0, borderColor: "#E2E8F0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" },
                hover: { background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", y: -6, borderColor: "#2563EB", boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.15)" }
              }}
              style={{
                position: "relative",
                padding: "40px 36px",
                borderRadius: "2rem",
                border: "1px solid",
                transition: "all 0.5s var(--ease-soft)",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {/* Top Accent Bar (Inspired by Image) */}
              <motion.div 
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 }
                }}
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: 4, 
                  background: "linear-gradient(to right, #2563EB, #60A5FA, #2563EB)",
                  transformOrigin: "left",
                  zIndex: 10
                }} 
              />

              {/* Icon Container (Inspired by Image) */}
              <motion.div 
                variants={{
                  rest: { backgroundColor: "#0F172A", color: "#60A5FA" },
                  hover: { backgroundColor: "#2563EB", color: "#FFFFFF" }
                }}
                style={{
                  marginBottom: 32,
                  width: 60,
                  height: 60,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {benefit.icon}
              </motion.div>

              <motion.h3 
                variants={{
                  rest: { color: "#0F172A" },
                  hover: { color: "#1E40AF" }
                }}
                style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 16, letterSpacing: "0.02em", textTransform: "uppercase" }}
              >
                {benefit.title}
              </motion.h3>

              <motion.p 
                variants={{
                  rest: { color: "#475569" },
                  hover: { color: "#334155" }
                }}
                style={{ lineHeight: 1.7, fontSize: "1rem", fontWeight: 500, marginBottom: 24 }}
              >
                {benefit.description}
              </motion.p>

              {/* Action Link (Inspired by Image) */}
              <motion.div 
                variants={{
                  rest: { color: "#2563EB" },
                  hover: { color: "#1E40AF" }
                }}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                <motion.span variants={{ rest: { x: 0 }, hover: { x: 2 } }}>↗</motion.span>
                MODULE DETAILS
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
