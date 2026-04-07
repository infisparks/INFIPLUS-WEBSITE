"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const navLinks = [
    { title: "Features", href: "#features" },
    { title: "Why Infiplus", href: "#why-info" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226, 232, 240, 0.8)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(0, 0, 0, 0.05)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <motion.div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer", position: "relative", width: 154, height: 50 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/logo.png"
            alt="INFIPLUS Logo"
            fill
            style={{ objectFit: "contain", objectPosition: "left" }}
            priority
          />
        </motion.div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="nav-link"
                style={{
                  fontSize: "0.925rem",
                  fontWeight: 600,
                  color: "#475569",
                  textDecoration: "none",
                  position: "relative",
                  transition: "color 0.3s ease",
                  padding: "4px 0"
                }}
              >
                {link.title}
                <div className="nav-link-underline" />
              </a>
            ))}
          </div>

          <button
            onClick={onBookDemo}
            className="glow-btn-primary"
            style={{
              padding: "10px 24px",
              borderRadius: "50px",
              border: "none",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            Book a Demo
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#0F172A",
            cursor: "pointer",
            display: "none",
          }}
          className="mobile-nav-toggle"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
              overflow: "hidden",
            }}
          >
            <div className="container-main" style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 20 }}>
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    textDecoration: "none",
                    padding: "8px 0"
                  }}
                >
                  {link.title}
                </a>
              ))}
              <button
                onClick={() => { onBookDemo(); setIsOpen(false); }}
                className="glow-btn-primary"
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav-toggle { display: none !important; }
        
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
        
        .nav-link:hover {
           color: #2563EB !important;
        }
      `}</style>
    </motion.nav>
  );
}
