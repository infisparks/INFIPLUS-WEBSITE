"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { db } from "../lib/firebase";
import { ref, push } from "firebase/database";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
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
        type: "Book Demo Modal",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString()
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setHospitalName("");
        setPhone("");
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Failed to book demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(6, 11, 39, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="book-demo-modal-card"
          >
            {/* Left Column: Modern Healthcare Presentation with Software Photo */}
            <div className="modal-visual-column">
              {/* Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                borderRadius: "9999px",
                color: "#60A5FA",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                marginBottom: "12px",
                alignSelf: "flex-start",
              }}>
                <Sparkles size={13} color="#60A5FA" />
                <span>Live Hospital ERP Demo</span>
              </div>

              <h2 style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}>
                See Infiplus Live in Action.
              </h2>

              <p style={{
                fontSize: "12.5px",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.55,
                marginBottom: "16px",
              }}>
                Direct 1-on-1 walkthrough tailored to your hospital — see OPD, IPD, Billing, Pharmacy, EMR &amp; Lab automated in real-time.
              </p>

              {/* Photo of Hospital ERP Software */}
              <div style={{
                position: "relative",
                width: "100%",
                height: "185px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(37, 99, 235, 0.2)",
                marginBottom: "18px",
              }}>
                <Image
                  src="/service/hospital-management-software.webp"
                  alt="Infiplus Hospital Management Software Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Feature Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {[
                  { icon: <Zap size={14} color="#60A5FA" />, text: "15+ Integrated Hospital Modules" },
                  { icon: <Shield size={14} color="#34D399" />, text: "Role-Based Doctor & Staff Security" },
                  { icon: <CheckCircle2 size={14} color="#FBBF24" />, text: "Complete Paperless Operations & EMR" },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.08)",
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: The Unified 3-Question Form */}
            <div className="modal-form-column">
              {/* Close Button */}
              <button 
                onClick={onClose}
                aria-label="Close modal"
                className="modal-close-btn"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

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
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#111827", margin: 0 }}>
                    Demo Request Received!
                  </h3>
                  <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.55, margin: 0, maxWidth: "340px" }}>
                    Thank you, <strong>{name}</strong>! Our healthcare specialist will contact you shortly to schedule your personalized live demo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "13px", width: "100%" }}>
                  {/* Top Badge */}
                  <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
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

                  {/* Heading & Subtitle */}
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                      Book a Free Demo
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
                      Takes 2 minutes. See Infiplus live in action customized for your hospital.
                    </p>
                  </div>

                  {error && (
                    <div style={{
                      padding: "8px 12px",
                      background: "#FEF2F2",
                      border: "1px solid #FCA5A5",
                      borderRadius: "8px",
                      color: "#991B1B",
                      fontSize: "12.5px",
                      fontWeight: 500,
                    }}>
                      {error}
                    </div>
                  )}

                  {/* Field 1: Full Name */}
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

                  {/* Field 2: Hospital / Clinic Name */}
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

                  {/* Field 3: Contact Number */}
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
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .book-demo-modal-card {
          position: relative;
          width: 100%;
          max-width: 880px;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.4);
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          overflow: hidden;
          max-height: 92vh;
        }

        .modal-visual-column {
          padding: 32px 28px;
          background: linear-gradient(180deg, #060B27 0%, #0B1340 100%);
          position: relative;
          display: flex;
          flex-direction: column;
          justifyContent: center;
        }

        .modal-form-column {
          padding: 28px 28px;
          position: relative;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          overflow-y: auto;
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4B5563;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .modal-close-btn:hover {
          background: #E5E7EB;
          color: #111827;
        }

        @media (max-width: 860px) {
          .book-demo-modal-card {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            border-radius: 20px !important;
          }
          .modal-visual-column {
            display: none !important;
          }
          .modal-form-column {
            padding: 24px 18px 24px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
