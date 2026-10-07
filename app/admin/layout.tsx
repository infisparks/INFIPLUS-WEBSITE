"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Automatically close sidebar on mobile screen on mount
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (currentUser && pathname === "/admin/login") {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F6F8",
        fontFamily: "Inter, sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            border: "4px solid #E5E7EB",
            borderTop: "4px solid #6366F1",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <style jsx global>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Loading administration...</p>
        </div>
      </div>
    );
  }

  // If not logged in and on admin page, don't show admin dashboard wrapper
  if (!user && pathname !== "/admin/login") {
    return null;
  }

  // If logged in and on login page, don't show login page (we are redirecting)
  if (user && pathname === "/admin/login") {
    return null;
  }

  // If on login page, show child without layout wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F5F6F8", overflow: "hidden", fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: "none",
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            zIndex: 95
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`} style={{
        width: sidebarOpen ? "260px" : "0px",
        background: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        position: "relative",
        zIndex: 100,
        height: "100%",
        flexShrink: 0
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/admin" style={{ textDecoration: "none", color: "#111827", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6366F1, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontWeight: "bold", fontSize: "16px" }}>
              I
            </div>
            <span style={{ fontSize: "17px", fontWeight: "bold", letterSpacing: "-0.02em" }}>INFIPLUS Admin</span>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "#6B7280",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <Link href="/admin" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            color: pathname === "/admin" ? "#4F46E5" : "#4B5563",
            background: pathname === "/admin" ? "#EEF2FF" : "transparent",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.15s"
          }}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid #E5E7EB" }}>
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              color: "#EF4444",
              fontWeight: 500,
              fontSize: "14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#FEF2F2"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Header */}
        <header style={{
          height: "60px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
          zIndex: 90
        }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#4B5563",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Menu size={20} />
          </button>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>Admin:</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{user?.email}</span>
          </div>
        </header>

        {/* Content Wrapper */}
        <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            width: 260px !important;
            transform: translateX(-100%);
            box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .sidebar-backdrop {
            display: block !important;
          }
          .mobile-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
