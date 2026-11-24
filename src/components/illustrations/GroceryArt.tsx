import { Sketch } from "@/lib/sketch";
import { P, Wash, Occlude, box, quad, palette as c } from "./ink";

/**
 * Hand-drawn scenes for the Grocery & Retail page — a contemporary Bangladeshi মুদি দোকান.
 * Products are drawn without brand names or fake packaging text.
 */

const blue = "#24346b";

/* Shared shelf contents */
function ShelfRow({ s, x, y, w, seed }: { s: Sketch; x: number; y: number; w: number; seed: number }) {
  const items: React.ReactNode[] = [];
  let cx = x + 6;
  let i = seed;
  while (cx < x + w - 24) {
    const kind = i % 4;
    const tint = [c.rice, c.marigold, c.leafWash, c.vermilion, c.sky][i % 5];
    if (kind === 0) {
      // jar
      items.push(
        <g key={cx}>
          <Wash d={box(cx + 1, y - 26, 18, 24)} fill={tint} o={0.55} />
          <P d={s.rect(cx, y - 28, 20, 28, 0.4)} w={1} />
          <P d={s.rect(cx - 1, y - 32, 22, 4, 0.3, 1)} w={0.9} />
        </g>,
      );
      cx += 26;
    } else if (kind === 1) {
      // bottle
      items.push(
        <g key={cx}>
          <Wash d={box(cx + 1, y - 24, 12, 22)} fill={c.marigold} o={0.6} />
          <P d={s.rect(cx, y - 26, 14, 26, 0.3)} w={1} />
          <P d={s.rect(cx + 4, y - 34, 6, 8, 0.2, 1)} w={0.9} />
        </g>,
      );
      cx += 19;
    } else if (kind === 2) {
      // box
      const h = 20 + (i % 3) * 5;
      items.push(
        <g key={cx}>
          <Wash d={box(cx + 1, y - h + 1, 24, h - 2)} fill={tint} o={0.5} />
          <P d={s.rect(cx, y - h, 26, h, 0.4)} w={1} />
          <P d={s.line(cx + 4, y - h / 2, cx + 22, y - h / 2, 0.2, 1)} w={0.6} />
        </g>,
      );
      cx += 31;
    } else {
      // packet
      items.push(
        <g key={cx}>
          <Wash d={quad([[cx, y], [cx + 18, y], [cx + 16, y - 24], [cx + 2, y - 24]])} fill={tint} o={0.6} />
          <P d={s.poly([[cx, y], [cx + 18, y], [cx + 16, y - 24], [cx + 2, y - 24]], true, 0.3)} w={1} />
        </g>,
      );
      cx += 23;
    }
    i++;
  }
  return (
    <g>
      {items}
      <P d={s.line(x, y, x + w, y, 0.5)} w={1.4} />
      <P d={s.line(x + 2, y + 5, x + w - 2, y + 5, 0.3, 1)} w={0.7} />
    </g>
  );
}

/* ---------------- Counter with ledger + calculator (top-down-ish) ---------------- */
export function CounterArt({ className }: { className?: string }) {
  const s = new Sketch(1301);
  return (
    <svg viewBox="0 0 520 340" className={className} aria-hidden="true">
      <g filter="url(#hk-wobble)" className="text-ink">
        <Wash d={box(10, 30, 500, 300)} fill={c.clay} o={0.3} />
        <P d={s.rect(10, 30, 500, 300, 0.6)} w={1.4} />
        {[90, 170, 250].map((y) => (
          <P key={y} d={s.line(14, y, 506, y + 2, 0.4, 1)} w={0.5} o={0.5} />
        ))}
        {/* Open ledger */}
        <Wash d={quad([[40, 66], [330, 56], [340, 300], [32, 306]])} fill={c.vermilion} o={0.8} />
        <path d={quad([[48, 72], [182, 66], [184, 294], [42, 298]])} fill="#fbf6ea" />
        <path d={quad([[190, 66], [324, 62], [332, 292], [190, 294]])} fill="#fbf6ea" />
        <P d={s.poly([[48, 72], [182, 66], [184, 294], [42, 298]], true, 0.4)} w={1.2} />
        <P d={s.poly([[190, 66], [324, 62], [332, 292], [190, 294]], true, 0.4)} w={1.2} />
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <P d={s.line(50, 96 + i * 22, 182, 94 + i * 22, 0.2, 1)} w={0.6} c={c.sky} o={0.5} />
            <P d={s.line(192, 94 + i * 22, 326, 92 + i * 22, 0.2, 1)} w={0.6} c={c.sky} o={0.5} />
          </g>
        ))}
        <P d={s.line(66, 74, 64, 296, 0.3, 1)} w={0.8} c={c.vermilion} o={0.6} />
        {[0, 1, 2, 3].map((i) => (
          <P key={i} d={s.curve([[74, 110 + i * 22], [100, 108 + i * 22], [130, 111 + i * 22], [168, 108 + i * 22]], 0.4)} w={1.1} c={blue} />
        ))}
        {/* Calculator */}
        <Wash d={box(372, 70, 104, 150)} fill="#e8e6df" o={0.95} />
        <P d={s.rect(370, 68, 108, 154, 0.4)} w={1.5} />
        <path d={box(384, 82, 80, 26)} fill="#c9d8cc" />
        <P d={s.rect(384, 82, 80, 26, 0.2)} w={1} />
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, k) => <P key={`${r}${k}`} d={s.rect(386 + k * 20, 120 + r * 24, 14, 16, 0.2, 1)} w={0.8} />),
        )}
        {/* Pen */}
        <P d={s.line(352, 250, 420, 300, 0.2)} w={4} c={c.ink} />
        <P d={s.line(352, 250, 344, 244, 0.1, 1)} w={2} c={c.marigold} />
      </g>
    </svg>
  );
}

/* ---------------- Shelf with four everyday products ---------------- */
export const shelfSpots = { rice: 70, oil: 190, lentil: 310, sugar: 430 } as const;
export function ProductShelfArt({ className }: { className?: string }) {
  const s = new Sketch(1401);
  const [rx, ox, lx, sx] = [shelfSpots.rice, shelfSpots.oil, shelfSpots.lentil, shelfSpots.sugar];
  return (
    <svg viewBox="0 76 520 164" className={className} aria-hidden="true">
      <g filter="url(#hk-wobble)" className="text-ink">
        {/* Rice sack */}
        <Wash d={`M${rx - 44} 196 C${rx - 48} 150 ${rx - 46} 120 ${rx - 36} 108 L${rx + 36} 108 C${rx + 46} 120 ${rx + 48} 150 ${rx + 44} 196 Z`} fill={c.rice} o={0.8} />
        <P d={s.curve([[rx - 44, 196], [rx - 48, 150], [rx - 46, 120], [rx - 36, 108]], 0.4)} w={1.4} />
        <P d={s.curve([[rx + 36, 108], [rx + 46, 120], [rx + 48, 150], [rx + 44, 196]], 0.4)} w={1.4} />
        <path d={`M${rx - 36} 110 C${rx - 20} 92 ${rx} 100 ${rx + 8} 90 C${rx + 20} 98 ${rx + 30} 96 ${rx + 36} 110 Z`} fill="#F3E9D2" />
        <P d={s.curve([[rx - 36, 110], [rx - 20, 92], [rx, 100], [rx + 8, 90], [rx + 20, 98], [rx + 36, 110]], 0.3)} w={1.1} />
        <P d={s.curve([[rx - 40, 122], [rx, 128], [rx + 40, 122]], 0.3)} w={1} />
        {/* Oil bottles */}
        {[-22, 2, 26].map((d, i) => (
          <g key={d}>
            <Wash d={box(ox + d - 9, 120 + i * 2, 18, 74 - i * 2)} fill={c.marigold} o={0.7} />
            <P d={s.rect(ox + d - 10, 118 + i * 2, 20, 78 - i * 2, 0.3)} w={1.2} />
            <P d={s.rect(ox + d - 4, 100 + i * 2, 8, 18, 0.2, 1)} w={1} />
            <Wash d={box(ox + d - 5, 94 + i * 2, 10, 7)} fill={c.leafDeep} o={0.8} />
            <P d={s.rect(ox + d - 8, 140, 16, 20, 0.2, 1)} w={0.7} o={0.6} />
          </g>
        ))}
        {/* Lentil jar */}
        <Wash d={box(lx - 34, 120, 68, 74)} fill="#f3d6cc" o={0.5} />
        <Wash d={box(lx - 32, 142, 64, 50)} fill={c.vermilion} o={0.7} />
        <P d={s.curve([[lx - 36, 112], [lx - 38, 150], [lx - 36, 196], [lx, 199], [lx + 36, 196], [lx + 38, 150], [lx + 36, 112]], 0.4)} w={1.4} />
        <P d={s.rect(lx - 32, 98, 64, 14, 0.3)} w={1.3} />
        <Wash d={box(lx - 31, 99, 62, 12)} fill={c.leafDeep} o={0.55} />
        {/* Sugar packets */}
        {[-24, 6].map((d, i) => (
          <g key={d}>
            <Wash d={quad([[sx + d - 18, 196], [sx + d + 18, 196], [sx + d + 15, 128 + i * 10], [sx + d - 15, 128 + i * 10]])} fill="#fbfaf6" o={1} />
            <P d={s.poly([[sx + d - 18, 196], [sx + d + 18, 196], [sx + d + 15, 128 + i * 10], [sx + d - 15, 128 + i * 10]], true, 0.4)} w={1.2} />
            <P d={s.line(sx + d - 15, 140 + i * 10, sx + d + 15, 140 + i * 10, 0.2, 1)} w={0.8} c={c.sky} />
          </g>
        ))}
        {/* Shelf plank */}
        <Wash d={box(8, 198, 504, 16)} fill={c.clay} o={0.55} />
        <P d={s.rect(8, 196, 504, 18, 0.6)} w={1.7} />
        <P d={s.hatch(10, 214, 500, 14, 6, 0.4)} w={0.6} o={0.4} />
      </g>
    </svg>
  );
}

/* ---------------- Supplier delivery: rickshaw-van with sacks ---------------- */
export function DeliveryArt({ className }: { className?: string }) {
  const s = new Sketch(1501);
  const wheel = (cx: number, cy: number, r: number) => (
    <g>
      <P d={s.ellipse(cx, cy, r, r, 0.5)} w={1.6} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <P key={i} d={s.line(cx, cy, cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4), 0.2, 1)} w={0.5} />;
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 520 320" className={className} aria-hidden="true">
      <g filter="url(#hk-wobble)" className="text-ink">
        {/* Van flatbed with sacks */}
        <Wash d={box(150, 186, 250, 16)} fill={c.clay} o={0.6} />
        <P d={s.rect(150, 184, 250, 18, 0.5)} w={1.5} />
        {[[170, 0], [226, 0], [282, 0], [198, -38], [254, -38]].map(([x, dy], i) => (
          <g key={i}>
            <Wash d={`M${x} ${184 + dy} C${x - 2} ${160 + dy} ${x + 2} ${148 + dy} ${x + 8} ${146 + dy} L${x + 48} ${146 + dy} C${x + 54} ${148 + dy} ${x + 58} ${160 + dy} ${x + 56} ${184 + dy} Z`} fill={c.rice} o={0.85} />
            <P d={s.curve([[x, 184 + dy], [x - 2, 160 + dy], [x + 2, 148 + dy], [x + 8, 146 + dy], [x + 48, 146 + dy], [x + 54, 148 + dy], [x + 58, 160 + dy], [x + 56, 184 + dy]], 0.3)} w={1.2} />
            <P d={s.line(x + 10, 156 + dy, x + 46, 156 + dy, 0.2, 1)} w={0.7} c={c.leafDeep} o={0.6} />
          </g>
        ))}
        {wheel(190, 240, 34)}
        {wheel(370, 240, 34)}
        <P d={s.line(400, 194, 452, 212, 0.4)} w={1.6} />
        {wheel(462, 250, 24)}
        <P d={s.line(452, 212, 460, 168, 0.3)} w={1.5} />
        <P d={s.line(444, 166, 476, 164, 0.3)} w={1.6} />
        {/* Delivery worker carrying a sack on his shoulder */}
        <Occlude d="M70 300 C70 250 80 214 104 206 L128 206 C148 214 156 250 154 300 Z" />
        <Wash d="M70 300 C70 250 80 214 104 206 L128 206 C148 214 156 250 154 300 Z" fill={c.sky} o={0.5} />
        <P d={s.curve([[70, 300], [70, 250], [80, 214], [104, 206]], 0.4)} w={1.4} />
        <P d={s.curve([[128, 206], [148, 214], [156, 250], [154, 300]], 0.4)} w={1.4} />
        <Wash d="M64 206 C60 184 70 170 90 168 L150 172 C164 178 166 196 156 206 Z" fill={c.rice} o={0.9} />
        <P d={s.curve([[64, 206], [60, 184], [70, 170], [90, 168], [150, 172], [164, 178], [166, 196], [156, 206]], 0.4)} w={1.3} />
        <Wash d={s.ellipse(116, 196, 14, 15, 0.2)} fill={c.clay} o={0.6} />
        <P d={s.ellipse(116, 196, 14, 15, 0.3)} w={1.3} />
        <P d={s.curve([[100, 230], [86, 214], [90, 196]], 0.3)} w={1.3} />
        <P d={s.line(0, 280, 520, 280, 0.8)} w={1.4} />
      </g>
    </svg>
  );
}

/* ---------------- বাকি: a regular customer and the shopkeeper who trusts him ---------------- */
/**
 * The dues story in one frame: an elderly regular in a white panjabi and tupi, bazar bag in hand, puts his
 * hand on his chest and promises to pay at month-end (speech bubble: a calendar with its last day ringed, and
 * ৳). Behind the counter the shopkeeper notes it on his phone and it is saved (green tick); the old red khata
 * lies closed beside the scale. Around them: shelves, hanging snack strips, sweet jars, a calendar, a tube light.
 */
export function RegularCustomerArt({ className }: { className?: string }) {
  const s = new Sketch(1601);
  const skin = c.clay;
  const white = "#f7f3ea";
  return (
    <svg viewBox="0 0 560 400" className={className} aria-hidden="true">
      <g filter="url(#hk-wobble)" className="text-ink">
        {/* Tube light and its glow */}
        <Wash d={s.ellipse(286, 22, 90, 18, 0.2)} fill="#fff3c4" o={0.7} />
        <P d={s.rect(236, 14, 100, 7, 0.2)} w={1.2} />
        <P d={s.line(250, 14, 248, 4, 0.1, 1)} w={0.8} />
        <P d={s.line(322, 14, 324, 4, 0.1, 1)} w={0.8} />

        {/* Wall calendar */}
        <Wash d={box(24, 34, 56, 66)} fill={c.cream} o={0.95} />
        <Wash d={box(24, 34, 56, 14)} fill={c.vermilion} o={0.75} />
        <P d={s.rect(24, 34, 56, 66, 0.3)} w={1.2} />
        <P d={s.line(52, 34, 52, 26, 0.1, 1)} w={1} />
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 4 }, (_, k) => <circle key={`${r}${k}`} cx={32 + k * 12} cy={58 + r * 12} r="1.6" fill={c.ink} opacity="0.45" />),
        )}
        <P d={s.ellipse(68, 82, 6, 5, 0.3)} w={1.2} c={c.leafDeep} />

        {/* Shelves */}
        <ShelfRow s={s} x={100} y={112} w={440} seed={4} />
        <ShelfRow s={s} x={100} y={172} w={440} seed={7} />

        {/* Snack strips hanging from the lower shelf, between customer and shopkeeper */}
        {[282, 304].map((x, k) => (
          <g key={x}>
            <P d={s.line(x, 178, x, 238, 0.2, 1)} w={0.7} o={0.6} />
            {[0, 1, 2].map((n) => {
              const y = 184 + n * 19;
              const tint = [c.marigold, c.vermilion, c.sky, c.leafWash][(n + k) % 4];
              return (
                <g key={n}>
                  <Wash d={quad([[x - 9, y], [x + 9, y], [x + 8, y + 16], [x - 8, y + 16]])} fill={tint} o={0.75} />
                  <P d={s.poly([[x - 9, y], [x + 9, y], [x + 8, y + 16], [x - 8, y + 16]], true, 0.3)} w={0.9} />
                </g>
              );
            })}
          </g>
        ))}

        {/* Shopkeeper behind the counter (right) */}
        <Occlude d="M346 284 C348 252 366 236 390 232 L414 232 C438 236 454 252 456 284 Z" />
        <Wash d="M346 284 C348 252 366 236 390 232 L414 232 C438 236 454 252 456 284 Z" fill={c.sky} o={0.6} />
        <P d={s.curve([[346, 284], [348, 252], [366, 236], [390, 232], [414, 232], [438, 236], [454, 252], [456, 284]], 0.4)} w={1.5} />
        <P d={s.curve([[392, 234], [402, 248], [412, 234]], 0.2)} w={1.1} />
        <Occlude d={s.ellipse(402, 200, 26, 28, 0)} />
        <Wash d={s.ellipse(402, 202, 23, 25, 0.2)} fill={skin} o={0.5} />
        <P d={s.ellipse(402, 202, 24, 26, 0.4)} w={1.4} />
        <Wash d="M378 196 C374 168 430 166 426 196 C420 182 386 182 378 196 Z" fill={c.ink} o={0.85} />
        <P d={s.curve([[392, 196], [395, 193], [398, 196]], 0.1)} w={1.2} />
        <P d={s.curve([[406, 196], [409, 193], [412, 196]], 0.1)} w={1.2} />
        <P d={s.curve([[394, 212], [402, 215], [410, 212]], 0.1)} w={2} />
        <P d={s.curve([[396, 219], [402, 222], [408, 219]], 0.1)} w={1.1} />
        {/* His arm and the phone he notes the dues on */}
        <P d={s.curve([[446, 250], [458, 262], [462, 270]], 0.3)} w={1.5} />
        <g transform="rotate(-12 462 252)">
          <Wash d={box(450, 232, 24, 40)} fill={c.ink} o={0.9} />
          <path d={box(453, 237, 18, 28)} fill={c.leafWash} opacity="0.85" />
          <P d={s.rect(450, 232, 24, 40, 0.2)} w={1.2} />
        </g>
        <Wash d={s.ellipse(462, 272, 8, 7, 0.2)} fill={skin} o={0.7} />
        <P d={s.ellipse(462, 272, 8, 7, 0.3)} w={1.2} />
        {/* Saved: green tick rising from the phone */}
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={476 + k * 5} cy={226 - k * 6} r={1.4 + k * 0.4} fill={c.leaf} />
        ))}
        <Wash d={s.ellipse(500, 202, 15, 15, 0.2)} fill={c.leaf} o={0.9} />
        <P d={s.ellipse(500, 202, 15, 15, 0.3)} w={1.2} c={c.leafDeep} />
        <path d="M493 202 l5 5 l9 -10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Counter */}
        <Occlude d={box(262, 282, 298, 118)} />
        <Wash d={box(262, 282, 298, 12)} fill={c.clay} o={0.7} />
        <Wash d={box(264, 294, 294, 106)} fill={c.clay} o={0.32} />
        <P d={s.poly([[268, 282], [556, 282], [560, 294], [262, 294]], true, 0.5)} w={1.5} />
        <P d={s.rect(262, 294, 298, 106, 0.5)} w={1.5} />
        {[336, 410, 484].map((x) => (
          <P key={x} d={s.line(x, 300, x, 396, 0.3, 1)} w={0.7} o={0.5} />
        ))}
        <P d={s.hatch(266, 360, 290, 36, 7, 0.4)} w={0.5} o={0.3} />

        {/* On the counter: scale, the old red khata (closed, set aside), sweet jars */}
        <Wash d={box(290, 254, 40, 28)} fill={c.cream} o={0.95} />
        <P d={s.rect(290, 254, 40, 28, 0.3)} w={1.2} />
        <P d={s.ellipse(310, 266, 8, 8, 0.2)} w={1} />
        <P d={s.line(310, 266, 314, 260, 0.1, 1)} w={1} c={c.vermilion} />
        <Wash d={s.ellipse(310, 250, 26, 5, 0.2)} fill="#cfd6d6" o={0.9} />
        <P d={s.ellipse(310, 250, 26, 5, 0.3)} w={1.1} />
        <Wash d={quad([[338, 282], [392, 282], [386, 270], [344, 270]])} fill={c.vermilion} o={0.85} />
        <P d={s.poly([[338, 282], [392, 282], [386, 270], [344, 270]], true, 0.3)} w={1.1} />
        <P d={s.line(358, 270, 356, 282, 0.1, 1)} w={1.6} c={c.marigold} />
        {[506, 536].map((x, k) => (
          <g key={x}>
            <Wash d={box(x - 13, 248, 26, 34)} fill="#e6f1f2" o={0.7} />
            {Array.from({ length: 7 }, (_, n) => (
              <circle key={n} cx={x - 8 + (n % 4) * 5 + (k ? 1 : 0)} cy={274 - Math.floor(n / 4) * 6} r="2.2" fill={[c.vermilion, c.marigold, c.leafWash, c.plum][(n + k) % 4]} opacity="0.85" />
            ))}
            <P d={s.rect(x - 13, 248, 26, 34, 0.3)} w={1.1} />
            <Wash d={box(x - 11, 241, 22, 7)} fill={c.leafDeep} o={0.7} />
            <P d={s.rect(x - 11, 241, 22, 7, 0.2, 1)} w={1} />
          </g>
        ))}

        {/* Regular customer (left): white panjabi, tupi, beard; hand on his chest — "I'll pay at month-end" */}
        <Occlude d="M96 400 C98 322 114 270 150 252 L194 252 C228 270 242 322 244 400 Z" />
        <Wash d="M96 400 C98 322 114 270 150 252 L194 252 C228 270 242 322 244 400 Z" fill={white} o={1} />
        <P d={s.curve([[96, 400], [98, 322], [114, 270], [150, 252], [194, 252], [228, 270], [242, 322], [244, 400]], 0.5)} w={1.5} />
        <P d={s.line(172, 256, 172, 300, 0.2, 1)} w={1} />
        {[266, 278, 290].map((y) => (
          <circle key={y} cx="172" cy={y} r="1.4" fill={c.ink} opacity="0.6" />
        ))}
        <P d={s.curve([[154, 254], [172, 266], [190, 254]], 0.2)} w={1.1} />
        {/* Head, tupi and white beard */}
        <Occlude d={s.ellipse(172, 218, 27, 30, 0)} />
        <Wash d={s.ellipse(172, 220, 24, 27, 0.2)} fill={skin} o={0.5} />
        <P d={s.ellipse(172, 220, 25, 28, 0.4)} w={1.4} />
        <Wash d="M147 208 C148 186 196 186 197 208 Z" fill={white} o={1} />
        <P d={s.curve([[147, 208], [150, 188], [172, 184], [194, 188], [197, 208]], 0.3)} w={1.3} />
        <P d={s.line(148, 208, 196, 208, 0.2, 1)} w={1.2} />
        <P d={s.line(156, 200, 188, 200, 0.2, 1)} w={0.6} o={0.5} />
        <Wash d="M150 226 C150 256 194 256 194 226 C186 238 158 238 150 226 Z" fill="#ece8e0" o={1} />
        <P d={s.curve([[150, 226], [152, 246], [172, 254], [192, 246], [194, 226]], 0.3)} w={1.1} />
        <P d={s.curve([[160, 216], [164, 212], [168, 216]], 0.1)} w={1.2} />
        <P d={s.curve([[176, 216], [180, 212], [184, 216]], 0.1)} w={1.2} />
        <P d={s.curve([[164, 232], [172, 236], [180, 232]], 0.1)} w={1.6} />
        {/* Right hand on his chest */}
        <P d={s.curve([[214, 272], [206, 292], [190, 300]], 0.3)} w={1.4} />
        <Wash d={s.ellipse(186, 298, 10, 8, 0.2)} fill={skin} o={0.7} />
        <P d={s.ellipse(186, 298, 10, 8, 0.3)} w={1.2} />
        {/* Left hand holding his bazar bag: greens and a lau sticking out */}
        <P d={s.curve([[124, 276], [112, 304], [104, 330]], 0.3)} w={1.4} />
        <Wash d={s.ellipse(104, 334, 7, 6, 0.2)} fill={skin} o={0.7} />
        <Wash d={s.ellipse(100, 300, 9, 30, 0.2)} fill="#c7dfa4" o={0.9} />
        <P d={s.ellipse(100, 300, 9, 30, 0.3)} w={1.1} />
        {[[70, 300], [78, 292], [86, 302]].map(([x, y]) => (
          <g key={x}>
            <P d={s.line(x + 6, 342, x, y, 0.3, 1)} w={1} c={c.leafDeep} />
            <Wash d={s.ellipse(x, y, 5, 9, 0.2)} fill={c.leafWash} o={0.85} />
          </g>
        ))}
        <Wash d="M64 340 L124 340 L118 396 L70 396 Z" fill={c.rice} o={0.95} />
        <P d={s.poly([[64, 340], [124, 340], [118, 396], [70, 396]], true, 0.4)} w={1.3} />
        <P d={s.curve([[80, 340], [92, 322], [104, 340]], 0.2)} w={1.2} />
        <P d={s.line(68, 360, 120, 360, 0.2, 1)} w={0.7} c={c.vermilion} o={0.7} />

        {/* Speech bubble: month-end on the calendar, and taka */}
        <Occlude d="M214 112 h104 a12 12 0 0 1 12 12 v38 a12 12 0 0 1 -12 12 h-66 l-34 24 l10 -24 h-14 a12 12 0 0 1 -12 -12 v-38 a12 12 0 0 1 12 -12 z" />
        <path d="M214 112 h104 a12 12 0 0 1 12 12 v38 a12 12 0 0 1 -12 12 h-66 l-34 24 l10 -24 h-14 a12 12 0 0 1 -12 -12 v-38 a12 12 0 0 1 12 -12 z" fill={c.cream} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <Wash d={box(220, 124, 40, 38)} fill={c.cream} o={1} />
        <Wash d={box(220, 124, 40, 9)} fill={c.vermilion} o={0.75} />
        <P d={s.rect(220, 124, 40, 38, 0.2)} w={1.1} />
        {Array.from({ length: 2 }, (_, r) =>
          Array.from({ length: 4 }, (_, k) => <circle key={`${r}${k}`} cx={226 + k * 9} cy={142 + r * 9} r="1.3" fill={c.ink} opacity="0.45" />),
        )}
        <P d={s.ellipse(253, 151, 5, 4.5, 0.2)} w={1.3} c={c.leafDeep} />
        <P d={s.line(268, 144, 286, 144, 0.2, 1)} w={1.3} o={0.7} />
        <P d={s.poly([[281, 139], [287, 144], [281, 149]], false, 0.1, 1)} w={1.3} o={0.7} />
        <text x="306" y="156" textAnchor="middle" fontSize="30" fontWeight="700" fill={c.leafDeep} fontFamily="var(--font-sans)">
          ৳
        </text>

        {/* Floor */}
        <P d={s.line(0, 398, 560, 398, 0.6)} w={1.3} />
      </g>
    </svg>
  );
}
