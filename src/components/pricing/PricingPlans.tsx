import { Fragment } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { addOns, comparison, creditCosts, creditPacks, pricingConfig, smsRates, type CompareCell } from "@/content/pricing";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const priced = pricingConfig.plans.filter((p) => p.monthly !== null);
const enterprise = pricingConfig.plans.find((p) => p.key === "enterprise")!;
const perks = { days: pricingConfig.trialDays, months: pricingConfig.annualFreeMonths };

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-4 shrink-0", className)} aria-hidden="true">
      <path d="M4 10.5l3.6 3.4L16 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Plan cards for the four priced plans, an Enterprise band, and the trial/annual perks. */
export function PricingPlans({ locale, headingLevel = "h3", showCompareLink = false }: { locale: Locale; headingLevel?: "h2" | "h3"; showCompareLink?: boolean }) {
  const PlanHeading = headingLevel;
  const pr = getDict(locale).pricing;
  const ent = pr.plans.enterprise;
  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {priced.map((plan, i) => {
          const p = pr.plans[plan.key];
          const dark = plan.highlighted;
          return (
            <Reveal
              as="li"
              key={plan.key}
              delay={i * 0.08}
              className={cn(
                "relative flex flex-col rounded-[1.6rem] p-7",
                dark ? "on-dark grain-dark bg-forest text-cream shadow-[var(--shadow-float)] xl:-my-4 xl:py-11" : "bg-white shadow-[var(--shadow-card)] ring-1 ring-ink/5",
              )}
            >
              {dark && (
                <span className="absolute -top-3 left-7 rounded-full bg-leaf-glow px-3 py-1 text-xs font-bold text-forest xl:top-4 xl:right-7 xl:left-auto">
                  {pr.recommended}
                </span>
              )}
              <PlanHeading className="font-display text-3xl">{p.name}</PlanHeading>
              <p className={cn("mt-1 min-h-12", dark ? "text-cream/75" : "text-muted")}>{p.tagline}</p>
              <p className="mt-5">
                <span className="font-latin text-4xl font-extrabold tracking-tight">{fmtTaka(plan.monthly!, locale)}</span>
                <span className={dark ? "text-cream/70" : "text-muted"}>{pr.perMonth}</span>
              </p>
              <p className={cn("mt-1 text-sm", dark ? "text-leaf-glow" : "text-leaf-ink")}>
                {interpolate(pr.yearly, { price: fmtTaka(plan.yearly!, locale), months: fmtNumber(pricingConfig.annualFreeMonths, locale) })}
              </p>
              <p
                className={cn(
                  "mt-4 inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold",
                  dark ? "bg-cream/10 text-cream" : plan.mobileOnly ? "bg-marigold-soft text-[#5c3f05]" : "bg-leaf-soft text-leaf-ink",
                )}
              >
                {plan.mobileOnly ? pr.platformsMini : pr.platformsAll}
              </p>
              <div className={cn("mt-6 border-t pt-5 text-sm", dark ? "border-cream/15" : "border-ink/10")}>
                <p className={cn("font-semibold", dark ? "text-leaf-glow" : "text-leaf-ink")}>{pr.suits}</p>
                <p className="mt-1">{p.suits}</p>
                <p className={cn("mt-5 font-semibold", dark ? "text-leaf-glow" : "text-leaf-ink")}>{pr.includes}</p>
                <ul className="mt-2 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className={cn("mt-0.5", dark ? "text-leaf-glow" : "text-leaf")} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-8">
                <ButtonLink href={`/${locale}/get-started?plan=${plan.key}`} variant={dark ? "light" : "primary"} className="w-full" arrow>
                  {interpolate(pr.cta, { days: fmtNumber(pricingConfig.trialDays, locale) })}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="paper-cream mt-6 grid gap-6 rounded-[1.6rem] p-7 ring-1 ring-ink/10 sm:p-8 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center">
        <div>
          <PlanHeading className="font-display text-3xl">{ent.name}</PlanHeading>
          <p className="mt-1 text-muted">{ent.tagline}</p>
          <p className="mt-3 font-semibold text-ink-soft">{enterprise.monthly === null && pr.customPrice}</p>
        </div>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {ent.features.map((f) => (
            <li key={f} className="flex gap-2.5">
              <Check className="mt-0.5 text-leaf" />
              {f}
            </li>
          ))}
        </ul>
        <ButtonLink href={`/${locale}/contact`} variant="secondary" arrow>
          {pr.enterpriseCta}
        </ButtonLink>
      </Reveal>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-soft">
        {pr.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <Check className="text-leaf" />
            {interpolate(perk, { days: fmtNumber(perks.days, locale), months: fmtNumber(perks.months, locale) })}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted">{pr.taxNote}</p>
      {showCompareLink ? (
        <p className="mt-8 text-center">
          <Link href={`/${locale}/pricing#compare`} className="font-semibold text-leaf-ink underline underline-offset-4">
            {pr.compareLink}
          </Link>
        </p>
      ) : (
        <p className="mt-10 text-center text-muted">
          <span className="font-semibold text-ink">{pr.helpTitle}</span> {pr.helpBody}{" "}
          <Link href={`/${locale}/contact`} className="font-semibold text-leaf-ink underline underline-offset-4">
            {pr.helpCta}
          </Link>
        </p>
      )}
    </div>
  );
}

/** "Which plan is right for you?" — business type to plan. */
export function PricingFit({ locale }: { locale: Locale }) {
  const fit = getDict(locale).pricing.fit;
  return (
    <section aria-labelledby="pricing-fit" className="mt-24">
      <h2 id="pricing-fit" className="font-display text-3xl sm:text-4xl">
        {fit.title}
      </h2>
      <p className="mt-2 max-w-2xl text-muted">{fit.lead}</p>
      <ul className="mt-8 divide-y divide-ink/10 rounded-[1.4rem] bg-white shadow-[var(--shadow-card)] ring-1 ring-ink/5">
        {fit.rows.map((row) => (
          <li key={row.who} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="font-semibold">{row.who}</span>
            <span className="flex flex-col sm:items-end">
              <span className="font-semibold text-leaf-ink">{row.plan}</span>
              {"note" in row && <span className="text-sm text-muted">{row.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Feature × plan comparison table, driven by `comparison` in /content/pricing.ts. */
export function PricingCompare({ locale }: { locale: Locale }) {
  const pr = getDict(locale).pricing;
  const c = pr.compare;
  const v = c.values;
  const cell = (value: CompareCell) => {
    if (value === true)
      return (
        <>
          <Check className="mx-auto text-leaf" />
          <span className="sr-only">{v.yes}</span>
        </>
      );
    if (value === false)
      return (
        <>
          <span aria-hidden="true" className="text-ink/25">
            —
          </span>
          <span className="sr-only">{v.no}</span>
        </>
      );
    if (typeof value === "number") return fmtNumber(value, locale);
    if (typeof value === "object") return interpolate(v.perMonth, { n: fmtNumber(value.perMonth, locale) });
    return v[value];
  };
  return (
    <section id="compare" aria-labelledby="pricing-compare" className="mt-24 scroll-mt-24">
      <h2 id="pricing-compare" className="font-display text-3xl sm:text-4xl">
        {c.title}
      </h2>
      <p className="mt-2 max-w-2xl text-muted">{c.lead}</p>
      <div className="mt-8 overflow-x-auto rounded-[1.4rem] bg-white shadow-[var(--shadow-card)] ring-1 ring-ink/5">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left">
              <th scope="col" className="sticky left-0 bg-white px-5 py-4 font-semibold">
                {c.feature}
              </th>
              {pricingConfig.plans.map((p) => (
                <th key={p.key} scope="col" className={cn("px-3 py-4 text-center align-bottom", p.highlighted && "bg-leaf-soft/60")}>
                  <span className="block font-display text-lg">{pr.plans[p.key].name}</span>
                  <span className="block font-normal text-muted">{p.monthly === null ? pr.customPrice : `${fmtTaka(p.monthly, locale)}${pr.perMonth}`}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((group) => (
              <Fragment key={group.group}>
                <tr className="border-t border-ink/10 bg-paper/60">
                  <th scope="colgroup" colSpan={pricingConfig.plans.length + 1} className="sticky left-0 px-5 py-2.5 text-left text-xs font-bold tracking-wide text-leaf-ink uppercase">
                    {c.groups[group.group as keyof typeof c.groups]}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.key} className="border-t border-ink/5">
                    <th scope="row" className="sticky left-0 bg-white px-5 py-3 text-left font-normal">
                      {c.rows[row.key as keyof typeof c.rows]}
                    </th>
                    {pricingConfig.plans.map((p) => (
                      <td key={p.key} className={cn("px-3 py-3 text-center", p.highlighted && "bg-leaf-soft/40")}>
                        {cell(row.cells[p.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Add-ons, AI credit top-ups and the SMS wallet. */
export function PricingExtras({ locale }: { locale: Locale }) {
  const pr = getDict(locale).pricing;
  const a = pr.addons;
  const cr = pr.credits;
  const sms = pr.sms;
  const rate = (value: number) => `৳${fmtNumber(value, locale, 2)}`;
  return (
    <>
      <section aria-labelledby="pricing-addons" className="mt-24">
        <h2 id="pricing-addons" className="font-display text-3xl sm:text-4xl">
          {a.title}
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{a.lead}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {addOns.map((item) => {
            const copy = a.items[item.key as keyof typeof a.items] as { name: string; price?: string; note?: string };
            return (
              <li key={item.key} className="flex flex-col rounded-[1.2rem] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
                <span className="font-semibold">{copy.name}</span>
                <span className="mt-2 text-lg font-bold text-leaf-ink">
                  {item.price === null ? (
                    copy.price
                  ) : (
                    <>
                      <span className="font-latin">{fmtTaka(item.price, locale)}</span>
                      <span className="text-sm font-normal text-muted">{a.perMonth}</span>
                    </>
                  )}
                </span>
                {copy.note && <span className="mt-2 text-sm text-muted">{copy.note}</span>}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="pricing-credits" className="rounded-[1.6rem] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-8">
          <h2 id="pricing-credits" className="font-display text-3xl">
            {cr.title}
          </h2>
          <p className="mt-2 text-muted">{cr.lead}</p>
          <h3 className="mt-6 font-semibold text-leaf-ink">{cr.packsTitle}</h3>
          <ul className="mt-3 grid grid-cols-3 gap-3">
            {creditPacks.map((pack) => (
              <li key={pack.credits} className="rounded-2xl bg-leaf-soft/60 p-4 text-center">
                <span className="block text-sm font-semibold">{interpolate(cr.pack, { n: fmtNumber(pack.credits, locale) })}</span>
                <span className="mt-1 block font-latin text-2xl font-extrabold text-leaf-ink">{fmtTaka(pack.price, locale)}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 font-semibold text-leaf-ink">{cr.usageTitle}</h3>
          <dl className="mt-2 divide-y divide-ink/5 text-sm">
            {creditCosts.map((cost) => (
              <div key={cost.key} className="flex justify-between gap-4 py-2">
                <dt>{cr.usage[cost.key as keyof typeof cr.usage]}</dt>
                <dd className="font-semibold whitespace-nowrap">
                  {fmtNumber(cost.credits, locale)} {cr.unit}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {cr.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <Check className="mt-0.5 text-leaf" />
                {n}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pricing-sms" className="rounded-[1.6rem] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-8">
          <h2 id="pricing-sms" className="font-display text-3xl">
            {sms.title}
          </h2>
          <p className="mt-2 text-muted">{sms.lead}</p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            <li className="rounded-2xl bg-marigold-soft/70 p-4">
              <span className="block text-sm font-semibold">{sms.nonMasking}</span>
              <span className="mt-1 block font-latin text-2xl font-extrabold text-[#5c3f05]">
                {rate(smsRates.nonMasking)}
                <span className="font-sans text-sm font-normal">{sms.perPart}</span>
              </span>
            </li>
            <li className="rounded-2xl bg-marigold-soft/70 p-4">
              <span className="block text-sm font-semibold">{sms.masking}</span>
              <span className="mt-1 block font-latin text-2xl font-extrabold text-[#5c3f05]">
                {rate(smsRates.masking)}
                <span className="font-sans text-sm font-normal">{sms.perPart}</span>
              </span>
            </li>
          </ul>
          <ol className="mt-6 space-y-3 text-sm">
            {sms.steps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-deep text-xs font-bold text-white">{fmtNumber(i + 1, locale)}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-muted">{interpolate(sms.partNote, { chars: fmtNumber(smsRates.banglaCharsPerPart, locale) })}</p>
          <p className="mt-2 text-xs text-muted">{sms.note}</p>
        </section>
      </div>
    </>
  );
}

/** Trial, billing and data-retention promises. The data-retention promise is set apart. */
export function PricingPolicies({ locale }: { locale: Locale }) {
  const pol = getDict(locale).pricing.policies;
  const dataPromise = 4;
  return (
    <section aria-labelledby="pricing-policies" className="mt-24">
      <h2 id="pricing-policies" className="font-display text-3xl sm:text-4xl">
        {pol.title}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pol.items.map((item, i) => (
          <li key={item.t} className={cn("rounded-[1.2rem] p-6 ring-1", i === dataPromise ? "on-dark bg-forest text-cream ring-forest" : "bg-white ring-ink/5 shadow-[var(--shadow-card)]")}>
            <p className="font-display text-xl">{interpolate(item.t, { days: fmtNumber(perks.days, locale), months: fmtNumber(perks.months, locale) })}</p>
            <p className={cn("mt-2 text-sm", i === dataPromise ? "text-cream/80" : "text-muted")}>
              {interpolate(item.d, { days: fmtNumber(perks.days, locale), months: fmtNumber(perks.months, locale) })}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
