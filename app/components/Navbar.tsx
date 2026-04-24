"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const navLinks = [
    { title: "Features", href: "#features" },
    { title: "Why Infiplus", href: "#why-info" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ─── Announcement Bar ─── */}
      <div
        style={{
          background: "linear-gradient(90deg, #1D4ED8, #2563EB, #7C3AED)",
          color: "#fff",
          textAlign: "center",
          padding: "7px 16px",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.03em",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            background: "rgba(255,255,255,0.18)",
            borderRadius: "4px",
            padding: "1px 6px",
            fontSize: "0.6rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
          }}
        >
          NEW
        </span>
        AI-powered OPD Prescriptions now live — 10x faster documentation
        <a
          href="#features"
          style={{
            color: "#ffffff",
            opacity: 0.85,
            textDecoration: "underline",
            fontSize: "0.68rem",
            fontWeight: 700,
          }}
        >
          See it →
        </a>
      </div>

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 30, // Below announcement bar
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "8px 0" : "12px 0",
          background: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(226, 232, 240, 0.7)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 24px -4px rgba(37, 99, 235, 0.08)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="container-main"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <motion.div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer", position: "relative", width: 120, height: 38 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Image
              src="/logo.png"
              alt="INFIPLUS Logo"
              fill
              style={{ objectFit: "contain", objectPosition: "left" }}
              priority
            />
          </motion.div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="nav-link"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#475569",
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.3s ease",
                    padding: "3px 0",
                    letterSpacing: "0.01em",
                  }}
                >
                  {link.title}
                  <div className="nav-link-underline" />
                </a>
              ))}
            </div>

            {/* Phone quick link */}
            <a
              href="tel:+919958399157"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#10B981",
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.18)",
                transition: "all 0.3s ease",
                letterSpacing: "0.01em",
              }}
              className="phone-link-nav"
            >
              <Phone size={12} strokeWidth={2.5} />
              +91 99583 99157
            </a>

            <motion.button
              onClick={onBookDemo}
              className="glow-btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "8px 18px",
                borderRadius: "50px",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.78rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              Book a Demo
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: isOpen ? "rgba(37, 99, 235, 0.06)" : "transparent",
              border: isOpen ? "1px solid rgba(37, 99, 235, 0.15)" : "1px solid rgba(226,232,240,0.7)",
              borderRadius: "10px",
              color: "#0F172A",
              cursor: "pointer",
              display: "none",
              padding: "7px",
              transition: "all 0.3s ease",
            }}
            className="mobile-nav-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(226,232,240,0.8)",
                overflow: "hidden",
                boxShadow: "0 16px 32px -8px rgba(37,99,235,0.08)",
              }}
            >
              <div
                className="container-main"
                style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 4 }}
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.title}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#0F172A",
                      textDecoration: "none",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      display: "block",
                      transition: "background 0.2s ease",
                      letterSpacing: "0.01em",
                    }}
                    className="mobile-link"
                  >
                    {link.title}
                  </motion.a>
                ))}
                <div style={{ height: 1, background: "rgba(226,232,240,0.7)", margin: "6px 0" }} />
                {/* Phone row */}
                <a
                  href="tel:+919958399157"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#10B981",
                    textDecoration: "none",
                    borderRadius: "10px",
                    background: "rgba(16,185,129,0.04)",
                    border: "1px solid rgba(16,185,129,0.14)",
                    marginBottom: 6,
                  }}
                >
                  <Phone size={13} />
                  +91 99583 99157
                </a>
                <motion.button
                  onClick={() => { onBookDemo(); setIsOpen(false); }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="glow-btn-primary"
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    marginTop: 2,
                  }}
                >
                  Book a Demo →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }

          @media (max-width: 960px) {
            .desktop-nav { display: none !important; }
            .mobile-nav-toggle { display: flex !important; }
          }

          @media (max-width: 1100px) {
            .phone-link-nav { display: none !important; }
          }

          .nav-link:hover { color: #2563EB !important; }

          .mobile-link:hover {
            background: rgba(37, 99, 235, 0.05) !important;
            color: #2563EB !important;
          }
        `}</style>
      </motion.nav>
    </>
  );
}
