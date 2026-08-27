import { ImageResponse } from "next/og";

export const alt = "EcoMart — Shop Better. Live Sustainably.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f6f5f0",
        color: "#131d18",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
        <div style={{ alignItems: "center", color: "#16744a", display: "flex", fontSize: 34, fontWeight: 700 }}>
          EcoMart · Five-leaf product scoring
        </div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: "-4px", lineHeight: 1.02, marginTop: 34 }}>
          Shop Better. Live Sustainably.
        </div>
        <div style={{ color: "#3d4f45", display: "flex", fontSize: 30, lineHeight: 1.35, marginTop: 30 }}>
          Clear scores for carbon, materials, packaging and durability.
        </div>
      </div>
    </div>,
    size,
  );
}
