import type { CSSProperties, ReactNode } from "react";
import { Sketch } from "@/lib/sketch";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";

/** Shared pen-and-wash figures and section walls for the cutaway scenes (Super Shop, Pharmacy). */

export const skin = c.clay;

/**
 * A person in pen and wash, feet at (0, 0), about 78 units tall before scaling.
 *
 * Walking is a full gait cycle (see .hk-walk in globals.css): each leg swings forward quickly with the knee lifting
 * (40% of the cycle) and then pushes back steadily while planted (60%), so both feet are down for a moment; the arms
 * swing opposite the legs and the body rises a little over each planted leg. `pace` is the time for two steps and
 * `stride` how far the legs swing; set them from how fast the figure crosses the scene so the feet don't slide.
 * The figure walks the way it looks (`look`), to the right when it looks straight ahead.
 */
export function Person({
  seed,
  shirt,
  pants = "#5a6b7a",
  hair = "short",
  look = 0,
  walking = false,
  pace = 0.7,
  stride = 22,
  arms = true,
  beard = false,
  children,
}: {
  seed: number;
  shirt: string;
  pants?: string;
  hair?: "short" | "hijab" | "cap" | "bun" | "tupi";
  look?: -1 | 0 | 1;
  walking?: boolean;
  /** Seconds per gait cycle (two steps). */
  pace?: number;
  /** Leg swing either side of upright, in degrees. */
  stride?: number;
  arms?: boolean;
  /** A white beard, for an elder. */
  beard?: boolean;
  children?: ReactNode;
}) {
  const s = new Sketch(seed);
  const torso = "M-12 -32 C-13 -48 -11 -58 -6 -62 L6 -62 C11 -58 13 -48 12 -32 Z";
  const ex = look * 1.6;
  const facing = walking && look < 0 ? "scale(-1 1)" : undefined;
  const gait = walking ? ({ "--pace": `${pace}s`, "--stride": `${stride}deg` } as CSSProperties) : undefined;
  return (
    <g className={walking ? "hk-walk" : undefined} style={gait}>
      <ellipse cx="0" cy="0" rx="12" ry="2" fill={c.ink} fillOpacity="0.1" />
      {/* Legs */}
      <g transform={facing}>
      <g className={walking ? "hk-stride-a" : undefined}>
        <Occlude d="M-9 -34 L-9 -1 L-2 -1 L-1 -30 Z" />
        <Wash d="M-9 -34 L-9 -1 L-2 -1 L-1 -30 Z" fill={pants} o={0.45} />
        <P d={s.line(-9, -33, -8.5, -1, 0.3, 1)} w={0.9} />
        <P d={s.line(-1.5, -30, -2, -1, 0.3, 1)} w={0.7} />
        <P d={s.line(-10, -0.5, -1, -0.5, 0.2, 1)} w={1.2} />
      </g>
      <g className={walking ? "hk-stride-b" : undefined}>
        <Occlude d="M1 -30 L2 -1 L9 -1 L9 -34 Z" />
        <Wash d="M1 -30 L2 -1 L9 -1 L9 -34 Z" fill={pants} o={0.45} />
        <P d={s.line(9, -33, 8.5, -1, 0.3, 1)} w={0.9} />
        <P d={s.line(1.5, -30, 2, -1, 0.3, 1)} w={0.7} />
        <P d={s.line(1, -0.5, 10, -0.5, 0.2, 1)} w={1.2} />
      </g>
      </g>
      {/* Body, arms and head ride up and down a little with each step */}
      <g className={walking ? "hk-walk-body" : undefined}>
      <Occlude d={torso} />
      <Wash d={torso} fill={shirt} o={0.5} />
      <P d={s.curve([[-12, -32], [-13, -48], [-11, -58], [-6, -62]], 0.25)} w={1} />
      <P d={s.curve([[6, -62], [11, -58], [13, -48], [12, -32]], 0.25)} w={1} />
      <P d={s.line(-12, -32, 12, -32, 0.25, 1)} w={0.8} />
      <P d={s.poly([[-5, -62], [0, -55], [5, -62]], false, 0.2, 1)} w={0.7} />
      <P d={s.line(0, -55, 0, -34, 0.2, 1)} w={0.5} o={0.6} />
      {arms && (
        <g transform={facing}>
          <g className={walking ? "hk-swing-b" : undefined}>
            <P d={s.curve([[-10, -56], [-14, -46], [-14, -37]], 0.25)} w={0.9} />
            <ellipse cx="-14" cy="-35" rx="2.4" ry="2.2" fill={skin} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
          </g>
          <g className={walking ? "hk-swing-a" : undefined}>
            <P d={s.curve([[10, -56], [14, -46], [14, -37]], 0.25)} w={0.9} />
            <ellipse cx="14" cy="-35" rx="2.4" ry="2.2" fill={skin} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
          </g>
        </g>
      )}
      {/* Head */}
      {hair === "hijab" && (
        <>
          <Occlude d="M-12 -70 C-13 -89 13 -89 12 -70 C12 -62 8 -59 0 -59 C-8 -59 -12 -62 -12 -70 Z" />
          <Wash d="M-12 -70 C-13 -89 13 -89 12 -70 C12 -62 8 -59 0 -59 C-8 -59 -12 -62 -12 -70 Z" fill={c.teal} o={0.5} />
          <P d={s.curve([[-12, -70], [-12, -84], [0, -88], [12, -84], [12, -70], [10, -62], [0, -59], [-10, -62], [-12, -70]], 0.25)} w={0.9} />
        </>
      )}
      <Occlude d={s.ellipse(0, -74, 8.6, 9.4, 0)} />
      <Wash d={s.ellipse(0, -73.5, 8, 8.8, 0.2)} fill={skin} o={0.4} />
      <P d={s.curve([[-8.4, -77], [-8.6, -70], [-5, -65.5], [0, -64.6], [5, -65.5], [8.6, -70], [8.4, -77]], 0.25)} w={1} />
      {hair === "hijab" ? (
        <P d={s.curve([[-8.4, -77], [-4, -82], [4, -82], [8.4, -77]], 0.2)} w={0.7} />
      ) : hair === "tupi" ? (
        <>
          <path d="M-9.4 -77 C-9 -87 9 -87 9.4 -77 Z" fill={c.cream} />
          <P d={s.curve([[-9.4, -77], [-8.6, -84], [0, -87], [8.6, -84], [9.4, -77]], 0.2)} w={1} />
          <P d={s.line(-9.4, -77, 9.4, -77, 0.2, 1)} w={0.8} />
          <P d={s.curve([[-6, -81], [0, -83], [6, -81]], 0.2)} w={0.5} o={0.6} />
        </>
      ) : (
        <>
          <path d="M-9 -75 C-10 -86 10 -86 9 -75 C6 -80 -6 -80 -9 -75 Z" fill={c.ink} fillOpacity="0.82" />
          <P d={s.curve([[-9, -75], [-8, -84], [0, -86], [8, -84], [9, -75]], 0.25)} w={1} />
          <P d={s.curve([[-6, -79], [0, -81], [6, -79]], 0.2)} w={0.6} o={0.7} />
        </>
      )}
      {hair === "bun" && (
        <>
          <path d={s.ellipse(-7, -84, 3.8, 3.6, 0)} fill={c.ink} fillOpacity="0.82" />
          <P d={s.ellipse(-7, -84, 3.8, 3.6, 0.1)} w={0.9} />
        </>
      )}
      {hair === "cap" && (
        <>
          <Wash d="M-10 -79 C-9 -89 9 -89 10 -79 Z" fill={c.vermilion} o={0.7} />
          <P d={s.curve([[-10, -79], [-8, -87], [0, -89], [8, -87], [10, -79]], 0.2)} w={0.9} />
          <P d={s.line(look < 0 ? -18 : -4, -79, look < 0 ? 4 : 18, -79, 0.2, 1)} w={1.3} />
        </>
      )}
      <g className="hk-blink">
        <path d={`M${-4.6 + ex} -74 h2.6 M${2 + ex} -74 h2.6`} stroke={c.ink} strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <P d={s.curve([[0.4 + ex, -72.5], [-0.4 + ex, -70.2], [1 + ex, -69.6]], 0.1)} w={0.6} />
      <path d={`M${-2 + ex} -67.6 q2 1.2 4 0`} fill="none" stroke={c.ink} strokeWidth="0.8" strokeLinecap="round" />
      {beard && (
        <>
          <path d="M-7.6 -70 C-7 -62 -3.5 -58 0 -57.5 C3.5 -58 7 -62 7.6 -70 C5 -66.5 -5 -66.5 -7.6 -70 Z" fill={c.cream} />
          <P d={s.curve([[-7.6, -70], [-7, -62], [-3.5, -58], [0, -57.5], [3.5, -58], [7, -62], [7.6, -70]], 0.2)} w={0.9} />
          <P d={s.curve([[-3, -67], [0, -66.2], [3, -67]], 0.1)} w={0.7} />
        </>
      )}
      {children}
      </g>
    </g>
  );
}

/** Wall cut in section: paper, hatching and a pen outline. */
export function Section({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const s = new Sketch(x * 7 + y);
  return (
    <g>
      <Occlude d={box(x, y, w, h)} />
      <Wash d={box(x, y, w, h)} fill={c.clay} o={0.3} />
      <P d={s.hatch(x, y, w, h, 4, 0.3)} w={0.45} o={0.55} />
      <P d={s.rect(x, y, w, h, 0.4)} w={1.2} />
    </g>
  );
}

/** A wall-mounted split AC in pen and wash, top-left corner at (x, y), with a status light and cool air drifting down. */
export function AirCon({ x, y, w = 64 }: { x: number; y: number; w?: number }) {
  const s = new Sketch(x * 3 + y);
  const h = w * 0.28;
  const body = `M${x + 4} ${y} H${x + w - 4} Q${x + w} ${y} ${x + w} ${y + 4} V${y + h - 5} Q${x + w} ${y + h} ${x + w - 5} ${y + h} H${x + 5} Q${x} ${y + h} ${x} ${y + h - 5} V${y + 4} Q${x} ${y} ${x + 4} ${y} Z`;
  return (
    <g>
      <g filter="url(#hk-wobble)">
        <Occlude d={body} />
        <path d={body} fill={c.cream} />
        <Wash d={box(x + 2, y + h - 6, w - 4, 5)} fill={c.sky} o={0.3} />
        <P d={body} w={1.1} />
        <P d={s.line(x + 4, y + h - 6, x + w - 4, y + h - 6, 0.2, 1)} w={0.6} o={0.7} />
        <P d={s.line(x + 6, y + h - 3, x + w - 6, y + h - 3, 0.2, 1)} w={0.5} o={0.5} />
      </g>
      <circle cx={x + w - 9} cy={y + 5.5} r="1.3" fill="var(--color-leaf-glow)" className="hk-flicker-soft" />
      {/* Cool air */}
      {[0.25, 0.5, 0.75].map((f, i) => (
        <path key={f} d={`M${x + w * f - 4} ${y + h + 4} q2 3 0 6 q-2 3 0 6`} fill="none" stroke={c.sky} strokeWidth="0.9" strokeLinecap="round" className="hk-air" style={{ animationDelay: `${-i * 0.9}s` }} />
      ))}
    </g>
  );
}
