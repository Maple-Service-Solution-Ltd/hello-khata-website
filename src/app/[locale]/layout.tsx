import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Amiri, Galada, Hind_Siliguri, Manrope, Nothing_You_Could_Do, Tiro_Bangla } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/client";
import { isProductionSite, siteUrl } from "@/lib/site";
import { jsonLdString, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InkDefs } from "@/components/illustrations/InkDefs";
import { MotionProvider } from "@/components/ui/MotionProvider";

const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind", display: "swap" });
const tiro = Tiro_Bangla({ subsets: ["bengali", "latin"], weight: "400", style: ["normal"], variable: "--font-tiro", display: "swap" });
const galada = Galada({ subsets: ["bengali", "latin"], weight: "400", variable: "--font-galada", display: "swap" });
// Pen handwriting for the sample prescription only; not preloaded.
const scrawl = Nothing_You_Could_Do({ subsets: ["latin"], weight: "400", variable: "--font-scrawl", display: "swap", preload: false });
// Arabic calligraphy for the adhan words above the hero mosque; not preloaded.
const arabic = Amiri({ subsets: ["arabic"], weight: "400", variable: "--font-arabic", display: "swap", preload: false });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
// Bangla digits only: Hind Siliguri's ১ reads like ৯, so ০–৯ come from Noto Sans Bengali (OFL, variable weight).
const banglaDigits = localFont({
  src: "../../fonts/noto-sans-bengali-wght.woff2",
  weight: "100 900",
  variable: "--font-bn-digits",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+09E6-09EF" }],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#f7f2e7",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.defaultTitle, template: t.meta.titleTemplate },
    description: t.meta.defaultDescription,
    applicationName: "HelloKhata",
    formatDetection: { telephone: false },
    // Staging and preview hosts must never be indexed; only the production origin is.
    ...(isProductionSite ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${banglaDigits.variable} ${hind.variable} ${tiro.variable} ${galada.variable} ${scrawl.variable} ${arabic.variable} ${manrope.variable}`}>
      <body className="paper min-h-dvh">
        <I18nProvider locale={locale} dict={t}>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
            >
              {t.common.skipToContent}
            </a>
            <InkDefs />
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter locale={locale} />
          </MotionProvider>
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd(locale), websiteJsonLd(locale)) }} />
      </body>
    </html>
  );
}
