import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { StreetBack, StreetMid, StreetWires } from "@/components/illustrations/StreetScene";
import { HeroStage } from "./HeroStage";
import { HeroHeadline } from "./HeroHeadline";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const h = t.home.hero;
  // The street spans the full width, so it grows taller on wide screens. The minimum height (32.6vw + 344px) only kicks
  // in on wide-but-short windows, just enough to keep the shop sign below the headline; on wide screens the lead also
  // wraps a little narrower so it ends before the sign.
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip lg:min-h-[max(100svh,56rem,calc(32.6vw_+_344px))]">
      <Container className="pointer-events-none relative z-10 pt-28 sm:pt-32 lg:pt-32">
        <div className="hero-halo pointer-events-auto relative max-w-[36rem] min-[1800px]:-ml-10">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          {/* Bengali glyphs run wider: on very wide screens the second line would otherwise reach the shop sign */}
          <HeroHeadline line1={h.title1} line2={h.title2} className={locale === "bn" ? "min-[1800px]:text-[4.35rem]!" : ""} />
          <p className="mt-6 max-w-[30rem] text-lg text-pretty text-ink-soft sm:text-xl lg:max-w-[26rem] xl:max-w-[30rem] min-[1600px]:max-w-[26rem]!">{h.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/${locale}/get-started`} size="lg" arrow className="w-full sm:w-auto">
              {t.common.getStarted}
            </ButtonLink>
            <ButtonLink href={`/${locale}/how-it-works`} variant="secondary" size="lg" className="w-full sm:w-auto">
              {t.common.seeHowItWorks}
            </ButtonLink>
          </div>
        </div>
      </Container>
      <div className="relative mt-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <HeroStage back={<StreetBack />} wires={<StreetWires />} mid={<StreetMid />} />
      </div>
    </section>
  );
}
