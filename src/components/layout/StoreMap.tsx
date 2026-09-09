/**
 * A drawn map of the block rather than an embedded tile service: it stays on
 * palette, needs no third-party script, and works offline. Coordinates are
 * fictional, matching the fictional address.
 */
export function StoreMap() {
  return (
    <div className="grain relative aspect-[4/3] w-full overflow-hidden bg-sand-deep">
      <svg
        viewBox="0 0 640 480"
        role="img"
        aria-label="Illustrated map of Crosby Street between Prince and Spring, showing the NORTH 85 flagship"
        className="h-full w-full"
      >
        <rect width="640" height="480" fill="#E6E1D6" />

        {/* Blocks */}
        <g fill="#DBD5C7">
          <rect x="0" y="0" width="250" height="180" />
          <rect x="330" y="0" width="310" height="180" />
          <rect x="0" y="250" width="250" height="230" />
          <rect x="330" y="250" width="310" height="230" />
        </g>

        {/* Building footprints */}
        <g fill="#CFC8B8">
          <rect x="20" y="20" width="90" height="60" />
          <rect x="130" y="20" width="100" height="80" />
          <rect x="360" y="30" width="120" height="70" />
          <rect x="510" y="20" width="110" height="90" />
          <rect x="30" y="290" width="120" height="90" />
          <rect x="360" y="300" width="100" height="70" />
          <rect x="500" y="290" width="120" height="110" />
        </g>

        {/* Avenues */}
        <rect x="250" y="0" width="80" height="480" fill="#EFEAE0" />
        <rect x="0" y="180" width="640" height="70" fill="#EFEAE0" />

        {/* Cobble hatching on Crosby */}
        <g stroke="#D3CCBC" strokeWidth="1">
          {Array.from({ length: 24 }, (_, i) => (
            <line key={i} x1="254" y1={i * 20 + 4} x2="326" y2={i * 20 + 4} />
          ))}
        </g>

        {/* Centre lines */}
        <g stroke="#A39A8B" strokeWidth="1.2" strokeDasharray="10 10" opacity=".55">
          <line x1="290" y1="0" x2="290" y2="480" />
          <line x1="0" y1="215" x2="640" y2="215" />
        </g>

        {/* Street names */}
        <text
          x="298" y="120"
          transform="rotate(-90 298 120)"
          fill="#A39A8B" fontSize="11" letterSpacing="4"
          fontFamily="var(--font-jost), sans-serif"
        >
          CROSBY ST
        </text>
        <text
          x="60" y="212"
          fill="#A39A8B" fontSize="11" letterSpacing="4"
          fontFamily="var(--font-jost), sans-serif"
        >
          PRINCE ST
        </text>
        <text
          x="470" y="212"
          fill="#A39A8B" fontSize="11" letterSpacing="4"
          fontFamily="var(--font-jost), sans-serif"
        >
          SPRING ST
        </text>

        {/* The store */}
        <g>
          <rect x="196" y="262" width="54" height="46" fill="#11110F" />
          <text
            x="223" y="290" textAnchor="middle"
            fill="#F1EEE7" fontSize="12" letterSpacing="2.5"
            fontFamily="var(--font-jost), sans-serif"
          >
            85
          </text>
          {/* Pin */}
          <line x1="223" y1="262" x2="223" y2="228" stroke="#8C2F23" strokeWidth="1.5" />
          <circle cx="223" cy="224" r="6" fill="#8C2F23" />
          <circle cx="223" cy="224" r="13" fill="none" stroke="#8C2F23" strokeWidth="1" opacity=".4" />
          <text
            x="223" y="205" textAnchor="middle"
            fill="#11110F" fontSize="10" letterSpacing="3.5"
            fontFamily="var(--font-jost), sans-serif"
          >
            NORTH 85
          </text>
        </g>

        {/* Compass */}
        <g transform="translate(586 432)">
          <circle r="22" fill="none" stroke="#A39A8B" strokeWidth="1" />
          <line x1="0" y1="14" x2="0" y2="-14" stroke="#11110F" strokeWidth="1.2" />
          <path d="M0 -18l4 7h-8z" fill="#8C2F23" />
          <text
            x="0" y="-24" textAnchor="middle"
            fill="#11110F" fontSize="9" letterSpacing="1.5"
            fontFamily="var(--font-jost), sans-serif"
          >
            N
          </text>
        </g>

        {/* Scale */}
        <g transform="translate(28 448)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#11110F" strokeWidth="1" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#11110F" strokeWidth="1" />
          <line x1="80" y1="-4" x2="80" y2="4" stroke="#11110F" strokeWidth="1" />
          <text
            x="40" y="-8" textAnchor="middle"
            fill="#A39A8B" fontSize="9" letterSpacing="1.5"
            fontFamily="var(--font-jost), sans-serif"
          >
            100 M
          </text>
        </g>
      </svg>
    </div>
  );
}
