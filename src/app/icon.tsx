import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#0a0a0a",
          borderRadius: 14,
          border: "3px solid #7dbe78",
          color: "#f5f5f4",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        KT
      </div>
    ),
    size,
  );
}
