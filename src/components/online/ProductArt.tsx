import type { ReactNode } from "react";
import type { ThemeKey } from "./StorePreview";

/**
 * Pen-and-wash product pictures for the sample online stores: one drawing per product, in the same order
 * as onlineStore.themes.items[theme].products. Flat colour washes with an ink outline, drawn on a 100×100
 * canvas so they sit on the theme's coloured tile. `accent` colours the details that follow the store's theme.
 */
export function ProductArt({ theme, index, accent, className }: { theme: ThemeKey; index: number; accent: string; className?: string }) {
  const ink = theme === "electronics" ? "#d7e6f7" : "#2b2622";
  const draw = art[theme][index % art[theme].length];
  const c = { ink, accent };
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Shadow on the shelf */}
      <ellipse cx="50" cy="86" rx="31" ry="3.6" fill={theme === "electronics" ? "#000" : ink} opacity={theme === "electronics" ? 0.35 : 0.1} filter="url(#hk-wash-sm)" />
      {/* Watercolour wash: the colours alone, bled and nudged a little off the lines */}
      <g fill="none" stroke="none" transform="translate(1.4 1.6)" filter="url(#hk-wash-sm)" opacity="0.95" className="[&_text]:hidden">
        {draw(c)}
      </g>
      {/* Pen work on top: thinner colour so the wash shows through, and a hand tremor on the lines */}
      <g fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.6" filter="url(#hk-wobble-sm)">
        {draw(c)}
      </g>
    </svg>
  );
}

type Draw = (c: { ink: string; accent: string }) => ReactNode;

const dots = (pts: [number, number][], r: number, fill: string) => pts.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={fill} stroke="none" />);

const art: Record<ThemeKey, Draw[]> = {
  fashion: [
    // Jamdani sari, folded, with its border and a draped end
    ({ accent }) => (
      <>
        <rect x="18" y="58" width="62" height="24" rx="3" fill="#f7efe2" />
        <rect x="18" y="75" width="62" height="4" fill={accent} stroke="none" />
        <rect x="24" y="38" width="54" height="21" rx="3" fill="#fffaf2" />
        <rect x="24" y="52" width="54" height="4" fill={accent} stroke="none" />
        {[32, 42, 52, 62].map((x) => (
          <path key={x} d={`M${x} 41.5 l3.2 3.5 -3.2 3.5 -3.2 -3.5z`} fill="#d4a017" stroke="none" />
        ))}
        <path d="M70 38 q12 12 7 40 l-9 3 q3 -22 -6 -40z" fill={accent} />
        <path d="M71 50 q4 6 2 14" stroke="#f5d48a" strokeWidth="1.4" />
      </>
    ),
    // Cotton panjabi on a hanger
    ({ accent, ink }) => (
      <>
        <path d="M50 12 q6 0 6 5 q0 4 -6 6 v3" />
        <path d="M36 31 L28 35 L18 53 L27 57 L32 46 L32 84 L68 84 L68 46 L73 57 L82 53 L72 35 L64 31 Q57 38 50 38 Q43 38 36 31 Z" fill="#fdf6e9" />
        <path d="M43 34 q7 9 14 0" stroke={accent} strokeWidth="1.6" />
        <path d="M50 38 V60" />
        {dots([[50, 44], [50, 50], [50, 56]], 1.4, ink)}
        <path d="M32 80 H68" stroke={accent} strokeWidth="1.4" strokeDasharray="2 2.5" />
      </>
    ),
    // Nakshi kantha: a folded quilt with running stitches and a lotus
    ({ accent }) => (
      <>
        <rect x="16" y="24" width="68" height="56" rx="3" fill="#f4e3c3" />
        <rect x="22" y="30" width="56" height="44" rx="2" stroke={accent} strokeDasharray="3 3" strokeWidth="1.6" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="50" cy="44" rx="3.6" ry="6.5" transform={`rotate(${a} 50 52)`} stroke={accent} strokeWidth="1.6" fill="#fbe7c8" />
        ))}
        <circle cx="50" cy="52" r="3.6" fill={accent} stroke="none" />
        <path d="M27 36 q4 -3 7 0 M66 36 q4 -3 7 0 M27 68 q4 3 7 0 M66 68 q4 3 7 0" stroke="#1d4ed8" strokeWidth="1.4" />
      </>
    ),
    // Leather sandals, a pair
    ({ accent }) => (
      <>
        <ellipse cx="38" cy="52" rx="12" ry="28" transform="rotate(-8 38 52)" fill="#9a6232" />
        <ellipse cx="38" cy="52" rx="8.5" ry="24" transform="rotate(-8 38 52)" fill="#c58a52" stroke="none" />
        <path d="M27 44 q11 -9 22 0" stroke="#5c3a1a" strokeWidth="5" />
        <path d="M36 30 q3 -5 6 1" stroke={accent} strokeWidth="2.4" />
        <ellipse cx="63" cy="54" rx="12" ry="28" transform="rotate(8 63 54)" fill="#9a6232" />
        <ellipse cx="63" cy="54" rx="8.5" ry="24" transform="rotate(8 63 54)" fill="#c58a52" stroke="none" />
        <path d="M52 47 q11 -9 22 0" stroke="#5c3a1a" strokeWidth="5" />
        <path d="M60 32 q3 -5 6 1" stroke={accent} strokeWidth="2.4" />
      </>
    ),
    // Block-print kurti
    ({ accent }) => (
      <>
        <path d="M38 18 L26 24 L17 44 L26 48 L32 36 L30 84 L70 84 L68 36 L74 48 L83 44 L74 24 L62 18 Q56 27 50 27 Q44 27 38 18 Z" fill="#fbe3d4" />
        {[40, 50, 60].flatMap((x) =>
          [42, 54, 66].map((y) => (
            <g key={`${x}-${y}`} stroke="none">
              <circle cx={x} cy={y} r="3.2" fill="#b45309" />
              <circle cx={x} cy={y} r="1.2" fill="#fbe3d4" />
            </g>
          )),
        )}
        <rect x="30" y="76" width="40" height="4" fill={accent} stroke="none" />
        <path d="M44 22 q6 7 12 0" stroke={accent} strokeWidth="1.6" />
      </>
    ),
    // Jute tote bag
    ({ accent }) => (
      <>
        <path d="M36 40 q0 -22 14 -22 q14 0 14 22" stroke="#8a6a2b" strokeWidth="3.4" />
        <path d="M22 40 L78 40 L73 84 L27 84 Z" fill="#d6b36a" />
        {[48, 55, 62, 69, 76].map((y) => (
          <path key={y} d={`M${24 + (y - 40) * 0.1} ${y} H${76 - (y - 40) * 0.1}`} stroke="#a8843f" strokeWidth="1" />
        ))}
        <rect x="39" y="52" width="22" height="15" rx="2" fill="#fff7ea" />
        <path d="M50 63 c-6 -4 -4 -9 0 -6 c4 -3 6 2 0 6z" fill={accent} stroke="none" />
      </>
    ),
  ],
  electronics: [
    // Wireless earbuds and their case
    ({ accent }) => (
      <>
        <rect x="27" y="48" width="46" height="32" rx="15" fill="#e8eef5" />
        <path d="M27 61 H73" />
        <circle cx="50" cy="71" r="1.8" fill={accent} stroke="none" />
        <circle cx="38" cy="30" r="6.5" fill="#f8fafc" />
        <rect x="35.5" y="32" width="5" height="12" rx="2.5" fill="#f8fafc" />
        <circle cx="62" cy="30" r="6.5" fill="#f8fafc" />
        <rect x="59.5" y="32" width="5" height="12" rx="2.5" fill="#f8fafc" />
      </>
    ),
    // Power bank charging
    ({ accent }) => (
      <>
        <rect x="31" y="18" width="38" height="62" rx="8" fill="#334155" />
        <path d="M53 30 l-9 14 h7 l-4 13 l11 -16 h-7z" fill={accent} stroke="none" />
        {dots([[41, 70], [47, 70], [53, 70]], 1.8, accent)}
        <circle cx="59" cy="70" r="1.8" fill="#64748b" stroke="none" />
        <path d="M50 80 q0 8 12 8 h14" />
      </>
    ),
    // Smart watch
    ({ accent }) => (
      <>
        <rect x="40" y="12" width="20" height="24" rx="4" fill="#475569" />
        <rect x="40" y="64" width="20" height="24" rx="4" fill="#475569" />
        <rect x="31" y="31" width="38" height="38" rx="10" fill="#0f172a" />
        <rect x="69" y="44" width="4" height="11" rx="1.5" fill="#94a3b8" />
        <circle cx="50" cy="50" r="10" stroke="#1e3a5f" strokeWidth="3" />
        <path d="M50 40 a10 10 0 0 1 9.5 13" stroke={accent} strokeWidth="3" />
        <circle cx="50" cy="50" r="1.6" fill={accent} stroke="none" />
      </>
    ),
    // USB-C charger
    ({ accent }) => (
      <>
        <path d="M41 30 V18 M57 30 V18" strokeWidth="3.4" />
        <rect x="31" y="29" width="38" height="40" rx="7" fill="#f8fafc" />
        <circle cx="50" cy="45" r="4" fill={accent} stroke="none" />
        <path d="M50 69 q0 13 13 13 h6" />
        <rect x="68" y="78" width="12" height="8" rx="2.5" fill="#cbd5e1" />
      </>
    ),
    // Bluetooth speaker
    ({ accent }) => (
      <>
        <rect x="27" y="24" width="46" height="56" rx="18" fill="#1e293b" />
        {[34, 42, 50, 58, 66].flatMap((x) => [38, 46, 54].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#64748b" stroke="none" />))}
        <rect x="27" y="66" width="46" height="5" fill={accent} stroke="none" />
        <path d="M78 30 q5 6 0 12 M83 26 q9 10 0 20" stroke={accent} strokeWidth="1.8" />
      </>
    ),
    // Phone on a stand
    ({ accent }) => (
      <>
        <path d="M27 84 h46 l-6 -7 h-34z" fill="#94a3b8" />
        <path d="M54 77 L45 44" strokeWidth="4" />
        <g transform="rotate(-12 53 45)">
          <rect x="40" y="18" width="27" height="48" rx="5" fill="#0f172a" />
          <rect x="43.5" y="23" width="20" height="36" rx="2" fill={accent} opacity="0.55" stroke="none" />
        </g>
      </>
    ),
  ],
  grocery: [
    // Miniket rice, 5 kg sack
    ({ accent }) => (
      <>
        <path d="M30 32 Q25 58 29 84 H71 Q75 58 70 32 Z" fill="#f5ecd7" />
        <path d="M30 32 Q50 24 70 32" />
        <path d="M42 29 q8 -11 16 0" strokeWidth="2.4" />
        <rect x="37" y="50" width="26" height="18" rx="2" fill={accent} />
        <path d="M44 59 q6 -6 12 0 q-6 6 -12 0z" fill="#fef3c7" stroke="none" />
        {dots([[24, 82], [28, 85], [78, 83], [74, 86]], 1.3, "#e7d8b4")}
      </>
    ),
    // Soybean oil, 2 litre bottle
    ({ accent }) => (
      <>
        <rect x="42" y="11" width="16" height="7" rx="2" fill="#dc2626" />
        <path d="M43 18 h14 v7 q15 6 15 21 v34 a4 4 0 0 1 -4 4 h-36 a4 4 0 0 1 -4 -4 v-34 q0 -15 15 -21z" fill="#fde68a" />
        <path d="M66 34 q8 2 8 12 v10" strokeWidth="3" />
        <rect x="31" y="50" width="38" height="20" rx="2" fill="#fffbeb" />
        <path d="M43 61 q7 -8 14 0 q-7 7 -14 0z" fill={accent} stroke="none" />
      </>
    ),
    // Masoor lentils in a bowl
    () => (
      <>
        <path d="M25 52 q25 -24 50 0z" fill="#f97316" />
        {dots([[38, 46], [45, 42], [52, 40], [59, 43], [63, 48], [48, 47], [41, 50], [56, 49]], 1.3, "#fdba74")}
        <path d="M22 52 h56 q-4 28 -28 28 q-24 0 -28 -28z" fill="#fffaf0" />
        <path d="M30 60 h40" stroke="#c2410c" strokeWidth="1.4" strokeDasharray="3 3" />
      </>
    ),
    // A dozen eggs in a tray
    () => (
      <>
        {[28, 42, 58, 72].map((x, k) => (
          <ellipse key={x} cx={x} cy={46 + (k % 2) * 2} rx="7" ry="9" fill="#fbf3e4" />
        ))}
        {[34, 50, 66].map((x) => (
          <ellipse key={x} cx={x} cy="58" rx="7" ry="9" fill="#f3e1c2" />
        ))}
        <path d="M16 62 h68 l-4 20 h-60z" fill="#d6c7a8" />
        <path d="M24 70 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0" stroke="#a8916a" strokeWidth="1.4" />
      </>
    ),
    // Sugar, 1 kg packet
    ({ accent }) => (
      <>
        <path d="M33 22 h34 l3 58 h-40z" fill="#ffffff" />
        <path d="M33 22 l3 4 l3 -4 l3 4 l3 -4 l3 4 l3 -4 l3 4 l3 -4 l3 4 l3 -4 l3 4 l2 -4" strokeWidth="1.4" />
        <rect x="37" y="42" width="27" height="20" rx="10" fill={accent} />
        <path d="M44 52 h13" stroke="#fff" strokeWidth="2.4" />
        <path d="M18 84 q12 -15 24 0z" fill="#ffffff" />
        {dots([[26, 80], [31, 77], [35, 81]], 0.9, "#cbd5e1")}
      </>
    ),
    // Tea leaves, 400 g, and a cup
    () => (
      <>
        <rect x="20" y="30" width="34" height="50" rx="2" fill="#166534" />
        <path d="M30 48 q7 -12 14 0 q-7 12 -14 0z M37 42 v12" fill="#86efac" stroke="#dcfce7" strokeWidth="1.2" />
        <rect x="24" y="64" width="26" height="8" rx="1" fill="#fbbf24" stroke="none" />
        <path d="M58 56 h24 v10 a12 12 0 0 1 -24 0z" fill="#ffffff" />
        <path d="M82 60 q7 0 6 6 q-1 5 -7 4" />
        <ellipse cx="70" cy="57" rx="11" ry="2.4" fill="#b45309" stroke="none" />
        <path d="M66 48 q-3 -4 0 -8 M73 48 q-3 -4 0 -8" strokeWidth="1.4" opacity="0.5" />
      </>
    ),
  ],
  pharmacy: [
    // Hand sanitiser with a pump
    ({ accent }) => (
      <>
        <path d="M44 30 v-6 h18 v5" strokeWidth="3" />
        <rect x="45" y="29" width="10" height="11" rx="1.5" fill="#f8fafc" />
        <rect x="33" y="39" width="34" height="45" rx="9" fill="#e0f2fe" />
        <rect x="36" y="56" width="28" height="25" rx="7" fill="#bae6fd" stroke="none" />
        <rect x="39" y="48" width="22" height="14" rx="2" fill={accent} />
        <path d="M50 51 v8 M46 55 h8" stroke="#fff" strokeWidth="2" />
      </>
    ),
    // Digital thermometer
    ({ accent }) => (
      <g transform="rotate(-32 50 50)">
        <rect x="44" y="10" width="12" height="70" rx="6" fill="#ffffff" />
        <rect x="46.5" y="26" width="7" height="18" rx="1.5" fill="#cffafe" />
        <path d="M48.5 35 h3" stroke={accent} strokeWidth="2" />
        <circle cx="50" cy="52" r="2.6" fill={accent} stroke="none" />
        <rect x="47" y="76" width="6" height="12" rx="3" fill="#cbd5e1" />
      </g>
    ),
    // Face masks
    ({ accent }) => (
      <>
        <rect x="18" y="20" width="64" height="20" rx="2" fill="#f1f5f9" />
        <path d="M24 30 h30" stroke={accent} strokeWidth="2.4" />
        <path d="M26 46 q24 -8 48 0 v16 q-24 15 -48 0z" fill="#bfdbfe" />
        <path d="M28 52 q22 -6 44 0 M28 58 q22 -4 44 0" stroke="#60a5fa" strokeWidth="1.4" />
        <path d="M26 48 q-11 7 0 13 M74 48 q11 7 0 13" />
      </>
    ),
    // Oral saline sachets
    ({ accent }) => (
      <>
        <g transform="rotate(-9 38 52)">
          <rect x="22" y="30" width="32" height="44" rx="2" fill="#fef3c7" />
          <text x="38" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill={accent} stroke="none" fontFamily="var(--font-manrope), sans-serif">
            ORS
          </text>
        </g>
        <g transform="rotate(7 62 54)">
          <rect x="46" y="32" width="32" height="44" rx="2" fill="#fde68a" />
          <path d="M46 36 h32 M46 72 h32" strokeWidth="1.2" strokeDasharray="2 2" />
          <text x="62" y="58" textAnchor="middle" fontSize="10" fontWeight="800" fill={accent} stroke="none" fontFamily="var(--font-manrope), sans-serif">
            ORS
          </text>
        </g>
      </>
    ),
    // Vitamin C tablets
    ({ accent }) => (
      <>
        <rect x="35" y="20" width="30" height="13" rx="3" fill="#ffffff" />
        <rect x="32" y="32" width="36" height="50" rx="7" fill="#fb923c" />
        <rect x="37" y="46" width="26" height="20" rx="2" fill="#fff7ed" />
        <text x="50" y="61" textAnchor="middle" fontSize="13" fontWeight="800" fill={accent} stroke="none" fontFamily="var(--font-manrope), sans-serif">
          C
        </text>
        <circle cx="76" cy="80" r="5" fill="#fdba74" />
        <circle cx="22" cy="82" r="4.5" fill="#fdba74" />
      </>
    ),
    // First-aid kit
    () => (
      <>
        <path d="M40 34 v-9 h20 v9" strokeWidth="3" />
        <rect x="20" y="33" width="60" height="46" rx="7" fill="#ef4444" />
        <path d="M45 44 h10 v8 h8 v10 h-8 v8 h-10 v-8 h-8 v-10 h8z" fill="#ffffff" stroke="none" />
      </>
    ),
  ],
  general: [
    // Stainless water bottle
    ({ accent }) => (
      <>
        <rect x="41" y="13" width="18" height="12" rx="3" fill="#475569" />
        <rect x="37" y="24" width="26" height="60" rx="11" fill="#cbd5e1" />
        <path d="M44 34 V72" stroke="#f8fafc" strokeWidth="3" />
        <rect x="37" y="50" width="26" height="8" fill={accent} stroke="none" />
      </>
    ),
    // Notebook set
    ({ accent }) => (
      <>
        <rect x="22" y="58" width="58" height="22" rx="2" fill="#f59e0b" transform="rotate(-3 50 69)" />
        <rect x="20" y="40" width="58" height="22" rx="2" fill="#0ea5e9" transform="rotate(2 50 51)" />
        <rect x="24" y="22" width="56" height="22" rx="2" fill={accent} transform="rotate(-2 50 33)" />
        {dots([[30, 26], [37, 26], [44, 26], [51, 26], [58, 26], [65, 26], [72, 26]], 1.3, "#f8fafc")}
      </>
    ),
    // Table lamp
    ({ accent }) => (
      <>
        <circle cx="50" cy="42" r="26" fill="#fde68a" stroke="none" opacity="0.35" />
        <path d="M34 26 h32 l9 24 h-50z" fill="#fde68a" />
        <path d="M50 50 V78" strokeWidth="3" />
        <ellipse cx="50" cy="81" rx="15" ry="4" fill={accent} />
      </>
    ),
    // Kitchen knife set in a block
    () => (
      <>
        <rect x="38" y="20" width="6" height="22" rx="2" fill="#1f2937" transform="rotate(-14 41 31)" />
        <rect x="48" y="16" width="6" height="24" rx="2" fill="#1f2937" />
        <rect x="58" y="20" width="6" height="22" rx="2" fill="#1f2937" transform="rotate(14 61 31)" />
        <path d="M28 46 h44 l-5 38 h-34z" fill="#a16207" />
        <path d="M34 56 h32 M35 66 h30" stroke="#854d0e" strokeWidth="1.4" />
      </>
    ),
    // Wall clock
    ({ accent }) => (
      <>
        <circle cx="50" cy="50" r="31" fill={accent} />
        <circle cx="50" cy="50" r="26" fill="#ffffff" />
        {Array.from({ length: 12 }, (_, k) => {
          const a = (k * Math.PI) / 6;
          return <path key={k} d={`M${50 + Math.sin(a) * 21} ${50 - Math.cos(a) * 21} L${50 + Math.sin(a) * 24} ${50 - Math.cos(a) * 24}`} strokeWidth={k % 3 ? 1.2 : 2.2} />;
        })}
        <path d="M50 50 V35 M50 50 L60 56" strokeWidth="2.4" />
        <circle cx="50" cy="50" r="2" fill="#2b2622" stroke="none" />
      </>
    ),
    // Storage boxes, stacked
    ({ accent }) => (
      <>
        <rect x="20" y="58" width="60" height="25" rx="3" fill="#e7e5e4" />
        <rect x="18" y="54" width="64" height="7" rx="2" fill="#d6d3d1" />
        <rect x="28" y="33" width="44" height="21" rx="3" fill="#fef3c7" />
        <rect x="26" y="29" width="48" height="6" rx="2" fill={accent} />
        <rect x="44" y="66" width="12" height="5" rx="2" fill="#a8a29e" stroke="none" />
      </>
    ),
  ],
};
