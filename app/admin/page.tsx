"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { ref, onValue, remove } from "firebase/database";
import { 
  Search, Trash2, Eye, Download, Users, Phone, Building, 
  FileText, Calendar, X, ExternalLink, Inbox, MessageCircle, PhoneCall, Sparkles
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email?: string;
  hospitalName?: string;
  beds?: string;
  address?: string;
  phone?: string;
  message?: string;
  type: string;
  timestamp: number;
  dateString: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  useEffect(() => {
    const submissionsRef = ref(db, "submissions");
    const unsubscribe = onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: Submission[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        // Sort newest first
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setSubmissions(list);
      } else {
        setSubmissions([]);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firebase error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        await remove(ref(db, `submissions/${id}`));
        if (selectedSub?.id === id) {
          setSelectedSub(null);
        }
      } catch (err) {
        alert("Failed to delete submission.");
      }
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) return;
    
    const headers = [
      "Date", 
      "Source Form", 
      "Lead Name", 
      "Hospital / Clinic Name", 
      "Phone / WhatsApp", 
      "Email", 
      "Message / Query", 
      "Beds (Legacy)", 
      "Address (Legacy)"
    ];

    const rows = filteredSubmissions.map(sub => [
      sub.dateString || new Date(sub.timestamp).toLocaleString(),
      sub.type,
      sub.name,
      sub.hospitalName || "",
      sub.phone || "",
      sub.email || "",
      (sub.message || "").replace(/,/g, " ").replace(/\n/g, " "),
      sub.beds || "",
      sub.address || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `infiplus_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredSubmissions = submissions.filter(sub => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (sub.name && sub.name.toLowerCase().includes(term)) ||
      (sub.hospitalName && sub.hospitalName.toLowerCase().includes(term)) ||
      (sub.phone && sub.phone.includes(term)) ||
      (sub.email && sub.email.toLowerCase().includes(term));

    let matchesType = true;
    if (filterType !== "All") {
      if (filterType === "Book Demo") {
        matchesType = sub.type === "Book Demo" || sub.type === "Free Trial";
      } else {
        matchesType = sub.type === filterType;
      }
    }

    return matchesSearch && matchesType;
  });

  // KPI count helpers
  const heroDemoCount = submissions.filter(s => s.type === "Book Demo" || s.type === "Free Trial").length;
  const modalDemoCount = submissions.filter(s => s.type === "Book Demo Modal").length;
  const contactFooterCount = submissions.filter(s => s.type === "Contact Footer").length;

  // Avatar generator (Initials)
  const getInitials = (name?: string) => {
    if (!name) return "L";
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Badge config
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Book Demo":
        return { label: "Hero Demo", bg: "#EEF2FF", color: "#4F46E5", border: "#C7D2FE" };
      case "Book Demo Modal":
        return { label: "Modal Demo", bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" };
      case "Contact Footer":
        return { label: "Footer Contact", bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" };
      case "Free Trial":
        return { label: "Free Trial (Legacy)", bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" };
      default:
        return { label: type || "Lead", bg: "#F3F4F6", color: "#4B5563", border: "#E5E7EB" };
    }
  };

  // WhatsApp link generator
  const getWhatsAppUrl = (phone?: string, name?: string, hospitalName?: string) => {
    if (!phone) return "";
    const cleanNum = phone.replace(/\D/g, "");
    const formatted = cleanNum.length === 10 ? `91${cleanNum}` : cleanNum;
    const greeting = name ? `Hi ${name}` : "Hello";
    const hospitalPart = hospitalName ? ` for ${hospitalName}` : "";
    const msg = encodeURIComponent(`${greeting}, thank you for requesting an Infiplus Hospital ERP demo${hospitalPart}. When would be a convenient time to connect?`);
    return `https://wa.me/${formatted}?text=${msg}`;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "360px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "36px",
            height: "36px",
            border: "3px solid #E5E7EB",
            borderTop: "3px solid #4F46E5",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 12px"
          }} />
          <style jsx global>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ color: "#6B7280", fontSize: "14px", fontWeight: 500 }}>Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Page Title & Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#111827", margin: 0, letterSpacing: "-0.01em" }}>
              Leads & Demo Requests
            </h1>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 600,
              background: "#ECFDF5",
              color: "#059669",
              border: "1px solid #A7F3D0"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
              Live Sync
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
            Unified lead tracker for Hero Form, Demo Popup Modal, and Footer Inquiries (Name, Hospital, Phone).
          </p>
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={filteredSubmissions.length === 0}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: filteredSubmissions.length === 0 ? "#E5E7EB" : "#4F46E5",
            color: filteredSubmissions.length === 0 ? "#9CA3AF" : "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: filteredSubmissions.length === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            if (filteredSubmissions.length > 0) e.currentTarget.style.background = "#4338CA";
          }}
          onMouseLeave={(e) => {
            if (filteredSubmissions.length > 0) e.currentTarget.style.background = "#4F46E5";
          }}
        >
          <Download size={15} />
          <span>Export CSV ({filteredSubmissions.length})</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "16px"
      }}>
        {[
          { title: "Total Submissions", value: submissions.length, icon: <Users size={20} />, color: "#4F46E5", bg: "#EEF2FF" },
          { title: "Hero Demo Form", value: heroDemoCount, icon: <Sparkles size={20} />, color: "#6366F1", bg: "#F5F3FF" },
          { title: "Modal Popup Demo", value: modalDemoCount, icon: <Calendar size={20} />, color: "#D97706", bg: "#FFFBEB" },
          { title: "Footer Contact", value: contactFooterCount, icon: <FileText size={20} />, color: "#2563EB", bg: "#EFF6FF" }
        ].map((kpi, idx) => (
          <div key={idx} style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}>
            <div>
              <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 600 }}>{kpi.title}</span>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: "4px 0 0" }}>{kpi.value}</h3>
            </div>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: kpi.bg,
              color: kpi.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Controls: Search & Filter */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        padding: "14px 16px",
        display: "flex",
        gap: "14px",
        flexWrap: "wrap",
        alignItems: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search by name, hospital/clinic, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px 9px 36px",
              fontSize: "13px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              color: "#111827",
              background: "#F9FAFB",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Filter Type */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>Form Source:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "9px 14px",
              fontSize: "13px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              background: "#FFFFFF",
              color: "#111827",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            <option value="All">All Form Sources ({submissions.length})</option>
            <option value="Book Demo">Hero Demo Form ({heroDemoCount})</option>
            <option value="Book Demo Modal">Modal Popup Form ({modalDemoCount})</option>
            <option value="Contact Footer">Footer Contact Form ({contactFooterCount})</option>
          </select>
        </div>
      </div>

      {/* Submissions Container */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        overflow: "hidden"
      }}>
        {filteredSubmissions.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center", color: "#6B7280" }}>
            <Inbox size={42} style={{ margin: "0 auto 12px", color: "#9CA3AF" }} />
            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: "0 0 4px" }}>No submissions found</h4>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              {searchTerm ? "No results match your search query." : "No leads have been received for this filter."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", color: "#4B5563" }}>
                    <th style={{ padding: "14px 18px", fontWeight: 600 }}>Lead Contact</th>
                    <th style={{ padding: "14px 18px", fontWeight: 600 }}>Hospital / Clinic</th>
                    <th style={{ padding: "14px 18px", fontWeight: 600 }}>Source</th>
                    <th style={{ padding: "14px 18px", fontWeight: 600 }}>Contact Details</th>
                    <th style={{ padding: "14px 18px", fontWeight: 600 }}>Received At</th>
                    <th style={{ padding: "14px 18px", fontWeight: 600, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub) => {
                    const badge = getTypeBadge(sub.type);
                    const whatsappUrl = getWhatsAppUrl(sub.phone, sub.name, sub.hospitalName);
                    
                    return (
                      <tr key={sub.id} style={{ borderBottom: "1px solid #E5E7EB", transition: "background 0.15s" }} className="table-row">
                        {/* Lead Info */}
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              background: badge.bg,
                              color: badge.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: 700,
                              flexShrink: 0
                            }}>
                              {getInitials(sub.name)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#111827" }}>{sub.name}</div>
                              {sub.email && (
                                <div style={{ fontSize: "12px", color: "#6B7280" }}>{sub.email}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Hospital / Clinic */}
                        <td style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Building size={14} style={{ color: "#6B7280", flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, color: "#1F2937" }}>
                              {sub.hospitalName || "Not specified"}
                            </span>
                          </div>
                        </td>

                        {/* Source Badge */}
                        <td style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                          <span style={{
                            display: "inline-flex",
                            padding: "3px 9px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: 600,
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`
                          }}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Contact details */}
                        <td style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                          {sub.phone ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <a
                                href={`tel:${sub.phone}`}
                                style={{
                                  color: "#111827",
                                  fontWeight: 600,
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                <Phone size={13} style={{ color: "#4F46E5" }} />
                                <span>{sub.phone}</span>
                              </a>
                              {whatsappUrl && (
                                <a
                                  href={whatsappUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat on WhatsApp"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    background: "#DCFCE7",
                                    color: "#15803D",
                                    textDecoration: "none"
                                  }}
                                >
                                  <MessageCircle size={13} />
                                </a>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: "#9CA3AF" }}>—</span>
                          )}
                          {sub.message && (
                            <div style={{
                              fontSize: "11px",
                              color: "#6B7280",
                              marginTop: "4px",
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}>
                              Query: {sub.message}
                            </div>
                          )}
                        </td>

                        {/* Date */}
                        <td style={{ padding: "14px 18px", color: "#6B7280", verticalAlign: "middle" }}>
                          <div>{sub.dateString ? sub.dateString.split(",")[0] : new Date(sub.timestamp).toLocaleDateString()}</div>
                          <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                            {sub.dateString ? sub.dateString.split(",")[1]?.trim() : new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "14px 18px", textAlign: "right", verticalAlign: "middle" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  border: "none",
                                  background: "#ECFDF5",
                                  color: "#059669",
                                  padding: "7px",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textDecoration: "none"
                                }}
                              >
                                <MessageCircle size={15} />
                              </a>
                            )}
                            <button
                              onClick={() => setSelectedSub(sub)}
                              title="View full details"
                              style={{
                                border: "none",
                                background: "#F3F4F6",
                                color: "#4B5563",
                                padding: "7px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s"
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E7EB"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(sub.id)}
                              title="Delete lead"
                              style={{
                                border: "none",
                                background: "#FEF2F2",
                                color: "#EF4444",
                                padding: "7px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s"
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* CSS styles to add row hover and hide desktop table on mobile */}
            <style jsx global>{`
              .table-row:hover {
                background: #F9FAFB;
              }
              @media (max-width: 840px) {
                .table-responsive {
                  display: none !important;
                }
                .mobile-cards {
                  display: flex !important;
                }
              }
            `}</style>

            {/* Mobile Cards View */}
            <div className="mobile-cards" style={{ display: "none", padding: "14px", flexDirection: "column", gap: "12px" }}>
              {filteredSubmissions.map((sub) => {
                const badge = getTypeBadge(sub.type);
                const whatsappUrl = getWhatsAppUrl(sub.phone, sub.name, sub.hospitalName);

                return (
                  <div key={sub.id} style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
                  }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: badge.bg,
                          color: badge.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700
                        }}>
                          {getInitials(sub.name)}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#111827" }}>{sub.name}</h4>
                          <span style={{ fontSize: "12px", color: "#6B7280", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                            <Building size={12} />
                            {sub.hospitalName || "Not specified"}
                          </span>
                        </div>
                      </div>

                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontWeight: 600,
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                        whiteSpace: "nowrap"
                      }}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Contact Action Bar */}
                    {sub.phone && (
                      <div style={{
                        background: "#F9FAFB",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #E5E7EB"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Phone size={13} style={{ color: "#4F46E5" }} />
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{sub.phone}</span>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <a
                            href={`tel:${sub.phone}`}
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              background: "#EEF2FF",
                              color: "#4F46E5",
                              fontSize: "12px",
                              fontWeight: 600,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            <PhoneCall size={12} />
                            Call
                          </a>
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: "4px 10px",
                                borderRadius: "6px",
                                background: "#DCFCE7",
                                color: "#15803D",
                                fontSize: "12px",
                                fontWeight: 600,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                            >
                              <MessageCircle size={12} />
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Query if present */}
                    {sub.message && (
                      <div style={{ fontSize: "12px", color: "#4B5563", background: "#F9FAFB", padding: "8px 10px", borderRadius: "6px" }}>
                        <strong style={{ color: "#111827" }}>Query:</strong> {sub.message}
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: "10px" }}>
                      <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                        {sub.dateString || new Date(sub.timestamp).toLocaleString()}
                      </span>
                      
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => setSelectedSub(sub)}
                          style={{
                            border: "none",
                            background: "#F3F4F6",
                            color: "#4B5563",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <Eye size={13} />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          style={{
                            border: "none",
                            background: "#FEF2F2",
                            color: "#EF4444",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Details View Modal */}
      {selectedSub && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          zIndex: 1000,
          fontFamily: "Inter, sans-serif"
        }}
        onClick={() => setSelectedSub(null)}
        >
          <div style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            width: "100%",
            maxWidth: "520px",
            overflow: "hidden"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: "18px 22px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Lead Submission Details</h3>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Full profile of the demo inquiry</span>
              </div>
              <button 
                onClick={() => setSelectedSub(null)}
                style={{ background: "transparent", border: "none", color: "#6B7280", cursor: "pointer", display: "flex", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Lead Highlight Header */}
              {(() => {
                const badge = getTypeBadge(selectedSub.type);
                const whatsappUrl = getWhatsAppUrl(selectedSub.phone, selectedSub.name, selectedSub.hospitalName);

                return (
                  <>
                    <div style={{
                      padding: "16px",
                      background: "#F9FAFB",
                      borderRadius: "10px",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          background: badge.bg,
                          color: badge.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          fontWeight: 700
                        }}>
                          {getInitials(selectedSub.name)}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                            {selectedSub.name}
                          </h4>
                          <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                            <Building size={13} />
                            {selectedSub.hospitalName || "Hospital Not Specified"}
                          </span>
                        </div>
                      </div>

                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`
                      }}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Quick Reach Out Bar */}
                    {selectedSub.phone && (
                      <div style={{
                        display: "flex",
                        gap: "10px",
                        padding: "12px 14px",
                        background: "#EEF2FF",
                        borderRadius: "8px",
                        border: "1px solid #C7D2FE",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <div>
                          <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: 600, textTransform: "uppercase" }}>Direct Contact</div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1E1B4B" }}>{selectedSub.phone}</div>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <a
                            href={`tel:${selectedSub.phone}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "7px 12px",
                              borderRadius: "6px",
                              background: "#4F46E5",
                              color: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: 600,
                              textDecoration: "none"
                            }}
                          >
                            <PhoneCall size={13} />
                            Call Now
                          </a>
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "7px 12px",
                                borderRadius: "6px",
                                background: "#16A34A",
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: 600,
                                textDecoration: "none"
                              }}
                            >
                              <MessageCircle size={13} />
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Detail Fields Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "14px"
                    }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Full Name</span>
                        <span style={{ fontSize: "14px", color: "#111827", fontWeight: 600 }}>{selectedSub.name}</span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Hospital / Clinic</span>
                        <span style={{ fontSize: "14px", color: "#111827", fontWeight: 600 }}>{selectedSub.hospitalName || "—"}</span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Phone Number</span>
                        <span style={{ fontSize: "14px", color: "#111827", fontWeight: 600 }}>{selectedSub.phone || "—"}</span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Received Date</span>
                        <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500 }}>
                          {selectedSub.dateString || new Date(selectedSub.timestamp).toLocaleString()}
                        </span>
                      </div>

                      {selectedSub.email && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Email Address</span>
                          <span style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>
                            <a href={`mailto:${selectedSub.email}`} style={{ color: "#4F46E5", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              {selectedSub.email}
                              <ExternalLink size={12} />
                            </a>
                          </span>
                        </div>
                      )}

                      {selectedSub.beds && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Number of Beds</span>
                          <span style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>{selectedSub.beds}</span>
                        </div>
                      )}

                      {selectedSub.address && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "1 / -1" }}>
                          <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Hospital Address</span>
                          <span style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>{selectedSub.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Query Message */}
                    {selectedSub.message && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Message / Special Requests</span>
                        <div style={{
                          padding: "12px",
                          background: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          fontSize: "13px",
                          color: "#111827",
                          lineHeight: 1.5,
                          whiteSpace: "pre-wrap"
                        }}>
                          {selectedSub.message}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "14px 22px",
              background: "#F9FAFB",
              borderTop: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <button
                onClick={() => handleDelete(selectedSub.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#EF4444",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 8px",
                  borderRadius: "6px"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <Trash2 size={14} />
                Delete Lead
              </button>

              <button
                onClick={() => setSelectedSub(null)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
