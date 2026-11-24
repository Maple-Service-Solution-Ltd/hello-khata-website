/** The production origin. Canonicals, hreflang, the sitemap and Open Graph must point here, never at a dev host. */
export const productionUrl = "https://hellokhata.com";

/**
 * Public origin of the site. NEXT_PUBLIC_SITE_URL wins (set it for staging); otherwise a production build uses
 * productionUrl and `next dev` uses localhost. A build without the variable used to ship localhost canonicals.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? productionUrl : "http://localhost:3000")).replace(/\/$/, "");

/** True only for the real production origin; any other host (staging, preview, localhost) is kept out of search indexes. */
export const isProductionSite = siteUrl === productionUrl;

/** Official social profiles (verified by HelloKhata). Rendered in the footer and contact page, and listed as sameAs in structured data. */
export const socialLinks: { key: "facebook" | "linkedin"; label: string; href: string }[] = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/hellokhata/" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/hellokhata/" },
];

/**
 * Official app store listings. Paste the real URLs here when they are ready: until then each store badge shows
 * as "Coming soon" and is not a link, so no visitor is sent to a wrong or missing listing.
 */
export const appLinks: { googlePlay: string; appStore: string } = {
  googlePlay: "",
  appStore: "",
};

/** Official contact details. Display strings are localised; links always use the international format. */
export const contactInfo = {
  phone: { href: "tel:+8801734114388", display: "+880 1734-114388" },
  whatsapp: { href: "https://wa.me/8801922557436", display: "+880 1922-557436" },
  email: { href: "mailto:contact@hellokhata.com", display: "contact@hellokhata.com" },
  address: {
    en: "38 Shah Makhdum Avenue, Sector 13, Uttara, Dhaka 1230",
    bn: "৩৮ শাহ মখদুম এভিনিউ, সেক্টর ১৩, উত্তরা, ঢাকা ১২৩০",
    mapHref: "https://www.google.com/maps/search/?api=1&query=38+Shah+Makhdum+Avenue%2C+Sector+13%2C+Uttara%2C+Dhaka+1230",
  },
};

/** Phone numbers shown with Bangla digits on Bangla pages. */
export const localDigits = (s: string, locale: "bn" | "en") => (locale === "bn" ? s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]) : s);
