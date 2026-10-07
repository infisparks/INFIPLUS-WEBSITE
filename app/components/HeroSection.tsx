"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Star, CheckCircle, TrendingUp, Users, Activity,
  Download, Zap, Shield, Clock, Fingerprint, Calendar, Check,
  Send, MessageCircle, Cloud, LayoutDashboard, Smartphone, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { ref, push } from "firebase/database";

interface HeroSectionProps {
  onBookDemo: () => void;
}

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  
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
              <h1
                className="hero-main-heading"
                style={{
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  textAlign: "center",
                  marginBottom: "18px",
                  lineHeight: 1.18,
                }}
              >
                <span style={{ display: "inline-block", maxWidth: "100%" }}>India&apos;s #1 Hospital Management</span>
                <br />
                <span>ERP Software.</span>
              </h1>

              {/* Paragraph Description */}
              <p
                className="hero-main-desc"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.6,
                  maxWidth: "600px",
                  margin: "0 auto 26px",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                Manage OPD, IPD, EMR, billing, pharmacy, lab and patient records through one cloud-based Hospital Management Software built for modern Indian hospitals.
              </p>

              {/* YouTube Video Player with Custom Thumbnail Facade */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "22px" }}>
                <div
                  className={`hero-video-wrapper ${isPlayingVideo ? "is-playing" : ""}`}
                  style={{ cursor: isPlayingVideo ? "default" : "pointer" }}
                  onClick={() => !isPlayingVideo && setIsPlayingVideo(true)}
                >
                  {isPlayingVideo ? (
                    <iframe
                      key="infiplus-yt-player"
                      src="https://www.youtube-nocookie.com/embed/jmJCWnpNRfk?autoplay=1&rel=0&modestbranding=1&enablejsapi=1"
                      title="Infiplus Hospital Management ERP Software Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  ) : (
                    <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image
                        src="/thumbnail.png"
                        alt="Infiplus Hospital Management ERP Software Demo"
                        width={1983}
                        height={793}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        priority
                      />

                      {/* Official YouTube Play Logo in the Center */}
                      <motion.div
                        whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 24px rgba(255, 0, 0, 0.85))" }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          filter: "drop-shadow(0 6px 18px rgba(0, 0, 0, 0.65))",
                          transition: "filter 0.25s ease",
                        }}
                      >
                        <svg
                          width="68"
                          height="48"
                          viewBox="0 0 68 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ display: "block" }}
                        >
                          <path
                            d="M66.52 7.74C65.74 4.83 63.46 2.54 60.55 1.76C55.28 0.33 34 0.33 34 0.33C34 0.33 12.72 0.33 7.45 1.76C4.54 2.54 2.26 4.83 1.48 7.74C0.05 13.01 0 24 0 24C0 24 0.05 34.99 1.48 40.26C2.26 43.17 4.54 45.46 7.45 46.24C12.72 47.67 34 47.67 34 47.67C34 47.67 55.28 47.67 60.55 46.24C63.46 45.46 65.74 43.17 66.52 40.26C67.95 34.99 68 24 68 24C68 24 67.95 13.01 66.52 7.74Z"
                            fill="#FF0000"
                          />
                          <polygon points="27,33 44,24 27,15" fill="#FFFFFF" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
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

              {/* Badge Cloud (Strict 2-Row Layout on Desktop & Mobile) */}
              <div className="hero-badge-cloud-container">
                <div className="hero-badge-cloud-row">
                  {["OPD Management", "IPD & Ward", "Laboratory"].map((module) => (
                    <span key={module} className="hero-cloud-badge">
                      {module}
                    </span>
                  ))}
                </div>
                <div className="hero-badge-cloud-row">
                  {["Billing & TPA", "Complete Paperless", "WhatsApp Integration"].map((module) => (
                    <span key={module} className="hero-cloud-badge">
                      {module}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Button (Attractive single button, replaces form on mobile) */}
              <div
                className="hero-mobile-cta-wrapper"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <motion.button
                  onClick={onBookDemo}
                  className="animated-demo-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    width: "100%",
                    maxWidth: "340px",
                    margin: "0 auto",
                    padding: "14px 22px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "15px",
                    letterSpacing: "0.01em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                    <Calendar size={15} />
                  </div>
                  <span>Book a Free Demo</span>
                  <span className="btn-arrow-icon">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </span>
                </motion.button>
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
                          Book a Free Demo
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
                          padding: "13px 22px",
                          borderRadius: "12px",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: "14.5px",
                          letterSpacing: "0.01em",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.2)",
                        }}>
                          <Calendar size={15} />
                        </div>
                        <span>{isSubmitting ? "Scheduling Demo..." : "Book a Free Demo"}</span>
                        <span className="btn-arrow-icon">
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </span>
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
                height: "44px",
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Calendar size={16} />
              Book a Free Demo
              <span className="btn-arrow-icon">
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
