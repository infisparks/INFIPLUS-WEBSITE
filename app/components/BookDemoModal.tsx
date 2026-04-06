"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, Building, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [focused, setFocused] = useState<string | null>(null);

  const stats = [
    { label: "Implementation", value: "3-5 Days" },
    { label: "Data Import", value: "100% Free" },
    { label: "Training", value: "Hands-on" },
  ];

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
            padding: "20px",
            background: "rgba(2, 6, 23, 0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "920px",
              background: "rgba(10, 16, 32, 0.98)",
              borderRadius: "40px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 60px 180px rgba(0,0,0,0.9)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              overflow: "hidden",
            }}
            className="modal-container"
          >
            {/* Left Side: Info */}
            <div className="modal-left" style={{ padding: "60px", background: "linear-gradient(135deg, rgba(79, 140, 255, 0.08) 0%, transparent 100%)", position: "relative" }}>
               <div className="section-badge" style={{ marginBottom: 24, fontSize: "0.75rem" }}>PRIVATE ACCESS</div>
               <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-0.04em", lineHeight: 1.1 }}>Step into the <br /> <span className="gradient-text-vivid">Future of Healthcare</span></h2>
               <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", marginBottom: 48, maxWidth: 360, lineHeight: 1.6 }}>
                 Discover how INFIPLUS can automate your hospital, eliminate paperwork, and improve your patient outcomes in one visit.
               </p>

               <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                 {stats.map(stat => (
                   <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-primary)" }} />
                      <div>
                        <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700 }}>{stat.value}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{stat.label}</div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="modal-right" style={{ padding: "60px", borderLeft: "1px solid rgba(255, 255, 255, 0.05)", position: "relative" }}>
               <button 
                 onClick={onClose}
                 style={{ position: "absolute", top: 24, right: 30, color: "rgba(255,255,255,0.3)", background: "transparent", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                 onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
               >
                 <X size={28} />
               </button>

               <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                 <ModalInput label="Full Name" icon={<User size={18} />} type="text" id="name" placeholder="John Doe" focused={focused==="name"} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} />
                 <ModalInput label="Hospital Address" icon={<Building size={18} />} type="text" id="address" placeholder="Mumbai, MH" focused={focused==="address"} onFocus={()=>setFocused("address")} onBlur={()=>setFocused(null)} />
                 <ModalInput label="Contact Number" icon={<Mail size={18} />} type="text" id="phone" placeholder="+91 XXXX XXXX XXX" focused={focused==="phone"} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} />

                 <button
                   className="glow-btn-primary"
                   style={{ 
                     padding: "18px", 
                     borderRadius: "50px", 
                     border: "none", 
                     color: "#fff", 
                     fontSize: "1rem", 
                     fontWeight: 700, 
                     display: "flex", 
                     alignItems: "center", 
                     justifyContent: "center", 
                     gap: 12,
                     marginTop: 15,
                     cursor: "pointer"
                   }}
                 >
                   Get My Private Tour
                   <ArrowRight size={20} />
                 </button>
               </form>
            </div>
          </motion.div>
        </div>
      )}
      
      <style jsx>{`
        @media (max-width: 900px) {
          .modal-container {
             grid-template-columns: 1fr !important;
             max-height: 85vh !important;
             overflow-y: auto !important;
             border-radius: 32px !important;
          }
          .modal-left {
             padding: 40px !important;
             display: none !important; /* Hide left side on smaller portrait mobiles if too cramped, or keep it */
          }
          .modal-right {
             padding: 40px !important;
             border-left: none !important;
          }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
    </AnimatePresence>
  );
}

function ModalInput({ label, icon, type, id, placeholder, focused, onFocus, onBlur }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label htmlFor={id} style={{ fontSize: "0.85rem", fontWeight: 600, color: focused ? "var(--color-primary)" : "var(--text-muted)", transition: "all 0.3s ease" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", color: focused ? "var(--color-primary)" : "var(--text-muted)", transition: "all 0.3s ease" }}>{icon}</div>
        <input 
          type={type} 
          id={id} 
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ 
            width: "100%",
            padding: "0 24px 0 60px", 
            height: "64px", 
            borderRadius: "20px", 
            background: "rgba(255,255,255,0.03)", 
            border: `1px solid ${focused ? "var(--color-primary)" : "rgba(255,255,255,0.08)"}`, 
            color: "#fff", 
            fontSize: "1.05rem", 
            outline: "none", 
            transition: "all 0.3s ease",
            boxShadow: focused ? "0 0 24px rgba(79, 140, 255, 0.12)" : "none"
          }} 
        />
      </div>
    </div>
  );
}
