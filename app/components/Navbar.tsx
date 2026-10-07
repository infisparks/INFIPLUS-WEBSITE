"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 960);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled backdrop effect
      setScrolled(currentScrollY > 20);

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { title: "Services", href: "/services" },
    { title: "Modules", href: "/modules" },
    { title: "Features", href: "/#features" },
    { title: "Why Infiplus", href: "/#why-info" },
    { title: "Founders", href: "/#founders" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/#contact" },
  ];

  const handleActionClick = () => {
    if (isMobile) {
      onBookDemo();
      return;
    }
    const el = document.getElementById("trial-form-card") || document.getElementById("demo-form-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      onBookDemo();
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <nav
        style={{
          padding: isMobile
            ? (scrolled ? "8px 0" : "12px 0")
            : (scrolled ? "10px 0" : "16px 0"),
          background: scrolled
            ? "rgba(6, 11, 36, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.03)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container-main">
          {/* Desktop Nav Layout */}
          {!isMobile ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 46 }}>
              {/* Logo */}
              <div
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                role="button"
                aria-label="Scroll to top"
                style={{ cursor: "pointer", position: "relative", width: 130, height: 36 }}
              >
                <Image
                  src="/logo.png"
                  alt="INFIPLUS Logo"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }}
                  priority
                />
              </div>

              {/* Desktop Links */}
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.85)",
                      textDecoration: "none",
                      position: "relative",
                      transition: "color 0.2s ease",
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)"}
                  >
                    {link.title}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleActionClick}
                whileHover={{ scale: 1.03, backgroundColor: "#1D4ED8" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                }}
              >
                Book Free Demo
              </motion.button>
            </div>
          ) : (
            /* Mobile Nav Layout - Compact single row header */
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 36 }}>
              {/* Logo */}
              <div
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                role="button"
                aria-label="Scroll to top"
                style={{ cursor: "pointer", position: "relative", width: 110, height: 28 }}
              >
                <Image
                  src="/logo.png"
                  alt="INFIPLUS Logo"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }}
                  priority
                />
              </div>

              <motion.button
                onClick={handleActionClick}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Book Free Demo
              </motion.button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
