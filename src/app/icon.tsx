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
          background: "#e76543",
          borderRadius: 14,
          color: "#ffffff",
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
