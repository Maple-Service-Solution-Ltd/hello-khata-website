import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { featureSlugs, featureSolution, relatedFeatures, type FeatureSlug } from "@/content/site";
import { Container, Eyebrow, SampleBadge } from "@/components/ui/Section";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand, Faq, PageHero } from "@/components/pages/PageParts";
import { FeatureDemo } from "@/components/pages/FeatureDemo";
import { FeatureArt } from "@/components/features/FeatureArt";
import { LedgerTransform } from "@/components/home/LedgerTransform";
import { AssistantPage } from "@/components/assistant/AssistantPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => featureSlugs.map((slug) => ({ locale, slug })));
}

const isFeature = (s: string): s is FeatureSlug => (featureSlugs as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isFeature(slug)) return {};
  const f = getDict(locale).features.items[slug];
  return pageMetadata(locale, `/features/${slug}`, f.seoTitle, f.seoDescription);
}

function Crumbs({ locale, slug }: { locale: Locale; slug: FeatureSlug }) {
  const t = getDict(locale);
  return (
    <JsonLd
      nodes={[
        breadcrumbJsonLd(locale, [
          ["HelloKhata", "/"],
          [t.nav.features, "/features"],
          [t.features.items[slug].name, `/features/${slug}`],
        ]),
      ]}
    />
  );
}

type Section = "problem" | "demo" | "ledger" | "steps" | "caps" | "related" | "faq";

/** Each page tells its story in its own order; the khata page leads with its own interactive story. The assistant page is its own experience (AssistantPage). */
const order: Record<Exclude<FeatureSlug, "assistant">, Section[]> = {
  sales: ["problem", "demo", "steps", "caps", "related", "faq"],
  inventory: ["problem", "caps", "demo", "steps", "faq", "related"],
  purchases: ["problem", "steps", "demo", "caps", "related", "faq"],
  expenses: ["problem", "demo", "caps", "steps", "faq", "related"],
  customers: ["problem", "ledger", "steps", "demo", "caps", "faq", "related"],
  reports: ["problem", "caps", "demo", "steps", "related", "faq"],
  sms: ["problem", "demo", "steps", "caps", "faq", "related"],
  "multi-branch": ["problem", "demo", "caps", "steps", "faq", "related"],
};

const Tick = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={`size-5 shrink-0 text-leaf ${className}`} aria-hidden="true">
    <path d="M4 10.5l3.6 3.4L16 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function FeaturePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isFeature(slug)) notFound();
  if (slug === "assistant")
    return (
      <>
        <AssistantPage locale={locale} />
        <Crumbs locale={locale} slug={slug} />
      </>
    );
  const t = getDict(locale);
  const f = t.features.items[slug];
  const d = t.features.detail;
  const solution = featureSolution[slug];
  const num = (i: number) => (locale === "bn" ? "১২৩৪"[i] : String(i + 1));

  const sections: Record<Section, React.ReactNode> = {
    problem: (
      <section key="problem" className="paper-cream py-16 sm:py-24" aria-labelledby="problem-title">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>{d.problemEyebrow}</Eyebrow>
            <h2 id="problem-title" className="font-display mt-4 text-3xl text-balance sm:text-4xl">
              {f.story.title}
            </h2>
            <p className="mt-4 max-w-[34rem] text-lg text-pretty text-ink-soft">{f.story.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="relative grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f3ead6] p-5 ring-1 ring-ink/10">
              <p className="text-sm font-semibold text-muted">{d.beforeLabel}</p>
              <ul className="mt-3 space-y-3">
                {f.story.before.map((b) => (
                  <li key={b} className="flex gap-2.5 text-ink-soft">
                    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-vermilion/70" aria-hidden="true">
                      <path d="M5.5 5.8c3 2.8 6 5.6 9 8.6M14.4 5.6c-3 3-6 5.9-9 8.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-leaf/20">
              <p className="text-sm font-semibold text-leaf-deep">{d.afterLabel}</p>
              <ul className="mt-3 space-y-3">
                {f.story.after.map((a) => (
                  <li key={a} className="flex gap-2.5 font-medium text-ink">
                    <Tick className="mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <svg viewBox="0 0 60 24" className="absolute top-1/2 left-1/2 hidden h-6 w-14 -translate-x-1/2 -translate-y-1/2 text-leaf sm:block" aria-hidden="true">
              <path d="M4 13 C 18 6, 34 18, 50 11 M42 5 l9 6 -8 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Reveal>
        </Container>
      </section>
    ),
    demo: (
      <section key="demo" id="demo" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="demo-title">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{d.demoEyebrow}</Eyebrow>
            <h2 id="demo-title" className="font-display mt-4 text-3xl text-balance sm:text-4xl">
              {d.demoTitle}
            </h2>
            <p className="mt-4 text-lg text-muted">{d.demoLead}</p>
            <ul className="mt-6 space-y-2.5">
              {f.points.slice(0, 2).map((pt) => (
                <li key={pt} className="flex gap-3 text-ink-soft">
                  <Tick className="mt-0.5" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[1.6rem] bg-white p-5 shadow-[var(--shadow-float)] ring-1 ring-ink/5 sm:p-7">
            <div className="mb-4 flex justify-end">
              <SampleBadge>{t.common.sampleData}</SampleBadge>
            </div>
            <FeatureDemo slug={slug} locale={locale} />
          </Reveal>
        </Container>
      </section>
    ),
    ledger: <LedgerTransform key="ledger" />,
    caps: (
      <section key="caps" className="py-16 sm:py-24" aria-labelledby="caps-title">
        <Container>
          <Eyebrow>{d.capsEyebrow}</Eyebrow>
          <h2 id="caps-title" className="font-display mt-4 max-w-[40rem] text-3xl text-balance sm:text-4xl">
            {d.pointsTitle}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {f.points.map((pt, i) => (
              <Reveal as="li" key={pt} delay={i * 0.06} className="paper-cream relative overflow-hidden rounded-2xl p-6 ring-1 ring-ink/10">
                <span className="font-display text-4xl text-leaf/25" aria-hidden="true">
                  {num(i)}
                </span>
                <p className="mt-3 text-lg leading-snug font-semibold text-ink">{pt}</p>
                <svg viewBox="0 0 120 8" className="mt-4 h-2 w-16 text-leaf" aria-hidden="true">
                  <path d="M2 5 C 30 1, 60 7, 118 3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    ),
    steps: (
      <section key="steps" className="bg-[#efe8d8] py-16 sm:py-24" aria-labelledby="steps-title">
        <Container>
          <h2 id="steps-title" className="font-display text-3xl sm:text-4xl">
            {d.stepsTitle}
          </h2>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-3">
            <svg className="pointer-events-none absolute top-6 left-0 hidden h-6 w-full md:block" viewBox="0 0 900 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M40 12 C 200 0, 300 24, 450 12 S 700 2, 860 12" fill="none" stroke="var(--color-leaf)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
            </svg>
            {f.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="relative">
                <span className="font-display relative flex size-12 items-center justify-center rounded-full bg-leaf-deep text-xl text-white">{num(i)}</span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    ),
    related: (
      <section key="related" className="py-16 sm:py-20" aria-labelledby="related-title">
        <Container>
          <h2 id="related-title" className="font-display text-3xl sm:text-4xl">
            {d.relatedTitle}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedFeatures[slug].map((r) => (
              <li key={r}>
                <Link href={`/${locale}/features/${r}`} className="group block h-full rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink/5 transition-transform hover:-translate-y-1">
                  <p className="text-lg font-semibold text-ink">{t.features.items[r].name}</p>
                  <p className="mt-1.5 text-muted">{t.features.items[r].short}</p>
                  <span className="mt-4 inline-flex text-leaf-ink">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    ),
    faq: (
      <section key="faq" className="py-16 sm:py-20" aria-labelledby="faq-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="faq-title" className="font-display text-3xl sm:text-4xl">
            {d.faqTitle}
          </h2>
          <Faq items={f.faq} />
        </Container>
      </section>
    ),
  };

  return (
    <>
      <PageHero
        eyebrow={f.name}
        title={f.title}
        lead={f.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[
          { href: `/${locale}`, label: "HelloKhata" },
          { href: `/${locale}/features`, label: t.nav.features },
        ]}
        aside={
          <Reveal className="relative mx-auto w-full max-w-xl">
            <div className="absolute top-0 right-0 z-10">
              <SampleBadge>{t.common.sampleData}</SampleBadge>
            </div>
            <FeatureArt slug={slug} />
          </Reveal>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={`/${locale}/get-started`} size="lg" arrow>
            {t.common.getStarted}
          </ButtonLink>
          {order[slug].includes("demo") && (
            <ButtonLink href="#demo" variant="secondary" size="lg">
              {d.demoEyebrow}
            </ButtonLink>
          )}
        </div>
        {solution && (
          <p className="mt-5 text-sm text-muted">
            {d.partOf} ·{" "}
            <Link href={`/${locale}/solutions/${solution}`} className="font-semibold text-leaf-ink underline-offset-4 hover:underline">
              {d.seeSolution}
            </Link>
          </p>
        )}
      </PageHero>
      {order[slug].map((s) => sections[s])}
      <CtaBand locale={locale} title={d.ctaTitle} body={d.ctaBody} />
      <Crumbs locale={locale} slug={slug} />
    </>
  );
}
