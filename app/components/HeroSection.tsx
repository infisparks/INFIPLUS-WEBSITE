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
  const [isMobile, setIsMobile] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [beds, setBeds] = useState("Choose...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    if (!name || !email || !phone || !hospitalName || beds === "Choose...") {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Save details to Firebase
      await push(ref(db, "submissions"), {
        name,
        email,
        phone,
        hospitalName,
        beds,
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
          paddingTop: isMobile ? "68px" : "130px",
          paddingBottom: isMobile ? "80px" : "0px", // space for mobile sticky bar
        }}
      >
        <div 
          className="container-main"
          style={{
            width: "100%",
            zIndex: 2,
            padding: isMobile ? "10px 14px 40px" : "40px 20px 60px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
              gap: isMobile ? "32px" : "40px",
              alignItems: "center",
            }}
          >
            {/* Left Column: Content */}
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              {/* Blue Capsule Badge */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  background: "#2563EB",
                  borderRadius: "9999px",
                  color: "#FFFFFF",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                  textAlign: "center",
                }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981" }} />
                  HOSPITAL ERP SOFTWARE- BUILD FOR INDIAN HOSPITALS
                </div>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: isMobile ? "26px" : "42px",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: "16px",
              }}>
                India&apos;s #1 Hospital Management<br />ERP Software.
              </h1>

              {/* Paragraph Description */}
              <p style={{
                fontSize: isMobile ? "13px" : "15px",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.6,
                maxWidth: "580px",
                margin: "0 auto 24px",
                textAlign: "center",
                fontWeight: 400,
              }}>
                Manage OPD, IPD, EMR, billing, pharmacy, lab and patient records through one cloud-based Hospital Management Software built for modern Indian hospitals.
              </p>

              {/* Numbers Row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? "10px" : "24px",
                marginBottom: "28px",
                width: "100%",
                padding: "0 10px",
              }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: isMobile ? "16px" : "24px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>ABDM & NABH</div>
                  <div style={{ fontSize: isMobile ? "10px" : "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Ready & Compliant</div>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>24×7</div>
                  <div style={{ fontSize: isMobile ? "10px" : "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Dedicated Support</div>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>100%</div>
                  <div style={{ fontSize: isMobile ? "10px" : "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.2 }}>Cloud-Based ERP</div>
                </div>
              </div>

              {/* Badge Cloud */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
                maxWidth: "580px",
                margin: "0 auto 28px",
              }}>
                {[
                  "OPD Management", "IPD & Ward", "Laboratory", "OT Scheduling",
                  "Billing & TPA", "Complete Paperless", "WhatsApp Integration", "AI Prescriptions"
                ].map((module) => (
                  <span
                    key={module}
                    style={{
                      padding: "5px 12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "9999px",
                      color: "#FFFFFF",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: 500,
                    }}
                  >
                    {module}
                  </span>
                ))}
              </div>

              {/* Watch Dashboard Button */}
              {!isMobile && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                  <motion.button
                    onClick={onBookDemo}
                    whileHover={{ scale: 1.03, borderColor: "#3B82F6", background: "rgba(59, 130, 246, 0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "8px",
                      border: "2px solid #2563EB",
                      background: "transparent",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Watch How Dashboard Looks
                  </motion.button>
                </div>
              )}

              {/* Stethoscope Graphic */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: "580px", height: isMobile ? "130px" : "190px" }}>
                  <Image
                    src="/herosectino/heroicon.png"
                    alt="Stethoscope clinical workflows"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Mobile CTA Button (Attractive single button, replaces form on mobile) */}
              {isMobile && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
                  <motion.button
                    onClick={onBookDemo}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
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
                      boxShadow: "0 8px 25px -4px rgba(37, 99, 235, 0.6), 0 0 16px rgba(59, 130, 246, 0.35)",
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
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Right Column: Form Card (Desktop only, hidden on mobile) */}
            {!isMobile && (
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
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

                    {/* Inputs */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g., Harpreet Singh"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            padding: "10px 12px",
                            fontSize: "13px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            outline: "none",
                            color: "#111827",
                            background: "#FFFFFF",
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Email *</label>
                        <input
                          type="email"
                          placeholder="name@hospital.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            padding: "10px 12px",
                            fontSize: "13px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            outline: "none",
                            color: "#111827",
                            background: "#FFFFFF",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Hospital / Clinic Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., hospital"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        style={{
                          padding: "10px 12px",
                          fontSize: "13px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          outline: "none",
                          color: "#111827",
                          background: "#FFFFFF",
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="e.g., +91 9999999999"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            padding: "10px 12px",
                            fontSize: "13px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            outline: "none",
                            color: "#111827",
                            background: "#FFFFFF",
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>No. of Beds</label>
                        <select
                          value={beds}
                          onChange={(e) => setBeds(e.target.value)}
                          style={{
                            padding: "10px 12px",
                            fontSize: "13px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            background: "#FFFFFF",
                            color: beds === "Choose..." ? "#9CA3AF" : "#111827",
                            outline: "none",
                            cursor: "pointer",
                            width: "100%"
                          }}
                        >
                          <option disabled value="Choose...">Choose...</option>
                          <option value="1-10">1 - 10 Beds</option>
                          <option value="11-50">11 - 50 Beds</option>
                          <option value="51-100">51 - 100 Beds</option>
                          <option value="100+">100+ Beds</option>
                        </select>
                      </div>
                    </div>

                    <div style={{
                      background: "#EFF6FF",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      color: "#1E40AF",
                      fontSize: "12px",
                      fontWeight: 600,
                      border: "1px solid rgba(37,99,235,0.1)",
                    }}>
                      <span>✨</span> Personalized 1-on-1 walkthrough — tailored to your workflow
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, backgroundColor: "#111827" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: "#1E293B",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        marginTop: "4px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <Calendar size={15} />
                      {isSubmitting ? "Submitting..." : "Schedule Free Demo"}
                    </motion.button>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: "rgba(16, 185, 129, 0.04)",
                      border: "1px solid rgba(16, 185, 129, 0.1)",
                      borderRadius: "20px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      color: "#1F2937",
                      fontWeight: 500,
                      marginTop: "2px",
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
            )}
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
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "16px" : "20px",
            }}>
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
        {isMobile && scrolledPastHero && (
          <motion.div
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
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
              }}
            >
              <Calendar size={16} />
              Book a Free Demo
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
