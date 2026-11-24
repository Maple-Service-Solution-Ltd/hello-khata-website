import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { appLinks } from "@/lib/site";
import { cn } from "@/lib/cn";

type Store = "googlePlay" | "appStore";

const glyph: Record<Store, React.ReactNode> = {
  googlePlay: (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
      <path d="M4.2 2.9l10.3 9.1-10.3 9.1c-.4-.2-.7-.7-.7-1.3V4.2c0-.6.3-1.1.7-1.3z" fill="#4ade80" />
      <path d="M14.5 12l2.9 2.6-11.7 6.7c-.5.3-1 .3-1.5 0z" fill="#e2a93b" />
      <path d="M14.5 12L4.2 2.9c.5-.3 1-.3 1.5 0l11.7 6.7z" fill="#7fa7d9" />
      <path d="M17.4 9.6l3 1.7c.9.5.9 1.8 0 2.3l-3 1.7-2.9-2.6z" fill="#c9553b" />
    </svg>
  ),
  appStore: (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
      <path
        d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.1 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z"
        fill="currentColor"
      />
    </svg>
  ),
};

/**
 * Google Play and App Store badges. A store whose link isn't set yet (see appLinks in lib/site) shows as a
 * "Coming soon" badge that is not a link, so nobody is sent to a missing listing.
 */
export function StoreBadges({ locale, tone = "dark", className }: { locale: Locale; tone?: "dark" | "light"; className?: string }) {
  const a = getDict(locale).app;
  const stores: Store[] = ["googlePlay", "appStore"];
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {stores.map((s) => {
        const href = appLinks[s];
        const label = a[s];
        const face = (
          <>
            {glyph[s]}
            <span className="flex flex-col leading-none">
              <span className="text-[0.62rem] tracking-wide opacity-80">{label.small}</span>
              <span className="font-latin mt-1 text-[1.02rem] font-semibold">{label.big}</span>
            </span>
          </>
        );
        const base = cn(
          "relative inline-flex h-[3.25rem] items-center gap-2.5 rounded-xl px-4 ring-1 transition-colors duration-200",
          tone === "dark" ? "bg-ink text-cream ring-ink" : "bg-cream/[0.06] text-cream ring-cream/25",
        );
        return (
          <li key={s}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, tone === "dark" ? "hover:bg-forest" : "hover:bg-cream/15")}>
                {face}
              </a>
            ) : (
              <span className={cn(base, "cursor-default opacity-75")}>
                {face}
                <span className={cn("absolute -top-2 -right-2 rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold", tone === "dark" ? "bg-marigold-soft text-[#6b4a07]" : "bg-marigold text-ink")}>{a.soon}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
