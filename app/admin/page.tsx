"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { ref, onValue, remove } from "firebase/database";
import { 
  Search, Trash2, Eye, Download, Users, Phone, Building, 
  FileText, Calendar, X, ExternalLink, ChevronRight, Inbox
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
        list.sort((a, b) => b.timestamp - a.timestamp);
        setSubmissions(list);
      } else {
        setSubmissions([]);
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        await remove(ref(db, `submissions/${id}`));
      } catch (err) {
        alert("Failed to delete submission.");
      }
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) return;
    
    const headers = ["Date", "Type", "Name", "Email", "Hospital/Clinic Name", "Beds", "Address", "Phone/Contact", "Message"];
    const rows = filteredSubmissions.map(sub => [
      sub.dateString || new Date(sub.timestamp).toLocaleString(),
      sub.type,
      sub.name,
      sub.email || "",
      sub.hospitalName || "",
      sub.beds || "",
      sub.address || "",
      sub.phone || "",
      (sub.message || "").replace(/,/g, " ")
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
      sub.name.toLowerCase().includes(term) ||
      (sub.email && sub.email.toLowerCase().includes(term)) ||
      (sub.hospitalName && sub.hospitalName.toLowerCase().includes(term)) ||
      (sub.phone && sub.phone.includes(term));

    const matchesType = filterType === "All" || sub.type === filterType;

    return matchesSearch && matchesType;
  });

  // KPI count
  const countType = (type: string) => submissions.filter(s => s.type === type).length;

  // Avatar generator (Initials)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <div style={{ color: "#6B7280", fontSize: "14px" }}>Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Page Title & Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: "0 0 4px" }}>Leads & Submissions</h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Manage trial requests, demo bookings, and contact inquiries.</p>
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
            fontSize: "14px",
            fontWeight: 600,
            cursor: filteredSubmissions.length === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => {
            if (filteredSubmissions.length > 0) e.currentTarget.style.background = "#4338CA";
          }}
          onMouseLeave={(e) => {
            if (filteredSubmissions.length > 0) e.currentTarget.style.background = "#4F46E5";
          }}
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px"
      }}>
        {[
          { title: "Total Submissions", value: submissions.length, icon: <Users size={20} />, color: "#4F46E5", bg: "#EEF2F6" },
          { title: "Free Trial Leads", value: countType("Free Trial"), icon: <Building size={20} />, color: "#10B981", bg: "#ECFDF5" },
          { title: "Demo Bookings", value: countType("Book Demo Modal"), icon: <Calendar size={20} />, color: "#F59E0B", bg: "#FFFBEB" },
          { title: "Contact Requests", value: countType("Contact Footer"), icon: <FileText size={20} />, color: "#3B82F6", bg: "#EFF6FF" }
        ].map((kpi, idx) => (
          <div key={idx} style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
          }}>
            <div>
              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>{kpi.title}</span>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: "6px 0 0" }}>{kpi.value}</h3>
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
        padding: "16px",
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search by name, email, clinic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              fontSize: "14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              color: "#111827",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Filter Type */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "10px 16px",
              fontSize: "14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              background: "#FFFFFF",
              color: "#111827",
              cursor: "pointer"
            }}
          >
            <option value="All">All Forms</option>
            <option value="Free Trial">Free Trial</option>
            <option value="Book Demo Modal">Book Demo Modal</option>
            <option value="Contact Footer">Contact Footer</option>
          </select>
        </div>
      </div>

      {/* Submissions Container */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        overflow: "hidden"
      }}>
        {filteredSubmissions.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center", color: "#6B7280" }}>
            <Inbox size={48} style={{ margin: "0 auto 16px", color: "#9CA3AF" }} />
            <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", margin: "0 0 4px" }}>No submissions found</h4>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Try clearing filters or checking back later.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", color: "#4B5563" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Lead Info</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Hospital / Clinic</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Form Type</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Submission Details</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Date</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} style={{ borderBottom: "1px solid #E5E7EB", transition: "background 0.2s" }} className="table-row">
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: sub.type === "Free Trial" ? "#EEF2F6" : sub.type === "Book Demo Modal" ? "#FFFBEB" : "#EFF6FF",
                            color: sub.type === "Free Trial" ? "#4F46E5" : sub.type === "Book Demo Modal" ? "#F59E0B" : "#3B82F6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700
                          }}>
                            {getInitials(sub.name)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#111827" }}>{sub.name}</div>
                            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px", display: "flex", flexDirection: "column", gap: "2px" }}>
                              {sub.email && <span>{sub.email}</span>}
                              {sub.phone && <span style={{ color: "#4F46E5", fontWeight: 500 }}>{sub.phone}</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                        <div style={{ fontWeight: 500, color: "#374151" }}>{sub.hospitalName || "—"}</div>
                      </td>
                      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                        <span style={{
                          display: "inline-flex",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: sub.type === "Free Trial" ? "#ECFDF5" : sub.type === "Book Demo Modal" ? "#FFFBEB" : "#EFF6FF",
                          color: sub.type === "Free Trial" ? "#047857" : sub.type === "Book Demo Modal" ? "#B45309" : "#1D4ED8"
                        }}>
                          {sub.type === "Book Demo Modal" ? "Book Demo" : sub.type}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                        <div style={{ color: "#4B5563", maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {sub.type === "Free Trial" && `Beds: ${sub.beds}`}
                          {sub.type === "Book Demo Modal" && `Phone: ${sub.phone}`}
                          {sub.type === "Contact Footer" && `${sub.message || "No message"}`}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#6B7280", verticalAlign: "middle" }}>
                        {sub.dateString ? sub.dateString.split(",")[0] : new Date(sub.timestamp).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right", verticalAlign: "middle" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <button
                            onClick={() => setSelectedSub(sub)}
                            style={{
                              border: "none",
                              background: "#F3F4F6",
                              color: "#4B5563",
                              padding: "8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E7EB"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            style={{
                              border: "none",
                              background: "#FEF2F2",
                              color: "#EF4444",
                              padding: "8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* CSS styles to add row hover and hide desktop scrollbars */}
            <style jsx global>{`
              .table-row:hover {
                background: #F9FAFB;
              }
              @media (max-width: 768px) {
                .table-responsive {
                  display: none !important;
                }
              }
            `}</style>

            {/* Mobile Cards View */}
            <div className="mobile-cards" style={{ display: "none", padding: "16px", flexDirection: "column", gap: "12px" }}>
              {filteredSubmissions.map((sub) => (
                <div key={sub.id} style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.01)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: sub.type === "Free Trial" ? "#EEF2F6" : sub.type === "Book Demo Modal" ? "#FFFBEB" : "#EFF6FF",
                        color: sub.type === "Free Trial" ? "#4F46E5" : sub.type === "Book Demo Modal" ? "#F59E0B" : "#3B82F6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700
                      }}>
                        {getInitials(sub.name)}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111827" }}>{sub.name}</h4>
                        {sub.email && <span style={{ fontSize: "11px", color: "#6B7280" }}>{sub.email}</span>}
                      </div>
                    </div>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      fontSize: "10px",
                      fontWeight: 600,
                      background: sub.type === "Free Trial" ? "#ECFDF5" : sub.type === "Book Demo Modal" ? "#FFFBEB" : "#EFF6FF",
                      color: sub.type === "Free Trial" ? "#047857" : sub.type === "Book Demo Modal" ? "#B45309" : "#1D4ED8"
                    }}>
                      {sub.type === "Book Demo Modal" ? "Book Demo" : sub.type}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "#4B5563" }}>
                    {sub.hospitalName && (
                      <div>
                        <span style={{ fontWeight: 500, color: "#6B7280" }}>Hospital:</span> {sub.hospitalName}
                      </div>
                    )}
                    {sub.type === "Free Trial" && sub.beds && (
                      <div>
                        <span style={{ fontWeight: 500, color: "#6B7280" }}>Beds:</span> {sub.beds}
                      </div>
                    )}
                    {sub.type === "Book Demo Modal" && (
                      <>
                        {sub.phone && <div><span style={{ fontWeight: 500, color: "#6B7280" }}>Phone:</span> {sub.phone}</div>}
                        {sub.address && <div><span style={{ fontWeight: 500, color: "#6B7280" }}>Address:</span> {sub.address}</div>}
                      </>
                    )}
                    {sub.type === "Contact Footer" && sub.message && (
                      <div>
                        <span style={{ fontWeight: 500, color: "#6B7280" }}>Message:</span> {sub.message}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {sub.dateString || new Date(sub.timestamp).toLocaleString()}
                    </span>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => setSelectedSub(sub)}
                        style={{
                          border: "none",
                          background: "#F3F4F6",
                          color: "#4B5563",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        style={{
                          border: "none",
                          background: "#FEF2F2",
                          color: "#EF4444",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <style jsx global>{`
              @media (max-width: 768px) {
                .mobile-cards {
                  display: flex !important;
                }
              }
            `}</style>
          </>
        )}
      </div>

      {/* Details View Modal */}
      {selectedSub && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 1000,
          fontFamily: "Inter, sans-serif"
        }}
        onClick={() => setSelectedSub(null)}
        >
          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
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
              padding: "16px 20px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Lead Submission Details</h3>
              <button 
                onClick={() => setSelectedSub(null)}
                style={{ background: "transparent", border: "none", color: "#6B7280", cursor: "pointer", display: "flex" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Type Badge */}
              <div>
                <span style={{
                  display: "inline-flex",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: selectedSub.type === "Free Trial" ? "#ECFDF5" : selectedSub.type === "Book Demo Modal" ? "#FFFBEB" : "#EFF6FF",
                  color: selectedSub.type === "Free Trial" ? "#047857" : selectedSub.type === "Book Demo Modal" ? "#B45309" : "#1D4ED8"
                }}>
                  {selectedSub.type === "Book Demo Modal" ? "Book Demo Request" : `${selectedSub.type} Form`}
                </span>
              </div>

              {/* Data Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Full Name", value: selectedSub.name },
                  { label: "Email Address", value: selectedSub.email, isEmail: true },
                  { label: "Hospital / Clinic", value: selectedSub.hospitalName },
                  { label: "Number of Beds", value: selectedSub.beds, show: selectedSub.type === "Free Trial" },
                  { label: "Hospital Address", value: selectedSub.address, show: selectedSub.type === "Book Demo Modal" },
                  { label: "Contact Number", value: selectedSub.phone, show: selectedSub.type === "Book Demo Modal" || selectedSub.type === "Free Trial" },
                  { label: "Message / Query", value: selectedSub.message, show: selectedSub.type === "Contact Footer", isMessage: true },
                  { label: "Date & Time", value: selectedSub.dateString || new Date(selectedSub.timestamp).toLocaleString() }
                ].map((row, idx) => {
                  if (row.show === false || !row.value) return null;
                  return (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.label}</span>
                      {row.isMessage ? (
                        <div style={{
                          padding: "12px",
                          background: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          fontSize: "14px",
                          color: "#111827",
                          lineHeight: 1.5,
                          whiteSpace: "pre-wrap"
                        }}>
                          {row.value}
                        </div>
                      ) : (
                        <span style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>
                          {row.value}
                          {row.isEmail && (
                            <a 
                              href={`mailto:${row.value}`} 
                              style={{ marginLeft: "8px", color: "#4F46E5", display: "inline-inline-flex", textDecoration: "none", alignItems: "center" }}
                            >
                              <ExternalLink size={12} style={{ display: "inline-block", verticalAlign: "middle" }} />
                            </a>
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "12px 20px",
              background: "#F9FAFB",
              borderTop: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => setSelectedSub(null)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  padding: "8px 16px",
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
