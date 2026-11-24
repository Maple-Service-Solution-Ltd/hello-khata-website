import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Section";
import { PageHero } from "./PageParts";

type Block = { p?: string; h3?: string; ul?: string[]; ol?: string[]; lines?: string[] };

/** Turns email addresses and web addresses inside a line into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(\S+@\S+\.[a-z]{2,}|https?:\/\/\S+)/i);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
        return (
          <a key={i} href={href} className="font-semibold text-leaf-ink underline decoration-leaf/40 underline-offset-4 hover:decoration-leaf">
            {part}
          </a>
        );
      })}
    </>
  );
}

function LegalBlock({ b }: { b: Block }) {
  if (b.h3) return <h3 className="pt-3 text-xl font-semibold text-ink">{b.h3}</h3>;
  if (b.ul)
    return (
      <ul className="list-disc space-y-1.5 ps-6 marker:text-leaf">
        {b.ul.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  if (b.ol)
    return (
      <ol className="list-decimal space-y-1.5 ps-6 marker:font-semibold marker:text-leaf-ink">
        {b.ol.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ol>
    );
  if (b.lines)
    return (
      <address className="paper-cream rounded-2xl p-6 not-italic ring-1 ring-ink/10">
        {b.lines.map((l, i) => (
          <p key={l} className={i === 0 ? "font-semibold text-ink" : undefined}>
            <Linkify text={l} />
          </p>
        ))}
      </address>
    );
  return <p>{b.p}</p>;
}

/** The published privacy policy and terms (Maple Service Solution Limited): numbered sections with sub-headings, lists and a contact block. */
export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const t = getDict(locale);
  const doc = t.legal[kind];
  return (
    <>
      <PageHero eyebrow={t.footer.help} title={doc.title} lead={doc.updated} />
      <Container className="max-w-3xl pb-24">
        <div className="space-y-12">
          {doc.sections.map((s, i) => (
            <section key={s.h} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="font-display text-2xl">
                {s.h}
              </h2>
              <div className="mt-4 space-y-4 text-lg text-ink-soft">
                {s.blocks.map((b: Block, j) => (
                  <LegalBlock key={j} b={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-14 border-t border-ink/10 pt-6 text-sm text-muted">{doc.copyright}</p>
      </Container>
    </>
  );
}
