"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Calendar, ArrowRight, ArrowLeft, CheckCircle2,
  Shield, Zap, Sparkles, Clock, Check, User, Building2, Phone,
  ExternalLink, MessageCircle, Video
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { db } from "../lib/firebase";
import { ref, push, update } from "firebase/database";
import { sendBookingWhatsAppNotification } from "../lib/whatsapp";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DaySlot {
  dateStr: string;
  dayName: string;
  dateNum: number;
  monthName: string;
  label: string;
}

// Generate the next 6 available demo dates starting from tomorrow (or today if morning)
function getAvailableDays(): DaySlot[] {
  const days: DaySlot[] = [];
  const base = new Date();
  
  // If it's already late evening, start from tomorrow
  const startOffset = base.getHours() >= 18 ? 1 : 0;

  for (let i = startOffset; days.length < 6; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    const isToday = i === 0;
    const isTomorrow = i === 1;
    const dayName = isToday
      ? "Today"
      : isTomorrow
      ? "Tomorrow"
      : d.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = d.toLocaleDateString("en-US", { month: "short" });
    const dateNum = d.getDate();
    const dateStr = d.toISOString().split("T")[0];
    const label = `${dayName}, ${dateNum} ${monthName}`;

    days.push({
      dateStr,
      dayName,
      dateNum,
      monthName,
      label,
    });
  }
  return days;
}

const TIME_SLOTS = [
  { group: "Morning", slots: ["10:30 AM", "11:30 AM"] },
  { group: "Afternoon", slots: ["02:00 PM", "03:30 PM", "04:45 PM"] },
  { group: "Evening", slots: ["05:30 PM", "06:30 PM", "07:15 PM"] },
];

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  // Wizard steps: 1 = Details, 2 = Pick Slot, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Lead Details
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 2: Slot Selection
  const availableDays = useMemo(() => getAvailableDays(), []);
  const [selectedDay, setSelectedDay] = useState<DaySlot>(availableDays[0]);
  const [selectedTime, setSelectedTime] = useState<string>("02:00 PM");
  const [isBookingSlot, setIsBookingSlot] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState<boolean | null>(null);

  // Reset modal when closed
  const handleModalClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setError(null);
      setWhatsappSent(null);
    }, 300);
  };

  // Step 1: Submit Contact Details -> Save to Firebase -> Go to Slot Picker
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !hospitalName.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Immediately save lead to Firebase RTDB
      const newRef = await push(ref(db, "submissions"), {
        name: name.trim(),
        hospitalName: hospitalName.trim(),
        phone: phone.trim(),
        type: "Book Demo Modal",
        status: "Form Submitted",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString(),
      });

      setSubmissionId(newRef.key);
      setIsSubmitting(false);
      setStep(2); // Proceed to slot picker
    } catch (err: any) {
      console.error("Firebase lead save error:", err);
      setError(err.message || "Failed to submit. Please check connection.");
      setIsSubmitting(false);
    }
  };

  // Step 2: Confirm Meeting Slot -> Update Firebase -> Send WhatsApp -> Step 3
  const handleConfirmMeeting = async () => {
    if (!selectedDay || !selectedTime) {
      setError("Please select both a date and time slot.");
      return;
    }
    setError(null);
    setIsBookingSlot(true);

    try {
      const meetingSlotString = `${selectedDay.label} at ${selectedTime}`;

      // 1. Update the existing lead in Firebase
      if (submissionId) {
        await update(ref(db, `submissions/${submissionId}`), {
          meetingDate: selectedDay.label,
          meetingDateStr: selectedDay.dateStr,
          meetingTime: selectedTime,
          meetingSlot: meetingSlotString,
          meetingType: "Google Meet Walkthrough",
          status: "Meeting Scheduled",
          updatedAt: Date.now(),
        }).catch((err) => console.warn("Update lead warning:", err));
      }

      // 2. Also record in the meetings collection for quick scheduling queries
      await push(ref(db, "meetings"), {
        submissionId: submissionId || "",
        name: name.trim(),
        hospitalName: hospitalName.trim(),
        phone: phone.trim(),
        meetingDate: selectedDay.label,
        meetingDateStr: selectedDay.dateStr,
        meetingTime: selectedTime,
        meetingSlot: meetingSlotString,
        status: "Confirmed",
        timestamp: Date.now(),
        dateString: new Date().toLocaleString(),
      }).catch((err) => console.warn("Push meeting warning:", err));

      // 3. Send automated WhatsApp confirmation directly from client
      const waRes = await sendBookingWhatsAppNotification({
        name: name.trim(),
        hospitalName: hospitalName.trim(),
        phone: phone.trim(),
        meetingDate: selectedDay.label,
        meetingTime: selectedTime,
      });

      setWhatsappSent(waRes.success);
      setIsBookingSlot(false);
      setStep(3); // Success confirmation
    } catch (err: any) {
      console.error("Meeting booking error:", err);
      // Still show confirmation even if network fails
      setIsBookingSlot(false);
      setStep(3);
    }
  };

  // Google Calendar Link generator
  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent(
      `Infiplus Hospital Management ERP Demo - ${hospitalName || "Hospital"}`
    );
    const details = encodeURIComponent(
      `Personalized 1-on-1 Infiplus Hospital Management ERP Software Demo for ${name} (${hospitalName}).\n\nModules covered:\n- Unified OPD & IPD\n- Digital Records & EMR\n- Fast Billing & TPA\n- Real-time Reports & WhatsApp Patient Integration\n\nSpecialist Contact: +91 99583 99157\nWebsite: https://infiplus.in`
    );
    const location = encodeURIComponent("Google Meet (Link sent to WhatsApp)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, hospitalName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleModalClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(6, 11, 39, 0.78)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="book-demo-modal-card"
          >
            {/* ── LEFT COLUMN: BRANDING & PREVIEW (DESKTOP) ── */}
            <div className="modal-visual-column">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  background: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "9999px",
                  color: "#60A5FA",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  alignSelf: "flex-start",
                }}
              >
                <Sparkles size={13} color="#60A5FA" />
                <span>Live Hospital ERP Demo</span>
              </div>

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                See Infiplus Live in Action.
              </h2>

              <p
                style={{
                  fontSize: "12.5px",
                  color: "rgba(255, 255, 255, 0.75)",
                  lineHeight: 1.55,
                  marginBottom: "16px",
                }}
              >
                Direct 1-on-1 walkthrough tailored to your hospital — see OPD, IPD,
                Billing, Pharmacy, EMR &amp; Lab automated in real-time.
              </p>

              {/* Software Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "175px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow:
                    "0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(37, 99, 235, 0.2)",
                  marginBottom: "16px",
                }}
              >
                <Image
                  src="/service/hospital-management-software.webp"
                  alt="Infiplus Hospital Management Software Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {[
                  {
                    icon: <Zap size={14} color="#60A5FA" />,
                    text: "Unified OPD, IPD, Lab & Pharmacy",
                  },
                  {
                    icon: <Shield size={14} color="#34D399" />,
                    text: "Role-Based Doctor & Staff Security",
                  },
                  {
                    icon: <CheckCircle2 size={14} color="#FBBF24" />,
                    text: "Instant WhatsApp Confirmation & Link",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.08)",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN: INTERACTIVE MULTI-STEP WIZARD ── */}
            <div className="modal-form-column">
              {/* Close Button */}
              <button
                onClick={handleModalClose}
                aria-label="Close modal"
                className="modal-close-btn"
              >
                <X size={17} strokeWidth={2.5} />
              </button>

              {/* Progress Stepper Bar */}
              <div className="modal-stepper-header">
                <div className={`step-item ${step >= 1 ? "active" : ""}`}>
                  <div className="step-circle">{step > 1 ? <Check size={12} strokeWidth={3} /> : "1"}</div>
                  <span className="step-label">Your Details</span>
                </div>
                <div className={`step-line ${step >= 2 ? "active" : ""}`} />
                <div className={`step-item ${step >= 2 ? "active" : ""}`}>
                  <div className="step-circle">{step > 2 ? <Check size={12} strokeWidth={3} /> : "2"}</div>
                  <span className="step-label">Pick Slot</span>
                </div>
                <div className={`step-line ${step >= 3 ? "active" : ""}`} />
                <div className={`step-item ${step === 3 ? "active" : ""}`}>
                  <div className="step-circle">{step === 3 ? <Check size={12} strokeWidth={3} /> : "3"}</div>
                  <span className="step-label">Confirmed</span>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  STEP 1: LEAD CONTACT FORM (Name, Hospital Name, Phone)
                 ───────────────────────────────────────────────────────────── */}
              {step === 1 && (
                <form
                  onSubmit={handleStep1Submit}
                  style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 800,
                        color: "#111827",
                        margin: "0 0 3px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Book a Free Live Demo
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "#6B7280", margin: 0 }}>
                      Step 1 of 2: Fill in your details to choose your preferred demo slot.
                    </p>
                  </div>

                  {error && (
                    <div
                      style={{
                        padding: "8px 12px",
                        background: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        borderRadius: "8px",
                        color: "#991B1B",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                      Full Name *
                    </label>
                    <div className="modal-input-wrapper">
                      <User size={15} className="input-icon" />
                      <input
                        type="text"
                        placeholder="Dr. / Mr. / Ms. Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="modal-text-input"
                      />
                    </div>
                  </div>

                  {/* Field 2: Hospital / Clinic Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                      Hospital / Clinic Name *
                    </label>
                    <div className="modal-input-wrapper">
                      <Building2 size={15} className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. City Care Hospital, Mumbai"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="modal-text-input"
                      />
                    </div>
                  </div>

                  {/* Field 3: WhatsApp Contact */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                      Contact Number (WhatsApp) *
                    </label>
                    <div className="modal-input-wrapper">
                      <Phone size={15} className="input-icon" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="modal-text-input"
                      />
                    </div>
                  </div>

                  {/* Feature callout */}
                  <div
                    style={{
                      background: "#EFF6FF",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      color: "#1E40AF",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      border: "1px solid rgba(37, 99, 235, 0.12)",
                      textAlign: "center",
                      marginTop: "2px",
                    }}
                  >
                    <span>✨</span> Personalized 1-on-1 walkthrough — tailored to your workflow
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="modal-primary-btn"
                  >
                    <span>{isSubmitting ? "Saving Details..." : "Continue to Select Slot"}</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.button>

                  {/* Guarantee Note */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      fontSize: "11px",
                      color: "#6B7280",
                      textAlign: "center",
                    }}
                  >
                    <CheckCircle2 size={12} color="#10B981" />
                    <span>Takes 1 minute · Slot confirmed instantly on WhatsApp</span>
                  </div>
                </form>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 2: MEETING BOOK SLOT (Interactive Date & Time Selector)
                 ───────────────────────────────────────────────────────────── */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                  {/* Back button & Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="modal-back-btn"
                      title="Back to contact info"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "#111827",
                          margin: 0,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Select Demo Meeting Slot
                      </h3>
                      <p style={{ fontSize: "11.5px", color: "#6B7280", margin: 0 }}>
                        30-Min screen share for {name} ({hospitalName})
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div
                      style={{
                        padding: "8px 12px",
                        background: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        borderRadius: "8px",
                        color: "#991B1B",
                        fontSize: "12px",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* 1. Date Selector Carousel */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>
                      Select Date
                    </label>
                    <div className="modal-date-picker-grid">
                      {availableDays.map((d) => {
                        const isSelected = selectedDay.dateStr === d.dateStr;
                        return (
                          <button
                            key={d.dateStr}
                            type="button"
                            onClick={() => setSelectedDay(d)}
                            className={`date-chip ${isSelected ? "selected" : ""}`}
                          >
                            <span className="date-chip-day">{d.dayName}</span>
                            <span className="date-chip-num">{d.dateNum}</span>
                            <span className="date-chip-month">{d.monthName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Time Slot Groups */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>
                      Select Time Slot (IST)
                    </label>
                    <div className="time-slots-container">
                      {TIME_SLOTS.map((group) => (
                        <div key={group.group} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" }}>
                            {group.group}
                          </span>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))", gap: "6px" }}>
                            {group.slots.map((slot) => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTime(slot)}
                                  className={`time-chip ${isSelected ? "selected" : ""}`}
                                >
                                  <Clock size={11} />
                                  <span>{slot}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Slot Summary Card */}
                  <div className="modal-slot-summary-box">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="summary-icon-box">
                        <Video size={15} color="#2563EB" />
                      </div>
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#1E3A8A" }}>
                          {selectedDay.label} at {selectedTime}
                        </div>
                        <div style={{ fontSize: "11px", color: "#3B82F6" }}>
                          Online Google Meet Screen-Share · 30 Mins
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <motion.button
                    type="button"
                    disabled={isBookingSlot}
                    onClick={handleConfirmMeeting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="modal-primary-btn"
                  >
                    <span>{isBookingSlot ? "Securing Your Demo Slot..." : "Confirm & Book Slot"}</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.button>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 3: CONFIRMATION & GOOGLE CALENDAR / WHATSAPP ACTIONS
                 ───────────────────────────────────────────────────────────── */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px 4px", gap: "12px", width: "100%" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <CheckCircle2 size={34} strokeWidth={2.5} />
                  </motion.div>

                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                      Demo Slot Confirmed!
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "#4B5563", margin: 0, maxWidth: "340px", lineHeight: 1.5 }}>
                      Thank you, <strong>{name}</strong>! Your personalized 1-on-1 walkthrough for <strong>{hospitalName}</strong> is confirmed.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div
                    style={{
                      width: "100%",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#64748B", fontWeight: 500 }}>Date &amp; Time:</span>
                      <strong style={{ color: "#0F172A" }}>{selectedDay.label} · {selectedTime}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#64748B", fontWeight: 500 }}>Hospital:</span>
                      <strong style={{ color: "#0F172A" }}>{hospitalName}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#64748B", fontWeight: 500 }}>Mode:</span>
                      <strong style={{ color: "#2563EB" }}>Google Meet Screen-Share</strong>
                    </div>

                    {/* WhatsApp Status Pill */}
                    <div
                      style={{
                        marginTop: "4px",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        background: "#ECFDF5",
                        border: "1px solid #A7F3D0",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11px",
                        color: "#065F46",
                        fontWeight: 600,
                      }}
                    >
                      <MessageCircle size={13} color="#059669" />
                      <span>
                        {whatsappSent === false
                          ? "Booking saved! Specialist will connect shortly."
                          : `Confirmation & details sent to WhatsApp (${phone})`}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginTop: "4px" }}>
                    {/* Add to Google Calendar */}
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-secondary-btn"
                      style={{ textDecoration: "none" }}
                    >
                      <Calendar size={14} color="#2563EB" />
                      <span>Add to Google Calendar</span>
                      <ExternalLink size={12} color="#64748B" />
                    </a>

                    {/* Chat directly on WhatsApp */}
                    <a
                      href={`https://wa.me/919958399157?text=${encodeURIComponent(`Hi, I just booked a demo slot for ${hospitalName} on ${selectedDay.label} at ${selectedTime}. Please confirm.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-secondary-btn"
                      style={{ textDecoration: "none" }}
                    >
                      <MessageCircle size={14} color="#10B981" />
                      <span>Connect with Specialist on WhatsApp</span>
                    </a>

                    {/* Close Done */}
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="modal-primary-btn"
                      style={{ marginTop: "4px" }}
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .book-demo-modal-card {
          position: relative;
          width: 100%;
          max-width: 890px;
          background: #FFFFFF;
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.45);
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          overflow: hidden;
          max-height: 94vh;
        }

        .modal-visual-column {
          padding: 30px 26px;
          background: linear-gradient(180deg, #060B27 0%, #0B1340 100%);
          position: relative;
          display: flex;
          flex-direction: column;
          justifyContent: center;
        }

        .modal-form-column {
          padding: 26px 26px;
          position: relative;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          justifyContent: flex-start;
          overflow-y: auto;
          max-height: 94vh;
        }

        .modal-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4B5563;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .modal-close-btn:hover {
          background: #E5E7EB;
          color: #111827;
        }

        /* Stepper header */
        .modal-stepper-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #F1F5F9;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94A3B8;
          font-size: 11.5px;
          font-weight: 600;
        }
        .step-item.active {
          color: #2563EB;
        }

        .step-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .step-item.active .step-circle {
          background: #2563EB;
          color: #FFFFFF;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: #E2E8F0;
          margin: 0 8px;
          transition: all 0.2s ease;
        }
        .step-line.active {
          background: #2563EB;
        }

        /* Form Inputs */
        .modal-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
          pointer-events: none;
        }

        .modal-text-input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          font-size: 13.5px;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          outline: none;
          color: #111827;
          background: #F8FAFC;
          transition: all 0.2s ease;
        }
        .modal-text-input:focus {
          border-color: #2563EB;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        /* Date Picker Grid */
        .modal-date-picker-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
          width: 100%;
        }

        .date-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 4px;
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          background: #F8FAFC;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .date-chip:hover {
          border-color: #93C5FD;
          background: #EFF6FF;
        }
        .date-chip.selected {
          border-color: #2563EB;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .date-chip-day {
          font-size: 10px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
        }
        .date-chip.selected .date-chip-day {
          color: rgba(255, 255, 255, 0.85);
        }

        .date-chip-num {
          font-size: 15px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.1;
          margin: 2px 0;
        }
        .date-chip.selected .date-chip-num {
          color: #FFFFFF;
        }

        .date-chip-month {
          font-size: 9.5px;
          font-weight: 600;
          color: #64748B;
        }
        .date-chip.selected .date-chip-month {
          color: rgba(255, 255, 255, 0.85);
        }

        /* Time Slots */
        .time-slots-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .time-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 8px;
          border-radius: 8px;
          border: 1.5px solid #E2E8F0;
          background: #F8FAFC;
          font-size: 11.5px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .time-chip:hover {
          border-color: #93C5FD;
          background: #EFF6FF;
          color: #1D4ED8;
        }
        .time-chip.selected {
          border-color: #2563EB;
          background: #2563EB;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
        }

        /* Slot Summary Box */
        .modal-slot-summary-box {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 10px;
          padding: 9px 12px;
        }
        .summary-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Back Button */
        .modal-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 8px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          font-size: 11.5px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-back-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        /* Buttons */
        .modal-primary-btn {
          width: 100%;
          padding: 12px 20px;
          border-radius: 11px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          transition: all 0.2s ease;
        }
        .modal-primary-btn:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .modal-secondary-btn {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          background: #FFFFFF;
          color: #1E293B;
          font-weight: 600;
          font-size: 12.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .modal-secondary-btn:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        /* ── MOBILE RESPONSIVENESS ── */
        @media (max-width: 860px) {
          .book-demo-modal-card {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            border-radius: 18px !important;
          }
          .modal-visual-column {
            display: none !important;
          }
          .modal-form-column {
            padding: 20px 16px 22px !important;
          }
          .step-label {
            display: none !important;
          }
          .modal-date-picker-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
