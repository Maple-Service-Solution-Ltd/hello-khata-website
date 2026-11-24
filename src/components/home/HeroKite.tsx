"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A boy on the roof of the narrow block, flying a kite (ghuri) far above the street. It lives in the faint background
 * layer, so it is kept to scale and soft: at the scene's scale (one storey ≈ 58 units ≈ 3 m) the boy is about 20 units
 * tall and the kite about 15 across, the string a hairline. The kite rides on a long, sagging string that slowly swings
 * around the boy's hand; the kite itself rocks in the wind and its tail streams downwind. The boy tugs the string now
 * and then. All CSS loops (see globals.css). Scene units match the street (viewBox 1440 × 600).
 *
 * The street and the headline scale differently, so on desktop the kite is placed from the headline rather than the
 * scene: it hangs in the gap just above the end of the headline's second line, wherever that lands, and the string is
 * drawn from the boy's hand to it.
 */

const ink = "#17221C";
/** The boy sits on the parapet near the right end of the narrow block's roof (its top edge is y 168). */
const FOOT = { x: 420, y: 168 };
const HAND = { x: 425.5, y: 153.5 };
/** Where the kite flies when the headline sits above the street instead of over it (below lg). */
const STACKED = { x: 527, y: -36 };

export function HeroKite() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [kite, setKite] = useState(STACKED);

  useEffect(() => {
    const svg = svgRef.current;
    const title = document.getElementById("hero-title");
    if (!svg || !title) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const place = () => {
      if (!wide.matches) return setKite(STACKED);
      // The headline's line boxes (text only): the kite flies just above the first line, near its end. The Bengali
      // first line reaches about as far as the second, so the kite sits over its comma; the English one is shorter
      // (and its glyphs end in a long comma tail), so the kite sits a little in from the end, over "business".
      const lines: DOMRect[] = [];
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        lines.push(...[...range.getClientRects()].filter((r) => r.width > 0));
      }
      const first = lines[0];
      const last = lines.at(-1);
      const ctm = svg.getScreenCTM();
      if (!first || !last || !ctm) return;
      const em = parseFloat(getComputedStyle(title).fontSize);
      const long = first.right >= last.right - 0.84 * em;
      const kx = long ? first.right - 0.17 * em : first.right - 1.35 * em;
      const ky = long ? first.top - 0.45 * em : first.top - 0.49 * em;
      const p = new DOMPoint(kx, ky).matrixTransform(ctm.inverse());
      setKite({ x: Math.round(p.x * 2) / 2, y: Math.min(Math.round(p.y * 2) / 2, FOOT.y - 80) });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(title);
    ro.observe(svg);
    document.fonts?.ready.then(place);
    // Once more after the headline's rise-in and the street's parallax settle, which move them without resizing
    const settle = window.setTimeout(place, 1800);
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.target instanceof Element && e.target.contains(title)) place();
    };
    document.addEventListener("animationend", onAnimEnd);
    wide.addEventListener("change", place);
    return () => {
      ro.disconnect();
      window.clearTimeout(settle);
      document.removeEventListener("animationend", onAnimEnd);
      wide.removeEventListener("change", place);
    };
  }, []);

  const { x, y } = FOOT;
  const { x: kx, y: ky } = kite;
  // The string sags under its own weight: the control point drops below the straight line from hand to kite.
  const string = `M${HAND.x} ${HAND.y} Q${(HAND.x + kx) / 2 + 22} ${(HAND.y + ky) / 2 + 30} ${kx} ${ky + 1}`;

  return (
    <svg ref={svgRef} viewBox="0 0 1440 600" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <g style={{ filter: "blur(0.25px)" }} opacity="0.85">
        <g className="hk-kite-sway" style={{ transformOrigin: `${HAND.x}px ${HAND.y}px` }}>
          <path d={string} fill="none" stroke={ink} strokeOpacity="0.32" strokeWidth="0.55" />
          <g className="hk-kite-rock" style={{ transformOrigin: `${kx}px ${ky + 1}px` }}>
            {/* Tail: a ribbon of little bows streaming downwind from the kite's lower tip */}
            <g className="hk-kite-tail" style={{ transformOrigin: `${kx}px ${ky + 9}px` }}>
              <path d={`M${kx} ${ky + 9} c3 1 5 -1 8 1 c3 2 5 0 8 2 c3 2 5 0 7 2`} fill="none" stroke={ink} strokeOpacity="0.32" strokeWidth="0.5" />
              {[5, 13, 20].map((dx, i) => (
                <path key={dx} d={`M${kx + dx} ${ky + 9.6 + i * 2} l0.9 -1.8 l0.9 1.8 l-0.9 1.8 Z`} fill="#d9573b" fillOpacity="0.6" />
              ))}
            </g>
            {/* The kite: a two-tone diamond with its spine and bow stick */}
            <path d={`M${kx} ${ky - 8} L${kx - 7.5} ${ky} L${kx} ${ky + 9} Z`} fill="#d9573b" fillOpacity="0.72" />
            <path d={`M${kx} ${ky - 8} L${kx + 7.5} ${ky} L${kx} ${ky + 9} Z`} fill="#e7b545" fillOpacity="0.72" />
            <path d={`M${kx} ${ky - 8} L${kx - 7.5} ${ky} L${kx} ${ky + 9} L${kx + 7.5} ${ky} Z`} fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="0.5" />
            <path d={`M${kx} ${ky - 8} V${ky + 9} M${kx - 7.5} ${ky} Q${kx} ${ky - 3} ${kx + 7.5} ${ky}`} fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="0.45" />
          </g>
        </g>

        {/* The boy: a small silhouette sitting on the roof edge, legs dangling over the front, reel in his lap */}
        <g fill={ink} fillOpacity="0.42">
          <circle cx={x} cy={y - 13.5} r="2.7" />
          <path d={`M${x - 2.6} ${y - 10} Q${x} ${y - 11.1} ${x + 2.6} ${y - 10} L${x + 2.6} ${y - 1} Q${x} ${y + 0.2} ${x - 2.6} ${y - 1} Z`} />
          {/* Legs: thighs on the parapet, shins hanging down the wall; one swings gently */}
          <path d={`M${x - 2.6} ${y - 1.4} H${x - 0.4} V${y + 7.5} H${x - 2.2} Z`} />
          <path className="hk-kite-leg" style={{ transformOrigin: `${x + 1.3}px ${y}px` }} d={`M${x + 0.4} ${y - 1.4} H${x + 2.6} L${x + 2.4} ${y + 7.5} H${x + 0.6} Z`} />
          {/* Left arm holds the reel (latai) in his lap */}
          <path d={`M${x - 2.3} ${y - 9.5} L${x - 3.8} ${y - 5} L${x - 1.6} ${y - 3.6}`} fill="none" stroke={ink} strokeOpacity="0.42" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x - 1.4} cy={y - 3.4} r="1.4" fillOpacity="0.32" />
          {/* Right arm raised, holding the string; it tugs now and then */}
          <path className="hk-kite-arm" style={{ transformOrigin: `${x + 2.2}px ${y - 9.5}px` }} d={`M${x + 2.2} ${y - 9.5} L${x + 4.4} ${y - 12.4} L${HAND.x} ${HAND.y}`} fill="none" stroke={ink} strokeOpacity="0.42" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
