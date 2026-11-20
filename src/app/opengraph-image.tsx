import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/krrish-tapwal-portrait.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 85% 0%, rgba(125,190,120,0.22), transparent 55%), #0a0a0a",
          color: "#f5f5f4",
          padding: 64,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#a9d8a2", textTransform: "uppercase" }}>{site.role}</div>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, marginTop: 24, letterSpacing: -4 }}>Krrish</div>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, color: "#7dbe78", letterSpacing: -4 }}>Tapwal</div>
          <div style={{ fontSize: 30, color: "#a8a8a8", marginTop: 32 }}>{`${site.brand} · ${site.location.region}`}</div>
          <div style={{ fontSize: 24, color: "#737373", marginTop: 12 }}>krrishtapwal.space</div>
        </div>
        <img
          src={src}
          width={400}
          height={400}
          alt=""
          style={{ borderRadius: 400, border: "8px solid #242424", objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
