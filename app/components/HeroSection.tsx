"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Fingerprint, CheckCircle, TrendingUp, Users, Activity } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onBookDemo: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TICKER_ITEMS = [
  "OPD Management", "IPD Admissions", "Paperless Digital File", "AI Prescriptions",
  "Live Bed Tracking", "Lab Reports", "Revenue Analytics", "WhatsApp Integration",
  "Voice Data Entry", "Doctor Performance", "Daily Chart", "Progress Notes",
];

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  return (
    <>
      <section
        id="hero"
        style={{
          position: "relative",
          paddingTop: "clamp(110px, 16vw, 160px)",
          paddingBottom: "clamp(50px, 7vw, 80px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(155deg, #FFFFFF 0%, #EFF6FF 50%, #F5F3FF 100%)",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg-image.png"
            alt="Advanced Medical Digital Interface"
            fill
            priority
            quality={100}
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.35 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.88) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 20%, rgba(37,99,235,0.05) 0%, transparent 65%)" }} />
        </div>

        {/* Floating blobs */}
        <div style={{ position: "absolute", top: "12%", right: "6%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0, animation: "float-y 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "18%", left: "4%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0, animation: "float-y 9s ease-in-out infinite reverse" }} />

        <div className="container-main" style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: 1000 }}>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(37,99,235,0.16)",
              borderRadius: "9999px",
              color: "#2563EB",
              fontSize: "clamp(0.58rem, 1.8vw, 0.67rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "clamp(18px, 3vw, 28px)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 6px 24px -4px rgba(37,99,235,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
            }}
          >
            <span style={{ position: "relative", width: 7, height: 7, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "#2563EB", animation: "badge-ping 1.8s ease-out infinite" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563EB", display: "inline-block" }} />
            </span>
            India&apos;s #1 Paperless Hospital Platform
            <span style={{ background: "rgba(37,99,235,0.1)", borderRadius: "999px", padding: "1px 7px", fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.08em" }}>LIVE</span>
          </motion.div>

          {/* Main headline — very compact */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 6.5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              marginBottom: "clamp(12px, 2.5vw, 22px)",
              maxWidth: "clamp(320px, 90vw, 880px)",
              marginInline: "auto",
              color: "#0F172A",
            }}
          >
            Effortless Hospital Flow.{" "}
            <br className="headline-break" />
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #6366F1 60%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Zero Paper Complexity.
            </span>
          </motion.h1>

          {/* Sub headline — compact */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1.05rem)",
              color: "#475569",
              maxWidth: "clamp(280px, 80vw, 640px)",
              margin: "0 auto clamp(20px, 4vw, 32px)",
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            100% digital hospital ecosystem — eliminates physical charts, automates progress notes, and synchronizes your entire facility in real-time.
          </motion.p>

          {/* CTA buttons — compact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.3 }}
            style={{ display: "flex", gap: "clamp(8px, 2vw, 14px)", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              onClick={onBookDemo}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -8px rgba(37,99,235,0.42)" }}
              whileTap={{ scale: 0.97 }}
              className="glow-btn-primary"
              style={{
                padding: "clamp(11px, 1.8vw, 16px) clamp(22px, 3.5vw, 44px)",
                borderRadius: "9999px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "clamp(0.78rem, 1.8vw, 0.95rem)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              Start Going Paperless
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ background: "rgba(255,255,255,1)", borderColor: "rgba(37,99,235,0.7)", scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "clamp(11px, 1.8vw, 16px) clamp(22px, 3.5vw, 44px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(37,99,235,0.22)",
                color: "#2563EB",
                fontSize: "clamp(0.78rem, 1.8vw, 0.95rem)",
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

          {/* Checkmarks row — info dense */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(10px, 2.5vw, 22px)",
              marginTop: "clamp(16px, 2.5vw, 24px)",
              flexWrap: "wrap",
            }}
          >
            {["3–5 Day Setup", "Free Data Import", "24/7 Support", "HIPAA Compliant"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <CheckCircle size={12} strokeWidth={2.5} style={{ color: "#10B981", flexShrink: 0 }} />
                <span style={{ fontSize: "clamp(0.68rem, 1.3vw, 0.78rem)", fontWeight: 600, color: "#475569" }}>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats strip — compact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.52 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 2.5vw, 24px)",
              marginTop: "clamp(20px, 3vw, 36px)",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "50+", label: "Hospitals" },
              { num: "25", label: "Modules" },
              { num: "100%", label: "Paperless" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: "clamp(0.88rem, 1.6vw, 1rem)", fontWeight: 800, color: "#2563EB", letterSpacing: "-0.02em" }}>
                  {stat.num}
                </span>
                <span style={{ fontSize: "clamp(0.68rem, 1.3vw, 0.78rem)", fontWeight: 500, color: "#64748B" }}>
                  {stat.label}
                </span>
                <div style={{ width: 1, height: 13, background: "#E2E8F0", marginLeft: 7 }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} strokeWidth={0} fill="#F59E0B" />
              ))}
              <span style={{ fontSize: "clamp(0.65rem, 1.3vw, 0.75rem)", fontWeight: 600, color: "#64748B", marginLeft: 4 }}>5.0 rated</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #FFFFFF)", zIndex: 2 }} />
      </section>

      {/* ── SCROLLING TICKER ── */}
      <div
        style={{
          background: "linear-gradient(90deg, #0F172A, #1E3A8A)",
          padding: "10px 0",
          overflow: "hidden",
          borderTop: "1px solid rgba(37,99,235,0.2)",
          borderBottom: "1px solid rgba(37,99,235,0.2)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                paddingRight: 40,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {item}
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(99,102,241,0.6)", display: "inline-block", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── METRICS SECTION ── */}
      <section
        style={{
          background: "linear-gradient(165deg, #F8FAFC 0%, #EEF2FF 50%, #F5F3FF 100%)",
          padding: "clamp(48px, 8vw, 80px) 0",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(226,232,240,0.6)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }} className="bg-dot-grid" />

        <div className="container-main" style={{ maxWidth: 1100, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 52px)" }}>
            <span className="section-badge">
              WHY GO PAPERLESS
            </span>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(8px, 1.5vw, 14px)",
                letterSpacing: "-0.035em",
              }}
            >
              The Future of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2563EB, #6366F1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Paperless Healthcare
              </span>
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: "clamp(0.78rem, 1.6vw, 0.92rem)",
                fontWeight: 500,
                maxWidth: 520,
                marginInline: "auto",
                lineHeight: 1.65,
              }}
            >
              A seamless digital ecosystem for patient care — where technology and human care converge.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "clamp(12px, 2.5vw, 22px)",
            }}
          >
            <MetricCard
              icon={<Star size={20} strokeWidth={2} />}
              title="Unified Digital Charts"
              desc="Instantly view every patient's history, labs, and vitals from any ward tablet or desktop."
              color="#2563EB"
            />
            <MetricCard
              icon={<Fingerprint size={20} strokeWidth={2} />}
              title="Intelligent Progress Notes"
              desc="Automated timestamping and smart templates that learn from your medical writing style."
              color="#7C3AED"
            />
            <MetricCard
              icon={<Clock size={20} strokeWidth={2} />}
              title="Real-Time Diagnostics"
              desc="Pathology and imaging results delivered digitally the second they are verified."
              color="#0891B2"
            />
            <MetricCard
              icon={<Activity size={20} strokeWidth={2} />}
              title="Revenue Analytics"
              desc="Track performance and revenue in real-time with doctor-wise breakdowns and dashboards."
              color="#10B981"
            />
          </div>

          {/* Mini KPI band */}
          <div
            style={{
              display: "flex",
              gap: "clamp(12px, 3vw, 24px)",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "clamp(28px, 4vw, 48px)",
              padding: "clamp(16px, 2.5vw, 24px)",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "16px",
              border: "1px solid rgba(226,232,240,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            {[
              { icon: <TrendingUp size={14} />, label: "Avg. 3× faster OPD", color: "#2563EB" },
              { icon: <Users size={14} />, label: "50+ hospitals trust us", color: "#7C3AED" },
              { icon: <Activity size={14} />, label: "Zero downtime SLA", color: "#10B981" },
              { icon: <Star size={14} />, label: "5.0 rating, 100% satisfaction", color: "#F59E0B" },
            ].map((kpi) => (
              <div key={kpi.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ color: kpi.color }}>{kpi.icon}</div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 640px) {
          .headline-break { display: none; }
        }
      `}</style>
    </>
  );
}

function MetricCard({
  icon, title, desc, color,
}: {
  icon: any; title: string; desc: string; color: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)", borderColor: "rgba(226,232,240,0.9)" },
        hover: { y: -6, boxShadow: `0 18px 40px -8px ${color}26`, borderColor: color + "35" },
      }}
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(16px, 2.5vw, 22px)",
        border: "1px solid",
        padding: "clamp(20px, 3vw, 32px) clamp(18px, 2.5vw, 28px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.42s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Top accent */}
      <motion.div
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon */}
      <motion.div
        variants={{
          rest: { background: "#F1F5F9", color: color },
          hover: { background: color, color: "#FFFFFF" },
        }}
        transition={{ duration: 0.28 }}
        style={{
          width: "clamp(38px, 5vw, 46px)",
          height: "clamp(38px, 5vw, 46px)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </motion.div>

      <div>
        <motion.h4
          variants={{ rest: { color: "#0F172A" }, hover: { color: color } }}
          style={{
            fontSize: "clamp(0.82rem, 1.8vw, 1rem)",
            fontWeight: 700,
            marginBottom: 6,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </motion.h4>
        <p style={{ fontSize: "clamp(0.72rem, 1.4vw, 0.82rem)", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
