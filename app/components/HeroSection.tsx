"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Star, CheckCircle, TrendingUp, Users, Activity,
  Download, Zap, Shield, Clock, Fingerprint, Calendar, Check,
  Send, MessageCircle, Cloud, LayoutDashboard, Smartphone, ArrowRight,
  Play, Sparkles, FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { ref, push } from "firebase/database";

interface HeroSectionProps {
  onBookDemo: () => void;
}

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  
  // Form states - The 3 questions only
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Show sticky bar only when scrolled past the hero section
        setScrolledPastHero(rect.bottom < 120);
      } else {
        setScrolledPastHero(window.scrollY > 450);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrimaryAction = () => {
    const formCard = document.getElementById("trial-form-card");
    const nameInput = document.getElementById("hero-name-input");
    if (typeof window !== "undefined" && window.innerWidth > 960 && formCard) {
      formCard.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInput?.focus();
    } else {
      onBookDemo();
    }
  };

  const handleSeeLiveSystem = () => {
    const videoEl = document.getElementById("hero-system-video");
    if (videoEl) {
      videoEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleExploreRequirements = () => {
    const featEl = document.getElementById("features") || document.getElementById("why-info");
    if (featEl) {
      featEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      onBookDemo();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !hospitalName) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Save details to Firebase
      await push(ref(db, "submissions"), {
        name,
        hospitalName,
        phone,
        type: "Book Demo",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString()
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I'm interested in the Infiplus Hospital Management Software. Can you please share more details?");
    window.open(`https://wa.me/919958399157?text=${message}`, "_blank");
  };

  return (
    <>
      {/* ── MAIN HERO SECTION ── */}
      <section
        id="hero"
        className="hero-main-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: `
            radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.22) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(180deg, #060B27 0%, #0B1340 100%)
          `,
          backgroundSize: "100% 100%, 35px 100%, 100% 100%",
        }}
      >
        <div className="container-main hero-container-inner">
          <div className="hero-content-grid">
            {/* Left Column: Content */}
            <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
              {/* Main Headline */}
              <h1 className="hero-main-heading">
                <span className="hero-heading-lead">
                  <span className="hero-heading-line">Stop Managing </span>
                  <span className="hero-heading-line">Your Hospital on Paper.</span>
                </span>
                <span className="hero-heading-accent">
                  <span className="hero-heading-line">Move Towards a Smarter, </span>
                  <span className="hero-heading-line">Paperless Hospital.</span>
                </span>
              </h1>

              {/* Paragraph Description */}
              <p
                className="hero-main-desc"
                style={{
                  color: "rgba(255, 255, 255, 0.82)",
                  lineHeight: 1.6,
                  maxWidth: "600px",
                  margin: "0 auto 20px",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                Eliminate paper registers with one integrated HMS — unified OPD/IPD, digital records &amp; fast billing.
              </p>

              {/* ── VIDEO IN THE CENTER (with running glow in full border) ── */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto 16px" }}>
                <div id="hero-system-video" className="hero-video-wrapper">
                  <iframe
                    key="infiplus-yt-player"
                    src="https://www.youtube-nocookie.com/embed/eEO-k5gQeJ8?rel=0&modestbranding=1&enablejsapi=1"
                    title="Infiplus Hospital Management ERP Software Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {/* Full perimeter running glow beam */}
                  <div className="running-border-beam video-beam" />
                </div>
              </div>

              {/* 4 Feature Pills (Adjusted below video with decreased height) */}
              <div className="hero-pills-row">
                <div className="hero-feature-pill">
                  <span className="pill-dot" />
                  <span>OPD &amp; IPD</span>
                </div>
                <div className="hero-feature-pill">
                  <span className="pill-dot" />
                  <span>Digital Records</span>
                </div>
                <div className="hero-feature-pill">
                  <span className="pill-dot" />
                  <span>Fast Billing</span>
                </div>
                <div className="hero-feature-pill">
                  <span className="pill-dot" />
                  <span>Live Reports</span>
                </div>
              </div>

              {/* ── BUTTON DOWN (Below the Video & Pills) ── */}
              <div className="hero-actions-container">
                <motion.button
                  type="button"
                  onClick={handlePrimaryAction}
                  className="animated-demo-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    maxWidth: "340px",
                  }}
                >
                  <span className="btn-content-inner">
                    <span className="btn-icon-box">
                      <Calendar size={15} />
                    </span>
                    <span className="btn-text">Book My Personalised Demo</span>
                    <span className="btn-arrow-icon">
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </span>
                    <span className="btn-shine" />
                  </span>
                  {/* Full perimeter running glow beam on button */}
                  <span className="running-border-beam btn-beam" />
                </motion.button>

                {/* Secondary Links: See live system • Explore requirements */}
                <div className="hero-secondary-links">
                  <button
                    type="button"
                    onClick={handleSeeLiveSystem}
                    className="hero-sublink"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>See live system</span>
                  </button>
                  <span className="hero-sublink-divider">•</span>
                  <button
                    type="button"
                    onClick={handleExploreRequirements}
                    className="hero-sublink"
                  >
                    <Sparkles size={12} />
                    <span>Explore requirements</span>
                  </button>
                </div>
              </div>

              {/* Numbers Row */}
              <div className="hero-numbers-row">
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div className="hero-stat-num" style={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>15+</div>
                  <div className="hero-stat-lbl" style={{ color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Integrated Modules</div>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div className="hero-stat-num" style={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>24×7</div>
                  <div className="hero-stat-lbl" style={{ color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Dedicated Support</div>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div className="hero-stat-num" style={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>100%</div>
                  <div className="hero-stat-lbl" style={{ color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Cloud-Based ERP</div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Card (Desktop only, hidden on mobile via pure CSS) */}
            <div className="hero-desktop-form-wrapper">
              <div
                id="trial-form-card"
                style={{
                  background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(37, 99, 235, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    width: "100%",
                    maxWidth: "460px",
                  }}
                >
                   {isSubmitted ? (
                     <div style={{ textAlign: "center", padding: "40px 10px" }}>
                       <div style={{
                         width: "56px",
                         height: "56px",
                         borderRadius: "50%",
                         background: "rgba(16, 185, 129, 0.1)",
                         color: "#10B981",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         margin: "0 auto 20px",
                       }}>
                         <Check size={30} strokeWidth={3} />
                       </div>
                       <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>
                         Demo Request Received!
                       </h3>
                       <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5 }}>
                         Thank you, <strong>{name}</strong>! Your demo request has been submitted. Our healthcare specialist will contact you soon to schedule your personalized live demo.
                       </p>
                     </div>
                   ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {/* Badge */}
                      <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
                        <div style={{
                          background: "rgba(37, 99, 235, 0.08)",
                          border: "1px solid rgba(37, 99, 235, 0.2)",
                          borderRadius: "9999px",
                          padding: "4px 10px",
                          color: "#2563EB",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                          textTransform: "uppercase",
                        }}>
                          ✦ 100% FREE CLINIC & HOSPITAL DEMO
                        </div>
                      </div>

                      <div>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                          Book My Personalised Demo
                        </h3>
                        <p style={{ fontSize: "12px", color: "#6B7280" }}>
                          Takes 2 minutes. See Infiplus live in action customized for your hospital.
                        </p>
                      </div>

                    {error && (
                      <div style={{
                        padding: "8px 12px",
                        background: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        borderRadius: "6px",
                        color: "#991B1B",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}>
                        {error}
                      </div>
                    )}

                    {/* 3 Questions Only */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#374151" }}>Full Name *</label>
                      <input
                        id="hero-name-input"
                        type="text"
                        placeholder="Dr. / Mr. / Ms. Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          padding: "11px 14px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          transition: "all 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#2563EB";
                          e.target.style.background = "#FFFFFF";
                          e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#E2E8F0";
                          e.target.style.background = "#F8FAFC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#374151" }}>Hospital / Clinic Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. City Care Hospital, Mumbai"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        style={{
                          padding: "11px 14px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          transition: "all 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#2563EB";
                          e.target.style.background = "#FFFFFF";
                          e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#E2E8F0";
                          e.target.style.background = "#F8FAFC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#374151" }}>Contact Number (Calling / WhatsApp) *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          padding: "11px 14px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          transition: "all 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#2563EB";
                          e.target.style.background = "#FFFFFF";
                          e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#E2E8F0";
                          e.target.style.background = "#F8FAFC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{
                      background: "#EFF6FF",
                      borderRadius: "10px",
                      padding: "9px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      color: "#1E40AF",
                      fontSize: "12px",
                      fontWeight: 600,
                      border: "1px solid rgba(37, 99, 235, 0.12)",
                      textAlign: "center",
                    }}>
                      <span>✨</span> Personalized 1-on-1 walkthrough — tailored to your workflow
                    </div>

                    {/* Centered Button (Matching Site Design System) */}
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "4px" }}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="animated-demo-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          width: "100%",
                        }}
                      >
                        <span className="btn-content-inner">
                          <span className="btn-icon-box">
                            <Calendar size={15} />
                          </span>
                          <span className="btn-text">
                            {isSubmitting ? "Scheduling Demo..." : "Book My Personalised Demo"}
                          </span>
                          <span className="btn-arrow-icon">
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </span>
                          <span className="btn-shine" />
                        </span>
                        <span className="running-border-beam btn-beam" />
                      </motion.button>
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: "rgba(16, 185, 129, 0.05)",
                      border: "1px solid rgba(16, 185, 129, 0.15)",
                      borderRadius: "9999px",
                      padding: "6px 14px",
                      fontSize: "11px",
                      color: "#166534",
                      fontWeight: 600,
                      marginTop: "2px",
                      textAlign: "center",
                    }}>
                      <div style={{ color: "#10B981", display: "flex" }}>
                        <CheckCircle size={12} fill="#10B981" color="#FFFFFF" />
                      </div>
                      <span>No spam · No sales pressure · We call within 2 hours</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES BAR (BOTTOM OF HERO) ── */}
        <div style={{
          background: "rgba(9, 13, 38, 0.65)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 0",
          position: "relative",
          zIndex: 5,
          width: "100%",
        }}>
          <div className="container-main">
            <div className="hero-features-grid">
              {[
                {
                  icon: <Cloud size={22} />,
                  title: "100% Cloud Hosted",
                  desc: "No server needed"
                },
                {
                  icon: <Shield size={22} />,
                  title: "Role-Based Security",
                  desc: "Doctors · Nurses · Admin · Billing"
                },
                {
                  icon: <LayoutDashboard size={22} />,
                  title: "Real-Time Hospital Dashboard",
                  desc: "MIS reports & audit trails"
                },
                {
                  icon: <Smartphone size={22} />,
                  title: "Paperless Hospital Workflows",
                  desc: "OPD to discharge — fully digital"
                }
              ].map((feat, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "6px",
                }}>
                  <div style={{
                    color: "#2563EB",
                    background: "rgba(37, 99, 235, 0.1)",
                    borderRadius: "10px",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF", marginBottom: "2px" }}>
                      {feat.title}
                    </h4>
                    <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.3 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY BOTTOM BAR (Shown only after scrolling past Hero) ── */}
      <AnimatePresence>
        {scrolledPastHero && (
          <motion.div
            className="hero-mobile-sticky-bar"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "16px",
              left: "16px",
              right: "16px",
              background: "rgba(10, 15, 40, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "6px",
              zIndex: 1100,
              borderRadius: "100px",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 99, 235, 0.3)",
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            <motion.button
              onClick={onBookDemo}
              className="animated-demo-btn"
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                borderRadius: "100px",
              }}
            >
              <span
                className="btn-content-inner"
                style={{
                  borderRadius: "100px",
                  padding: "10px 18px",
                  fontSize: "13.5px",
                }}
              >
                <Calendar size={15} />
                <span>Book My Personalised Demo</span>
                <span className="btn-arrow-icon">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </span>
                <span className="btn-shine" />
              </span>
              <span className="running-border-beam btn-beam" style={{ borderRadius: "100px" }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
