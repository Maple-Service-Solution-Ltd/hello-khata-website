/**
 * A far-off neighbour in the far-right block (its top-right window): every so often the window swings open,
 * someone leans on the sill for a smoke, takes three slow puffs, and shuts the window again. It sits in the faint
 * background layer, so it is drawn faint and soft too: a silhouette, a tiny ember that brightens with each puff, and
 * pale wisps of smoke. All CSS, one 26-second loop (see globals.css).
 * Scene units match the street (viewBox 1440 × 600); the window is at x 1384, y 124, 34 × 40. The figure is laid out
 * from the window's centre (CX) and sill (SILL); the arm's pivot in globals.css is (CX + 5, SILL - 10).
 */

const X = 1384;
const Y = 124;
const W = 34;
const H = 40;
const CX = X + W / 2;
const SILL = Y + H;

export function HeroSmoker() {
  const ink = "#17221C";
  return (
    <svg viewBox="0 0 1440 600" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="hk-smoke-window">
          <rect x={X} y={Y} width={W} height={H} />
        </clipPath>
      </defs>
      <g style={{ filter: "blur(0.3px)" }} opacity="0.75">
        {/* The room behind the open window */}
        <rect x={X + 1} y={Y + 1} width={W - 2} height={H - 2} fill="#cfc6b2" className="hk-smoke-room" />

        {/* The neighbour, leaning on the sill */}
        <g clipPath="url(#hk-smoke-window)">
          <g className="hk-smoke-person">
            <path d={`M${CX - 9} ${SILL} C${CX - 8} ${SILL - 10} ${CX - 4} ${SILL - 13} ${CX} ${SILL - 13} C${CX + 4} ${SILL - 13} ${CX + 8} ${SILL - 10} ${CX + 9} ${SILL} Z`} fill="#b9ad97" stroke={ink} strokeOpacity="0.35" strokeWidth="0.8" />
            <circle cx={CX} cy={SILL - 19} r="4.4" fill="#c4a98c" stroke={ink} strokeOpacity="0.35" strokeWidth="0.8" />
            <path d={`M${CX - 4.4} ${SILL - 20} C${CX - 4} ${SILL - 24.4} ${CX + 4} ${SILL - 24.4} ${CX + 4.4} ${SILL - 20} C${CX + 2} ${SILL - 22} ${CX - 2} ${SILL - 22} ${CX - 4.4} ${SILL - 20} Z`} fill={ink} fillOpacity="0.45" />
            {/* Forearm with the cigarette: rests on the sill, comes up to the lips for each puff */}
            <g className="hk-smoke-arm">
              <path d={`M${CX + 5} ${SILL - 10} L${CX + 10} ${SILL - 4}`} stroke={ink} strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
              <path d={`M${CX + 10} ${SILL - 4} l3.4 -0.8`} stroke="#f3eee2" strokeWidth="0.9" strokeLinecap="round" />
              <circle cx={CX + 13.6} cy={SILL - 4.8} r="0.9" fill="#e0662a" className="hk-smoke-ember" />
            </g>
          </g>
        </g>

        {/* Window leaves: swing open to the sides, then close again */}
        <rect x={X} y={Y} width={W / 2} height={H} fill="#efe9dc" stroke={ink} strokeOpacity="0.25" strokeWidth="0.6" className="hk-smoke-leaf-l" />
        <rect x={X + W / 2} y={Y} width={W / 2} height={H} fill="#efe9dc" stroke={ink} strokeOpacity="0.25" strokeWidth="0.6" className="hk-smoke-leaf-r" />

        {/* Smoke: pale wisps that curl up out of the window and thin away */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${CX} ${SILL - 18} c-3 -4 3 -7 0 -11 c-3 -4 3 -7 0 -11`}
            fill="none"
            stroke="#8f8a80"
            strokeWidth="1.1"
            strokeLinecap="round"
            className={`hk-smoke-wisp hk-smoke-wisp-${i}`}
          />
        ))}
      </g>
    </svg>
  );
}
