import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { Sketch } from "@/lib/sketch";
import { P, Wash, box, palette as c } from "@/components/illustrations/ink";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";

/** A shopkeeper's hand holding the HelloKhata app, with the old khata and a receipt left on the counter. */
function PhoneArt({ locale }: { locale: Locale }) {
  const a = getDict(locale).app.screen;
  const s = new Sketch(7712);
  return (
    <svg viewBox="0 0 420 380" className="block w-full text-ink" aria-hidden="true">
      <g filter="url(#hk-wobble)">
        {/* Counter */}
        <P d={s.line(10, 330, 410, 330, 0.5)} w={1.2} />
        {/* The old khata, closed now */}
        <g transform="rotate(-8 92 300)">
          <Wash d={box(36, 270, 118, 48)} fill={c.vermilion} o={0.75} />
          <P d={s.rect(36, 270, 118, 48, 0.4)} w={1.2} />
          <P d={s.line(48, 276, 48, 312, 0.2, 1)} w={0.8} />
          <text x="100" y="300" textAnchor="middle" fontSize="14" fill={c.cream} className="font-hand">
            খাতা
          </text>
        </g>
        {/* A receipt */}
        <path d="M300 330 v-46 h46 v46 l-5 -3 l-6 3 l-6 -3 l-6 3 l-6 -3 l-6 3 l-6 -3 z" fill={c.cream} stroke={c.ink} strokeWidth="1" transform="rotate(7 323 307)" />
        {/* Wooden phone stand on the counter */}
        <Wash d="M188 330 l10 -40 h44 l10 40 z" fill={c.clay} o={0.7} />
        <P d={s.poly([[188, 330], [198, 290], [242, 290], [252, 330]], true, 0.3)} w={1.2} />
        <P d={s.line(202, 306, 238, 306, 0.2, 1)} w={0.6} o={0.6} />
      </g>
      {/* Phone */}
      <rect x="150" y="24" width="140" height="270" rx="22" fill={c.ink} fillOpacity="0.92" />
      <rect x="158" y="36" width="124" height="246" rx="15" fill="var(--color-forest)" />
      <rect x="198" y="42" width="44" height="6" rx="3" fill={c.ink} />
      <circle cx="172" cy="64" r="3" fill="var(--color-leaf-glow)" />
      <text x="180" y="68" fontSize="10" fontWeight="600" fill={c.cream} style={{ fontFamily: "var(--font-manrope)" }}>
        HelloKhata
      </text>
      <rect x="168" y="82" width="104" height="70" rx="10" fill={c.cream} />
      <text x="178" y="100" fontSize="9.5" fill={c.ink} fillOpacity="0.7" style={{ fontFamily: "var(--font-sans)" }}>
        {a.today}
      </text>
      <text x="178" y="122" fontSize="18" fontWeight="700" fill={c.ink} style={{ fontFamily: "var(--font-manrope)" }}>
        {fmtTaka(24530, locale)}
      </text>
      <text x="178" y="140" fontSize="9" fill="var(--color-leaf-deep)" style={{ fontFamily: "var(--font-sans)" }}>
        {interpolate(a.bills, { n: fmtNumber(86, locale) })}
      </text>
      {[22, 30, 26, 36, 32, 44].map((h, i) => (
        <rect key={i} x={172 + i * 16} y={220 - h} width="9" height={h} rx="2" fill={i === 5 ? "var(--color-leaf-glow)" : c.cream} fillOpacity={i === 5 ? 1 : 0.3} />
      ))}
      <rect x="168" y="236" width="104" height="26" rx="13" fill={c.cream} fillOpacity="0.12" />
      <text x="180" y="253" fontSize="9" fill={c.cream} fillOpacity="0.75" style={{ fontFamily: "var(--font-sans)" }}>
        {a.ask}
      </text>
      <circle cx="258" cy="249" r="9" fill="var(--color-leaf)" />
      <path d="M258 244.5v6M255 248.5c.1 2 1.4 3 3 3s2.9-1 3-3" fill="none" stroke={c.cream} strokeWidth="1.2" strokeLinecap="round" />
      {/* A small "+৳" floating off the screen: a sale just recorded */}
      <g>
        <rect x="270" y="96" width="62" height="22" rx="11" fill="var(--color-leaf)" />
        <text x="301" y="111" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-manrope)" }}>
          +{fmtTaka(450, locale)}
        </text>
      </g>
    </svg>
  );
}

/** "Get the app": what the app is for, and the store badges (shown as "coming soon" until links are set). */
export function AppDownload({ locale }: { locale: Locale }) {
  const a = getDict(locale).app;
  return (
    <section id="app" aria-labelledby="app-title" className="paper-cream scroll-mt-24 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 id="app-title" className="font-display mt-4 text-4xl text-balance sm:text-5xl">
            {a.title}
          </h2>
          <p className="mt-4 max-w-[34rem] text-lg text-pretty text-ink-soft">{a.body}</p>
          <ul className="mt-6 space-y-2.5">
            {a.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-ink-soft">
                <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true">
                  <path d="M4 10.5l3.6 3.4L16 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {pt}
              </li>
            ))}
          </ul>
          <StoreBadges locale={locale} className="mt-8" />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-md">
          <PhoneArt locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}
