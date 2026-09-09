/**
 * Packaging mockups drawn in SVG rather than photographed, so the wordmark
 * variations sit exactly on the grid and stay crisp at any size.
 * Shopping bag / box / hang tag — the three surfaces the identity lives on.
 */

function ShoppingBag() {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="NORTH 85 shopping bag" className="h-full w-full">
      <defs>
        <linearGradient id="bagFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5F2EB" />
          <stop offset="100%" stopColor="#E2DCCF" />
        </linearGradient>
      </defs>
      {/* body */}
      <path d="M34 58h132v168H34z" fill="url(#bagFace)" />
      {/* side gusset */}
      <path d="M166 58l22-14v168l-22 14z" fill="#D3CCBC" />
      {/* top edge */}
      <path d="M34 58l22-14h132l-22 14z" fill="#EFEAE0" />
      {/* handles */}
      <path d="M72 58c0-16 10-26 28-26s28 10 28 26" fill="none" stroke="#11110F" strokeWidth="2" />
      <path d="M170 46c0-14 8-22 18-22" fill="none" stroke="#11110F" strokeWidth="1.6" opacity=".45" />
      {/* wordmark */}
      <text
        x="100" y="136" textAnchor="middle"
        fill="#11110F" fontSize="15" letterSpacing="6.5"
        fontFamily="var(--font-jost), sans-serif" fontWeight="300"
      >
        NORTH
      </text>
      <text
        x="100" y="158" textAnchor="middle"
        fill="#8C2F23" fontSize="15" letterSpacing="6.5"
        fontFamily="var(--font-jost), sans-serif" fontWeight="300"
      >
        85
      </text>
      <line x1="76" y1="146" x2="124" y2="146" stroke="#11110F" strokeWidth=".7" opacity=".3" />
    </svg>
  );
}

function Box() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="NORTH 85 box" className="h-full w-full">
      {/* lid top */}
      <path d="M32 74l78-40 78 40-78 40z" fill="#EFEAE0" />
      {/* left face */}
      <path d="M32 74v54l78 40v-54z" fill="#DAD3C4" />
      {/* right face */}
      <path d="M188 74v54l-78 40v-54z" fill="#C9C1B0" />
      {/* lid rim */}
      <path d="M32 74l78 40 78-40" fill="none" stroke="#11110F" strokeWidth=".8" opacity=".22" />
      {/* wordmark on the lid, set on the perspective */}
      <g transform="matrix(0.94 0.48 -0.94 0.48 110 62)">
        <text
          x="0" y="0" textAnchor="middle"
          fill="#11110F" fontSize="13" letterSpacing="6"
          fontFamily="var(--font-jost), sans-serif" fontWeight="300"
        >
          N85
        </text>
      </g>
      {/* ribbon */}
      <path d="M110 114v54" stroke="#8C2F23" strokeWidth="3" opacity=".85" />
      <path d="M32 74l78 40" stroke="#8C2F23" strokeWidth="3" opacity=".55" />
    </svg>
  );
}

function HangTag() {
  return (
    <svg viewBox="0 0 150 230" role="img" aria-label="NORTH / 85 hang tag" className="h-full w-full">
      <path d="M28 34h94v168H28z" fill="#F5F2EB" stroke="#11110F" strokeOpacity=".18" />
      <circle cx="75" cy="52" r="6" fill="none" stroke="#11110F" strokeOpacity=".4" />
      <path d="M75 46c0-16 14-26 30-30" fill="none" stroke="#A39A8B" strokeWidth="1.4" />
      <text
        x="75" y="106" textAnchor="middle"
        fill="#11110F" fontSize="12" letterSpacing="5"
        fontFamily="var(--font-jost), sans-serif" fontWeight="300"
      >
        NORTH
      </text>
      <text
        x="75" y="124" textAnchor="middle"
        fill="#A39A8B" fontSize="12" letterSpacing="5"
        fontFamily="var(--font-jost), sans-serif" fontWeight="300"
      >
        /
      </text>
      <text
        x="75" y="144" textAnchor="middle"
        fill="#8C2F23" fontSize="12" letterSpacing="5"
        fontFamily="var(--font-jost), sans-serif" fontWeight="300"
      >
        85
      </text>
      <line x1="44" y1="164" x2="106" y2="164" stroke="#11110F" strokeOpacity=".15" />
      <text
        x="75" y="182" textAnchor="middle"
        fill="#A39A8B" fontSize="7" letterSpacing="2.4"
        fontFamily="var(--font-jost), sans-serif"
      >
        MADE IN PORTUGAL
      </text>
    </svg>
  );
}

const PIECES = [
  { key: "bag", label: "Shopping bag — 320gsm uncoated", Component: ShoppingBag },
  { key: "box", label: "Rigid box — debossed, no foil", Component: Box },
  { key: "tag", label: "Hang tag — cotton cord", Component: HangTag },
] as const;

export function Packaging() {
  return (
    <ul className="grid grid-cols-3 gap-4 sm:gap-8">
      {PIECES.map(({ key, label, Component }) => (
        <li key={key}>
          <div className="grain relative aspect-square bg-sand-deep/45 p-4 sm:p-6">
            <Component />
          </div>
          <p className="mt-3 text-[0.6875rem] leading-relaxed text-taupe">{label}</p>
        </li>
      ))}
    </ul>
  );
}
