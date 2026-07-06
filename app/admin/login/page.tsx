"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/admin");
    } catch (err: any) {
      let msg = "Failed to authenticate.";
      if (err.code === "auth/invalid-credential") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email is already in use.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
      background: "#F5F6F8",
      fontFamily: "Inter, sans-serif",
      padding: "16px",
      boxSizing: "border-box"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        overflow: "hidden"
      }}>
        {/* Toggle tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB" }}>
          <button 
            onClick={() => { setIsLogin(true); setError(null); }}
            style={{
              flex: 1,
              padding: "16px",
              border: "none",
              background: isLogin ? "#FFFFFF" : "#F9FAFB",
              borderBottom: isLogin ? "2px solid #4F46E5" : "none",
              color: isLogin ? "#4F46E5" : "#6B7280",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              transition: "all 0.2s"
            }}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(null); }}
            style={{
              flex: 1,
              padding: "16px",
              border: "none",
              background: !isLogin ? "#FFFFFF" : "#F9FAFB",
              borderBottom: !isLogin ? "2px solid #4F46E5" : "none",
              color: !isLogin ? "#4F46E5" : "#6B7280",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              transition: "all 0.2s"
            }}
          >
            Register Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: "#EEF2F6", alignItems: "center", justifyContent: "center", color: "#4F46E5", marginBottom: "12px" }}>
              {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              {isLogin ? "Admin Login" : "Create Admin Account"}
            </h2>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.4 }}>
              {isLogin ? "Access the INFIPLUS lead manager portal" : "Register new admin credentials for INFIPLUS"}
            </p>
          </div>

          {error && (
            <div style={{
              padding: "10px 12px",
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              borderRadius: "8px",
              color: "#B91C1C",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.4
            }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Email Address *</label>
            <input 
              type="email"
              placeholder="e.g., admin@infiplus.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                outline: "none",
                background: "#FFFFFF",
                color: "#111827",
                width: "100%",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Password *</label>
            <input 
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                outline: "none",
                background: "#FFFFFF",
                color: "#111827",
                width: "100%",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#4F46E5",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.15)",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#4338CA"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#4F46E5"}
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
