"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { LogIn, KeyRound, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      let msg = "Failed to authenticate.";
      if (
        err.code === "auth/invalid-credential" || 
        err.code === "auth/user-not-found" || 
        err.code === "auth/wrong-password"
      ) {
        msg = "Invalid email or password. If you forgot your password, use the reset button below.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address above to receive the password reset link.");
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(`Password reset link has been sent to ${email}. Please check your inbox.`);
    } catch (err: any) {
      let msg = "Failed to send reset link.";
      if (err.code === "auth/user-not-found") {
        msg = "No account found with this email in Firebase Auth.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
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
        maxWidth: "420px",
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
        overflow: "hidden"
      }}>
        <form onSubmit={handleSubmit} style={{ padding: "32px 26px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ textAlign: "center", marginBottom: "4px" }}>
            <div style={{
              display: "inline-flex",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#EEF2FF",
              alignItems: "center",
              justifyContent: "center",
              color: "#4F46E5",
              marginBottom: "12px"
            }}>
              <LogIn size={24} />
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              INFIPLUS Admin Login
            </h2>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.4 }}>
              Sign in to manage hospital leads & demo requests
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

          {successMsg && (
            <div style={{
              padding: "10px 12px",
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
              borderRadius: "8px",
              color: "#047857",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.4,
              display: "flex",
              alignItems: "flex-start",
              gap: "8px"
            }}>
              <CheckCircle2 size={16} style={{ marginTop: "2px", flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Email Address *</label>
            <input 
              type="email"
              placeholder="admin@infiplus.com"
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Password *</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#4F46E5",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0
                }}
              >
                {resetLoading ? "Sending link..." : "Forgot password?"}
              </button>
            </div>
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
              padding: "11px",
              background: "#4F46E5",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.15)",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#4338CA"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#4F46E5"; }}
          >
            {loading ? "Signing in..." : "Sign In to Admin"}
          </button>

          <div style={{
            marginTop: "8px",
            paddingTop: "16px",
            borderTop: "1px solid #F3F4F6",
            textAlign: "center"
          }}>
            <Link href="/" style={{
              fontSize: "12px",
              color: "#6B7280",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <ArrowLeft size={13} />
              Back to Infiplus Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
