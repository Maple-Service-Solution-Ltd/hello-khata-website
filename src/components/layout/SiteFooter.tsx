import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { categorySlugs, featureSlugs } from "@/content/site";
import { fmtDigits, interpolate } from "@/lib/format";
import { contactInfo, localDigits } from "@/lib/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ProgramBadges } from "@/components/ui/ProgramBadges";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Section";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Skyline } from "@/components/illustrations/Skyline";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;

  const columns = [
    {
      title: t.footer.product,
      links: [
        ...featureSlugs.map((s) => ({ href: p(`/features/${s}`), label: t.features.items[s].name })),
        { href: p("/pricing"), label: t.nav.pricing },
      ],
    },
    {
      title: t.footer.solutions,
      links: categorySlugs.map((s) => ({ href: p(`/solutions/${s}`), label: t.solutions.items[s].name })),
    },
    {
      title: t.footer.company,
      links: [
        { href: p("/about"), label: t.nav.about },
        { href: p("/how-it-works"), label: t.nav.howItWorks },
        { href: p("/contact"), label: t.nav.contact },
      ],
    },
    {
      title: t.footer.help,
      links: [
        { href: p("/resources"), label: t.nav.help },
        { href: p("/privacy"), label: t.footer.privacy },
        { href: p("/terms"), label: t.footer.terms },
      ],
    },
  ];

  const nav = (c: (typeof columns)[number]) => (
    <nav key={c.title} aria-label={c.title}>
      <h2 className="text-sm font-semibold text-leaf-glow">{c.title}</h2>
      <ul className="mt-4 space-y-2.5">
        {c.links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.95rem] text-cream/75 transition-colors hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <footer className="hk-cv on-dark relative mt-0 bg-forest text-cream">
      {/* Torn paper edge: the page above "tears" into the dark footer */}
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 -top-px h-6 w-full text-paper sm:h-10" aria-hidden="true">
        <path
          d="M0 0h1440v14c-22 6-40-3-62 4s-36 9-58 2-41 8-64 5-33-10-57-4-44 12-66 6-35-8-60-1-42 10-63 4-37-9-60-3-45 11-67 5-34-7-56 0-43 9-66 3-38-8-61-1-41 10-63 4-36-9-59-2-44 10-66 4-35-8-58 0-42 9-64 3-39-9-61-2-43 11-66 5-36-8-58-1-43 9-65 3-37-8-60 0-41 9-63 3-37-9-59-2-44 10-66 4V0Z"
          fill="currentColor"
        />
      </svg>
      <div className="grain-dark pt-20 pb-10 sm:pt-24">
        <Skyline className="pointer-events-none absolute inset-x-0 top-10 h-28 w-full text-cream/[0.07] sm:h-40" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2.4fr]">
            <div>
              <Wordmark tone="light" className="text-[1.7rem]" />
              <p className="mt-4 max-w-xs text-cream/70">{t.footer.tagline}</p>
              <address className="mt-6 space-y-2 text-sm text-cream/75 not-italic">
                <p className="font-semibold text-leaf-glow">{t.footer.contact}</p>
                <p className="max-w-xs leading-relaxed">{contactInfo.address[locale]}</p>
                {[
                  { key: "phone", href: contactInfo.phone.href, text: localDigits(contactInfo.phone.display, locale), label: t.contact.direct.phone, external: false },
                  { key: "whatsapp", href: contactInfo.whatsapp.href, text: localDigits(contactInfo.whatsapp.display, locale), label: t.contact.direct.whatsapp, external: true },
                  { key: "email", href: contactInfo.email.href, text: contactInfo.email.display, label: t.contact.direct.email, external: false },
                ].map((row) => (
                  <p key={row.key}>
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center gap-2.5 font-semibold text-cream hover:text-leaf-glow"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cream/10 text-leaf-glow transition-colors group-hover:bg-leaf-glow/20">
                        <ContactIcon kind={row.key as "phone" | "whatsapp" | "email"} />
                      </span>
                      <span className="sr-only">{row.label}: </span>
                      {row.text}
                    </a>
                  </p>
                ))}
              </address>
              <div className="mt-8">
                <p className="mb-2 text-sm text-cream/60">{t.footer.languageLabel}</p>
                <LanguageSwitcher tone="light" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {columns.slice(0, 2).map(nav)}
              {/* Company and Help are short, so following us and getting the app sit right beneath them */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10">{columns.slice(2).map(nav)}</div>
                <div className="mt-10 space-y-7 border-t border-cream/10 pt-8">
                  <div>
                    <p className="mb-2 text-sm text-cream/60">{t.common.followUs}</p>
                    <SocialLinks locale={locale} />
                  </div>
                  <div>
                    <p className="mb-3 text-sm text-cream/60">{t.app.link}</p>
                    <StoreBadges locale={locale} tone="light" />
                  </div>
                  <div>
                    <p className="mb-3 text-sm text-cream/60">{t.footer.programs}</p>
                    <ProgramBadges />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-6 text-sm text-cream/55 sm:flex-row sm:items-center sm:justify-between">
            <p>{interpolate(t.footer.rights, { year: fmtDigits(new Date().getFullYear(), locale) })}</p>
            <p className="font-hand text-base text-cream/60" lang="bn">
              আপনার ব্যবসা, আপনার ভাষায়।
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function ContactIcon({ kind }: { kind: "phone" | "whatsapp" | "email" }) {
  if (kind === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.3 20.7l4.4-1.1A8.8 8.8 0 1 0 12 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.1 8.3c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.4.1.5 0l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.6-.5.3-1.3.5-2.4.1-1.6-.6-3.3-2-4.2-3.6-.8-1.3-.8-2.4-.5-3.1Z" fill="currentColor" />
      </svg>
    );
  if (kind === "email")
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4.5 7.5 12 13l7.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path d="M6.6 3.8h2.6l1.4 4-1.9 1.3a11 11 0 0 0 6.2 6.2l1.3-1.9 4 1.4v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 6a2 2 0 0 1 2-2.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
