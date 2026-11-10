import { ImageResponse } from "next/og";

export const alt = "John Jomi, AI engineer and full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1d33cf",
          color: "#eeefea",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 210, fontWeight: 700, letterSpacing: -10, lineHeight: 0.9 }}>
          John Jomi
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 44, lineHeight: 1.2 }}>
          <span>I build AI products and the web software around them.</span>
          <span style={{ color: "#ffd600", marginTop: 16 }}>johnjomi.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
