"use client";

import { motion, useInView } from "framer-motion";
import {
  Mail, MapPin, Phone, ArrowRight, Calendar,
  Instagram, Linkedin, Twitter, CheckCircle2, Award, MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { db } from "../lib/firebase";
import { ref, push } from "firebase/database";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ContactFooter() {
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-10%" });

  // Form states - The 3 Questions Only
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !hospitalName || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await push(ref(db, "submissions"), {
        name,
        hospitalName,
        phone,
        type: "Contact Footer",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString()
      });
      setIsSubmitted(true);
      setName("");
      setHospitalName("");
      setPhone("");
    } catch (err: any) {
      setError(err.message || "Failed to schedule demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={17} />,
      title: "Mail Us 24/7",
      value: "infisparks@gmail.com",
      href: "mailto:infisparks@gmail.com",
      color: "#2563EB",
    },
    {
      icon: <Phone size={17} />,
      title: "Call / WhatsApp",
      value: "+91 99583 99157",
      href: "https://wa.me/919765768571",
      color: "#10B981",
    },
    {
      icon: <MapPin size={17} />,
      title: "Headquarters",
      value: "BKC G-Block, Bandra, Mumbai — 400051",
      href: "#",
      color: "#7C3AED",
    },
  ];

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        paddingTop: "clamp(56px, 9vw, 100px)",
        paddingBottom: "clamp(32px, 4vw, 48px)",
        overflow: "hidden",
        background: "linear-gradient(to top, #FFFFFF 0%, #FAFBFF 60%, #F0F7FF 100%)",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(to right, transparent, rgba(37,99,235,0.25), transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "120%", height: 500, background: "radial-gradient(ellipse at center, rgba(37,99,235,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
        {/* ── CONTACT SECTION ── */}
        <div className="contact-grid">

          {/* Left: Copy & Contact Info */}
          <div style={{ alignSelf: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              LET&apos;S TALK
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              style={{
                fontSize: "clamp(1.3rem, 4vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "clamp(10px, 2vw, 18px)",
                color: "#0F172A",
                letterSpacing: "-0.035em",
              }}
            >
              Ready to Upgrade your{" "}
              <br className="hide-sm" />
              <span
                style={{
                  background: "linear-gradient(135deg, #2563EB, #6366F1)",
                  color: "white",
                  padding: "2px 12px",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                Hospital Operations?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{
                color: "#475569",
                fontSize: "clamp(0.78rem, 1.6vw, 0.9rem)",
                marginBottom: "clamp(24px, 3.5vw, 40px)",
                maxWidth: 440,
                fontWeight: 500,
                lineHeight: 1.65,
              }}
            >
              Join 50+ modern medical facilities. Schedule your digital walkthrough and discover how we can eliminate your overhead.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.2vw, 22px)" }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  aria-label={info.title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + i * 0.08, ease: EASE }}
                  whileHover={{ x: 3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(10px, 1.8vw, 16px)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(38px, 5vw, 46px)",
                      height: "clamp(38px, 5vw, 46px)",
                      borderRadius: "12px",
                      background: `${info.color}0A`,
                      border: `1px solid ${info.color}1E`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: info.color,
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#64748B",
                        fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {info.title}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 0.92rem)",
                        fontWeight: 700,
                        color: "#0F172A",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA pill */}
            <motion.a
              href="https://wa.me/919765768571"
              target="_blank"
              rel="noopener"
              aria-label="Chat on WhatsApp"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: "clamp(16px, 2.5vw, 28px)",
                padding: "10px 18px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "#fff",
                fontSize: "0.78rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
                boxShadow: "0 8px 20px -4px rgba(37,211,102,0.35)",
                transition: "all 0.3s ease",
              }}
            >
              <MessageCircle size={14} strokeWidth={2.5} />
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={isFormInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              padding: "clamp(22px, 4vw, 44px)",
              borderRadius: "clamp(20px, 3vw, 32px)",
              background: "#FFFFFF",
              border: "1px solid rgba(226,232,240,0.9)",
              boxShadow: "0 20px 56px -14px rgba(37,99,235,0.1), 0 6px 20px -6px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            {/* Form top accent */}
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2.5, background: "linear-gradient(90deg, #2563EB, #6366F1, #3B82F6)", borderRadius: "0 0 5px 5px" }} />

            {/* Top Badge */}
            <div style={{ display: "inline-flex", alignSelf: "flex-start", marginBottom: "8px" }}>
              <div style={{
                background: "rgba(37, 99, 235, 0.08)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "9999px",
                padding: "4px 10px",
                color: "#2563EB",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}>
                ✦ 100% Free Clinic &amp; Hospital Demo
              </div>
            </div>

            <h3
              style={{
                fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "4px",
                letterSpacing: "-0.02em",
              }}
            >
              Book a Free Demo
            </h3>
            <p style={{ color: "#64748B", marginBottom: "clamp(16px, 2.5vw, 24px)", fontWeight: 500, fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)", lineHeight: 1.5 }}>
              Takes 2 minutes. See Infiplus live in action customized for your hospital.
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <CheckCircle2 size={30} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Demo Request Received!
                </h3>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                  Thank you, <strong>{name}</strong>! Your demo request has been submitted. Our healthcare specialist will contact you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#2563EB",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginTop: 8
                  }}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {error && (
                  <div style={{
                    padding: "10px 12px",
                    background: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    borderRadius: "8px",
                    color: "#B91C1C",
                    fontSize: "13px",
                    fontWeight: 500
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

                {/* Info Pill */}
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
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 28px -4px rgba(37, 99, 235, 0.7)" }}
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
                    <span>{isSubmitting ? "Scheduling Demo..." : "Book a Free Demo"}</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Trust Footer */}
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
                    <CheckCircle2 size={12} fill="#10B981" color="#FFFFFF" />
                  </div>
                  <span>No spam · No sales pressure · We call within 2 hours</span>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* ── FOOTER LINKS ── */}
        <div
          style={{
            marginTop: "clamp(56px, 9vw, 100px)",
            paddingTop: "clamp(40px, 6vw, 64px)",
            borderTop: "1px solid rgba(226,232,240,0.8)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(28px, 4vw, 48px)",
          }}
        >
          {/* Col 1 */}
          <div style={{ maxWidth: 340 }}>
            <Image
              src="/logo.png"
              alt="INFIPLUS"
              width={100}
              height={32}
              style={{ objectFit: "contain", marginBottom: "clamp(12px, 1.8vw, 18px)" }}
            />
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                fontWeight: 500,
              }}
            >
              Revolutionizing medical ecosystems with the most intuitive, paperless management software. Trusted by 50+ providers across India.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: "clamp(18px, 2.5vw, 28px)" }}>
              <SocialLink icon={<Instagram size={15} />} color="#E1306C" ariaLabel="Infiplus Instagram" />
              <SocialLink icon={<Linkedin size={15} />} color="#0A66C2" ariaLabel="Infiplus Linkedin" />
              <SocialLink icon={<Twitter size={15} />} color="#1DA1F2" ariaLabel="Infiplus Twitter" />
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 12px)" }}>
              <FooterLink text="Our Story" href="#hero" />
              <FooterLink text="Contact Us" href="#contact" />
              <FooterLink text="Privacy Policy" href="#" />
              <FooterLink text="Service Status" href="#" />
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Solutions
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 12px)" }}>
              <FooterLink text="OPD Management" href="#features" />
              <FooterLink text="Inventory AI" href="#features" />
              <FooterLink text="Live Analytics" href="#features" />
              <FooterLink text="Pharmacy Billing" href="#features" />
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Compliance
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.5vw, 16px)" }}>
              {[
                { icon: <CheckCircle2 size={16} />, text: "HIPAA Compliant", color: "#10B981" },
                { icon: <Award size={16} />, text: "ISO 27001 Certified", color: "#2563EB" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#475569",
                    fontWeight: 600,
                    fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "10px",
                      background: `${badge.color}0C`,
                      border: `1px solid ${badge.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: badge.color,
                      flexShrink: 0,
                    }}
                  >
                    {badge.icon}
                  </div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: "clamp(36px, 5vw, 56px)",
            paddingTop: "clamp(16px, 2.5vw, 24px)",
            borderTop: "1px solid rgba(226,232,240,0.6)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p suppressHydrationWarning style={{ color: "#94A3B8", fontSize: "clamp(0.68rem, 1.3vw, 0.78rem)", fontWeight: 500 }}>
            © {new Date().getFullYear()} Infisparks Healthcare. All rights reserved.
          </p>
          <p style={{ color: "#94A3B8", fontSize: "clamp(0.64rem, 1.2vw, 0.74rem)", fontWeight: 600, letterSpacing: "0.01em" }}>
            Designed &amp; Engineered with Excellence ✦
          </p>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 80px);
          align-items: start;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 1000px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .hide-sm { display: none; }
        }
      `}</style>
    </footer>
  );
}

function FormInput({
  label, type, id, placeholder, focused, onFocus, onBlur, value, onChange
}: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "clamp(0.68rem, 1.2vw, 0.76rem)",
          fontWeight: 700,
          color: focused ? "#2563EB" : "#475569",
          transition: "color 0.3s",
          paddingLeft: 2,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        required
        style={{
          padding: "0 clamp(12px, 1.8vw, 16px)",
          height: "clamp(42px, 6vw, 52px)",
          borderRadius: "clamp(9px, 1.3vw, 13px)",
          background: "#F8FAFC",
          border: `1.5px solid ${focused ? "#2563EB" : "rgba(226,232,240,0.9)"}`,
          color: "#0F172A",
          fontSize: "clamp(0.78rem, 1.4vw, 0.88rem)",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.07)" : "none",
          fontFamily: "var(--font-outfit), sans-serif",
          fontWeight: 500,
        }}
      />
    </div>
  );
}

function FooterLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <motion.a
      href={href}
      aria-label={text}
      whileHover={{ x: 4, color: "#2563EB" }}
      style={{
        fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
        color: "#64748B",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.25s ease",
        letterSpacing: "0.01em",
        display: "inline-block",
      }}
    >
      {text}
    </motion.a>
  );
}

function SocialLink({ icon, color, ariaLabel }: { icon: any; color: string; ariaLabel: string }) {
  return (
    <motion.a
      href="#"
      aria-label={ariaLabel}
      whileHover={{ y: -3, borderColor: color, color }}
      style={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        border: "1px solid rgba(226,232,240,0.9)",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748B",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
      }}
    >
      {icon}
    </motion.a>
  );
}
