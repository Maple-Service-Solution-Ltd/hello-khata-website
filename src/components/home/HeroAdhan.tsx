/**
 * The adhan from the old mosque, told as one quiet 20-second moment (all CSS, all in sync).
 *
 * "The call inks the city": one slow, soft wave of sound rolls out from the minaret across the skyline.
 * Wherever it passes, the faint pencil sketch of the city quietly comes alive in ink, then settles back
 * behind it — easy to miss, felt by anyone who lingers. Above the dome,
 * "ٱللَّٰهُ أَكْبَرُ" is written in light, and the pigeons lift off the dome and fly over the rooftops.
 * Scene units match the street (viewBox 1440 × 600).
 */

const MINARET = [145, 96] as const;

/** Pigeons perched along the far dome (small, as befits the distance), and where each one glides to. */
const pigeons = [
  { x: 60, y: 129.5, dx: -110, dy: -120, s: 0.72 },
  { x: 74, y: 126, dx: -55, dy: -145, s: 0.65 },
  { x: 88, y: 128.5, dx: -135, dy: -88, s: 0.75 },
  { x: 101, y: 134, dx: -22, dy: -160, s: 0.62 },
];

export function HeroAdhan({ city }: { city: React.ReactNode }) {
  return (
    <svg viewBox="0 0 1440 600" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-ink" aria-hidden="true">
      <defs>
        {/* A soft, feathered band at the rim of the circle: the wavefront */}
        <radialGradient id="hk-adhan-ring">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.88" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.95" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hk-adhan-waves" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2240" height="1400">
          <circle cx={MINARET[0]} cy={MINARET[1]} r="1450" fill="url(#hk-adhan-ring)" className="hk-adhan-wave" />
        </mask>
      </defs>

      {/* Where the wave passes, the pencil city is quietly inked, under a faint golden light */}
      <g mask="url(#hk-adhan-waves)">
        <rect x="-400" y="-400" width="2240" height="1400" fill="var(--color-marigold)" opacity="0.11" />
        <g opacity="0.55">{city}</g>
      </g>

      {/* Allahu Akbar, far off over the dome: sized and inked like the distant mosque, slightly hazy */}
      <text
        x={104}
        y={78}
        textAnchor="middle"
        direction="rtl"
        lang="ar"
        fontSize="13"
        fill="var(--color-ink)"
        className="hk-adhan-write max-[1499px]:hidden"
        style={{ fontFamily: "var(--font-arabic), serif", filter: "blur(0.35px)" }}
      >
        ٱللَّٰهُ أَكْبَرُ
      </text>

      {/* Pigeons on the far dome, in the same faint, hazy pencil as the mosque: they lift off softly at the call,
          glide away into the distance, and later settle back */}
      <g style={{ filter: "blur(0.3px)" }}>
        {pigeons.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
            <g className="hk-adhan-perch" style={{ animationDelay: `${i * 0.4}s` }} fill="var(--color-ink)" fillOpacity="0.36">
              <ellipse cx="0" cy="0" rx="3.4" ry="2.1" />
              <circle cx="3.2" cy="-1.8" r="1.4" />
              <path d="M-3 0.4 l-2.2 1.2" stroke="var(--color-ink)" strokeOpacity="0.36" strokeWidth="0.8" strokeLinecap="round" />
            </g>
            <g className="hk-adhan-fly" style={{ animationDelay: `${i * 0.4}s`, ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` }}>
              <path d="M-7 0 q3.5 -4 7 0 q3.5 -4 7 0" fill="none" stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="hk-flap" style={{ animationDelay: `${i * 0.13}s` }} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
