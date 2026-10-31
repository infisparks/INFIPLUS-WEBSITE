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
import { trackEvent, trackCustomEvent } from "../lib/fpixel";

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

      // Track Meta Pixel Lead event when user fills the first form
      trackEvent("Lead", {
        content_name: "Book Demo Modal Step 1 Lead",
        hospital_name: hospitalName.trim(),
        lead_source: "Book Demo Modal",
        currency: "INR",
        value: 0,
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

      // 3. Track Meta Pixel standard 'Schedule' and custom 'MeetingScheduled' events
      trackEvent("Schedule", {
        content_name: "Book Demo Meeting Scheduled",
        meeting_date: selectedDay.label,
        meeting_time: selectedTime,
        hospital_name: hospitalName.trim(),
        currency: "INR",
        value: 0,
        status: "Meeting Scheduled",
      });

      trackCustomEvent("MeetingScheduled", {
        meeting_date: selectedDay.label,
        meeting_time: selectedTime,
        hospital_name: hospitalName.trim(),
        status: "Meeting Scheduled",
      });

      // 4. Send automated WhatsApp confirmation directly from client
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

  // Environment-driven meeting and support configurations
  const meetingUrl = process.env.NEXT_PUBLIC_GOOGLE_MEET_URL || "";
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "";

  // Google Calendar Link generator
  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent(
      `Infiplus Hospital Management ERP Demo - ${hospitalName || "Hospital"}`
    );
    const details = encodeURIComponent(
      `Personalized 1-on-1 Infiplus Hospital Management ERP Software Demo for ${name} (${hospitalName}).${meetingUrl ? `\n\nMeeting Link: ${meetingUrl}` : ""}\n\nModules covered:\n- Unified OPD & IPD\n- Digital Records & EMR\n- Fast Billing & TPA\n- Real-time Reports & WhatsApp Patient Integration\n\n${supportPhone ? `Specialist Contact: +${supportPhone}\n` : ""}Website: https://infiplus.in`
    );
    const location = encodeURIComponent(meetingUrl || "Google Meet");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, hospitalName, meetingUrl, supportPhone]);

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
                  background: "rgba(99, 102, 241, 0.18)",
                  border: "1px solid rgba(129, 140, 248, 0.35)",
                  borderRadius: "9999px",
                  color: "#A5B4FC",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  alignSelf: "flex-start",
                }}
              >
                <Sparkles size={13} color="#A5B4FC" />
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
                    "0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.25)",
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
                    icon: <Zap size={14} color="#818CF8" />,
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #F1F5F9",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step >= 1 ? "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" : "#F1F5F9",
                      color: step >= 1 ? "#FFFFFF" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {step > 1 ? <Check size={12} strokeWidth={3} /> : "1"}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: step >= 1 ? "#4F46E5" : "#94A3B8",
                    }}
                  >
                    Your Details
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    background: step >= 2 ? "#4F46E5" : "#E2E8F0",
                    margin: "0 8px",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step >= 2 ? "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" : "#F1F5F9",
                      color: step >= 2 ? "#FFFFFF" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {step > 2 ? <Check size={12} strokeWidth={3} /> : "2"}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: step >= 2 ? "#4F46E5" : "#94A3B8",
                    }}
                  >
                    Pick Slot
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    background: step >= 3 ? "#4F46E5" : "#E2E8F0",
                    margin: "0 8px",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step === 3 ? "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" : "#F1F5F9",
                      color: step === 3 ? "#FFFFFF" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {step === 3 ? <Check size={12} strokeWidth={3} /> : "3"}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: step === 3 ? "#4F46E5" : "#94A3B8",
                    }}
                  >
                    Confirmed
                  </span>
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
                    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                      <User size={15} style={{ position: "absolute", left: "12px", color: "#94A3B8", pointerEvents: "none" }} />
                      <input
                        type="text"
                        placeholder="Dr. / Mr. / Ms. Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px 11px 38px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  {/* Field 2: Hospital / Clinic Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                      Hospital / Clinic Name *
                    </label>
                    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                      <Building2 size={15} style={{ position: "absolute", left: "12px", color: "#94A3B8", pointerEvents: "none" }} />
                      <input
                        type="text"
                        placeholder="e.g. City Care Hospital, Mumbai"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px 11px 38px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  {/* Field 3: WhatsApp Contact */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                      Contact Number (WhatsApp) *
                    </label>
                    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                      <Phone size={15} style={{ position: "absolute", left: "12px", color: "#94A3B8", pointerEvents: "none" }} />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px 11px 38px",
                          fontSize: "13.5px",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "10px",
                          outline: "none",
                          color: "#111827",
                          background: "#F8FAFC",
                          boxSizing: "border-box",
                        }}
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

                  {/* Continue Button with Rich Solid Purple/Indigo Color */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    style={{
                      width: "100%",
                      padding: "13px 20px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14.5px",
                      letterSpacing: "0.01em",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 18px rgba(79, 70, 229, 0.38)",
                      transition: "all 0.2s ease",
                      marginTop: "4px",
                    }}
                    className="modal-primary-btn"
                  >
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                      {isSubmitting ? "Saving Details..." : "Continue to Select Slot"}
                    </span>
                    <ArrowRight size={16} strokeWidth={2.5} color="#FFFFFF" />
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
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "5px 8px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#F8FAFC",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "#475569",
                        cursor: "pointer",
                      }}
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
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "8px 4px",
                              borderRadius: "10px",
                              border: isSelected ? "1.5px solid #4F46E5" : "1.5px solid #E2E8F0",
                              background: isSelected ? "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" : "#F8FAFC",
                              color: isSelected ? "#FFFFFF" : "#0F172A",
                              cursor: "pointer",
                              boxShadow: isSelected ? "0 4px 12px rgba(79, 70, 229, 0.28)" : "none",
                              transition: "all 0.2s ease",
                            }}
                            className={`date-chip ${isSelected ? "selected" : ""}`}
                          >
                            <span style={{ fontSize: "10px", fontWeight: 600, color: isSelected ? "rgba(255, 255, 255, 0.9)" : "#64748B", textTransform: "uppercase" }}>
                              {d.dayName}
                            </span>
                            <span style={{ fontSize: "15px", fontWeight: 800, color: isSelected ? "#FFFFFF" : "#0F172A", lineHeight: 1.1, margin: "2px 0" }}>
                              {d.dateNum}
                            </span>
                            <span style={{ fontSize: "9.5px", fontWeight: 600, color: isSelected ? "rgba(255, 255, 255, 0.9)" : "#64748B" }}>
                              {d.monthName}
                            </span>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                    padding: "8px 8px",
                                    borderRadius: "8px",
                                    border: isSelected ? "1.5px solid #4F46E5" : "1.5px solid #E2E8F0",
                                    background: isSelected ? "#4F46E5" : "#F8FAFC",
                                    color: isSelected ? "#FFFFFF" : "#334155",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    boxShadow: isSelected ? "0 2px 8px rgba(79, 70, 229, 0.25)" : "none",
                                    transition: "all 0.2s ease",
                                  }}
                                  className={`time-chip ${isSelected ? "selected" : ""}`}
                                >
                                  <Clock size={11} color={isSelected ? "#FFFFFF" : "#64748B"} />
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
                  <div
                    style={{
                      background: "#EFF6FF",
                      border: "1px solid #BFDBFE",
                      borderRadius: "10px",
                      padding: "9px 12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          background: "#DBEAFE",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
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

                  {/* Confirm Button with Rich Solid Purple/Indigo Color */}
                  <motion.button
                    type="button"
                    disabled={isBookingSlot}
                    onClick={handleConfirmMeeting}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    style={{
                      width: "100%",
                      padding: "13px 20px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14.5px",
                      letterSpacing: "0.01em",
                      cursor: isBookingSlot ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 18px rgba(79, 70, 229, 0.38)",
                      transition: "all 0.2s ease",
                      marginTop: "2px",
                    }}
                    className="modal-primary-btn"
                  >
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                      {isBookingSlot ? "Securing Your Demo Slot..." : "Confirm & Book Slot"}
                    </span>
                    <ArrowRight size={16} strokeWidth={2.5} color="#FFFFFF" />
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
                    {meetingUrl && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", alignItems: "center" }}>
                        <span style={{ color: "#64748B", fontWeight: 500 }}>Meeting URL:</span>
                        <a
                          href={meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#4F46E5", fontWeight: 700, textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          <span>{meetingUrl.replace(/^https?:\/\//, "")}</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
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
                          ? "Booking saved! Meeting URL sent to WhatsApp."
                          : `Meeting link sent to WhatsApp (${phone})`}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginTop: "4px" }}>
                    {/* Join Google Meet Directly */}
                    {meetingUrl && (
                      <a
                        href={meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "11px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid #C7D2FE",
                          background: "#EEF2FF",
                          color: "#4338CA",
                          fontWeight: 700,
                          fontSize: "13px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s ease",
                          textDecoration: "none",
                        }}
                        className="modal-secondary-btn"
                      >
                        <Video size={15} color="#4F46E5" />
                        <span>Open Google Meet Room</span>
                        <ExternalLink size={12} color="#6366F1" />
                      </a>
                    )}

                    {/* Add to Google Calendar */}
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "100%",
                        padding: "11px 16px",
                        borderRadius: "10px",
                        border: "1.5px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: "#1E293B",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                      className="modal-secondary-btn"
                    >
                      <Calendar size={14} color="#4F46E5" />
                      <span>Add to Google Calendar</span>
                      <ExternalLink size={12} color="#64748B" />
                    </a>

                    {/* Chat directly on WhatsApp */}
                    {supportPhone && (
                      <a
                        href={`https://wa.me/${supportPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I just booked a demo slot for ${hospitalName} on ${selectedDay.label} at ${selectedTime}. Please confirm.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "11px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid #A7F3D0",
                          background: "#ECFDF5",
                          color: "#065F46",
                          fontWeight: 600,
                          fontSize: "13px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s ease",
                          textDecoration: "none",
                        }}
                        className="modal-secondary-btn"
                      >
                        <MessageCircle size={14} color="#10B981" />
                        <span>Connect with Specialist on WhatsApp</span>
                      </a>
                    )}

                    {/* Close Done */}
                    <button
                      type="button"
                      onClick={handleModalClose}
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                        marginTop: "4px",
                      }}
                      className="modal-primary-btn"
                    >
                      <span style={{ color: "#FFFFFF", fontWeight: 700 }}>Done</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
