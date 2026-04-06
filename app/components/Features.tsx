"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Maximize2, Zap, Layout, Mic, UserPlus, Database, PieChart, Activity, DollarSign, Stethoscope, FileText, Calendar, Plus, Minus, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Feature Data — Paperless first, then Digital
   Each entry maps to its original image file number.
   ═══════════════════════════════════════════════════════ */

interface Feature {
  id: number;
  imageNum: number;
  imageExt: string;
  title: string;
  description: string;
  tag: string;
  icon?: any;
}

const features: Feature[] = [
  /* ── PAPERLESS ── */
  {
    id: 1, imageNum: 18, imageExt: "jpeg", tag: "Paperless",
    title: "Paperless Digital File",
    description: "Most doctors and nurses prefer writing by hand, making the switch to digital feel slow and frustrating. Our Paperless Digital File solves this by letting your team use a Smart Pen to write directly on the screen, just like they do on actual paper. You get the speed of a digital system and the organized storage of the cloud without forcing your staff to learn how to type.",
    icon: <FileText size={18} />
  },
  {
    id: 2, imageNum: 1, imageExt: "png", tag: "Paperless",
    title: "Effortless Digital Data Entry",
    description: "Carrying paper files is a headache. With this, you just type like you're sending a message on your phone. If you run out of space, just add a row. It's that simple. Experience the speed of modern mobile messaging applied to complex medical data workflows.",
    icon: <Database size={18} />
  },
  {
    id: 3, imageNum: 19, imageExt: "jpeg", tag: "Paperless",
    title: "Digital Patient Progress Notes",
    description: "Here's an example of a patient progress note as it appears in our software. Every note is digitally stored, timestamped, and instantly accessible — eliminating the need for paper files and ensuring a complete, searchable medical record for every patient.",
    icon: <Activity size={18} />
  },
  {
    id: 4, imageNum: 20, imageExt: "jpeg", tag: "Paperless",
    title: "Digital Daily Chart",
    description: "Here's a look at the daily chart image from our software. It gives clinicians a real-time, paperless view of the patient's medication schedule, vitals, and nursing observations — all on one clean, organized digital screen.",
    icon: <Layout size={18} />
  },
  {
    id: 5, imageNum: 21, imageExt: "jpeg", tag: "Paperless",
    title: "Floating Paper Feature",
    description: "In a traditional hospital, doctors and nurses constantly waste time flipping through a thick patient file just to copy information from one page to another. This Floating Paper Feature lets you open any previous record as a small, movable window that stays on top while you write.",
    icon: <Zap size={18} />
  },
  {
    id: 6, imageNum: 22, imageExt: "jpeg", tag: "Paperless",
    title: "Quick View Patient Info",
    description: "In a traditional paper-heavy ward, a nurse or doctor often has to search through different files for basic info. This Quick View feature puts all the critical patient details on a single, clean screen that you can open while you work. Instant access to demographics in one tap.",
    icon: <Layout size={18} />
  },
  {
    id: 7, imageNum: 23, imageExt: "jpeg", tag: "Paperless",
    title: "View Previous Records Digitally",
    description: "Nurses can view previous papers like nursing notes without needing hard copies. A fully searchable digital archive replaces the chaos of tracking down physical files, saving hours of staff time.",
    icon: <FileText size={18} />
  },
  /* ── DIGITAL ── */
  {
    id: 8, imageNum: 24, imageExt: "jpeg", tag: "Digital",
    title: "Digital Document Folder",
    description: "Eliminate the wait for physical lab reports or X-ray films. Every investigation, from blood tests like CBC to X-ray images, is stored in a single, organized tab. View live results the moment they are uploaded by diagnostics.",
    icon: <Database size={18} />
  },
  {
    id: 9, imageNum: 25, imageExt: "jpeg", tag: "Digital",
    title: "Test Comparison Dashboard",
    description: "Clinicians can place multiple days of lab data side-by-side on a single screen. It's a powerful diagnostic tool that turns a pile of lab papers into a clear, visual patient history.",
    icon: <PieChart size={18} />
  },
  {
    id: 10, imageNum: 2, imageExt: "png", tag: "Digital",
    title: "Digital Daily Drug Chart",
    description: "Handwriting on paper drug charts leads to dangerous mistakes. Our digital chart makes every medicine, dose, and timing crystal clear for the entire nursing staff. No more deciphering messy scribbles.",
    icon: <Activity size={18} />
  },
  {
    id: 11, imageNum: 3, imageExt: "png", tag: "Digital",
    title: "Voice-Powered Data Entry",
    description: "Recording glucose levels manually is a slow task. Our \"Fill via Voice\" feature lets you speak the blood sugar levels, medication, and dosage directly into the system while your hands stay busy with the patient.",
    icon: <Mic size={18} />
  },
  {
    id: 12, imageNum: 4, imageExt: "png", tag: "Digital",
    title: "Real-Time Bed Selection",
    description: "Finding an empty bed usually means dozens of phone calls. Our system gives your staff a live, color-coded map of every bed in the hospital, showing vacancies and occupancy in one glance.",
    icon: <Layout size={18} />
  },
  {
    id: 13, imageNum: 5, imageExt: "png", tag: "Digital",
    title: "IPD Admission & WhatsApp",
    description: "Register a patient in seconds through a clean digital form that auto-generates a UHID. Best of all, once the form is filled, the details are instantly sent to the patient via WhatsApp automatically.",
    icon: <UserPlus size={18} />
  },
  {
    id: 14, imageNum: 6, imageExt: "png", tag: "AI-Powered",
    title: "AI-Powered OPD Prescription",
    description: "Doctors simply speak to record symptoms, history, and medicines. Our AI turns a 5-minute typing task into a few seconds of voice input, building a permanent digital history for every clinic visit.",
    icon: <Stethoscope size={18} />
  },
  {
    id: 15, imageNum: 7, imageExt: "png", tag: "Analytics",
    title: "OPD Admin Dashboard",
    description: "Manage a busy OPD with a real-time view of every appointment. Track total patient counts and specific doctor performance in one click, eliminating the dependence on manual registers.",
    icon: <PieChart size={18} />
  },
  {
    id: 16, imageNum: 8, imageExt: "png", tag: "Digital",
    title: "On-Call Booking Dashboard",
    description: "Ditch the sticky notes. This On-Call Dashboard gives your team a digital waiting list where every caller's details are safely stored. When the patient arrives, simply click \"Book OPD Visit\" to confirm.",
    icon: <Calendar size={18} />
  },
  {
    id: 17, imageNum: 9, imageExt: "png", tag: "Digital",
    title: "Smart OPD Patient Lookup",
    description: "Find any returning patient in seconds just by typing their phone number or UHID. The software auto-fills all details, letting you book the appointment without re-entering registration data.",
    icon: <Database size={18} />
  },
  {
    id: 18, imageNum: 10, imageExt: "png", tag: "Analytics",
    title: "OT Analytics & Breakdown",
    description: "Track Operation Theater (OT) usage automatically. Categorize every surgery into Major or Minor cases and track baby births in real-time with clear visual graphs showing daily output.",
    icon: <PieChart size={18} />
  },
  {
    id: 19, imageNum: 11, imageExt: "png", tag: "Analytics",
    title: "Daily Performance Report (DPR)",
    description: "DPR pulls every department's data into a single, real-time dashboard. With one click, see the entire hospital's health—from OPD counts to lab tests—without calling a single manager.",
    icon: <Activity size={18} />
  },
  {
    id: 20, imageNum: 12, imageExt: "png", tag: "Analytics",
    title: "Patient Growth Analytics",
    description: "Turn messy registration books into a live, visual map of your growth over the last 30 days. Instantly see how many patients visited today versus last week and identify your peak hours.",
    icon: <PieChart size={18} />
  },
  {
    id: 21, imageNum: 13, imageExt: "png", tag: "Analytics",
    title: "IPD Admin Dashboard",
    description: "A live summary of everything from today's admissions to current occupancy and discharge statuses. Track long-term trends and identify ward-wise performance at a glance.",
    icon: <Layout size={18} />
  },
  {
    id: 22, imageNum: 14, imageExt: "png", tag: "Analytics",
    title: "Service Type Analysis",
    description: "Identify how well your hospital is attracting new people versus returning care. Breaks down traffic into \"First Visits\" and \"Follow-ups\" to guide your patient acquisition strategy.",
    icon: <Database size={18} />
  },
  {
    id: 23, imageNum: 15, imageExt: "png", tag: "Analytics",
    title: "Specialist Performance Analysis",
    description: "Data-driven decisions for department staffing and marketing budgets. See exactly which departments are bringing in the most patients in a clear rank-ordered graph.",
    icon: <Stethoscope size={18} />
  },
  {
    id: 24, imageNum: 16, imageExt: "png", tag: "Analytics",
    title: "Revenue & Collection Dashboard",
    description: "Real-time breakdown of your total revenue, distinguishing between cash and digital collections. Map out appointment trends and categorize income by service seamlessly.",
    icon: <DollarSign size={18} />
  },
  {
    id: 25, imageNum: 17, imageExt: "png", tag: "Analytics",
    title: "Doctor Performance Analysis",
    description: "A live leaderboard that ranks your consultants based on actual patient volume. Identify your most productive doctors and optimize their schedule based on demand data.",
    icon: <UserPlus size={18} />
  },
];

const tagColors: Record<string, string> = {
  Paperless: "var(--color-success)",
  Digital: "var(--color-primary)",
  "AI-Powered": "#A855F7",
  Analytics: "#F59E0B",
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
    <section id="features" style={{ position: "relative", paddingTop: 100, paddingBottom: 100 }}>
      <div className="container-main">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-badge" 
          >
            THE INFIPLUS MODULES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: 16, marginBottom: 20 }}
          >
            Powerful Features for <br /><span className="gradient-text-teal">Modern Healthcare</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ color: "var(--text-dim)", fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: 650, margin: "0 auto", lineHeight: 1.7 }}
          >
          Discover 25 specialized modules built to empower your medical team, digitize messy operations, and drive growth with real-time analytics.
          </motion.p>
        </div>

        {/* Feature Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 140 }}>
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
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom In"
                >
                  <Plus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => handleZoom(-0.3)}
                  className="pro-btn-glass"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom Out"
                >
                  <Minus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={closeLightbox}
                  className="pro-btn-glass close-btn"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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

             <div className="glass-indicator" style={{ position: 'fixed', top: '35px', left: '50%', transform: 'translateX(-50%)', padding: '10px 24px', borderRadius: '50px', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(79, 140, 255, 0.1)' }}>
               {Math.round(zoom * 100)}%
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .pro-btn-glass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pro-btn-glass:hover {
          background: rgba(79, 140, 255, 0.2);
          border-color: rgba(79, 140, 255, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          color: #f87171 !important;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .lightbox-controls {
            top: auto !important;
            bottom: 40px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            background: rgba(13,21,40,0.95) !important;
            padding: 12px !important;
            border-radius: 24px !important;
            border: 1px solid rgba(255,255,255,0.15) !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureSection({ feature, index, onImageClick }: { feature: Feature; index: number; onImageClick: (url: string) => void }) {
  const displayNum = index + 1;
  const isOdd = displayNum % 2 !== 0;
  const imagePath = `/feature-image-${feature.imageNum}.${feature.imageExt}`;
  const tagColor = tagColors[feature.tag] || "var(--color-primary)";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.2, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      } 
    }
  };

  const imageVariants = {
    hidden: { x: isOdd ? -70 : 70, opacity: 0, scale: 0.95 },
    visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  const contentVariants = {
    hidden: { x: isOdd ? 70 : -70, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className={`feature-section flex flex-col gap-12 md:gap-24 items-center py-16 md:py-24 ${
        isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image Container with Glow */}
      <motion.div 
        variants={imageVariants}
        className="w-full md:w-[55%] relative flex justify-center perspective-1000"
      >
        {/* Subtle Background Glow */}
        <div 
          className="absolute inset-[-60px] opacity-20 pointer-events-none blur-[80px] rounded-full"
          style={{ background: `radial-gradient(circle, ${tagColor} 0%, transparent 70%)` }}
        />
        
        <div 
          onClick={() => onImageClick(imagePath)}
          className="feature-img-box group relative p-[3.5px] rounded-[34px] cursor-pointer transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(79,140,255,0.4)]"
          style={{ 
            background: `linear-gradient(135deg, #4F8CFF 0%, #00d2ff 25%, rgba(79, 140, 255, 0.3) 50%, #00d2ff 75%, #4F8CFF 100%)`,
            backgroundSize: '200% 200%',
            animation: 'gradientMove 6s ease infinite',
            boxShadow: `0 20px 80px -20px rgba(0,0,0,0.9), 0 0 30px rgba(79, 140, 255, 0.3)`
          }}
        >
          <div className="relative rounded-[30px] overflow-hidden bg-[#020617] border border-white/10">
             <Image
                src={imagePath}
                alt={feature.title}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-[520px] block object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                priority={displayNum <= 2}
              />
              
              {/* Refined Glass Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                 <div className="bg-white/10 border border-white/20 backdrop-blur-md px-7 py-3.5 rounded-full text-white flex items-center gap-3 font-semibold shadow-2xl">
                    <Maximize2 size={18} />
                    View Photo
                 </div>
              </div>
          </div>
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        variants={contentVariants}
        className="w-full md:w-[45%] flex flex-col gap-8 text-center md:text-left items-center md:items-start"
      >
        {/* Meta Tag */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300"
            style={{ 
              background: `${tagColor}15`, 
              borderColor: `${tagColor}30`,
              color: tagColor,
              boxShadow: `0 0 15px ${tagColor}10`
            }}
          >
            {feature.icon}
          </div>
          <span 
            className="text-[0.8rem] font-bold tracking-[0.12em] uppercase opacity-90"
            style={{ color: tagColor }}
          >
            {feature.tag}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] md:max-w-[90%]">
            {feature.title}
          </h3>
          <p className="text-[#a0aec0] leading-relaxed text-lg font-medium md:max-w-[95%]">
            {feature.description}
          </p>
        </div>

        {/* Module Indicator */}
        <div className="flex items-center gap-3 mt-4 group">
            <div 
              className="w-12 h-[2px] transition-all duration-500 group-hover:w-16" 
              style={{ background: tagColor, opacity: 0.5 }} 
            />
            <span className="text-[0.75rem] font-black text-gray-500 tracking-[0.25em] uppercase">
              MODULE {String(displayNum).padStart(2, "0")}
            </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
