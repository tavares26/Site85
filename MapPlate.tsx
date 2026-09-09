import type { Universe } from "@/data/fictional-data";

/**
 * No map provider, no API key, no tiles. Both plates are drawn by hand so each
 * house gets a street grid in its own palette: Brooklyn on charcoal with the
 * river cutting across, Fifth on paper with the park where the park is.
 */
export function MapPlate({ universe, label }: { universe: Universe; label: string }) {
  const isBk = universe === "brooklyn";

  if (isBk) {
    const streets = Array.from({ length: 9 }, (_, i) => i);
    const avenues = Array.from({ length: 7 }, (_, i) => i);

    return (
      <svg
        viewBox="0 0 600 420"
        className="h-full w-full"
        role="img"
        aria-label={`Stylised street map showing ${label}`}
      >
        <rect width="600" height="420" fill="#171715" />

        {/* Williamsburg runs off the compass, so the grid is raked */}
        <g transform="rotate(-14 300 210)" opacity="0.55">
          {streets.map((i) => (
            <line
              key={`s${i}`}
              x1="-80"
              y1={20 + i * 48}
              x2="680"
              y2={20 + i * 48}
              stroke="#B69A6A"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
          ))}
          {avenues.map((i) => (
            <line
              key={`a${i}`}
              x1={20 + i * 96}
              y1="-80"
              x2={20 + i * 96}
              y2="500"
              stroke="#B69A6A"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          ))}
          <line
            x1="-80"
            y1="212"
            x2="680"
            y2="212"
            stroke="#B69A6A"
            strokeOpacity="0.75"
            strokeWidth="2.5"
          />
        </g>

        {/* East River */}
        <path
          d="M-20 300 C 90 268, 150 210, 130 120 C 118 66, 60 34, -20 20 L -20 420 Z"
          fill="#22211E"
          stroke="#B69A6A"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <text
          x="52"
          y="212"
          fill="#B69A6A"
          fillOpacity="0.45"
          fontSize="13"
          letterSpacing="5"
          transform="rotate(-74 52 212)"
          fontFamily="var(--font-bk-body), sans-serif"
        >
          EAST RIVER
        </text>

        <text
          x="360"
          y="126"
          fill="#B69A6A"
          fillOpacity="0.5"
          fontSize="13"
          letterSpacing="5"
          fontFamily="var(--font-bk-body), sans-serif"
        >
          WYTHE AVE
        </text>

        {/* The shop */}
        <g>
          <circle cx="322" cy="208" r="30" fill="#711E1E" fillOpacity="0.5" />
          <circle cx="322" cy="208" r="8" fill="#B69A6A" />
          <line x1="322" y1="208" x2="322" y2="150" stroke="#B69A6A" strokeWidth="1.5" />
          <text
            x="332"
            y="146"
            fill="#E7DDC9"
            fontSize="17"
            letterSpacing="3"
            fontFamily="var(--font-bk-body), sans-serif"
          >
            214
          </text>
        </g>

        <text
          x="24"
          y="398"
          fill="#E7DDC9"
          fillOpacity="0.35"
          fontSize="12"
          letterSpacing="6"
          fontFamily="var(--font-bk-body), sans-serif"
        >
          NOT TO SCALE. NOT A REAL ADDRESS.
        </text>
      </svg>
    );
  }

  const streets = Array.from({ length: 11 }, (_, i) => i);
  const avenues = Array.from({ length: 6 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full"
      role="img"
      aria-label={`Stylised street map showing ${label}`}
    >
      <rect width="600" height="420" fill="#F6F1E7" />

      {streets.map((i) => (
        <line
          key={`s${i}`}
          x1="0"
          y1={18 + i * 38}
          x2="600"
          y2={18 + i * 38}
          stroke="#000000"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
      ))}
      {avenues.map((i) => (
        <line
          key={`a${i}`}
          x1={140 + i * 92}
          y1="0"
          x2={140 + i * 92}
          y2="420"
          stroke="#000000"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      ))}

      {/* Central Park, directly opposite the door */}
      <rect x="0" y="0" width="132" height="420" fill="#E3C9A8" fillOpacity="0.55" />
      <text
        x="66"
        y="210"
        textAnchor="middle"
        transform="rotate(-90 66 210)"
        fill="#000000"
        fillOpacity="0.4"
        fontSize="15"
        letterSpacing="7"
        fontFamily="var(--font-ff-body), serif"
      >
        CENTRAL PARK
      </text>

      {/* Fifth Avenue itself */}
      <line x1="140" y1="0" x2="140" y2="420" stroke="#8A1520" strokeOpacity="0.7" strokeWidth="2.5" />
      <text
        x="152"
        y="44"
        fill="#8A1520"
        fontSize="15"
        letterSpacing="4"
        fontFamily="var(--font-ff-body), serif"
      >
        FIFTH AVENUE
      </text>
      <text
        x="300"
        y="212"
        fill="#000000"
        fillOpacity="0.4"
        fontSize="13"
        letterSpacing="4"
        fontFamily="var(--font-ff-body), serif"
      >
        E 86TH ST
      </text>

      {/* The salon */}
      <g>
        <circle cx="140" cy="206" r="26" fill="#8A1520" fillOpacity="0.12" />
        <circle cx="140" cy="206" r="7" fill="#8A1520" />
        <line x1="140" y1="206" x2="222" y2="152" stroke="#8A1520" strokeWidth="1.2" />
        <text
          x="228"
          y="150"
          fill="#000000"
          fontSize="18"
          fontStyle="italic"
          fontFamily="var(--font-ff-display), serif"
        >
          1067, third floor
        </text>
      </g>

      <text
        x="24"
        y="400"
        fill="#000000"
        fillOpacity="0.35"
        fontSize="13"
        fontStyle="italic"
        fontFamily="var(--font-ff-body), serif"
      >
        Not to scale, and not a real address.
      </text>
    </svg>
  );
}
