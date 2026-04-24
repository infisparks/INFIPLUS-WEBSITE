"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Maximize2, Zap, Layout, Mic, UserPlus, Database, PieChart, Activity, DollarSign, Stethoscope, FileText, Calendar, Plus, Minus, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Feature Data — Updated with custom IPD images
   ═══════════════════════════════════════════════════════ */

interface Feature {
  id: number;
  image: string;
  title: string;
  description: string;
  tag: string;
  icon?: any;
}

const features: Feature[] = [
  {
    id: 9, image: "/ipd_images/opd ai prescription.webp", tag: "AI-Powered",
    title: "AI Medical Voice Scribe & Smart EMR Prescriptions",
    description: "Maximize clinical productivity with India's most advanced AI-powered medical voice scribe. Scale your hospital's output by automating high-fidelity documentation—instantly transcribing symptoms, histories, and clinical treatments directly into structured digital presets.",
    icon: <Stethoscope size={18} />
  },
  {
    id: 8, image: "/ipd_images/opd admin.webp", tag: "Analytics",
    title: "Executive Revenue Analytics & OPD Admin Dashboard",
    description: "Master your hospital's Revenue Cycle Management (RCM) with a high-density executive dashboard. Track cash vs. digital collections in real-time, monitor department-wise growth, and gain actionable financial insights to drive practice profitability.",
    icon: <DollarSign size={18} />
  },
  {
    id: 11, image: "/ipd_images/opd appoinment.webp", tag: "Digital",
    title: "Smart Appointment Booking & OPD Patient Registration",
    description: "Streamline your front-desk operations with a high-speed patient onboarding system. Eliminate manual entry errors with smart UHID search, automated demographic collection, and a structured specialist scheduling engine for 10x faster clinical registration.",
    icon: <Layout size={18} />
  },
  {
    id: 10, image: "/ipd_images/opd appoinment list.webp", tag: "Digital",
    title: "Intelligent Patient Queue & Clinic Management System",
    description: "Optimize patient throughput and eliminate hospital congestion with a real-time queuing module. Seamlessly coordinate appointments across specialized departments with automated status triggers and doctor-wise traffic filtering for a superior patient experience.",
    icon: <Calendar size={18} />
  },
  {
    id: 12, image: "/ipd_images/specialist graph.webp", tag: "Analytics",
    title: "Specialist Performance Analytics & Clinical Productivity",
    description: "Identify top-performing consultants and departments with granular specialist tracking. Use high-fidelity visual charts to analyze consultation volume, case-load trends, and department-wise revenue to optimize hospital staffing and resource allocation efficiently.",
    icon: <Activity size={18} />
  },
  {
    id: 6, image: "/ipd_images/lab comparision report.webp", tag: "Digital",
    title: "Universal Lab Integration & Trend Analysis",
    description: "Connect your diagnostic lab system for instant, cloud-synced reporting. Our smart comparison engine highlights health trends and detects abnormal values (Red/Green), enabling faster clinical decisions and better patient outcomes.",
    icon: <PieChart size={18} />
  },
  {
    id: 1, image: "/ipd_images/manage patinet ipd paper.webp", tag: "Paperless",
    title: "Unified Digital Patient Life-Cycle",
    description: "A centralized ecosystem for the entire patient journey. From paperless admission assessment to digital progress notes, our system ensures structured medical data is available at every touchpoint of care.",
    icon: <FileText size={18} />
  },
  {
    id: 2, image: "/ipd_images/ipd document.webp", tag: "Digital",
    title: "Secure Medical Document Vault",
    description: "Digitize and protect sensitive patient records. Our structured Document Folder system provides secure, HIPAA-compliant storage for X-Rays, Scans, and external medical history reports in one central location.",
    icon: <Database size={18} />
  },
  {
    id: 3, image: "/ipd_images/ipd paper switch paper.webp", tag: "Paperless",
    title: "Intelligent Nursing Navigation",
    description: "Empower your nursing staff with one-tap access to patient records. Our floating navigation system allows for quick switching between clinical notes, ensuring continuity of care without the friction of paper browsing.",
    icon: <Zap size={18} />
  },
  {
    id: 4, image: "/ipd_images/ipd paper view.webp", tag: "Paperless",
    title: "Clinical Observation Digitization",
    description: "Capture clinical observations with the speed of handwriting and the efficiency of digital storage. Mirror traditional medical charts with dynamic digital interfaces that track patient history, complaints, and drug allergies.",
    icon: <Activity size={18} />
  },
  {
    id: 5, image: "/ipd_images/ipd patient details.webp", tag: "Digital",
    title: "High-Density Patient Intelligence",
    description: "Comprehensive 360° patient profiles that sync core registration, bed assignments, and emergency contact details. Designed for maximum information density to help medical staff make informed decisions faster.",
    icon: <UserPlus size={18} />
  },
  {
    id: 7, image: "/ipd_images/daily performance report.webp", tag: "Analytics",
    title: "Daily Performance Report (DPR)",
    description: "Gain complete hospital performance tracking with our DPR system. Get a real-time operations summary including OPD appointments, IPD admissions, discharges, and births. Make data-driven decisions with a comprehensive service breakdown summary.",
    icon: <Activity size={18} />
  },
];

const tagColors: Record<string, string> = {
  Paperless: "var(--color-success)",
  Digital: "var(--color-primary)",
  "AI-Powered": "#7C3AED",
  Analytics: "#F59E0B",
};

// Optimized Animation Configuration
const ANIMATION_CONFIG = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  viewport: { once: true, margin: "-100px" },
};

export default function Features() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (url: string) => {
    setActiveImage(url);
    setZoom(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = "";
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 3.5));
  };

  return (
    <section id="features" style={{ position: "relative", paddingTop: 72, paddingBottom: 80, backgroundColor: 'var(--bg-main)' }}>
      <div className="container-main">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(44px, 7vw, 68px)" }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.4, ease: ANIMATION_CONFIG.ease }}
            className="section-badge" 
          >
            THE INFIPLUS MODULES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.5, delay: 0.1, ease: ANIMATION_CONFIG.ease }}
            style={{ fontSize: "clamp(1.3rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", marginTop: "clamp(8px, 1.2vw, 12px)", marginBottom: "clamp(8px, 1.5vw, 14px)", color: 'var(--text-main)', lineHeight: 1.1 }}
          >
            Powerful Features for <br /><span className="gradient-text-teal">Modern Healthcare</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.5, delay: 0.2, ease: ANIMATION_CONFIG.ease }}
            style={{ color: "var(--text-dim)", fontSize: "clamp(0.76rem, 1.5vw, 0.9rem)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 500 }}
          >
          Discover our specialized modules built to empower your medical team, digitize messy operations, and drive growth with real-time analytics.
          </motion.p>
        </div>

        {/* Feature Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 9vw, 96px)" }}>
          {features.map((feature, index) => (
            <FeatureSection 
                key={feature.id} 
                feature={feature} 
                index={index} 
                onImageClick={openLightbox} 
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)'
            }}
          >
             {/* Controls */}
             <div 
              onClick={(e) => e.stopPropagation()}
              className="lightbox-controls"
              style={{
                position: 'fixed',
                top: '30px',
                right: '30px',
                display: 'flex',
                gap: '12px',
                zIndex: 1002
              }}
             >
                <button 
                  onClick={() => handleZoom(0.3)}
                  className="pro-btn-glass"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom In"
                >
                  <Plus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => handleZoom(-0.3)}
                  className="pro-btn-glass"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom Out"
                >
                  <Minus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={closeLightbox}
                  className="pro-btn-glass close-btn"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Close"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
             </div>

             {/* Image Wrapper */}
             <div 
              onClick={(e) => e.stopPropagation()}
              style={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: zoom > 1 ? 'auto' : 'hidden',
              }}
             >
                <motion.div 
                  layoutId={activeImage}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: `scale(${zoom})`,
                    cursor: zoom > 1 ? 'grab' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image 
                    src={activeImage}
                    alt="Feature Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.div>
             </div>

             <div className="glass-indicator" style={{ position: 'fixed', top: '35px', left: '50%', transform: 'translateX(-50%)', padding: '10px 24px', borderRadius: '50px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(37, 99, 235, 0.05)' }}>
               {Math.round(zoom * 100)}%
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .pro-btn-glass {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pro-btn-glass:hover {
          background: rgba(37, 99, 235, 0.05);
          border-color: rgba(37, 99, 235, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.1);
        }
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.05) !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
        }
        @media (max-width: 768px) {
          .lightbox-controls {
            top: auto !important;
            bottom: 40px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            background: #fff !important;
            padding: 12px !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureSection({ feature, index, onImageClick }: { feature: Feature; index: number; onImageClick: (url: string) => void }) {
  const displayNum = index + 1;
  const isOdd = displayNum % 2 !== 0;
  const imagePath = feature.image;
  const tagColor = tagColors[feature.tag] || "var(--color-primary)";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance-focused Animation Variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? 0 : (isOdd ? -20 : 20), 
      y: isMobile ? 20 : 0,                 
      scale: 0.98                           
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: ANIMATION_CONFIG.duration, 
        ease: ANIMATION_CONFIG.ease 
      } 
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.99 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: ANIMATION_CONFIG.duration, 
        delay: isMobile ? 0 : 0.1, 
        ease: ANIMATION_CONFIG.ease 
      } 
    }
  };

  return (
    <div
      className={`feature-section flex flex-col gap-8 md:gap-16 items-center py-8 md:py-16 ${
        isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image Container with Optimized Effects */}
      <motion.div 
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={ANIMATION_CONFIG.viewport}
        style={{ willChange: "transform, opacity" }}
        className="w-full md:w-[55%] relative flex justify-center"
      >
        {/* Optimized Glow - Subtle Blue/Tag Glow */}
        <div 
          className="absolute inset-[-40px] opacity-[0.08] pointer-events-none blur-[60px] rounded-full"
          style={{ background: `radial-gradient(circle, ${tagColor} 0%, transparent 70%)` }}
        />
        
        <div 
          onClick={() => onImageClick(imagePath)}
          className="feature-img-box group relative p-[5px] rounded-[24px] cursor-pointer transition-all duration-400 hover:scale-[1.03]"
          style={{ 
            background: `linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)`,
            boxShadow: `0 20px 50px -10px rgba(37, 99, 235, 0.35), 0 10px 20px -5px rgba(0, 0, 0, 0.1)`,
            border: `1.5px solid rgba(29, 78, 216, 0.3)` // Outer definition stroke
          }}
        >
          <div className="relative rounded-[20px] overflow-hidden bg-white shadow-inner">
             <Image
                src={imagePath}
                alt={feature.title}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-[500px] block object-contain"
                loading={displayNum <= 2 ? "eager" : "lazy"}
                priority={displayNum <= 2}
              />
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 bg-blue-600/5 backdrop-blur-[1px] flex items-center justify-center">
                 <div className="bg-white/95 border border-black/5 shadow-2xl px-6 py-3 rounded-full text-blue-600 flex items-center gap-2.5 font-bold text-sm">
                    <Maximize2 size={16} />
                    Expand View
                 </div>
              </div>
          </div>
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={ANIMATION_CONFIG.viewport}
        style={{ willChange: "transform, opacity" }}
        className="w-full md:w-[45%] flex flex-col gap-6 text-center md:text-left items-center md:items-start"
      >
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center justify-center w-11 h-11 rounded-xl border"
            style={{ 
              background: `${tagColor}08`, 
              borderColor: `${tagColor}15`,
              color: tagColor,
            }}
          >
            {feature.icon}
          </div>
          <span 
            className="text-[0.75rem] font-bold tracking-[0.1em] uppercase opacity-80"
            style={{ color: tagColor }}
          >
            {feature.tag}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)", fontWeight: 800, color: '#0F172A', letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            {feature.title}
          </h3>
          <p style={{ fontSize: "clamp(0.76rem, 1.5vw, 0.88rem)", color: '#475569', lineHeight: 1.65, fontWeight: 500 }}>
            {feature.description}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2 group">
            <div 
              className="w-10 h-[2px] transition-all duration-500 group-hover:w-14" 
              style={{ background: tagColor, opacity: 0.3, borderRadius: 999 }} 
            />
            <span style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)", fontWeight: 900, color: "#94A3B8", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              MODULE {String(displayNum).padStart(2, "0")}
            </span>
        </div>
      </motion.div>
    </div>
  );
}
