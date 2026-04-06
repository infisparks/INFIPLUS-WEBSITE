"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, Instagram, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ContactFooter() {
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-10%" });

  const contactInfo = [
    { icon: <Mail size={22} />, title: "Mail Us 24/7", value: "infisparks@gmail.com", href: "mailto:infisparks@gmail.com" },
    { icon: <Phone size={22} />, title: "Call Us 24/7", value: "+91 99583 99157", href: "tel:+919958399157" },
    { icon: <MapPin size={22} />, title: "Our Location", value: "G Block BKC, Bandra East, Mumbai, 400051", href: "https://maps.google.com/?q=G+Block+BKC+Bandra+East+Mumbai+400051" },
  ];

  return (
    <footer id="contact" style={{ position: "relative", paddingTop: 140, paddingBottom: 60, overflow: "hidden" }}>
      {/* Background Decor */}
      <div style={{ position: "absolute", bottom: "40%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "400px", background: "radial-gradient(circle, rgba(79, 140, 255, 0.08) 0%, transparent 70%)", zIndex: -1 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)", zIndex: 1 }} />

      <div className="container-main">
        {/* ── CONTACT SECTION ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 100, marginBottom: 160 }}>
          
          {/* Left Column: Info */}
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-badge" 
            >
              LET'S TALK
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 32 }}
            >
              Ready to Upgrade your <br />
              <span className="gradient-text-teal">Hospital Operations?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ color: "var(--text-dim)", fontSize: "1.2rem", marginBottom: 60, maxWidth: 450 }}
            >
              Transform your facility with the modern, efficient, and 100% paperless platform. Contact us for a specialized walkthrough.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: "flex", alignItems: "center", gap: 20, textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ 
                    width: 54, 
                    height: 54, 
                    borderRadius: "16px", 
                    background: "rgba(255,255,255,0.05)", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "var(--color-primary)",
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{info.title}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={isFormInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              padding: "50px", 
              borderRadius: "40px", 
              background: "rgba(255,255,255,0.02)", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden"
            }}
          >
             <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>Send a Message</h3>
             <p style={{ color: "var(--text-dim)", marginBottom: 40 }}>We'll get back to you within 24 hours.</p>

             <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row-mobile">
                  <FormInput label="Name" type="text" id="name" placeholder="John Doe" focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  <FormInput label="Email" type="email" id="email" placeholder="john@hospital.com" focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
                <FormInput label="Subject" type="text" id="subject" placeholder="Technical Inquiry" focused={focused === "subject"} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 600, color: focused === "message" ? "var(--color-primary)" : "var(--text-muted)", transition: "all 0.3s ease", paddingLeft: 4 }}>Message</label>
                  <textarea 
                    id="message"
                    placeholder="Tell us about your hospital needs..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{ 
                      padding: "20px", 
                      borderRadius: "18px", 
                      background: "rgba(255,255,255,0.03)", 
                      border: `1px solid ${focused === "message" ? "var(--color-primary)" : "rgba(255,255,255,0.08)"}`, 
                      color: "#fff", 
                      fontSize: "1rem", 
                      minHeight: 140, 
                      outline: "none", 
                      transition: "all 0.3s ease",
                      boxShadow: focused === "message" ? "0 0 20px rgba(79, 140, 255, 0.1)" : "none"
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
                    fontSize: "1rem", 
                    fontWeight: 700, 
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 12,
                    marginTop: 10
                  }}
                >
                  Send Inquiry
                  <ArrowRight size={20} />
                </button>
             </form>
          </motion.div>
        </div>

        {/* ── FOOTER BOTTOM ── */}
        <div style={{ paddingTop: 80, borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60 }}>
          
          {/* Logo & About */}
          <div style={{ maxWidth: 450 }}>
             <Image src="/logo.png" alt="INFIPLUS" width={110} height={40} style={{ objectFit: "contain", marginBottom: 28, opacity: 0.9 }} />
             <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
               Digitizing the future of healthcare with the most powerful and intuitive paperless hospital management ecosystem.
             </p>
             <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
                <SocialLink icon={<Instagram size={20} />} />
                <SocialLink icon={<Linkedin size={20} />} />
                <SocialLink icon={<Twitter size={20} />} />
             </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 28 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
               <FooterLink text="About Us" href="#hero" />
               <FooterLink text="Contact Us" href="#contact" />
               <FooterLink text="Features" href="#features" />
               <FooterLink text="Why Choose Infiplus" href="#why-info" />
            </div>
          </div>

          {/* Certificates info */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
             <div style={{ padding: "30px", borderRadius: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", width: "100%" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  Standardizing healthcare operations for 50+ providers across India.
                </p>
             </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: 80, paddingTop: 30, borderTop: "1px solid rgba(255, 255, 255, 0.03)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
           <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
             © {new Date().getFullYear()} Infisparks. All rights reserved.
           </p>
           <div style={{ display: "flex", alignItems: "center", gap: 40, color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={16} /> Fully HIPAA Compliant</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={16} /> ISO 27001 Certified</span>
           </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .form-row-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FormInput({ label, type, id, placeholder, focused, onFocus, onBlur }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label htmlFor={id} style={{ fontSize: "0.85rem", fontWeight: 600, color: focused ? "var(--color-primary)" : "var(--text-muted)", transition: "all 0.3s ease", paddingLeft: 4 }}>{label}</label>
      <input 
        type={type} 
        id={id} 
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ 
          padding: "0 22px", 
          height: "60px", 
          borderRadius: "18px", 
          background: "rgba(255,255,255,0.03)", 
          border: `1px solid ${focused ? "var(--color-primary)" : "rgba(255,255,255,0.08)"}`, 
          color: "#fff", 
          fontSize: "1rem", 
          outline: "none", 
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 0 20px rgba(79, 140, 255, 0.1)" : "none"
        }} 
      />
    </div>
  );
}

function FooterLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <motion.a 
      href={href}
      whileHover={{ x: 5, color: "#fff" }}
      style={{ fontSize: "0.95rem", color: "var(--text-dim)", textDecoration: "none", transition: "all 0.3s ease" }}
    >
      {text}
    </motion.a>
  );
}

function SocialLink({ icon }: { icon: any }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -5, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
      style={{ 
        width: 44, height: 44, borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", 
        display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.3s ease" 
      }}
    >
      {icon}
    </motion.a>
  );
}
