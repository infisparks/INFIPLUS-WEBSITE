"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Quote,
  Cpu,
  Layers,
  Database,
  Network,
  Megaphone,
  TrendingUp,
  Target,
  Palette,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface FounderData {
  name: string;
  role: string;
  image: string;
  quote: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  expertise: {
    label: string;
    icon: React.ReactNode;
  }[];
}

const founders: FounderData[] = [
  {
    name: "Shaikh Mudassir",
    role: "Founder & Head of Technology & Engineering",
    image: "/founder/ShaikhMudassir.png",
    quote:
      "Modern marketing is nothing without rock-solid tech infrastructure. We build high-converting software ecosystems — from custom CRMs and ERPs to intelligent AI automations and robust APIs that turn data into automated business revenue.",
    accentColor: "#4F46E5", // Indigo
    badgeBg: "rgba(79, 70, 229, 0.08)",
    badgeBorder: "rgba(79, 70, 229, 0.22)",
    badgeText: "#4338CA",
    expertise: [
      {
        label: "AI & Automations",
        icon: <Cpu size={14} style={{ color: "#4F46E5" }} />,
      },
      {
        label: "Software & Web Apps",
        icon: <Layers size={14} style={{ color: "#4F46E5" }} />,
      },
      {
        label: "Custom CRMs & ERPs",
        icon: <Database size={14} style={{ color: "#4F46E5" }} />,
      },
      {
        label: "APIs & Integrations",
        icon: <Network size={14} style={{ color: "#4F46E5" }} />,
      },
    ],
  },
  {
    name: "Moin Zariwala",
    role: "Founder & Head of Marketing Strategy",
    image: "/founder/moinzariwala.png",
    quote:
      "Scaling brands requires an obsession with market psychology, omni-channel acquisition, and bulletproof campaign execution. We ensure every campaign reaches the exact target audience with messaging that converts immediately.",
    accentColor: "#7C3AED", // Purple / Violet
    badgeBg: "rgba(124, 58, 237, 0.08)",
    badgeBorder: "rgba(124, 58, 237, 0.22)",
    badgeText: "#6D28D9",
    expertise: [
      {
        label: "Omni-Channel Marketing",
        icon: <Megaphone size={14} style={{ color: "#7C3AED" }} />,
      },
      {
        label: "Brand Positioning & Scaling",
        icon: <TrendingUp size={14} style={{ color: "#7C3AED" }} />,
      },
      {
        label: "Lead Generation & CRO",
        icon: <Target size={14} style={{ color: "#7C3AED" }} />,
      },
      {
        label: "Creative Campaigns",
        icon: <Palette size={14} style={{ color: "#7C3AED" }} />,
      },
    ],
  },
];

export default function Founders() {
  return (
    <section
      id="founders"
      style={{
        position: "relative",
        padding: "clamp(56px, 8vw, 96px) 0",
        background: "#F8FAFC",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Accent Gradients */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto clamp(36px, 5vw, 56px) auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-badge"
            style={{ marginBottom: 12 }}
          >
            <ShieldCheck size={13} style={{ color: "#4F46E5" }} />
            <span>EXECUTIVE LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: "clamp(1.4rem, 3.8vw, 2.4rem)",
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 14,
            }}
          >
            Meet the Founders Behind{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INFIPLUS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            style={{
              color: "#64748B",
              fontSize: "clamp(0.82rem, 1.5vw, 0.94rem)",
              lineHeight: 1.6,
              fontWeight: 450,
            }}
          >
            Bridging high-availability software architecture and data-driven marketing strategy
            to modernize and scale healthcare &amp; enterprise operations across India.
          </motion.p>
        </div>

        {/* 2-Column Founders Grid (1-Column on Mobile) */}
        <div
          className="founders-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "clamp(16px, 3vw, 28px)",
            alignItems: "stretch",
          }}
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)",
                padding: "clamp(20px, 3vw, 28px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle Top Accent Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${founder.accentColor} 0%, ${founder.accentColor}40 100%)`,
                }}
              />

              {/* Founder Header Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(14px, 2.5vw, 20px)",
                  flexWrap: "wrap",
                }}
              >
                {/* Photo Frame */}
                <div
                  style={{
                    position: "relative",
                    width: "clamp(78px, 12vw, 92px)",
                    height: "clamp(78px, 12vw, 92px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: `2px solid ${founder.accentColor}25`,
                    boxShadow: `0 8px 18px -4px ${founder.accentColor}25`,
                    backgroundColor: "#F1F5F9",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 78px, 92px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>

                {/* Identity & Role */}
                <div style={{ flex: "1 1 200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3
                      style={{
                        fontSize: "clamp(1.15rem, 2.2vw, 1.35rem)",
                        fontWeight: 800,
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {founder.name}
                    </h3>
                    <CheckCircle2 size={16} style={{ color: founder.accentColor, flexShrink: 0 }} />
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: founder.badgeBg,
                      border: `1px solid ${founder.badgeBorder}`,
                      color: founder.badgeText,
                      fontSize: "clamp(0.7rem, 1.3vw, 0.78rem)",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      lineHeight: 1.35,
                    }}
                  >
                    {founder.role}
                  </div>
                </div>
              </div>

              {/* Quote Block */}
              <div
                style={{
                  position: "relative",
                  background: "#F8FAFC",
                  borderLeft: `3.5px solid ${founder.accentColor}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "clamp(14px, 2vw, 18px) clamp(14px, 2vw, 20px)",
                }}
              >
                <Quote
                  size={20}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 12,
                    color: founder.accentColor,
                    opacity: 0.18,
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 1.4vw, 0.88rem)",
                    lineHeight: 1.65,
                    color: "#334155",
                    fontStyle: "italic",
                    fontWeight: 450,
                    margin: 0,
                  }}
                >
                  &ldquo;{founder.quote.replace(/[“”"]/g, "")}&rdquo;
                </p>
              </div>

              {/* Core Domain Expertise */}
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "#64748B",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Sparkles size={12} style={{ color: founder.accentColor }} />
                  <span>Core Domain Expertise</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {founder.expertise.map((skill) => (
                    <div
                      key={skill.label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 11px",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        fontSize: "0.76rem",
                        fontWeight: 500,
                        color: "#1E293B",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
                        transition: "border-color 0.2s, transform 0.2s",
                      }}
                    >
                      {skill.icon}
                      <span>{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
