import { cn } from "@/lib/cn";
import { LogoMark } from "./LogoMark";

/**
 * The official HelloKhata logo: the app mark followed by the name — "Hello" heavy in deep green, "Khata" lighter
 * in gold. On dark backgrounds (`tone="light"`) "Hello" turns cream and the gold brightens slightly.
 * The mark scales with the font size, so `className="text-[1.7rem]"` sizes the whole logo.
 */
export function Wordmark({ className, tone = "dark", mark = true }: { className?: string; tone?: "dark" | "light"; mark?: boolean }) {
  return (
    <span className={cn("font-latin inline-flex items-center gap-[0.38em] text-[1.35rem] leading-none tracking-[-0.025em]", className)} translate="no">
      {mark && <LogoMark className={cn("size-[1.5em] shrink-0", tone === "light" && "rounded-[0.33em] ring-1 ring-cream/15")} />}
      <span>
        <span className={cn("font-extrabold", tone === "dark" ? "text-[#0D3C2B]" : "text-cream")}>Hello</span>
        <span className={cn("font-semibold", tone === "dark" ? "text-[#B1873C]" : "text-[#D9B26A]")}>Khata</span>
      </span>
    </span>
  );
}
