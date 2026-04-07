"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, Instagram, Linkedin, Twitter, CheckCircle2, Award } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ANIM = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  viewport: { once: true, margin: "-100px" },
};

export default function ContactFooter() {
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-10%" });

  const contactInfo = [
    { icon: <Mail size={22} />, title: "Mail Us 24/7", value: "infisparks@gmail.com", href: "mailto:infisparks@gmail.com" },
    { icon: <Phone size={22} />, title: "Call Us 24/7", value: "+91 99583 99157", href: "tel:+919958399157" },
    { icon: <MapPin size={22} />, title: "Headquarters", value: "BKC G-Block, Bandra, Mumbai, 400051", href: "#" },
  ];

  return (
    <footer id="contact" style={{ position: "relative", paddingTop: 140, paddingBottom: 60, overflow: "hidden", background: "linear-gradient(to top, #FFFFFF 0%, #FAFBFF 100%)" }}>
      {/* Subtle Background Glow */}
      <div style={{ position: "absolute", bottom: "30%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "400px", background: "radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)", zIndex: 0 }} />

      {/* Top Border Line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(to right, transparent, rgba(37, 99, 235, 0.3), transparent)", zIndex: 1 }} />

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
        {/* ── CONTACT SECTION: Split Layout ── */}
        <div className="contact-grid">

          {/* Left: Text & Info */}
          <div style={{ alignSelf: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="section-badge"
            >
              LET'S TALK
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 32, color: '#0F172A' }}
            >
              Ready to Upgrade your <br />
              <span className="gradient-text-teal">Hospital Operations?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ color: "#475569", fontSize: "1.2rem", marginBottom: 60, maxWidth: 500, fontWeight: 500 }}
            >
              Join 50+ modern medical facilities. Schedule your digital walkthrough and discover how we can eliminate your overhead.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: "flex", alignItems: "center", gap: 20, textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    width: 58,
                    height: 58,
                    borderRadius: "18px",
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB",
                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ color: "#64748B", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{info.title}</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700, color: '#0F172A' }}>{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Form - White card shadow-lg */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isFormInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: ANIM.ease }}
            style={{
              padding: "54px",
              borderRadius: "40px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.12)",
              position: "relative"
            }}
          >
            <h3 style={{ fontSize: "1.85rem", fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Schedule Your Demo</h3>
            <p style={{ color: "#475569", marginBottom: 44, fontWeight: 500 }}>Our consultants will respond within 24 hours.</p>

            <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="form-row">
                <FormInput label="Full Name" type="text" id="name" placeholder="John Doe" focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                <FormInput label="Work Email" type="email" id="email" placeholder="john@hospital.com" focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </div>
              <FormInput label="Hospital / Clinic Name" type="text" id="subject" placeholder="St. Mary's Clinic" focused={focused === "subject"} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 700, color: focused === "message" ? "#2563EB" : "#475569", transition: "all 0.3s ease", paddingLeft: 4 }}>Message (Optional)</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{
                    padding: "20px",
                    borderRadius: "18px",
                    background: "#F8FAFC",
                    border: `1px solid ${focused === "message" ? "#2563EB" : "#E2E8F0"}`,
                    color: "#0F172A",
                    fontSize: "1rem",
                    minHeight: 140,
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxShadow: focused === "message" ? "0 4px 12px rgba(37, 99, 235, 0.08)" : "none"
                  }}
                />
              </div>

              <button
                type="submit"
                className="glow-btn-primary"
                style={{
                  padding: "18px",
                  borderRadius: "50px",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 10
                }}
              >
                Book Private Tour
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── FOOTER: 4 Columns ── */}
        <div style={{ marginTop: 140, paddingTop: 100, borderTop: "1.5px solid #E2E8F0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60 }}>

          {/* Col 1: Logo & Desc */}
          <div style={{ maxWidth: 400 }}>
            <Image src="/logo.png" alt="INFIPLUS" width={128} height={42} style={{ objectFit: "contain", marginBottom: 28 }} />
            <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.975rem", fontWeight: 500 }}>
              Revolutionizing medical ecosystems with the most intuitive, paperless management software. Trusted by 50+ providers.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
              <SocialLink icon={<Instagram size={20} />} />
              <SocialLink icon={<Linkedin size={20} />} />
              <SocialLink icon={<Twitter size={20} />} />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: '#0F172A', marginBottom: 28, textTransform: "uppercase", letterSpacing: "0.05em" }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <FooterLink text="Our Story" href="#hero" />
              <FooterLink text="Contact Us" href="#contact" />
              <FooterLink text="Privacy Policy" href="#" />
              <FooterLink text="Service Status" href="#" />
            </div>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: '#0F172A', marginBottom: 28, textTransform: "uppercase", letterSpacing: "0.05em" }}>Solutions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <FooterLink text="OPD Management" href="#features" />
              <FooterLink text="Inventory AI" href="#features" />
              <FooterLink text="Live Analytics" href="#features" />
              <FooterLink text="Pharmacy Billing" href="#features" />
            </div>
          </div>

          {/* Col 4: Trust Badges */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: '#0F172A', marginBottom: 28, textTransform: "uppercase", letterSpacing: "0.05em" }}>Compliance</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#475569", fontWeight: 600, fontSize: "0.9rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}><CheckCircle2 size={24} /></div>
                HIPAA Compliant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#475569", fontWeight: 600, fontSize: "0.9rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}><Award size={24} /></div>
                ISO 27001 Certified
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ color: "#64748B", fontSize: "0.875rem", fontWeight: 500 }}>
            © {new Date().getFullYear()} Infisparks Healthcare. All rights reserved.
          </p>
          <p style={{ color: "#64748B", fontSize: "0.875rem", fontWeight: 600 }}>
            Designed and Engineered with Excellence.
          </p>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          margin-bottom: 40px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1080px) {
          .contact-grid {
             grid-template-columns: 1fr;
             gap: 80px;
          }
        }
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}

function FormInput({ label, type, id, placeholder, focused, onFocus, onBlur }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label htmlFor={id} style={{ fontSize: "0.85rem", fontWeight: 700, color: focused ? "#2563EB" : "#475569", transition: "all 0.3s ease", paddingLeft: 4 }}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          padding: "0 22px",
          height: "64px",
          borderRadius: "18px",
          background: "#F8FAFC",
          border: `1px solid ${focused ? "#2563EB" : "#E2E8F0"}`,
          color: "#0F172A",
          fontSize: "1rem",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 4px 12px rgba(37, 99, 235, 0.08)" : "none"
        }}
      />
    </div>
  );
}

function FooterLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 5, color: "#2563EB" }}
      style={{ fontSize: "0.95rem", color: "#475569", textDecoration: "none", transition: "all 0.3s ease", fontWeight: 500 }}
    >
      {text}
    </motion.a>
  );
}

function SocialLink({ icon }: { icon: any }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -5, color: "#2563EB", borderColor: "#2563EB" }}
      style={{
        width: 46, height: 46, borderRadius: "14px", border: "1.5px solid #E2E8F0", background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", transition: "all 0.3s ease",
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
      }}
    >
      {icon}
    </motion.a>
  );
}
