/** QWA brand mark — Bloch sphere + quantum orbit (navbar, footer, certificates) */

interface QwaLogoProps {
  size?: number;
  className?: string;
  /** Full-color mark with glow; icon = simplified for tiny sizes */
  variant?: "full" | "icon";
  title?: string;
}

export function QwaLogo({
  size = 36,
  className = "",
  variant = "full",
  title = "Quantum Workforce Academy",
}: QwaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="qwa-grad" x1="8%" y1="8%" x2="92%" y2="92%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="45%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <radialGradient id="qwa-bg" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>
        <filter id="qwa-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="qwa-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* App-icon rounded square */}
      <rect width="512" height="512" rx={variant === "icon" ? 108 : 96} fill="url(#qwa-bg)" />

      {/* Quantum orbit rings */}
      <ellipse
        cx="256"
        cy="268"
        rx="188"
        ry="72"
        stroke="url(#qwa-grad)"
        strokeWidth="3.5"
        strokeOpacity="0.55"
        transform="rotate(-22 256 268)"
      />
      {variant === "full" && (
        <ellipse
          cx="256"
          cy="248"
          rx="160"
          ry="52"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeOpacity="0.25"
          transform="rotate(18 256 248)"
        />
      )}

      {/* Bloch wireframe */}
      <circle cx="256" cy="256" r="148" stroke="#64748b" strokeWidth="2" strokeOpacity="0.35" />
      <ellipse cx="256" cy="256" rx="74" ry="148" stroke="#64748b" strokeWidth="2" strokeOpacity="0.35" />
      <ellipse cx="256" cy="256" rx="148" ry="74" stroke="#64748b" strokeWidth="2" strokeOpacity="0.25" />

      {/* Main sphere rim */}
      <circle
        cx="256"
        cy="256"
        r="148"
        stroke="url(#qwa-grad)"
        strokeWidth="5"
        filter="url(#qwa-glow)"
      />

      {/* |0⟩ north pole */}
      <circle cx="256" cy="108" r="14" fill="#22d3ee" filter="url(#qwa-soft)" />
      {/* |1⟩ south pole */}
      <circle cx="256" cy="404" r="14" fill="#a78bfa" filter="url(#qwa-soft)" />

      {/* State vector |ψ⟩ */}
      <line
        x1="256"
        y1="256"
        x2="368"
        y2="188"
        stroke="#22d3ee"
        strokeWidth="7"
        strokeLinecap="round"
        filter="url(#qwa-glow)"
      />
      <circle cx="368" cy="188" r="18" fill="#22d3ee" filter="url(#qwa-glow)" />

      {/* Origin */}
      <circle cx="256" cy="256" r="10" fill="#f1f5f9" />

      {/* Subtle Q arc — workforce identity */}
      {variant === "full" && (
        <path
          d="M 128 320 Q 128 420 256 420 Q 384 420 384 300"
          stroke="url(#qwa-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.35"
        />
      )}
    </svg>
  );
}
