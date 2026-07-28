import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sameer Ahmed — Full-stack engineer building AI-era products";

// Generated rather than a checked-in PNG, so it can never drift out of sync
// with the copy on the page.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e9e7df",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent wash, echoing the hero aurora */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 780,
            height: 780,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(43,54,240,0.30), rgba(43,54,240,0) 68%)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#686355", letterSpacing: 2 }}>
          <span>SAMEER AHMED</span>
          <span>FULL-STACK ENGINEER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, color: "#15140f", lineHeight: 1.02, letterSpacing: -3 }}>
            I build software
          </div>
          <div style={{ fontSize: 88, color: "#15140f", lineHeight: 1.02, letterSpacing: -3 }}>
            products that
          </div>
          <div style={{ fontSize: 88, color: "#2b36f0", lineHeight: 1.02, letterSpacing: -3 }}>
            win customers.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#2c2a23" }}>
          <span>AI agents</span>
          <span style={{ color: "#2b36f0" }}>✳</span>
          <span>Next.js</span>
          <span style={{ color: "#2b36f0" }}>✳</span>
          <span>Cloud</span>
          <span style={{ color: "#2b36f0" }}>✳</span>
          <span>Shipped end to end</span>
        </div>
      </div>
    ),
    size
  );
}
