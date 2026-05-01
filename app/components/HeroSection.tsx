"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, CheckCircle, TrendingUp, Users,
  Activity, Download, Zap, Shield, Clock, Fingerprint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  onBookDemo: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TICKER_ITEMS = [
  "OPD Management", "IPD Admissions", "Paperless Digital File", "AI Prescriptions",
  "Live Bed Tracking", "Lab Reports", "Revenue Analytics", "WhatsApp Integration",
  "Voice Data Entry", "Doctor Performance", "Daily Chart", "Progress Notes",
];

const ROTATING_WORDS = ["OPD Automation", "IPD & Billing", "Lab Reporting", "Pharmacy Sales", "Patient EMR", "Clinic Growth"];

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
      if (mobile) {
        setIsLoaded(false);
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsLoaded(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile && !isLoaded) {
    return (
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(155deg, #FFFFFF 0%, #EFF6FF 55%, #F5F3FF 100%)",
        }}
      />
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(155deg, #FFFFFF 0%, #EFF6FF 55%, #F5F3FF 100%)",
          paddingTop: "clamp(70px, 10vw, 130px)",
          paddingBottom: "clamp(40px, 6vw, 80px)",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg-image.png"
            alt="Hospital Management Dashboard"
            fill
            priority
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.3 }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.88) 100%)",
          }} />
        </div>

        {/* Floating blobs */}
        <div style={{
          position: "absolute", top: "10%", right: "6%",
          width: "clamp(180px, 18vw, 300px)", height: "clamp(180px, 18vw, 300px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(50px)", zIndex: 0,
          animation: isMobile ? undefined : "float-y 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "18%", left: "4%",
          width: "clamp(140px, 14vw, 240px)", height: "clamp(140px, 14vw, 240px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(50px)", zIndex: 0,
          animation: isMobile ? undefined : "float-y 10s ease-in-out infinite reverse",
        }} />

        <div
          className="container-main"
          style={{
            textAlign: "center", position: "relative", zIndex: 1,
            maxWidth: 960, padding: "0 clamp(16px, 5vw, 40px)",
          }}
        >
          {/* ── Top badge ── */}
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: -12, scale: 0.9 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={isMobile ? undefined : { duration: 0.55, ease: EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 16px 5px 6px",
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(37,99,235,0.16)",
              borderRadius: "9999px",
              marginBottom: "clamp(14px, 2.5vw, 28px)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 16px -4px rgba(37,99,235,0.1)",
            }}
          >
            {/* Yellow highlight pill */}
            <span style={{
              background: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)",
              color: "#0A0A0F",
              fontSize: "clamp(0.48rem, 1.1vw, 0.58rem)",
              fontWeight: 800, letterSpacing: "0.08em",
              textTransform: "uppercase", borderRadius: "9999px",
              padding: "2px 8px",
            }}>NEW</span>
            <span style={{
              color: "#2563EB",
              fontSize: "clamp(0.56rem, 1.3vw, 0.68rem)",
              fontWeight: 700, letterSpacing: "0.02em",
            }}>
              India&apos;s Best Hospital Management Software — #1 Paperless HMS
            </span>
            <ArrowRight size={11} strokeWidth={2.5} style={{ color: "#2563EB" }} />
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            initial={isMobile ? undefined : { opacity: 0, y: 32 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.85, ease: EASE, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.2rem, 5.5vw, 4.6rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              marginBottom: "clamp(6px, 1.5vw, 16px)",
              color: "#1E293B",
            }}
          >
            Next-Gen Hospital HMS
            <br className="hero-br" />
            <span style={{ color: "#64748B", fontWeight: 700 }}>Built for </span>
            {/* Rotating animated word */}
            <span style={{
              display: "inline-block",
              position: "relative",
              minWidth: "clamp(90px, 26vw, 380px)",
            }}>
              {isMobile ? (
                <span
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                    color: "white",
                    padding: "4px 18px",
                    borderRadius: "14px",
                    boxShadow: "0 15px 35px -8px rgba(37,99,235,0.5)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ROTATING_WORDS[wordIndex]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 25, rotateX: -30, filter: "blur(8px)", scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, y: -25, rotateX: 30, filter: "blur(8px)", scale: 0.95 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1], // Custom fast-out ease
                    }}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", // Vibrate Blue
                      color: "white",
                      padding: "4px 18px",
                      borderRadius: "14px",
                      boxShadow: "0 15px 35px -8px rgba(37,99,235,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </motion.h1>

          {/* ── Subheadline ── */}
          <motion.p
            initial={isMobile ? undefined : { opacity: 0, y: 20 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.75, ease: EASE, delay: 0.22 }}
            style={{
              fontSize: "clamp(0.68rem, 1.7vw, 1.05rem)",
              color: "#475569",
              maxWidth: "clamp(260px, 88vw, 620px)",
              margin: "0 auto clamp(16px, 3.5vw, 40px)",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Replace paper charts with{" "}
            {/* Yellow highlight for key phrase */}
            <span style={{
              background: "linear-gradient(135deg, #FACC15, #F59E0B)",
              color: "white",
              padding: "0 6px",
              borderRadius: "4px",
              fontWeight: 700,
            }}>
              100% digital workflows.
            </span>{" "}
            Automate OPD, IPD, Lab &amp; Billing — and scale revenue in real‑time.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 18 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.75, ease: EASE, delay: 0.32 }}
            style={{
              display: "flex", gap: "clamp(10px, 2.5vw, 14px)",
              justifyContent: "center", flexWrap: "wrap",
            }}
          >
            <motion.button
              onClick={onBookDemo}
              aria-label="Book a Demo"
              whileHover={isMobile ? undefined : { scale: 1.05, boxShadow: "0 20px 48px -8px rgba(37,99,235,0.45)" }}
              whileTap={isMobile ? undefined : { scale: 0.97 }}
              className="glow-btn-primary"
              style={{
                padding: "clamp(8px, 1.6vw, 16px) clamp(14px, 3.5vw, 44px)",
                borderRadius: "9999px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "clamp(0.68rem, 1.5vw, 0.95rem)",
                fontWeight: 700,
                display: "flex", alignItems: "center", gap: 6,
                cursor: "pointer", letterSpacing: "0.01em",
              }}
            >
              <Zap size={15} strokeWidth={2.5} />
              Start Going Paperless
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.button>

            <Link href="/view-brochure" style={{ textDecoration: "none" }} aria-label="View Infiplus Brochure">
              <motion.button
                aria-label="Download Brochure"
                whileHover={isMobile ? undefined : {
                  background: "rgba(255,255,255,1)",
                  borderColor: "rgba(37,99,235,0.6)",
                  scale: 1.04,
                }}
                whileTap={isMobile ? undefined : { scale: 0.97 }}
                style={{
                  padding: "clamp(8px, 1.6vw, 16px) clamp(14px, 3.5vw, 44px)",
                  borderRadius: "9999px",
                  border: "1.5px solid rgba(124,58,237,0.22)",
                  color: "#7C3AED",
                  fontSize: "clamp(0.68rem, 1.5vw, 0.95rem)",
                  fontWeight: 700,
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(16px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.01em",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <Download size={15} strokeWidth={2.5} />
                Download Brochure
              </motion.button>
            </Link>

            <motion.button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Explore Features"
              whileHover={isMobile ? undefined : {
                background: "rgba(255,255,255,1)",
                borderColor: "rgba(37,99,235,0.6)",
                scale: 1.04,
              }}
              whileTap={isMobile ? undefined : { scale: 0.97 }}
              style={{
                padding: "clamp(8px, 1.6vw, 16px) clamp(14px, 3.5vw, 44px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(37,99,235,0.2)",
                color: "#2563EB",
                fontSize: "clamp(0.68rem, 1.5vw, 0.95rem)",
                fontWeight: 700,
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.01em",
              }}
            >
              Explore Features
            </motion.button>
          </motion.div>

          {/* ── Trust checkmarks ── */}
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 14 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.7, ease: EASE, delay: 0.44 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "clamp(8px, 2vw, 18px)",
              marginTop: "clamp(14px, 2.5vw, 24px)", flexWrap: "wrap",
            }}
          >
            {["3–5 Day Setup", "Free Data Import", "24/7 Support", "HIPAA Compliant"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <CheckCircle size={11} strokeWidth={2.5} style={{ color: "#10B981", flexShrink: 0 }} />
                <span style={{
                  fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
                  fontWeight: 600, color: "#475569",
                }}>
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 12 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.75, ease: EASE, delay: 0.55 }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              gap: "clamp(10px, 2.5vw, 28px)",
              marginTop: "clamp(18px, 3vw, 40px)",
              padding: "clamp(10px, 1.5vw, 18px) clamp(14px, 3vw, 36px)",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(226,232,240,0.9)",
              borderRadius: "clamp(16px, 3vw, 24px)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px -8px rgba(37,99,235,0.08)",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "50+", label: "Hospitals" },
              { num: "25", label: "Modules" },
              { num: "100%", label: "Paperless" },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2.5vw, 24px)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(0.88rem, 2vw, 1.4rem)",
                    fontWeight: 900, color: "#2563EB",
                    letterSpacing: "-0.03em", lineHeight: 1,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontSize: "clamp(0.55rem, 1vw, 0.68rem)",
                    fontWeight: 600, color: "#64748B",
                    marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {stat.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 28, background: "#E2E8F0" }} />
                )}
              </div>
            ))}
            <div style={{ width: 1, height: 28, background: "#E2E8F0" }} />
            <div style={{ textAlign: "center" }}>
              {/* Stars in yellow — accent only */}
              <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 4 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={11} strokeWidth={0} fill="#FACC15" />
                ))}
              </div>
              <div style={{
                fontSize: "clamp(0.55rem, 1vw, 0.68rem)",
                fontWeight: 600, color: "#64748B",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                5.0 Rated
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 100, zIndex: 2,
          background: "linear-gradient(to bottom, transparent, #FFFFFF)",
        }} />
      </section>

      {/* ── SCROLLING TICKER ── */}
      <div style={{
        background: "linear-gradient(90deg, #0F172A, #1E3A8A)",
        padding: "10px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(37,99,235,0.2)",
        borderBottom: "1px solid rgba(37,99,235,0.2)",
        position: "relative", zIndex: 5,
      }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                paddingRight: 40, whiteSpace: "nowrap",
              }}
            >
              <span style={{
                fontSize: "clamp(0.58rem, 1.2vw, 0.7rem)",
                fontWeight: 600, color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {item}
              </span>
              {/* Yellow dot accent on ticker */}
              <span style={{
                width: 4, height: 4, borderRadius: "50%",
                background: "#FACC15", display: "inline-block", flexShrink: 0,
                opacity: 0.7,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── METRICS SECTION ── */}
      <section style={{
        background: "linear-gradient(165deg, #F8FAFC 0%, #EEF2FF 50%, #F5F3FF 100%)",
        padding: "clamp(36px, 6vw, 96px) 0",
        position: "relative", zIndex: 10,
        borderBottom: "1px solid rgba(226,232,240,0.6)",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }} className="bg-dot-grid" />

        <div className="container-main" style={{ maxWidth: 1100, position: "relative", zIndex: 1, padding: "0 clamp(16px, 5vw, 40px)" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 48px)" }}>
            <motion.span
              initial={isMobile ? undefined : { opacity: 0, y: 10 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? undefined : { duration: 0.5, ease: EASE }}
              className="section-badge"
            >
              WHY GO PAPERLESS
            </motion.span>

            <motion.h2
              initial={isMobile ? undefined : { opacity: 0, y: 16 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? undefined : { duration: 0.7, ease: EASE, delay: 0.08 }}
              style={{
                fontSize: "clamp(1.15rem, 3.5vw, 2.5rem)",
                fontWeight: 900, color: "#0F172A",
                marginBottom: "clamp(6px, 1.2vw, 14px)",
                letterSpacing: "-0.04em", lineHeight: 1.1,
              }}
            >
              The Future of{" "}
              <span style={{
                background: "linear-gradient(135deg, #2563EB, #6366F1)",
                color: "white",
                padding: "2px 12px",
                borderRadius: "8px",
                display: "inline-block",
              }}>
                Paperless Healthcare
              </span>
            </motion.h2>

            <motion.p
              initial={isMobile ? undefined : { opacity: 0, y: 12 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? undefined : { duration: 0.65, ease: EASE, delay: 0.16 }}
              style={{
                color: "#475569", lineHeight: 1.65, fontWeight: 500,
                fontSize: "clamp(0.72rem, 1.5vw, 0.92rem)",
                maxWidth: 520, marginInline: "auto",
              }}
            >
              A seamless digital ecosystem — where technology and human care converge.
            </motion.p>
          </div>

          {/* Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(12px, 2vw, 20px)",
          }}>
            <MetricCard icon={<Star size={18} strokeWidth={2} />} title="Unified Digital Charts" desc="View every patient's history, labs, and vitals from any ward tablet or desktop." color="#2563EB" isMobile={isMobile} />
            <MetricCard icon={<Fingerprint size={18} strokeWidth={2} />} title="Smart Progress Notes" desc="Automated timestamping and smart templates that learn your writing style." color="#7C3AED" isMobile={isMobile} />
            <MetricCard icon={<Clock size={18} strokeWidth={2} />} title="Real-Time Diagnostics" desc="Pathology results delivered digitally the second they are verified." color="#0891B2" isMobile={isMobile} />
            <MetricCard icon={<Activity size={18} strokeWidth={2} />} title="Revenue Analytics" desc="Track performance in real-time with doctor-wise revenue dashboards." color="#10B981" isMobile={isMobile} />
          </div>

          {/* KPI strip */}
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 12 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? undefined : { duration: 0.65, ease: EASE, delay: 0.1 }}
            style={{
              display: "flex", gap: "clamp(14px, 3vw, 28px)",
              justifyContent: "center", flexWrap: "wrap",
              marginTop: "clamp(20px, 3.5vw, 48px)",
              padding: "clamp(12px, 1.8vw, 22px) clamp(16px, 3vw, 40px)",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(226,232,240,0.8)",
              borderRadius: "clamp(14px, 2.5vw, 20px)",
              backdropFilter: "blur(8px)",
            }}
          >
            {[
              { icon: <TrendingUp size={14} />, label: "Avg. 3× faster OPD", color: "#2563EB" },
              { icon: <Users size={14} />, label: "50+ hospitals trust us", color: "#7C3AED" },
              { icon: <Activity size={14} />, label: "Zero downtime SLA", color: "#10B981" },
              { icon: <Star size={14} />, label: "5.0 rating · 100% satisfaction", color: "#F59E0B" },
            ].map((kpi) => (
              <div key={kpi.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ color: kpi.color }}>{kpi.icon}</div>
                <span style={{ fontSize: "clamp(0.62rem, 1.2vw, 0.78rem)", fontWeight: 600, color: "#475569" }}>
                  {kpi.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .hero-br { display: none; }
        }
        @media (max-width: 400px) {
          #hero { padding-top: 64px !important; padding-bottom: 32px !important; }
        }
      `}</style>
    </>
  );
}

function MetricCard({ icon, title, desc, color, isMobile }: {
  icon: React.ReactNode; title: string; desc: string; color: string; isMobile: boolean;
}) {
  return (
    <motion.div
      initial={isMobile ? undefined : { opacity: 0, y: 20 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={isMobile ? undefined : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={isMobile ? undefined : { y: -6, boxShadow: `0 20px 48px -10px ${color}28` }}
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(12px, 2vw, 20px)",
        border: "1px solid rgba(226,232,240,0.9)",
        padding: "clamp(14px, 2.5vw, 28px) clamp(12px, 2vw, 24px)",
        display: "flex", flexDirection: "column", gap: 10,
        cursor: "pointer", overflow: "hidden", position: "relative",
        transition: "all 0.42s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)",
      }}
    >
      <motion.div
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}66)`,
          transformOrigin: "left",
        }}
      />
      <div style={{
        width: "clamp(32px, 4.5vw, 44px)", height: "clamp(32px, 4.5vw, 44px)",
        borderRadius: 10, background: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: color,
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{
          fontSize: "clamp(0.78rem, 1.6vw, 1rem)",
          fontWeight: 700, color: "#0F172A", marginBottom: 5, letterSpacing: "-0.01em",
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: "clamp(0.68rem, 1.3vw, 0.82rem)",
          color: "#475569", lineHeight: 1.6, fontWeight: 500,
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
