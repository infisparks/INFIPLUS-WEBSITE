"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Building, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { db } from "../lib/firebase";
import { ref, push } from "firebase/database";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [focused, setFocused] = useState<string | null>(null);
  
  // Form states - Only Name, Hospital, Phone (no email)
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await push(ref(db, "submissions"), {
        name,
        hospitalName: address,
        phone,
        type: "Book Demo Modal",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString()
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setAddress("");
        setPhone("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to book demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "920px",
              background: "#FFFFFF",
              borderRadius: "32px",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 60px 150px -20px rgba(0,0,0,0.15)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              overflow: "hidden",
            }}
            className="modal-container"
          >
            {/* Left Side: Info */}
            <div className="modal-left" style={{ padding: "clamp(28px, 4vw, 48px)", background: "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, transparent 100%)", position: "relative" }}>
               <div className="section-badge" style={{ marginBottom: 20, fontSize: "0.7rem", backgroundColor: 'rgba(37, 99, 235, 0.08)' }}>FREE LIVE DEMO</div>
               <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", fontWeight: 800, color: "var(--text-main)", marginBottom: 14, letterSpacing: "-0.04em", lineHeight: 1.15 }}>Experience the <br /> <span className="gradient-text-teal">Future of Healthcare</span></h2>
               <p style={{ color: "var(--text-dim)", fontSize: "clamp(0.8rem, 1.4vw, 0.9rem)", marginBottom: 32, maxWidth: 340, lineHeight: 1.6, fontWeight: 500 }}>
                 Discover how INFIPLUS can automate your hospital, eliminate paperwork, and streamline operations in a 1-on-1 personalized live demo.
               </p>

               <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                 {stats.map(stat => (
                   <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-primary)" }} />
                      <div>
                        <div style={{ color: "var(--text-main)", fontSize: "1.05rem", fontWeight: 700 }}>{stat.value}</div>
                        <div style={{ color: "var(--text-dim)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{stat.label}</div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="modal-right" style={{ padding: "clamp(24px, 4vw, 44px)", borderLeft: "1px solid rgba(0, 0, 0, 0.03)", position: "relative" }}>
               <button 
                 onClick={onClose}
                 aria-label="Close modal"
                 style={{ position: "absolute", top: 20, right: 24, color: "var(--text-muted)", background: "transparent", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                 onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
               >
                 <X size={26} />
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
                     <CheckCircle2 size={30} strokeWidth={3} />
                   </div>
                   <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: 0 }}>
                     Demo Booked Successfully!
                   </h3>
                   <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5, margin: 0 }}>
                     Thank you! Our healthcare specialist will contact you shortly to schedule your personalized live demo.
                   </p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                   <div>
                     <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Book a Free Demo</h3>
                     <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>Fill out this quick form and our team will get in touch.</p>
                   </div>

                   {error && (
                     <div style={{
                       padding: "10px 12px",
                       background: "#FEE2E2",
                       border: "1px solid #FCA5A5",
                       borderRadius: "8px",
                       color: "#B91C1C",
                       fontSize: "13px",
                       fontWeight: 500
                     }}>
                       {error}
                     </div>
                   )}
                   <ModalInput label="Full Name" icon={<User size={18} />} type="text" id="name" placeholder="Dr. / Mr. / Ms. Name" focused={focused==="name"} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} value={name} onChange={(e: any)=>setName(e.target.value)} />
                   <ModalInput label="Hospital / Clinic Name" icon={<Building size={18} />} type="text" id="address" placeholder="e.g. City Hospital, Mumbai" focused={focused==="address"} onFocus={()=>setFocused("address")} onBlur={()=>setFocused(null)} value={address} onChange={(e: any)=>setAddress(e.target.value)} />
                   <ModalInput label="Contact Number (Calling / WhatsApp)" icon={<Phone size={18} />} type="tel" id="phone" placeholder="+91 98765 43210" focused={focused==="phone"} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} value={phone} onChange={(e: any)=>setPhone(e.target.value)} />

                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="glow-btn-primary"
                     style={{ 
                       padding: "14px 24px", 
                       borderRadius: "12px", 
                       border: "none", 
                       background: "#2563EB",
                       color: "#fff", 
                       fontSize: "14px", 
                       fontWeight: 700, 
                       display: "flex", 
                       alignItems: "center", 
                       justifyContent: "center", 
                       gap: 10,
                       marginTop: 8,
                       cursor: "pointer",
                       boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                     }}
                   >
                     {isSubmitting ? "Booking..." : "Book Free Demo"}
                     <ArrowRight size={18} strokeWidth={2.5} />
                   </button>
                 </form>
               )}
            </div>
          </motion.div>
        </div>
      )}
      
      <style jsx>{`
        @media (max-width: 900px) {
          .modal-container {
             grid-template-columns: 1fr !important;
             max-height: 90vh !important;
             overflow-y: auto !important;
             border-radius: 24px !important;
          }
          .modal-left {
             display: none !important;
          }
          .modal-right {
             padding: 28px 20px !important;
             border-left: none !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

function ModalInput({ label, icon, type, id, placeholder, focused, onFocus, onBlur, value, onChange }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: "0.82rem", fontWeight: 600, color: focused ? "#2563EB" : "#374151", transition: "all 0.2s ease" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: focused ? "#2563EB" : "#9CA3AF", transition: "all 0.2s ease", display: "flex", alignItems: "center" }}>{icon}</div>
        <input 
          type={type} 
          id={id} 
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          required
          style={{ 
            width: "100%",
            padding: "0 18px 0 46px", 
            height: "50px", 
            borderRadius: "10px", 
            background: "#F8FAFC", 
            border: `1.5px solid ${focused ? "#2563EB" : "#E2E8F0"}`, 
            color: "#111827", 
            fontSize: "0.95rem", 
            outline: "none", 
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none"
          }} 
        />
      </div>
    </div>
  );
}
