"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, Fingerprint, Star, Clock } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onBookDemo: () => void;
}

// Low-overhead Animation Config
const HERO_ANIM = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  return (
    <>
      <section
        id="hero"
        style={{
          position: "relative",
          paddingTop: 180,
          paddingBottom: 100,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)" // Soft white to light blue base
        }}
      >
        {/* Absolute Background Image (Optimized) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg-image.png"
            alt="Advanced Medical Digital Interface"
            fill
            priority
            quality={100}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.6 // Subtly blend image with the light background
            }}
          />
          {/* Advanced Overlays for Depth and Glassmorphism feel */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.8) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="container-main" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: HERO_ANIM.ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 24px",
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "100px",
              color: "#2563EB",
              fontSize: "0.9rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 36,
              backdropFilter: "blur(10px)", // Premium Glassmorphism
              boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.1)"
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", animation: "pulse 2s infinite" }} />
            The Future of Paperless Care
          </motion.div>

          {/* Headline - Advanced level */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: HERO_ANIM.ease, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: 32,
              maxWidth: 1100,
              marginInline: "auto",
              color: '#0F172A', // High contrast dark slate
            }}
          >
            Effortless Hospital Flow. <br />
            <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zero Paper Complexity.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: HERO_ANIM.ease, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
              color: "#475569", // slate-600
              maxWidth: 820,
              margin: "0 auto 56px",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Bridge the gap between technology and patient care. Our 100% digital hospital ecosystem eliminates physical charts, automates progress notes, and synchronizes your entire facility in real-time.
          </motion.p>

          {/* CTAs - Advanced Hover & Transitions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: HERO_ANIM.ease, delay: 0.3 }}
            style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              onClick={onBookDemo}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "22px 52px",
                borderRadius: "100px",
                border: "none",
                background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                color: "#FFFFFF",
                fontSize: "1.15rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                transition: "box-shadow 0.3s ease"
              }}
            >
              Start Going Paperless
              <ArrowRight size={24} strokeWidth={3} />
            </motion.button>

            <motion.button
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ background: "rgba(255, 255, 255, 1)", borderColor: "rgba(37, 99, 235, 1)", scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "22px 52px",
                borderRadius: "100px",
                border: "2px solid rgba(37, 99, 235, 0.2)",
                color: "#2563EB",
                fontSize: "1.15rem",
                fontWeight: 800,
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Explore Digital Features
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative elements for advanced look */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #FFFFFF)" }} />
      </section>

      {/* ── PAPERLESS METRICS SECTION - Light Blue + White Theme ── */}
      <section style={{
        background: "linear-gradient(to bottom, #F8FAFC, #EEF2FF)",
        padding: "100px 0",
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(226, 232, 240, 0.5)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.5)"
      }}>
        {/* Subtle radial glow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "30%", height: "30%", background: "radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)", zIndex: -1 }} />

        <div className="container-main" style={{ maxWidth: 1200 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>
              The Future of <span style={{ color: "#2563EB" }}>Paperless Healthcare</span>
            </h2>
            <p style={{ color: "#475569", fontSize: "1.1rem", fontWeight: 500, maxWidth: 640, marginInline: "auto", lineHeight: 1.6 }}>
              Experience a hospital environment where technology serves humanity, creating a seamless digital ecosystem for patient care.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
            alignItems: "stretch"
          }}>
            <MetricItem
              icon={<Star size={28} strokeWidth={2.5} />}
              title="Unified Digital Charts"
              desc="Instantly view every patient's history, labs, and vitals from any ward tablet or desktop."
              color="#2563EB"
            />
            <MetricItem
              icon={<Fingerprint size={28} strokeWidth={2.5} />}
              title="Intelligent Progress Notes"
              desc="Automated timestamping and smart templates that learn from your medical writing style."
              color="#10B981"
            />
            <MetricItem
              icon={<Clock size={28} strokeWidth={2.5} />}
              title="Real-Time Diagnostics"
              desc="Pathology and imaging results delivered digitally the second they are verified."
              color="#8B5CF6"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @media (max-width: 768px) {
          #hero { padding-top: 140px; text-align: center; }
          h1 { line-height: 1.1 !important; }
        }
      `}</style>
    </>
  );
}

function MetricItem({ icon, title, desc, color }: { icon: any; title: string; desc: string; color: string }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { backgroundColor: "#FFFFFF", y: 0, borderColor: "#E2E8F0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" },
        hover: { background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", y: -10, borderColor: "#2563EB", boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.15)" }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: "40px 32px",
        borderRadius: "2rem",
        border: "1px solid",
        transition: "all 0.5s var(--ease-soft)",
        cursor: "pointer",
        height: "100%",
        overflow: "hidden",
        position: "relative"
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
          height: 5,
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
          width: 56,
          height: 56,
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </motion.div>

      <div>
        <motion.h4
          variants={{
            rest: { color: "#0F172A" },
            hover: { color: "#1E40AF" }
          }}
          style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: 12, letterSpacing: "0.02em", textTransform: "uppercase" }}
        >
          {title}
        </motion.h4>
        <motion.p
          variants={{
            rest: { color: "#475569" },
            hover: { color: "#334155" }
          }}
          style={{ fontSize: "1rem", lineHeight: 1.6, fontWeight: 500, marginBottom: 24 }}
        >
          {desc}
        </motion.p>

        {/* Footer Link (Inspired by Image) */}
        <motion.div
          variants={{
            rest: { color: "#2563EB" },
            hover: { color: "#1E40AF" }
          }}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          <motion.span variants={{ rest: { x: 0 }, hover: { x: 2 } }}>↗</motion.span>
          DIGITAL PRECISION
        </motion.div>
      </div>
    </motion.div>
  );
}
