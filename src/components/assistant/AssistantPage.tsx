import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { AssistantHeroArt } from "./AssistantHeroArt";
import { AssistantDemo } from "./AssistantDemo";
import { AssistantFinal, AssistantLanguage, AssistantUnderstood } from "./AssistantSections";

/**
 * The AI assistant feature page, HelloKhata's signature experience: "আপনার কথায়, আপনার ব্যবসা চলে।"
 * Five short movements: the khata coming alive (hero), the assistant doing real work (interactive demo), the
 * business it understands, the language it speaks, and a closing call. Every conversation is a scripted
 * demonstration on the site's sample data; nothing records audio, and nothing is saved to an account.
 * Capabilities shown match features.items.assistant and the home page assistant (moduleStatus.assistant).
 */
export function AssistantPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const h = t.features.assistantPage.hero;
  return (
    <>
      <section aria-labelledby="as-hero" className="relative overflow-hidden bg-gradient-to-b from-[#f3f8f4] to-paper pt-28 pb-16 sm:pt-32 lg:pb-24">
        <Container>
          <nav aria-label={t.common.breadcrumb} className="mb-6 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="underline-offset-4 hover:text-ink hover:underline">
                  HelloKhata
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={`/${locale}/features`} className="underline-offset-4 hover:text-ink hover:underline">
                  {t.nav.features}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div className="relative z-10">
              <Eyebrow>{h.eyebrow}</Eyebrow>
              <h1 id="as-hero" className="font-display mt-5 text-[2.3rem] leading-[1.25] text-ink sm:text-6xl lg:text-[2.7rem] lg:leading-[1.2] xl:text-[3.4rem]">
                <span className="hk-rise block">{h.title1}</span>
                <span className="hk-rise relative inline-block text-leaf-deep [animation-delay:120ms]">
                  {h.title2}
                  <svg viewBox="0 0 300 22" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-4 w-full" aria-hidden="true">
                    <path d="M4 15 C 60 6, 120 18, 180 9 S 270 7, 296 12" pathLength={1} fill="none" stroke="var(--color-leaf)" strokeWidth="5" strokeLinecap="round" className="hk-draw [animation-delay:700ms]" />
                  </svg>
                </span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lg text-pretty text-ink-soft sm:text-xl">{h.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/get-started`} size="lg" arrow className="w-full sm:w-auto">
                  {h.primary}
                </ButtonLink>
                <ButtonLink href="#demo" variant="secondary" size="lg" className="w-full sm:w-auto">
                  {h.secondary}
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-muted">{h.note}</p>
            </div>
            <AssistantHeroArt />
          </div>
        </Container>
      </section>
      <AssistantDemo />
      <AssistantUnderstood />
      <AssistantLanguage />
      <AssistantFinal />
    </>
  );
}
