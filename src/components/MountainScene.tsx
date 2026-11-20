/** Original layered Himalayan ridge illustration (pure SVG, no images). */
export default function MountainScene({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "footer";
}) {
  const id = variant;
  return (
    <svg className={className} viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d3d3d" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#121212" />
        </linearGradient>
        <linearGradient id={`${id}-near`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141414" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id={`${id}-snow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f5f4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f5f5f4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* far range with snow caps */}
      <path
        fill={`url(#${id}-far)`}
        d="M0 260 L90 210 L170 240 L260 150 L330 200 L420 110 L500 180 L560 140 L640 200 L720 90 L800 170 L880 130 L960 190 L1040 100 L1120 170 L1200 140 L1290 200 L1370 150 L1440 190 L1440 420 L0 420 Z"
      />
      <path
        fill={`url(#${id}-snow)`}
        opacity="0.55"
        d="M400 124 L420 110 L446 140 L430 134 L418 146 L406 132 Z M700 104 L720 90 L748 124 L732 118 L720 132 L708 116 Z M1020 114 L1040 100 L1066 132 L1050 126 L1038 138 L1028 124 Z M244 164 L260 150 L282 176 L268 170 L256 180 Z"
      />

      {/* mid ridge */}
      <path
        fill={`url(#${id}-mid)`}
        d="M0 300 L110 250 L200 285 L300 230 L390 270 L470 220 L560 275 L650 240 L760 290 L850 235 L950 270 L1040 225 L1130 280 L1230 245 L1330 285 L1440 250 L1440 420 L0 420 Z"
      />

      {/* deodar treeline */}
      <g fill="#1d3a25" opacity="0.95">
        {Array.from({ length: 36 }).map((_, i) => {
          const x = i * 41 + (i % 3) * 7;
          const h = 26 + ((i * 37) % 22);
          const y = 330 - ((i * 13) % 18);
          return <path key={i} d={`M${x} ${y} L${x + 9} ${y - h} L${x + 18} ${y} Z`} />;
        })}
      </g>

      {/* near hills */}
      <path
        fill={`url(#${id}-near)`}
        d="M0 340 C140 300 260 330 380 315 C520 296 640 345 780 325 C920 305 1040 340 1180 318 C1300 300 1380 320 1440 312 L1440 420 L0 420 Z"
      />
    </svg>
  );
}
