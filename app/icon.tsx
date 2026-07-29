import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Generated so it never drifts from the brand mark used elsewhere (Portrait's
// monogram, the OG image) — replaces Next's default placeholder favicon.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15140f",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#e9e7df",
          }}
        >
          SA
        </span>
      </div>
    ),
    size
  );
}
