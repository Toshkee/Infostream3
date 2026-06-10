import { ImageResponse } from "next/og";

export const alt = "Infostream — Critical digital infrastructure for Montenegro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0E0F12",
          color: "#EDEEF0",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 40 }}>
            {[
              { h: 16, c: "#0A8C7B" },
              { h: 34, c: "#159E8B" },
              { h: 24, c: "#2DD4BF" },
              { h: 40, c: "#E5484D" },
            ].map((b, i) => (
              <div key={i} style={{ width: 7, height: b.h, background: b.c, borderRadius: 3, display: "flex" }} />
            ))}
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>infostream</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
            We build and run the systems a country depends on.
          </div>
          <div style={{ fontSize: 27, color: "#9AA1AB", maxWidth: 880, lineHeight: 1.4 }}>
            Critical digital infrastructure for Montenegro&apos;s institutions — engineered for
            longevity, audited by default.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 22, color: "#9AA1AB" }}>
          <div style={{ display: "flex", color: "#2DD4BF" }}>● In production since 2004</div>
          <div style={{ display: "flex" }}>ISO 27001 · ISO 9001</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
