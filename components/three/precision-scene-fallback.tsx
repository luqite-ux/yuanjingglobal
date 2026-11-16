import type { SceneStep } from '@/components/three/precision-scene-canvas'

const BLUE = '#1f58c4'

const plateOutline =
  'M486 210 L694 210 L694 192 L714 192 L714 170 L694 170 L694 148 Q590 66 486 148 L486 170 L466 170 L466 192 L486 192 Z'

export function PrecisionSceneFallback({ step }: { step: SceneStep }) {
  const punchY = step === 1 ? 262 : 190
  return (
    <svg
      viewBox="0 0 800 460"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="yj-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6e9ed" />
          <stop offset="1" stopColor="#aab2bb" />
        </linearGradient>
        <linearGradient id="yj-metal-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcc3cb" />
          <stop offset="1" stopColor="#8a949f" />
        </linearGradient>
      </defs>

      <ellipse cx="220" cy="346" rx="190" ry="10" fill="#20252b" opacity="0.1" />

      <g stroke="#7b848e" strokeWidth="1">
        <rect x="52" y="70" width="12" height="230" fill="url(#yj-metal)" />
        <rect x="376" y="70" width="12" height="230" fill="url(#yj-metal)" />
        <rect x="40" y="300" width="360" height="42" fill="url(#yj-metal-dark)" />
        <rect x="100" y="288" width="240" height="12" fill="url(#yj-metal)" />
      </g>

      <g
        transform={`translate(0 ${punchY})`}
        stroke="#7b848e"
        strokeWidth="1"
        style={{ transition: 'transform 0.4s ease' }}
      >
        <rect x="66" y="-108" width="308" height="28" fill="url(#yj-metal-dark)" />
        <rect x="80" y="-80" width="280" height="64" fill="url(#yj-metal)" />
        <rect x="118" y="-16" width="204" height="16" fill="url(#yj-metal-dark)" />
        <rect x="46" y="-80" width="30" height="64" fill="#d7dce1" />
        <rect x="364" y="-80" width="30" height="64" fill="#d7dce1" />
      </g>

      <g opacity={step === 0 ? 1 : 0.15} stroke={BLUE} strokeWidth="1.5" fill="none">
        <path d="M100 372 H340 M100 360 V384 M340 360 V384 M100 344 V360 M340 344 V360" />
        <path d="M440 108 V210 M430 108 H450 M430 210 H450 M466 240 H714 M466 228 V252 M714 228 V252" />
      </g>

      <path
        d={plateOutline}
        fill="url(#yj-metal)"
        stroke="#7b848e"
        strokeWidth="1.2"
      />
      <circle cx="550" cy="170" r="13" fill="#f0f1f2" stroke="#7b848e" />
      <circle cx="630" cy="170" r="13" fill="#f0f1f2" stroke="#7b848e" />
      <path
        d={plateOutline}
        transform="translate(590 170) scale(1.07) translate(-590 -170)"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.2"
        opacity="0.85"
      />

      <g
        opacity={step === 2 ? 1 : 0.1}
        stroke={BLUE}
        strokeWidth="1.2"
        strokeDasharray="5 4"
        fill="none"
      >
        <path d="M550 92 V248 M630 92 V248 M452 170 H728" />
        <circle cx="550" cy="170" r="21" strokeDasharray="0" />
        <circle cx="630" cy="170" r="21" strokeDasharray="0" />
      </g>

      <text x="40" y="430" fontSize="12" fill="#4b545e" fontFamily="sans-serif" letterSpacing="1.4">
        ILLUSTRATIVE MODEL
      </text>
    </svg>
  )
}
