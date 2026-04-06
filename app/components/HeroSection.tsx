"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onBookDemo: () => void;
}

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      style={{ 
        position: "relative", 
        paddingTop: 160, 
        paddingBottom: 100, 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        overflow: "hidden" 
      }}
    >
      {/* ── BACKGROUND VISUALS ── */}
      {/* Radial Glows */}
      <div 
        style={{ 
          position: "absolute", 
          top: "10%", 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: "120%", 
          height: 800, 
          background: "radial-gradient(circle, rgba(79, 140, 255, 0.1) 0%, transparent 70%)", 
          pointerEvents: "none",
          zIndex: -1
        }} 
      />
      <div 
        style={{ 
          position: "absolute", 
          top: "-200px", 
          right: "-100px", 
          width: 500, 
          height: 500, 
          background: "radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, transparent 70%)", 
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: -1
        }} 
      />

      {/* Grid Background */}
      <div className="bg-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, zIndex: -2 }} />

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "20%", left: "10%", width: 2, height: 100, background: "linear-gradient(to bottom, var(--color-primary), transparent)", filter: "blur(1px)", zIndex: -1 }}
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "30%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,0.05) 0%, transparent 70%)", zIndex: -1 }}
      />

      <div className="container-main" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-badge"
        >
          Revolutionizing Hospital Management
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontSize: "clamp(2.1rem, 10vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            marginBottom: 32,
            maxWidth: 1000,
            marginInline: "auto",
          }}
        >
          Streamline Your Hospital Operations with <span className="gradient-text-vivid">Digital Excellence</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            color: "var(--text-dim)",
            maxWidth: 700,
            margin: "0 auto 48px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          The most powerful, intuitive, and <span className="gradient-text-paperless" style={{ fontWeight: 600 }}>Paperless</span> platform designed to automate your clinic, ward, and administration in one seamless experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button 
            onClick={onBookDemo}
            className="glow-btn-primary"
            style={{
              padding: "18px 40px",
              borderRadius: "50px",
              border: "none",
              color: "#fff",
              fontSize: "1.05rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            Start Your Free Trial
            <ArrowRight size={20} />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("features");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="glass-card"
            style={{
              padding: "18px 40px",
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "1.05rem",
              fontWeight: 600,
              background: "rgba(255,255,255,0.02)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Explore Features
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Trusted by Modern Healthcare Providers
          </p>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center", opacity: 0.6 }}>
             <TrustStat icon={<Shield size={18} />} text="HIPAA Compliant" />
             <TrustStat icon={<Star size={18} />} text="Highly Secure" />
             <TrustStat icon={<Zap size={18} />} text="Fast Performance" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          #hero { padding-top: 120px; text-align: center; }
          h1 { line-height: 1.1; }
        }
      `}</style>
    </section>
  );
}

function TrustStat({ icon, text }: { icon: any; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", fontSize: "0.95rem", fontWeight: 500 }}>
      <span style={{ color: "var(--color-primary)" }}>{icon}</span>
      {text}
    </div>
  );
}
