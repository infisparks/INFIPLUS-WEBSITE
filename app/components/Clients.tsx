"use client";

import Image from "next/image";

export default function Clients() {
  const logos = [
    "/clients/2.png",
    "/clients/3.png",
    "/clients/4.png",
    "/clients/5.png",
    "/clients/6.png",
    "/clients/7.png",
    "/clients/8.png",
    "/clients/9.png",
    "/clients/10.png",
  ];

  // Repeat logos to make scrolling continuous and dense
  const tickerLogos = [...logos, ...logos, ...logos];

  return (
    <section style={{ 
      backgroundColor: "#F8FAFC", 
      borderTop: "1px solid #E5E7EB", 
      borderBottom: "1px solid #E5E7EB", 
      padding: "48px 0",
      overflow: "hidden" 
    }}>
      <div className="container-main" style={{ textAlign: "center", marginBottom: "28px" }}>
        <span className="section-badge" style={{ marginBottom: "12px" }}>Trusted Partners</span>
        <h2 style={{ 
          fontSize: "14px", 
          fontWeight: 700, 
          color: "#64748B", 
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: 0
        }}>
          Trusted by 50+ Leading Healthcare Providers
        </h2>
      </div>

      <div style={{ 
        position: "relative", 
        width: "100%", 
        overflow: "hidden", 
        display: "flex" 
      }}>
        {/* Fade depth overlays for premium edge blending */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, #F8FAFC 20%, transparent)",
          zIndex: 10,
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, #F8FAFC 20%, transparent)",
          zIndex: 10,
          pointerEvents: "none"
        }} />

        {/* Scrolling track */}
        <div className="ticker-track" style={{ gap: "60px", padding: "8px 0" }}>
          {tickerLogos.map((src, index) => (
            <div key={index} className="logo-container" style={{
              width: "140px",
              height: "50px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Image
                src={src}
                alt={`Partner Logo ${index + 1}`}
                fill
                style={{ 
                  objectFit: "contain",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                className="client-logo-img"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-container :global(.client-logo-img):hover {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
