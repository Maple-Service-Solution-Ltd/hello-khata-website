import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { interpolate } from "@/lib/format";
import { socialLinks } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Simple brand glyphs, drawn on a 24-unit grid so they sit evenly in their circles. */
const glyphs: Record<(typeof socialLinks)[number]["key"], React.ReactNode> = {
  facebook: <path d="M13.4 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21z" fill="currentColor" />,
  linkedin: (
    <g fill="currentColor">
      <rect x="4.2" y="9.2" width="3.3" height="10.6" rx="0.4" />
      <circle cx="5.85" cy="5.7" r="1.95" />
      <path d="M10 9.2h3.2v1.5c.5-.9 1.7-1.8 3.4-1.8 3.3 0 3.9 2.1 3.9 4.9v6h-3.3v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v5.4H10z" />
    </g>
  ),
};

/** HelloKhata's official social profiles as round icon links. */
export function SocialLinks({ locale, tone = "light", className }: { locale: Locale; tone?: "light" | "dark"; className?: string }) {
  const t = getDict(locale);
  return (
    <ul className={cn("flex gap-2.5", className)}>
      {socialLinks.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={interpolate(t.common.onNetwork, { network: s.label })}
            title={s.label}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full ring-1 transition-colors duration-200",
              tone === "light" ? "text-cream/80 ring-cream/20 hover:bg-cream hover:text-forest" : "text-leaf-ink ring-ink/15 hover:bg-leaf-deep hover:text-white",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-[1.15rem]" aria-hidden="true">
              {glyphs[s.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
