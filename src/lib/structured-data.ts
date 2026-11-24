import type { Locale } from "@/i18n/config";
import { localeMeta } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { pricingConfig } from "@/content/pricing";
import { contactInfo, siteUrl, socialLinks } from "./site";
import { localeUrl } from "./metadata";

/**
 * schema.org JSON-LD for the site. Only facts the site already states: no ratings, reviews or
 * user counts are emitted (none are verified), so nothing here can mislead search engines.
 */

export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
const softwareId = `${siteUrl}/#software`;

export function organizationJsonLd(locale: Locale) {
  const t = getDict(locale);
  return {
    "@type": "Organization",
    "@id": orgId,
    name: "HelloKhata",
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/brand/hellokhata-mark-512.png`, width: 512, height: 512 },
    description: t.meta.defaultDescription,
    email: contactInfo.email.display,
    telephone: "+8801734114388",
    address: {
      "@type": "PostalAddress",
      streetAddress: "38 Shah Makhdum Avenue, Sector 13, Uttara",
      addressLocality: "Dhaka",
      postalCode: "1230",
      addressCountry: "BD",
    },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    sameAs: socialLinks.map((s) => s.href),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", telephone: "+8801734114388", email: contactInfo.email.display, availableLanguage: ["bn", "en"] },
      { "@type": "ContactPoint", contactType: "customer support", telephone: "+8801922557436", name: "WhatsApp", availableLanguage: ["bn", "en"] },
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  const t = getDict(locale);
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: "HelloKhata",
    url: siteUrl,
    description: t.meta.defaultDescription,
    inLanguage: ["bn-BD", "en"],
    publisher: { "@id": orgId },
  };
}

/** The product itself. Offers come from the pricing config (BDT); the custom-priced Enterprise plan is left out. */
export function softwareJsonLd(locale: Locale) {
  const t = getDict(locale);
  const priced = pricingConfig.plans.filter((p) => p.monthly !== null);
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: "HelloKhata",
    url: localeUrl(locale, "/"),
    description: t.meta.defaultDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Mobile",
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": orgId },
    offers: priced.map((p) => ({
      "@type": "Offer",
      name: t.pricing.plans[p.key].name,
      price: p.monthly,
      priceCurrency: "BDT",
      url: localeUrl(locale, "/pricing"),
      category: "subscription",
    })),
  };
}

/** BreadcrumbList matching the visible breadcrumb. Items are [label, path]; the current page goes last. */
export function breadcrumbJsonLd(locale: Locale, items: [label: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: localeUrl(locale, path) })),
  };
}

/** Serialise one or more nodes as a single @graph, escaped so text can never close the script tag. */
export function jsonLdString(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
