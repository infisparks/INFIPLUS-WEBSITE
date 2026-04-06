"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Scroll visibility effect
  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 50);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? "rgba(2, 6, 23, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(15px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255, 255, 255, 0.08)" : "transparent"}`,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <motion.div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer", position: "relative", width: 140, height: 48 }}
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

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map((link) => (
              <motion.a
                key={link.title}
                href={link.href}
                className="navigation-link"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  position: "relative",
                }}
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { color: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.7)" },
                  hover: { color: "#fff" }
                }}
              >
                {link.title}
                <motion.div
                  className="nav-hover-line"
                  variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--color-primary)",
                    originX: 0,
                  }}
                />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={onBookDemo}
            className="glow-btn-primary"
            style={{
              padding: "10px 24px",
              borderRadius: "40px",
              border: "none",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo
            <ArrowUpRight size={16} />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            display: "none",
          }}
          className="show-mobile"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
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
              overflow: "hidden",
              background: "rgba(2, 6, 23, 0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="container-main" style={{ padding: "40px 0", display: "flex", flexDirection: "column", gap: 24 }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  {link.title}
                  <ArrowUpRight size={18} opacity={0.5} />
                </motion.a>
              ))}
              <button
                onClick={() => { onBookDemo(); setIsOpen(false); }}
                className="glow-btn-primary"
                style={{
                  padding: "15px",
                  borderRadius: "14px",
                  border: "none",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
